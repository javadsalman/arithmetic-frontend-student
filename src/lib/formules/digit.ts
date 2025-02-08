import { Availables, OperationType } from "./types";
import DynamicNumber from "./dynamic-number";
import Random from "./random";
import OperationHistory from "./history";
import { logReport } from "./logger";


const TEN_BASED_PLUS_AVAILABLES: Availables = {
    0: [],
    1: [9],
    2: [9, 8],
    3: [9, 8, 7],
    4: [9, 8, 7, 6],
    5: [5],
    6: [9, 5, 4],
    7: [9, 8, 5, 4, 3],
    8: [9, 8, 7, 5, 4, 3, 2],
    9: [9, 8, 7, 6, 5, 4, 3, 2, 1]
}

const TEN_BASED_SUBTRACT_AVAILABLES: Availables = {
    0: [9, 8, 7, 6, 5, 4, 3, 2, 1],
    1: [9, 8, 7, 5, 4, 3, 2],
    2: [9, 8, 5, 4, 3],
    3: [9, 5, 4],
    4: [5],
    5: [9, 8, 7, 6],
    6: [9, 8, 7],
    7: [9, 8],
    8: [9],
    9: []
}

const FIVE_K_BASED_PLUS_AVAILABLES: Availables = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [6, 7, 8, 9],
    6: [6, 7, 8],
    7: [6, 7],
    8: [6],
    9: []
}

const FIVE_K_BASED_SUBTRACT_AVAILABLES: Availables = {
    0: [],
    1: [6],
    2: [6, 7],
    3: [6, 7, 8],
    4: [6, 7, 8, 9],
    5: [],
    6: [],
    7: [],
    8: [],
    9: []
}

class Digit {
    value: number;
    parent: DynamicNumber;
    random: Random;
    history: OperationHistory;
    constructor(value: number, parent: DynamicNumber) {
        this.value = value;
        this.parent = parent;
        this.random = new Random();
        this.history = parent.parent.history
    }
    get order() {
        return this.parent.digits.indexOf(this) - (this.parent.digits.length - this.parent.parent.digitCount)
    }
    get topValue () {
        return this.value >= 5 ? 5 : 0
    }
    get bottomValue () {
        return this.value >= 5 ? this.value - 5 : this.value
    }
    getTopAddAvailables = () => {
        if (!this.topValue) {
            return [5]
        }
        return []
    }
    getTopSubtractAvailables = () => {
        if (this.topValue) {
            return [5]
        }
        return []
    }
    getBottomAddAvailables = (): number[] => {
        const values: number[] = []
        for (let i = 0; i < 5 - this.bottomValue; i++) {
            values.push(i);
        }
        return values;
    }
    getBottomSubtractAvailables = (): number[] => {
        const values: number[] = []
        for (let i = 0; i <= this.bottomValue; i++) {
            values.push(i);
        }
        return values;
    }
    getCombinedAddAvailables = () => {
        return !this.topValue ? this.getBottomAddAvailables().map(value => 5 + value) : []
    }
    getCombinedSubtractAvailables = () => {
        return this.topValue ? this.getBottomSubtractAvailables().map(value => 5 + value) : []
    }
    getSimpleAddAvailables = (isFirstDigit?: boolean) => {
        isFirstDigit = isFirstDigit ?? this.order === 0
        const result = Array.from(new Set([
            ...this.getBottomAddAvailables(),
            ...this.getTopAddAvailables(),
            ...this.getCombinedAddAvailables()
        ])).filter(value => this.order === 0 ? value : true).sort((a, b) => a - b);
        return result
    }
    getSimpleSubtractAvailables = (isFirstDigit?: boolean) => {
        isFirstDigit = isFirstDigit ?? this.order === 0
        const result = Array.from(new Set([
            ...this.getBottomSubtractAvailables(),
            ...this.getTopSubtractAvailables(),
            ...this.getCombinedSubtractAvailables()
        ])).filter(value => this.order === 0 ? value : true).sort((a, b) => a - b);
        return result
    }

    _getWeightForSimpleValue = (value: number, operationType: OperationType) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        if (lastValue === value && lastOperationType === operationType) {
            return 1
        }
        return 10
    }

    getRandomSimpleAddValue = () => {
        const availables = this.getSimpleAddAvailables()
        const weights = availables.map(value => this._getWeightForSimpleValue(value, 'add'))
        const result = this.random.choice(availables, weights)
        return result
    }
    getRandomSimpleSubtractValue = () => {
        const availables = this.getSimpleSubtractAvailables()
        const weights = availables.map(value => this._getWeightForSimpleValue(value, 'subtract'))
        const result = this.random.choice(availables, weights)
        return result
    }

    get5BasedAddAvailables = () => {
        if (this.value === 0 || this.value >= 5) {
            return []
        }
        const result: number[] = []
        for (let i=1; i <= this.bottomValue; i++) {
            result.push(5-i)
        }
        return result
    }

    getAll5BasedAddAvailables = (isFirstDigit: boolean) => {
        const availables5Based = this.get5BasedAddAvailables()
        const availablesSimple = this.getSimpleAddAvailables()
        const allAvailables = [...availables5Based, ...availablesSimple].sort((a, b) => a - b)
        if (isFirstDigit && allAvailables.includes(0)) {
            allAvailables.shift()
        }
        return allAvailables
    }

    getRandom5BasedAddValue = (index: number) => {
        const availables = this.getAll5BasedAddAvailables(index === 0)
        const weights = availables.map(value => this._getWeightFor5BasedAddValue(value))
        const result = this.random.choice(availables, weights)
        logReport('getRandom5BasedAddValue', availables, weights, result)
        return result
    }

    _getWeightFor5BasedAddValue = (value: number) => {
        const simpleAvailables = this.getSimpleAddAvailables()
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        if (lastValue === value && lastOperationType === 'subtract') {
            return 1
        }
        // if the current value is 0 and the potential value is less than 5, it's the best choice for the next move
        if (this.value === 0 && value < 5) {
            return 50
        }
        // if the potential value is in the simple availables, and the sum of current value and potential value is less than 5, it's a good choice
        if (simpleAvailables.includes(value)) {
            if (this.value + value  < 5) {
                return 3
            }
            return 1
        }
        return 50
    }
    
    getRandomSimpleSubtractValueFor5Based = () => {
        const availables = this.getSimpleSubtractAvailables()
        const weights = availables.map(value => this._getWeightForSimpleSubtractValueFor5Based(value))
        const result = this.random.choice(availables, weights)
        return result
    }

    _getWeightForSimpleSubtractValueFor5Based = (value: number) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        if (lastValue === value && (lastOperationType === 'add' || lastOperationType === 'start')) {
            return 1
        }
        if (value < 5) {
            return 1
        }
        return 7
    }
    
    get5BasedSubtractAvailables = () => {
        const result: number[] = []
        if (this.value < 5 || this.value === 9) {
            return result
        }
        for (let i=0; i<=8-this.value; i++) {
            result.push(4-i)
        }
        return result
    }

    getRandom5BasedSubtractValue = () => {
        const availables5Based = this.get5BasedSubtractAvailables()
        const availablesSimple = this.getSimpleSubtractAvailables()
        const allAvailables = [...availables5Based, ...availablesSimple].sort((a, b) => a - b)
        const weights = allAvailables.map(value => this._getWeightFor5BasedSubtractValue(value, availablesSimple, availables5Based))
        const result = this.random.choice(allAvailables, weights)
        logReport('getRandom5BasedSubtractValue', availablesSimple, availables5Based, allAvailables, weights, result)
        return result
    }

    _getWeightFor5BasedSubtractValue = (value: number, availablesSimple: number[], availables5Based: number[]) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        if (lastValue === value && (lastOperationType === 'add' || lastOperationType === 'start')) {
            return 1
        }
        if (availables5Based.length === 0 && value > 4) {
            return 50
        }
        if (availablesSimple.includes(value)) {
            return 1
        }
        return 50
    }

    get10BasedAddAvailables = () => {
        const result =  TEN_BASED_PLUS_AVAILABLES[this.value]
        return result
    }

    _getWeightFor10BasedAddValue = (value: number) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        if (lastValue === value && lastOperationType === 'subtract') {
            return 1
        }
        const availables10Based = this.get10BasedAddAvailables()
        if (availables10Based.includes(value)) {
            return 100
        }
        return 1
    }

    getAll10BasedAddAvailables = (isFirstDigit: boolean) => {
        const availables = this.get10BasedAddAvailables()
        const availablesSimple = this.getSimpleAddAvailables()
        const allAvailables = [...availables, ...availablesSimple].sort((a, b) => a - b)
        if (isFirstDigit && allAvailables.includes(0)) {
            allAvailables.shift()
        }
        return {allAvailables, availables, availablesSimple}
    }

    getRandom10BasedAddValue = (index: number) => {
        const {allAvailables, availables, availablesSimple} = this.getAll10BasedAddAvailables(index === 0)
        const weights = allAvailables.map(value => this._getWeightFor10BasedAddValue(value))
        const result = this.random.choice(allAvailables, weights)
        logReport('getRandom10BasedAddValue', allAvailables, availables, availablesSimple, weights, this.order, result)
        return result
    }

    _getWeightForSubtractAvailablesFor10BasedAdd = (value: number) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        const availablesSimple = this.getSimpleSubtractAvailables()
        if (lastValue === value && (lastOperationType === 'add' || lastOperationType === 'start')) {
            return 1
        }
        if (availablesSimple.includes(value)) {
            return 1
        }
        return 100
    }

    getSubtractAvailablesFor10BasedAdd = (isFirstDigit: boolean) => {
        const availables5Based = this.get5BasedSubtractAvailables()
        const availablesSimple = this.getSimpleSubtractAvailables()
        const allAvailables = [...availables5Based, ...availablesSimple].sort((a, b) => a - b)
        if (isFirstDigit && allAvailables.includes(0)) {
            allAvailables.shift()
        }
        return {allAvailables, availables5Based, availablesSimple}
    }

    getRandomSubractAvailablesFor10BasedAdd = (index: number) => {
        const {allAvailables, availables5Based, availablesSimple} = this.getSubtractAvailablesFor10BasedAdd(index === 0)
        const weights = allAvailables.map(value => this._getWeightForSubtractAvailablesFor10BasedAdd(value))
        const result = this.random.choice(allAvailables, weights)
        logReport('getRandomSubractAvailablesFor10BasedAdd', allAvailables, availables5Based, availablesSimple, weights, this.order, result)
        return result
    }

    get10BasedSubtractAvailables = () => {
        const result = TEN_BASED_SUBTRACT_AVAILABLES[this.value]
        return result
    }

    getAll10BasedSubtractAvailables = (isFirstDigit: boolean, hasBefore: boolean) => {
        const availables = hasBefore ? this.get10BasedSubtractAvailables() : []
        const availablesSimple = this.getSimpleSubtractAvailables()
        const allAvailables = [...availables, ...availablesSimple].sort((a, b) => a - b)
        if (isFirstDigit && allAvailables.includes(0)) {
            allAvailables.shift()
        }
        return {allAvailables, availables, availablesSimple}
    }

    _getWeightFor10BasedSubtractValue = (value: number) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        const availables10Based = this.get10BasedSubtractAvailables()
        if (lastValue === value && (lastOperationType === 'add' || lastOperationType === 'start')) {
            return 1
        }
        if (availables10Based.includes(value)) {
            return 100
        }
        return 1
    }

    getRandom10BasedSubtractValue = (index: number, hasBefore: boolean) => {
        const {allAvailables, availables, availablesSimple} = this.getAll10BasedSubtractAvailables(index === 0, hasBefore)
        const weights = allAvailables.map(value => this._getWeightFor10BasedSubtractValue(value))
        const result = this.random.choice(allAvailables, weights)
        logReport('getRandom10BasedSubtractValue', allAvailables, availables, availablesSimple, weights, this.order, result)
        return result
    }

    get5KBasedAddAvailables = () => {
        const result = FIVE_K_BASED_PLUS_AVAILABLES[this.value]
        return result
    }

    _getWeightFor5KBasedAddValue = (value: number) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        if (lastValue === value && lastOperationType === 'subtract') {
            return 1
        }
        const availables5KBased = this.get5KBasedAddAvailables()
        if (availables5KBased.includes(value)) {
            return 150
        }
        const sum = this.value + value
        if (sum >= 5 && sum < 9) {
            return 20
        }
        return 1
    }

    getAll5KBasedAddAvailables = (isFirstDigit: boolean) => {
        const availables = this.get5KBasedAddAvailables()
        const availablesSimple = this.getSimpleAddAvailables()
        const availables5Based = this.get5BasedAddAvailables()
        const allAvailables = [...availables, ...availablesSimple, ...availables5Based].sort((a, b) => a - b)
        if (isFirstDigit && allAvailables.includes(0)) {
            allAvailables.shift()
        }
        return {allAvailables, availables, availablesSimple, availables5Based}
    }

    getRandom5KBasedAddValue = (index: number) => {
        const {allAvailables, availables, availablesSimple, availables5Based} = this.getAll5KBasedAddAvailables(index === 0)
        const weights = allAvailables.map(value => this._getWeightFor5KBasedAddValue(value))
        const result = this.random.choice(allAvailables, weights)
        logReport('getRandom5KBasedAddValue', allAvailables, availables, availablesSimple, availables5Based, weights, this.order, result)
        return result
    }

    _getWeightForSubtractAvailablesFor5KBasedAdd = (value: number) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        if (lastValue === value && (lastOperationType === 'add' || lastOperationType === 'start')) {
            return 1
        }
        return 100
    }

    getSubtractAvailablesFor5KBasedAdd = (isFirstDigit: boolean) => {
        const availables5Based = this.get5BasedSubtractAvailables()
        const availablesSimple = this.getSimpleSubtractAvailables()
        const allAvailables = [...availables5Based, ...availablesSimple].sort((a, b) => a - b)
        if (isFirstDigit && allAvailables.includes(0)) {
            allAvailables.shift()
        }
        return {allAvailables, availables5Based, availablesSimple}
    }

    getRandomSubractAvailablesFor5KBasedAdd = (index: number) => {
        const {allAvailables, availables5Based, availablesSimple} = this.getSubtractAvailablesFor5KBasedAdd(index === 0)
        const weights = allAvailables.map(value => this._getWeightForSubtractAvailablesFor5KBasedAdd(value))
        const result = this.random.choice(allAvailables, weights)
        logReport('getRandomSubractAvailablesFor5KBasedAdd', allAvailables, availables5Based, availablesSimple, weights, this.order, result)
        return result
    }

    get5KBasedSubtractAvailables = () => {
        const result = FIVE_K_BASED_SUBTRACT_AVAILABLES[this.value]
        return result
    }

    _getWeightFor10BasedSubtractValueFor5KBasedAdd = (value: number) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        if (lastValue === value && (lastOperationType === 'add' || lastOperationType === 'start')) {
            return 1
        }
        const availables5KBased = this.get5KBasedSubtractAvailables()
        if (availables5KBased.includes(value)) {
            return 100
        }
        const diff = this.value - value
        if (diff < 5 && diff !== 0) {
            return 10
        }
        return 1
    }

    getAll5KBasedSubtractAvailables = (isFirstDigit: boolean, hasBefore: boolean) => {
        const availables = hasBefore ? this.get5KBasedSubtractAvailables() : []
        const availablesSimple = this.getSimpleSubtractAvailables()
        const allAvailables = [...availables, ...availablesSimple].sort((a, b) => a - b)
        if (isFirstDigit && allAvailables.includes(0)) {
            allAvailables.shift()
        }
        return {allAvailables, availables, availablesSimple}
    }

    getRandom5KBasedSubtractValue = (index: number, hasBefore: boolean) => {
        const {allAvailables, availables, availablesSimple} = this.getAll5KBasedSubtractAvailables(index === 0, hasBefore)
        const weights = allAvailables.map(value => this._getWeightFor10BasedSubtractValueFor5KBasedAdd(value))
        const result = this.random.choice(allAvailables, weights)
        logReport('getRandom5KBasedSubtractValue', allAvailables, availables, availablesSimple, weights, this.order, result)
        return result
    }

    
    getMixedBasedAddAvailables = (isFirstDigit: boolean) => {
        const allAvailables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        if (isFirstDigit && allAvailables.includes(0)) {
            allAvailables.shift()
        }
        return allAvailables
    }


    getRandomMixedBasedAddValue = (index: number) => {
        const allAvailables = this.getMixedBasedAddAvailables(index === 0)
        const weights = allAvailables.map(value => this._getWeightForMixedBasedAddValue(value))
        const result = this.random.choice(allAvailables, weights)
        logReport('getRandomMixedBasedAddValue', allAvailables, weights, this.order, result)
        return result
    }

    _getWeightForMixedBasedAddValue = (value: number) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        const fiveBasedAvailables = this.get5BasedAddAvailables()
        const tenBasedAvailables = this.get10BasedAddAvailables()
        const fiveKBasedAvailables = this.get5KBasedAddAvailables()
        if (lastValue === value && lastOperationType === 'subtract') {
            return 1
        }
        if (fiveKBasedAvailables.includes(value)) {
            return 50
        }
        if (tenBasedAvailables.includes(value)) {
            return 40
        }
        if (fiveBasedAvailables.includes(value)) {
            return 30
        }
        return 20
    }

    getMixedBasedSubtractAvailables = (isFirstDigit: boolean, hasBefore: boolean) => {
        let allAvailables = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        if (!hasBefore) {
            const simpleAvailables = this.getSimpleSubtractAvailables()
            const fiveBasedAvailables = this.get5BasedSubtractAvailables()
            allAvailables = [...simpleAvailables, ...fiveBasedAvailables].sort((a, b) => a - b)
        }
        if (isFirstDigit && allAvailables.includes(0)) {
            allAvailables.shift()
        }
        return allAvailables
    }

    getRandomMixedBasedSubtractValue = (index: number, hasBefore: boolean) => {
        const allAvailables = this.getMixedBasedSubtractAvailables(index === 0, hasBefore)
        const weights = allAvailables.map(value => this._getWeightForMixedBasedSubtractValue(value))
        const result = this.random.choice(allAvailables, weights)
        logReport('getRandomMixedBasedSubtractValue', allAvailables, weights, this.order, result)
        return result
    }

    _getWeightForMixedBasedSubtractValue = (value: number) => {
        const {value: lastValue, operationType: lastOperationType} = this.history.getLastCertainDigitValueWithOperationType(this.order)
        const fiveBasedAvailables = this.get5BasedSubtractAvailables()
        const tenBasedAvailables = this.get10BasedSubtractAvailables()
        const fiveKBasedAvailables = this.get5KBasedSubtractAvailables()
        if (lastValue === value && (lastOperationType === 'add' || lastOperationType === 'start')) {
            return 1
        }
        if (fiveKBasedAvailables.includes(value)) {
            return 50
        }
        if (tenBasedAvailables.includes(value)) {
            return 40
        }
        if (fiveBasedAvailables.includes(value)) {
            return 30
        }
        return 20
    }
}

export default Digit