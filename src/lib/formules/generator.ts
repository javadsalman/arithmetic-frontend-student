import Random from "./random";
import OperationHistory from "./history";
import DynamicNumber from "./dynamic-number";
import { logReport } from "./logger";
import { SIMPLE_ADD_SUB, FIVE_ADD, FIVE_ADD_SUB, TEN_ADD, TEN_ADD_SUB, FIVE_K_ADD, FIVE_K_ADD_SUB, MIXED_ADD_SUB } from "./constants";
import { FormuleMode } from "./types";

interface GeneratorProps {
    digitCount: number;
    numberCount: number;
    mixedCount: boolean;
}

interface ModeGeneratorProps extends GeneratorProps {
    mode: FormuleMode;
}


class Generator {
    random: Random;


    digitCount: number;
    history: OperationHistory;
    constructor() {
        this.random = new Random();
        this.digitCount = 3;
        this.history = new OperationHistory()
    }
    generate = ({digitCount, numberCount, mixedCount, mode}: ModeGeneratorProps) => {
        switch (mode) {
            case SIMPLE_ADD_SUB:
                return this.generateSimpleAdd({digitCount, numberCount, mixedCount})
            case FIVE_ADD:
                return this.generate5BasedAdd({digitCount, numberCount, mixedCount})
            case FIVE_ADD_SUB:
                return this.generate5BasedAddSubtract({digitCount, numberCount, mixedCount})
            case TEN_ADD:
                return this.generate10BasedAdd({digitCount, numberCount, mixedCount})
            case TEN_ADD_SUB:
                return this.generate10BasedAddSubtract({digitCount, numberCount, mixedCount})
            case FIVE_K_ADD:
                return this.generate5KBasedAdd({digitCount, numberCount, mixedCount})
            case FIVE_K_ADD_SUB:
                return this.generate5KBasedAddSubtract({digitCount, numberCount, mixedCount})
            case MIXED_ADD_SUB:
                return this.generateMixedBasedAddSubtract({digitCount, numberCount, mixedCount})
            default:
                throw new Error(`Invalid mode: ${mode}`)
        }
    }



    generateSimpleAdd = ({digitCount, numberCount, mixedCount}: GeneratorProps) => {
        this.digitCount = digitCount
        const randomValue = this.random.getRandomInt(10 ** (digitCount - 1), 10 ** digitCount - 1)
        let dnum = new DynamicNumber(randomValue, this)
        const result: number[] = [dnum.value]

        this.history.reset()
        this.history.add(dnum, 'start')

        for (let i=0; i < numberCount-1; i++) {
            const operationType = dnum.getProperSimpleOperationType()
            let newDNum

            if (operationType === 'subtract') {
                newDNum = dnum.getRandomSimpleSubtractDynamicNumber({mixedCount})
                result.push(-1 * newDNum.value)
                dnum.subtract(newDNum)
                this.history.add(newDNum, 'subtract')
            } else {
                newDNum = dnum.getRandomSimpleAddDynamicNumber({mixedCount})
                result.push(newDNum.value)
                dnum.add(newDNum)
                this.history.add(newDNum, 'add')
            }
        }
        return result
    }

    generate5BasedAdd = ({digitCount, numberCount, mixedCount}: GeneratorProps) => {
        this.digitCount = digitCount
        const randomValue = +Array.from({length: digitCount}).map((_, index) => this.random.getRandomInt(index === 0 ? 1 : 0, 4)).join('')
        let dnum = new DynamicNumber(randomValue, this)
        const result: number[] = [dnum.value]
        this.history.reset()
        this.history.add(dnum, 'start')
        for (let i=0; i < numberCount-1; i++) {
            const operationType = dnum.getProper5BasedAddOperationType()
            let newDNum
            if (operationType === 'add') {
                newDNum = dnum.getRandom5BasedAddDynamicNumber({mixedCount})
                result.push(newDNum.value)
                dnum.add(newDNum)
                this.history.add(newDNum, 'add')
            } else {
                newDNum = dnum.getRandomSimpleSubtractDynamicNumberFor5Based({mixedCount})
                result.push(-1 * newDNum.value)
                dnum.subtract(newDNum)
                this.history.add(newDNum, 'subtract')
            }
        }
        return result
    }

    generate5BasedAddSubtract = ({digitCount, numberCount, mixedCount}: GeneratorProps) => {
        this.digitCount = digitCount
        const randomValue = +Array.from({length: digitCount}).map((_, index) => this.random.getRandomInt(index === 0 ? 1 : 0, 4)).join('')
        let dnum = new DynamicNumber(randomValue, this)
        const result: number[] = [dnum.value]
        this.history.reset()
        this.history.add(dnum, 'start')

        for (let i=0; i < numberCount-1; i++) {
            const operationType = dnum.getProper5BasedAddSubtractOperationType({mixedCount, digitCount})
            let newDNum
            if (operationType === 'add') {
                newDNum = dnum.getRandom5BasedAddDynamicNumber({mixedCount})
                result.push(newDNum.value)
                dnum.add(newDNum)
                this.history.add(newDNum, 'add')
            } else {
                newDNum = dnum.getRandom5BasedSubtractDynamicNumber({mixedCount})
                result.push(-1 * newDNum.value)
                dnum.subtract(newDNum)
                this.history.add(newDNum, 'subtract')
            }
            logReport('value', dnum.value)
        }
        return result
    }

    generate10BasedAdd = ({digitCount, numberCount, mixedCount}: GeneratorProps) => {
        this.digitCount = digitCount
        const randomValue = +Array.from({length: digitCount}).map((_, index) => this.random.getRandomInt(index === 0 ? 1 : 0, 9)).join('')
        let dnum = new DynamicNumber(randomValue, this)
        const result: number[] = [dnum.value]
        this.history.reset()
        this.history.add(dnum, 'start')

        for (let i=0; i < numberCount-1; i++) {
            const operationType = dnum.getProper10BasedAddOperationType(digitCount)
            let newDNum
            if (operationType === 'add') {
                newDNum = dnum.getRandom10BasedAddDynamicNumber({mixedCount, digitCount})
                result.push(newDNum.value)
                dnum.add(newDNum)
                this.history.add(newDNum, 'add')
            } else {
                newDNum = dnum.getRandomSubtractDynamicNumberFor10Based({mixedCount, digitCount})
                result.push(-1 * newDNum.value)
                dnum.subtract(newDNum)
                this.history.add(newDNum, 'subtract')
            }
            logReport('value', dnum.value)
        }
        return result
    }

    generate10BasedAddSubtract = ({digitCount, numberCount, mixedCount}: GeneratorProps) => {
        this.digitCount = digitCount
        const randomValue = +Array.from({length: digitCount}).map((_, index) => this.random.getRandomInt(index === 0 ? 1 : 0, 9)).join('')
        let dnum = new DynamicNumber(randomValue, this)
        const result: number[] = [dnum.value]
        this.history.reset()
        this.history.add(dnum, 'start')

        for (let i=0; i < numberCount-1; i++) {
            const operationType = dnum.getProper10BasedAddSubtractOperationType(digitCount)
            let newDNum
            if (operationType === 'add') {
                newDNum = dnum.getRandom10BasedAddDynamicNumber({mixedCount, digitCount})
                result.push(newDNum.value)
                dnum.add(newDNum)
                this.history.add(newDNum, 'add')
            } else {
                newDNum = dnum.getRandom10BasedSubtractDynamicNumber({mixedCount, digitCount})
                result.push(-1 * newDNum.value)
                dnum.subtract(newDNum)
                this.history.add(newDNum, 'subtract')
            }
            logReport('value', dnum.value)
        }
        return result
    }

    generate5KBasedAdd = ({digitCount, numberCount, mixedCount}: GeneratorProps) => {
        this.digitCount = digitCount
        const randomValue = +Array.from({length: digitCount}).map((_, index) => this.random.getRandomInt(index === 0 ? 1 : 0, 8)).join('')
        let dnum = new DynamicNumber(randomValue, this)
        const result: number[] = [dnum.value]
        this.history.reset()
        this.history.add(dnum, 'start')

        for (let i=0; i < numberCount-1; i++) {
            const operationType = dnum.getProper5KBasedAddOperationType(digitCount)
            let newDNum
            if (operationType === 'add') {
                newDNum = dnum.getRandom5KBasedAddDynamicNumber({mixedCount, digitCount})
                result.push(newDNum.value)
                dnum.add(newDNum)
                this.history.add(newDNum, 'add')
            } else {
                newDNum = dnum.getRandomSubtractDynamicNumberFor5KBased({mixedCount, digitCount})
                result.push(-1 * newDNum.value)
                dnum.subtract(newDNum)
                this.history.add(newDNum, 'subtract')
            }
            logReport('value', dnum.value)
        }
        return result
    }

    generate5KBasedAddSubtract = ({digitCount, numberCount, mixedCount}: GeneratorProps) => {
        this.digitCount = digitCount
        const randomValue = +Array.from({length: digitCount}).map((_, index) => this.random.getRandomInt(index === 0 ? 1 : 0, 8)).join('')
        let dnum = new DynamicNumber(randomValue, this)
        const result: number[] = [dnum.value]
        this.history.reset()
        this.history.add(dnum, 'start')

        for (let i=0; i < numberCount-1; i++) {
            const operationType = dnum.getProper5KBasedAddSubtractOperationType(digitCount)
            let newDNum
            if (operationType === 'add') {
                newDNum = dnum.getRandom5KBasedAddDynamicNumber({mixedCount, digitCount})
                result.push(newDNum.value)
                dnum.add(newDNum)
                this.history.add(newDNum, 'add')
            } else {
                newDNum = dnum.getRandom5KBasedSubtractDynamicNumber({mixedCount, digitCount})
                result.push(-1 * newDNum.value)
                dnum.subtract(newDNum)
                this.history.add(newDNum, 'subtract')
            }
            logReport('value', dnum.value)
        }
        return result
    }

    generateMixedBasedAddSubtract = ({digitCount, numberCount, mixedCount}: GeneratorProps) => {
        this.digitCount = digitCount
        const randomValue = +Array.from({length: digitCount}).map((_, index) => this.random.getRandomInt(index === 0 ? 1 : 0, 9)).join('')
        let dnum = new DynamicNumber(randomValue, this)
        const result: number[] = [dnum.value]
        this.history.reset()
        this.history.add(dnum, 'start')

        for (let i=0; i < numberCount-1; i++) {
            const operationType = dnum.getProperMixedBasedAddSubtractOperationType(digitCount)
            let newDNum
            if (operationType === 'add') {
                newDNum = dnum.getRandomMixedBasedAddDynamicNumber({mixedCount, digitCount})
                result.push(newDNum.value)
                dnum.add(newDNum)
                this.history.add(newDNum, 'add')
            } else {
                newDNum = dnum.getRandomMixedBasedSubtractDynamicNumber({mixedCount, digitCount})
                result.push(-1 * newDNum.value)
                dnum.subtract(newDNum)
                this.history.add(newDNum, 'subtract')
            }
            logReport('value', dnum.value)
        }
        return result
    }
}

export default Generator