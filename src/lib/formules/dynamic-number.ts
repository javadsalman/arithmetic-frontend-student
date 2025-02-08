import Generator from "./generator";
import Digit from "./digit";
import { logReport } from "./logger";
import Random from "./random";


class DynamicNumber {
    parent: Generator;
    value: number;
    digits: Digit[];
    random: Random;
    constructor(value: number | DynamicNumber | null, parent: Generator) {
        this.parent = parent;
        this.value = 0;
        this.digits = [];
        if (value != null) {
            if (value instanceof DynamicNumber) {
                this.setValue(value.value)
            } else {
                this.setValue(value)
            }
        }
        this.random = new Random();
    }

    toJSON = () => {
        return this.value;
    }

    setValue = (value: number) => {
        this.value = value;
        this.digits = this.value.toString().split('').map((digit) => new Digit(+digit, this));
    }

    add = (digit: number | DynamicNumber) => {
        if (typeof digit === 'number') {
            this.setValue(this.value + digit)
        } else {
            this.setValue(this.value + digit.value)
        }
    }

    subtract = (digit: number | DynamicNumber) => {
        if (typeof digit === 'number') {
            this.setValue(this.value - digit)
        } else {
            this.setValue(this.value - digit.value)
        }
    }

    getSimpleAddAvailables = (): number[][] => {
        const result: number[][] = []
        for (let digit of this.digits) {
            result.push(digit.getSimpleAddAvailables(digit.order === 0))
        }
        return result
    }

    _getRandomSlice = ({mixedCount, numbers}: {mixedCount: boolean, numbers: number[]}) => {
        if (numbers.length === 1 || !mixedCount || numbers[1] === 0) {
            return numbers
        }
        const randomSubtract = this.random.choice([1, 0], [1, 1])
        const result = numbers.slice(randomSubtract, numbers.length)
        return result
    }

    getRandomSimpleAddDynamicNumber = ({mixedCount}: {mixedCount: boolean}): DynamicNumber => {
        const result: number[] = []
        for (let digit of this.digits) {
            const randomNumber = digit.getRandomSimpleAddValue()
            result.push(randomNumber)
        }
        const lackCount = this.parent.digitCount - result.length
        for (let i = 0; i < lackCount; i++) {
            result.unshift(this.random.getRandomInt(1, 9))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    getSimpleSubtractAvailables = (): number[][] => {
        const result: number[][] = []
        for (let digit of this.digits) {
            result.push(digit.getSimpleSubtractAvailables(digit.order === 0))
        }
        return result
    }

    
    getRandomSimpleSubtractDynamicNumber = ({mixedCount}: {mixedCount: boolean}): DynamicNumber => {
        const result: number[] = []
        for (let digit of this.digits) {
            const randomNumber = digit.getRandomSimpleSubtractValue()
            result.push(randomNumber)
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }
    
    getSimpleAddChanceCounts = () => {
        const availables = this.getSimpleAddAvailables()
        if (availables[0].length === 0) {
            return null
        }
        return availables.map((digit) => digit.length)
    }

    getSimpleSubtractChanceCounts = () => {
        const availables = this.getSimpleSubtractAvailables()
        if (availables[0].length === 0) {
            return null
        }
        if (this.digits.length < this.parent.digitCount!) {
            return null
        }
        return availables.map((values) => values.length)
    }

    getProperSimpleOperationType = () => {
        const addChangeCounts = this.getSimpleAddChanceCounts()
        const subtractChangeCounts = this.getSimpleSubtractChanceCounts()
        if (addChangeCounts === null) {
            return 'subtract'
        }
        if (subtractChangeCounts === null) {
            return 'add'
        }
        const addChangeNumber = +addChangeCounts.map(count => count.toString()).join('')
        const subtractChangeNumber = +subtractChangeCounts.map(count => count.toString()).join('')
        return this.random.choice(['add', 'subtract'], [addChangeNumber, subtractChangeNumber])
    }

    get5BasedAddAvailables = () => {
        const result: number[][] = []
        for (let digit of this.digits) {
            result.push(digit.get5BasedAddAvailables())
        }
        return result
    }

    get5BasedAddChanceCounts = (): {availables: number[], simpleAvailables: number[], allAvailables: number[]} | null => {
        const availables = this.get5BasedAddAvailables()
        const simpleAvailables = this.getSimpleAddAvailables()
        const allAvailables = availables.map((arr, index) => arr.concat(simpleAvailables[index]))
        if (allAvailables[0].length === 0) {
            return null
        }
        return {
            availables: availables.map((values) => values.length),
            simpleAvailables: simpleAvailables.map((values) => values.length),
            allAvailables: allAvailables.map((values) => values.length)
        }
    }
    
    getRandom5BasedAddDynamicNumber = ({mixedCount}: {mixedCount: boolean}) => {
        const result: number[] = []
        for (let digit of this.digits) {
            const value = digit.getRandom5BasedAddValue(result.length)
            result.push(value)
        }
        const lackCount = this.parent.digitCount - result.length
        for (let i = lackCount-1; i >= 0; i--) {
            result.unshift(new Digit(0, this).getRandom5BasedAddValue(i))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    getRandomSimpleSubtractDynamicNumberFor5Based = ({mixedCount}: {mixedCount: boolean}) => {
        const result: number[] = []
        for (let digit of this.digits) {
            result.push(digit.getRandomSimpleSubtractValueFor5Based())
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    getProper5BasedAddOperationType = () => {
        const addChangeCountsInfo = this.get5BasedAddChanceCounts()
        const simpleSubtractChangeCountsInfo = this.getSimpleSubtractChanceCounts()
        if (addChangeCountsInfo === null) {
            return 'subtract'
        }
        if (simpleSubtractChangeCountsInfo === null) {
            return 'add'
        }
        let addChangeNumber = +addChangeCountsInfo.allAvailables.map(count => count > 9 ?  '9' : count.toString()).join('')
        let subtractChangeNumber = +simpleSubtractChangeCountsInfo.map(count => count > 9 ?  '9' : count.toString()).join('')
        if (this.digits.filter(digit => digit.topValue).length > this.digits.length / 2) {
            subtractChangeNumber = 5
            addChangeNumber = addChangeNumber && 1
        } else {
            addChangeNumber = addChangeNumber * 4
        }
        const result = this.random.choice(['add', 'subtract'], [addChangeNumber, subtractChangeNumber])
        return result
    }

    getRandom5BasedSubtractDynamicNumber = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount?: number}) => {
        const result: number[] = []
        digitCount = digitCount || this.digits.length
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let digit of digits) {
            result.push(digit.getRandom5BasedSubtractValue())
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    get5BasedSubtractAvailables = () => {
        const result: number[][] = []
        for (let digit of this.digits) {
            result.push(digit.get5BasedSubtractAvailables())
        }
        return result
    }

    get5BasedSubtractChanceCounts = () => {
        const availables = this.get5BasedSubtractAvailables()
        if (availables[0].length === 0) {
            return null
        }
        return availables.map((values) => values.length)
    }
    
    getProper5BasedAddSubtractOperationType = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount: number}) => {
        const addChangeCounts = this.get5BasedAddChanceCounts()
        const subtractChangeCounts = this.get5BasedSubtractChanceCounts()
        if (addChangeCounts === null) {
            logReport('operator', 'addChangeCounts === null', 'subtract')
            return 'subtract'
        }
        if (subtractChangeCounts === null || (!mixedCount && this.digits.length < digitCount)) {
            logReport('operator', 'subtractChangeCounts === null', 'add')
            return 'add'
        }
        let addChangeNumber = +addChangeCounts.allAvailables.map(count => count > 9 ?  '9' : count.toString()).join('')
        let subtractChangeNumber = +subtractChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')
        const topValueCount = this.digits.filter(digit => digit.topValue).length
        const allDigitCount = this.digits.length
        if (topValueCount > allDigitCount * 0.6) {
            subtractChangeNumber  = 5
            addChangeNumber = topValueCount === allDigitCount ? 0 : 1
        }
        if (topValueCount < allDigitCount * 0.4) {
            addChangeNumber = 5
            subtractChangeNumber = topValueCount === 0 ? 0 : 1
        }
        const result = this.random.choice(['add', 'subtract'], [addChangeNumber, subtractChangeNumber])
        logReport('operator', addChangeNumber, subtractChangeNumber, result)
        return result
    }

    getRandom10BasedAddDynamicNumber = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount: number}) => {
        const result: number[] = []
        digitCount = digitCount || this.digits.length
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getRandom10BasedAddValue(index))
        }
        const lackCount = this.parent.digitCount - result.length
        for (let i=lackCount-1; i >= 0; i--) {
            result.unshift(new Digit(0, this).getRandom10BasedAddValue(i))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    get10BasedAddAvailables = (digitCount: number) => {
        const result: number[][] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getAll10BasedAddAvailables(index === 0).allAvailables)
        }
        return result
    }

    get10BasedAddChanceCounts = (digitCount: number) => {
        const availables = this.get10BasedAddAvailables(digitCount)
        if (availables[0].length === 0) {
            return null
        }
        return availables.map((values) => values.length)
    }

    getRandomSubtractDynamicNumberFor10Based = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount: number}) => {
        const result: number[] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getRandomSubractAvailablesFor10BasedAdd(index))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    getSubtractAvailablesFor10BasedAdd = (digitCount: number) => {
        const result: number[][] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getSubtractAvailablesFor10BasedAdd(index===0).allAvailables)
        }
        return result
    }

    getSubtractChanceCountsFor10BasedAdd = (digitCount: number) => {
        const availables = this.getSubtractAvailablesFor10BasedAdd(digitCount)
        if (availables[0].length === 0 || availables.length < digitCount) {
            return null
        }
        return availables.map((values) => values.length)
    }

    getProper10BasedAddOperationType = (digitCount: number) => {
        const addChangeCounts = this.get10BasedAddChanceCounts(digitCount)
        const subtractChangeCounts = this.getSubtractChanceCountsFor10BasedAdd(digitCount)
        if (addChangeCounts === null) {
            logReport('operator', 'addChangeCounts === null', 'subtract')
            return 'subtract'
        }
        if (subtractChangeCounts === null) {
            logReport('operator', 'subtractChangeCounts === null', 'add')
            return 'add'
        }
        let addChangeNumber = +addChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')
        let subtractChangeNumber = +subtractChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')
        if (this.parent.history.getLastOperationType() === 'subtract' || this.parent.history.getOperationCount() === 1) {
            subtractChangeNumber /= 8
        } else {
            subtractChangeNumber *= 4
        }
        const result = this.random.choice(['add', 'subtract'], [addChangeNumber, subtractChangeNumber])
        logReport('operator', addChangeNumber, subtractChangeNumber, result)
        return result
    }

    _hasBeforePart = ({index, result, digitCount}: {index: number, result: number[], digitCount: number}) => {
        const valuePart = +this.value.toString().slice(0, index-digitCount)
        const resultPart = +result.join('')
        return valuePart > resultPart
    }

    getRandom10BasedSubtractDynamicNumber = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount: number}) => {
        const result: number[] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getRandom10BasedSubtractValue(index, this._hasBeforePart({index, result, digitCount})))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    get10BasedSubtractAvailables = (digitCount: number) => {
        const result: number[][] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        const beforeNumbers = []
        for (let [index, digit] of digits.entries()) {
            const hasBeforePart = this._hasBeforePart({index, result: beforeNumbers, digitCount})
            result.push(digit.getAll10BasedSubtractAvailables(index === 0, hasBeforePart).allAvailables)
            beforeNumbers.push(digit.value)
        }
        return result
    }

    get10BasedSubtractChanceCounts = (digitCount: number) => {
        const availables = this.get10BasedSubtractAvailables(digitCount)
        if (availables[0].length === 0 || availables.length < digitCount) {
            return null
        }
        return availables.map((values) => values.length)
    }

    getProper10BasedAddSubtractOperationType = (digitCount: number) => {
        const addChangeCounts = this.get10BasedAddChanceCounts(digitCount)
        const subtractChangeCounts = this.get10BasedSubtractChanceCounts(digitCount)
        if (addChangeCounts === null) {
            return 'subtract'
        }
        if (subtractChangeCounts === null) {
            return 'add'
        }
        let addChangeNumber = +addChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')
        let subtractChangeNumber = +subtractChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')
        const result = this.random.choice(['add', 'subtract'], [addChangeNumber, subtractChangeNumber])
        return result
    }

    getRandom5KBasedAddDynamicNumber = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount: number}) => {
        const result: number[] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getRandom5KBasedAddValue(index))
        }
        const lackCount = this.parent.digitCount - result.length
        for (let i = lackCount-1; i >= 0; i--) {
            result.unshift(new Digit(0, this).getRandom5KBasedAddValue(i))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    get5KBasedAddAvailables = (digitCount: number) => {
        const result: number[][] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getAll5KBasedAddAvailables(index === 0).allAvailables)
        }
        return result
    }

    get5KBasedAddChanceCounts = (digitCount: number) => {
        const availables = this.get5KBasedAddAvailables(digitCount)
        if (availables[0].length === 0) {
            return null
        }
        return availables.map((values) => values.length)
    }

    getRandomSubtractDynamicNumberFor5KBased = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount: number}) => {
        const result: number[] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getRandomSubractAvailablesFor5KBasedAdd(index))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    getSubtractAvailablesFor5KBasedAdd = (digitCount: number) => {
        const result: number[][] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getSubtractAvailablesFor5KBasedAdd(index===0).allAvailables)
        }
        return result
    }

    getSubtractChanceCountsFor5KBasedAdd = (digitCount: number) => {
        const availables = this.getSubtractAvailablesFor5KBasedAdd(digitCount)
        if (availables[0].length === 0 || availables.length < digitCount) {
            return null
        }
        return availables.map((values) => values.length)
    }

    getProper5KBasedAddOperationType = (digitCount: number) => {
        const addChangeCounts = this.get5KBasedAddChanceCounts(digitCount)
        const subtractChangeCounts = this.getSubtractChanceCountsFor5KBasedAdd(digitCount)
        if (addChangeCounts === null) {
            logReport('operator', 'addChangeCounts === null', 'subtract')
            return 'subtract'
        }
        if (subtractChangeCounts === null) {
            logReport('operator', 'subtractChangeCounts === null', 'add')
            return 'add'
        }
        let addChangeNumber = +addChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')
        let subtractChangeNumber = +subtractChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')


        const history = this.parent.history
        if (history.getLastOperationType() === 'subtract' || history.getOperationCount() < 3) {
            subtractChangeNumber /= 20
            addChangeNumber *= 4
        }
        
        const result = this.random.choice(['add', 'subtract'], [addChangeNumber, subtractChangeNumber])
        logReport('operator', addChangeNumber, subtractChangeNumber, result)
        return result
    }

    getRandom5KBasedSubtractDynamicNumber = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount: number}) => {
        const result: number[] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getRandom5KBasedSubtractValue(index, this._hasBeforePart({index, result, digitCount})))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    get5KBasedSubtractAvailables = (digitCount: number) => {
        const result: number[][] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        const beforeNumbers = []
        for (let [index, digit] of digits.entries()) {
            const hasBeforePart = this._hasBeforePart({index, result: beforeNumbers, digitCount})
            result.push(digit.getAll5KBasedSubtractAvailables(index === 0, hasBeforePart).allAvailables)
            beforeNumbers.push(digit.value)
        }
        return result
    }

    get5KBasedSubtractChanceCounts = (digitCount: number) => {
        const availables = this.get5KBasedSubtractAvailables(digitCount)
        if (availables[0].length === 0 || availables.length < digitCount) {
            return null
        }
        return availables.map((values) => values.length)
    }

    getProper5KBasedAddSubtractOperationType = (digitCount: number) => {
        const addChangeCounts = this.get5KBasedAddChanceCounts(digitCount)
        const subtractChangeCounts = this.get5KBasedSubtractChanceCounts(digitCount)
        if (addChangeCounts === null) {
            logReport('operator', 'addChangeCounts === null', 'subtract')
            return 'subtract'
        }
        if (subtractChangeCounts === null) {
            logReport('operator', 'subtractChangeCounts === null', 'add')
            return 'add'
        }
        let addChangeNumber = +addChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')
        let subtractChangeNumber = +subtractChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')

        if (digitCount === 1 && this.digits.length === 1) {
            addChangeNumber *= 10
        }
        
        const result = this.random.choice(['add', 'subtract'], [addChangeNumber, subtractChangeNumber])
        logReport('operator', addChangeNumber, subtractChangeNumber, result)
        return result
    }

    getMixedBasedAddAvailables = (digitCount: number) => {
        const result: number[][] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getMixedBasedAddAvailables(index === 0))
        }
        return result
    }

    getMixedBasedSubtractAvailables = (digitCount: number) => {
        const result: number[][] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        const beforeNumbers = []
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getMixedBasedSubtractAvailables(index === 0, this._hasBeforePart({index, result: beforeNumbers, digitCount})))
            beforeNumbers.push(digit.value)
        }
        return result
    }
    
    getRandomMixedBasedAddDynamicNumber = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount: number}) => {
        const result: number[] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getRandomMixedBasedAddValue(index))
        }
        const lackCount = this.parent.digitCount - result.length
        for (let i = lackCount-1; i >= 0; i--) {
            result.unshift(new Digit(0, this).getRandomMixedBasedAddValue(i))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    getRandomMixedBasedSubtractDynamicNumber = ({mixedCount, digitCount}: {mixedCount: boolean, digitCount: number}) => {
        const result: number[] = []
        const digits = this.digits.slice(this.digits.length - digitCount)
        for (let [index, digit] of digits.entries()) {
            result.push(digit.getRandomMixedBasedSubtractValue(index, this._hasBeforePart({index, result, digitCount})))
        }
        const slicedResult = this._getRandomSlice({mixedCount: mixedCount, numbers: result})
        return new DynamicNumber(+slicedResult.join(''), this.parent)
    }

    getMixedBasedAddChanceCounts = (digitCount: number) => {
        const availables = this.getMixedBasedAddAvailables(digitCount)
        if (availables[0].length === 0) {
            return null
        }
        return availables.map((values) => values.length)
    }

    getMixedBasedSubtractChanceCounts = (digitCount: number) => {
        const availables = this.getMixedBasedSubtractAvailables(digitCount)
        if (availables[0].length === 0 || availables.length < digitCount) {
            return null
        }
        return availables.map((values) => values.length)
    }

    getProperMixedBasedAddSubtractOperationType = (digitCount: number) => {
        const addChangeCounts = this.getMixedBasedAddChanceCounts(digitCount)
        const subtractChangeCounts = this.getMixedBasedSubtractChanceCounts(digitCount)
        if (addChangeCounts === null) {
            logReport('operator', 'addChangeCounts === null', 'subtract')
            return 'subtract'
        }
        if (subtractChangeCounts === null) {
            logReport('operator', 'subtractChangeCounts === null', 'add')
            return 'add'
        }
        let addChangeNumber = +addChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')
        let subtractChangeNumber = +subtractChangeCounts.map(count => count > 9 ?  '9' : count.toString()).join('')
        subtractChangeNumber *= 2
        const result = this.random.choice(['add', 'subtract'], [addChangeNumber, subtractChangeNumber])
        logReport('operator', addChangeNumber, subtractChangeNumber, result)
        return result
    }
}

export default DynamicNumber