import DynamicNumber from "./dynamic-number";
import { OperationType } from "./types";

type HistoryOperationType = OperationType | 'start'
class OperationHistory {
    history: {dnum: DynamicNumber, operationType: HistoryOperationType}[]
    constructor() {
        this.history = []
    }
    reset = () => {
        this.history = []
    }
    add = (dnum: DynamicNumber, operationType: HistoryOperationType) => {
        this.history.push({dnum, operationType})
    }
    getLast = () => {
        return this.history[this.history.length - 1]
    }

    getLastCertainDigitWithOperationType = (order: number) => {
        const lastHistory = this.getLast()
        if (!lastHistory) {
            return {digit: null, operationType: null}
        }
        const digit = lastHistory.dnum.digits[order]
        const operationType = lastHistory.operationType
        return {digit, operationType}
    }
    getLastCertainDigitValueWithOperationType = (order: number) => {
        const lastCertainDigit = this.getLastCertainDigitWithOperationType(order)
        if (!lastCertainDigit.digit) {
            return {value: null, operationType: null}
        }
        return {value: lastCertainDigit.digit.value, operationType: lastCertainDigit.operationType}
    }
    getLastOperationType = () => {
        const lastHistory = this.getLast()
        if (!lastHistory) {
            return null
        }
        return lastHistory.operationType
    }
    getOperationCount = () => {
        return this.history.length
    }
    getBeforeDnums = () => {
        return this.history.map(history => history.dnum)
    }
}

export default OperationHistory