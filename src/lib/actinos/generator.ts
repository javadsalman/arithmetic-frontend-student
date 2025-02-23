import Random from "../formules/random";
import { default as FormuleGenerator } from "../formules/generator";
import { CalcItem } from "../../helpers/types";
import { FormuleMode } from "../formules/types";

class Generator {
    random: Random;
    formuleGenerator: FormuleGenerator;
    num1: number;
    num2: number;
    constructor() {
        this.random = new Random();
        this.formuleGenerator = new FormuleGenerator();
        this.num1 = 0;
        this.num2 = 0;
    }

    
    // Helper function to ensure a number has the correct digit count
    _ensureDigitCount = (num: number, digitCount: number): number => {
        if (num < 10**(digitCount-1)) return 10**(digitCount-1);
        if (num >= 10**digitCount) return 10**digitCount - 1;
        return num;
    };

    generateAddSub = ({digitCount, numberCount, mixedCount, formuleMode}: {digitCount: number, numberCount: number, mixedCount: boolean, formuleMode: FormuleMode}): [CalcItem[], number] => {
        const calcItems = this.formuleGenerator.generate({digitCount, numberCount, mixedCount, mode: formuleMode});
        const correctAnswer = calcItems.reduce((acc, item) => acc + item, 0);
        const calcItemsWithText = calcItems.map(item => ({text: item > 0 ? `+${item}` : item.toString(), value: item}));
        return [calcItemsWithText, correctAnswer];
    }
    generateRandomAdd = ({numberCount}: {numberCount: number}): [CalcItem[], number] => {
        const calcItems = Array.from({length: numberCount}, () => {
            const value = this.random.getRandomInt(0, 9);
            return {text: '+' + value.toString(), value};
        });
        const correctAnswer = calcItems.reduce((acc, item) => acc + item.value, 0);
        return [calcItems, correctAnswer];
    }
        
    generateCombinedOperations = ({digitCount, mixedCount, formuleMode}: {digitCount: number, mixedCount: boolean, formuleMode: FormuleMode}): [CalcItem[], number] => {
        const [firstValue, secondValue] = this.formuleGenerator.generate({digitCount, numberCount: 2, mixedCount, mode: formuleMode});
        const randomMulValue = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);
        const paranthesis = `(${firstValue}${secondValue > 0 ? "+" : "-"}${Math.abs(secondValue)})`;
        const text = this.random.getRandomInt(0, 1) ? `${paranthesis}·${randomMulValue}` : `${randomMulValue}·${paranthesis}`;
        const value = (firstValue + secondValue) * randomMulValue;
        const calcItem = {text, value};
        return [[calcItem], value];
    }

    generateSquare = ({digitCount}: {digitCount: number}): [[CalcItem], number] => {
        const randomValue = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);
        const text = `${randomValue}²`;
        const value = randomValue ** 2;
        const calcItem = {text, value};
        return [[calcItem], value];
    }

    generateSquareRoot = ({digitCount}: {digitCount: number}): [[CalcItem], number] => {
        const randomValue = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);
        const text = `√${randomValue**2}`;
        const calcItem = {text, value: randomValue};
        return [[calcItem], randomValue];
    }
    generateMassAddSub = ({digitCount, firstUnit='kq', secondUnit='q'}: {digitCount: number, firstUnit?: string, secondUnit?: string}): [[CalcItem], number, number] => {
        // Function to ensure kg has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');

        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);

        const grDigitCount = digitCount + 3;
        const totalGrams1 = this.random.getRandomInt(10**(grDigitCount-1), 10**grDigitCount - 1);
        const totalGrams2 = this.random.getRandomInt(10**(grDigitCount-1), operator === '+' ? 10**grDigitCount - 1 : totalGrams1);
        
        const kg1 = Math.floor(totalGrams1 / 1000);
        const kg2 = Math.floor(totalGrams2 / 1000);
        const gr1 = totalGrams1 % 1000;
        const gr2 = totalGrams2 % 1000;

        
        // Calculate result
        let resultGrams;
        if (operator === '+') {
            resultGrams = totalGrams1 + totalGrams2;
        } else {
            resultGrams = totalGrams1 - totalGrams2;
        }
        
        // Format the expression text
        const text = `${formatNumber(kg1)}${firstUnit} ${gr1}${secondUnit} ${operator} ${formatNumber(kg2)}${firstUnit} ${gr2}${secondUnit}`;
        const calcItem = {text, value: resultGrams};
        const correctKg = Math.floor(resultGrams / 1000);
        const correctGr = resultGrams % 1000;
        return [[calcItem], correctKg, correctGr];
    }

    generateMoneyAddSub = ({digitCount, firstUnit='manat', secondUnit='qəpik'}: {digitCount: number, firstUnit?: string, secondUnit?: string}): [[CalcItem], number, number] => {
        // Function to ensure dollar has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');
        
        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);

        const centDigitCount = digitCount + 2;
        const totalCents1 = this.random.getRandomInt(10**(centDigitCount-1), 10**centDigitCount - 1);
        const totalCents2 = this.random.getRandomInt(10**(centDigitCount-1), operator === '+' ? 10**centDigitCount - 1 : totalCents1);
        
        // Convert everything to cents for calculation
        const dollar1 = Math.floor(totalCents1 / 100);
        const cent1 = totalCents1 % 100;
        const dollar2 = Math.floor(totalCents2 / 100);
        const cent2 = totalCents2 % 100;
        
        // Calculate result
        const resultCents = operator === '+' ? totalCents1 + totalCents2 : totalCents1 - totalCents2;
        
        // Format the expression text
        const text = `${formatNumber(dollar1)}${firstUnit} ${cent1}${secondUnit} ${operator} ${formatNumber(dollar2)}${firstUnit} ${cent2}${secondUnit}`;
        const calcItem = {text, value: resultCents};
        const correctDollar = Math.floor(resultCents / 100);
        const correctCent = resultCents % 100;
        return [[calcItem], correctDollar, correctCent];
    }


    generateTimeAddSub = ({digitCount, firstUnit='saat', secondUnit='dəq'}: {digitCount: number, firstUnit?: string, secondUnit?: string}): [[CalcItem], number, number] => {
        // Function to ensure hour has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');
        
        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);


        const hours1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        const minutes1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        const totalMinutes1 = hours1 * 60 + minutes1;
        
        const hours2 = this.random.getRandomInt(10**(digitCount-1), operator === '+' ? 10**digitCount - 1 : hours1);
        const minutes2 = this.random.getRandomInt(10**(digitCount-1), operator === '+' || hours1 > hours2 ? 10**digitCount - 1 : minutes1);
        const totalMinutes2 = hours2 * 60 + minutes2;
        
        // Convert everything to minutes for calculation
        const hour1 = Math.floor(totalMinutes1 / 60);
        const minute1 = totalMinutes1 % 60;
        const hour2 = Math.floor(totalMinutes2 / 60);
        const minute2 = totalMinutes2 % 60;
        
        // Calculate result
        const resultMinutes = operator === '+' ? totalMinutes1 + totalMinutes2 : totalMinutes1 - totalMinutes2;
        
        // Format the expression text
        const text = `${formatNumber(hour1)}${firstUnit} ${minute1}${secondUnit} ${operator} ${formatNumber(hour2)}${firstUnit} ${minute2}${secondUnit}`;
        const calcItem = {text, value: resultMinutes};
        const correctHour = Math.floor(resultMinutes / 60);
        const correctMinute = resultMinutes % 60;
        return [[calcItem], correctHour, correctMinute];
    }
    
    generatePharantesisAddSub = ({digitCount}: {digitCount: number}): [[CalcItem], number] => {
        // Function to ensure number has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');


        // Helper function to calculate result for a given arrangement
        const calculateArrangement = (n1: number, n2: number, n3: number, op1: string, op2: string, isLeftParenthesis: boolean) => {
            let innerResult;
            // For subtraction inside parenthesis, ensure first number is larger
            if (op1 === '-') {
                if (isLeftParenthesis || (!isLeftParenthesis && op2 === '+')) {
                    if (n1 < n2) return null; // Skip if would result in negative
                }
                innerResult = n1 - n2;
            } else {
                innerResult = n1 + n2;
            }

            let finalResult;
            if (isLeftParenthesis) {
                finalResult = op2 === '+' ? innerResult + n3 : innerResult - n3;
            } else {
                let rightParenResult;
                // For subtraction inside right parenthesis, ensure first number is larger
                if (op2 === '-') {
                    if (n2 < n3) return null; // Skip if would result in negative
                    rightParenResult = n2 - n3;
                } else {
                    rightParenResult = n2 + n3;
                }
                finalResult = op1 === '+' ? n1 + rightParenResult : n1 - rightParenResult;
            }
            return finalResult;
        };

        // Try to find valid numbers and operators
        let validArrangements = [];
        let attempts = 0;
        const maxAttempts = 10;

        while (validArrangements.length < 4 && attempts < maxAttempts) {
            attempts++;
            
            // Generate three numbers with specified digit count
            const num1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);
            const num2 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);
            const num3 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);

            // Try different operator combinations
            const operators = ['+', '-'];
            for (const op1 of operators) {
                for (const op2 of operators) {
                    // Try both parenthesis arrangements
                    const leftResult = calculateArrangement(num1, num2, num3, op1, op2, true);
                    if (leftResult !== null && leftResult >= 10**(digitCount-1) && leftResult < 10**digitCount) {
                        validArrangements.push({
                            nums: [num1, num2, num3],
                            ops: [op1, op2],
                            isLeft: true,
                            result: leftResult
                        });
                    }

                    const rightResult = calculateArrangement(num1, num2, num3, op1, op2, false);
                    if (rightResult !== null && rightResult >= 10**(digitCount-1) && rightResult < 10**digitCount) {
                        validArrangements.push({
                            nums: [num1, num2, num3],
                            ops: [op1, op2],
                            isLeft: false,
                            result: rightResult
                        });
                    }
                }
            }
        }

        let validArrangement;
        
        if (validArrangements.length > 0) {
            // Filter arrangements to get a balanced mix
            const rightArrangements = validArrangements.filter(arr => !arr.isLeft);
            const subtractionArrangements = validArrangements.filter(arr => arr.ops[0] === '-' || arr.ops[1] === '-');
            
            // Prioritize balancing the arrangements
            if (rightArrangements.length > 0 && this.random.getRandomInt(0, 1) === 0) {
                // 50% chance to choose right parenthesis if available
                validArrangement = this.random.choice(rightArrangements);
            } else if (subtractionArrangements.length > 0 && this.random.getRandomInt(0, 1) === 0) {
                // 50% chance to choose subtraction if available
                validArrangement = this.random.choice(subtractionArrangements);
            } else {
                // Otherwise choose randomly from all valid arrangements
                validArrangement = this.random.choice(validArrangements);
            }
        }

        // If no valid arrangement found, use a fallback that guarantees correct digit count
        if (!validArrangement) {
            // Randomly choose between left and right parenthesis for fallback
            const isLeft = this.random.getRandomInt(0, 1) === 0;
            if (isLeft) {
                validArrangement = {
                    nums: [this._ensureDigitCount(8, digitCount), this._ensureDigitCount(3, digitCount), this._ensureDigitCount(2, digitCount)],
                    ops: ['-', '+'],
                    isLeft: true,
                    result: this._ensureDigitCount(7, digitCount)
                };
            } else {
                validArrangement = {
                    nums: [this._ensureDigitCount(8, digitCount), this._ensureDigitCount(5, digitCount), this._ensureDigitCount(2, digitCount)],
                    ops: ['+', '-'],
                    isLeft: false,
                    result: this._ensureDigitCount(5, digitCount)
                };
            }
        }

        // Format the expression text based on the arrangement
        const [n1, n2, n3] = validArrangement.nums.map(formatNumber);
        const [op1, op2] = validArrangement.ops;
        const text = validArrangement.isLeft ?
            `(${n1} ${op1} ${n2}) ${op2} ${n3}` :
            `${n1} ${op1} (${n2} ${op2} ${n3})`;

        const calcItem = {text, value: validArrangement.result};
        return [[calcItem], validArrangement.result];
    }
    generateEquationAddSub = ({digitCount}: {digitCount: number}): [[CalcItem], number] => {
        // Function to ensure number has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');

        // Generate random numbers with specified digit count
        const num1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        let xValue = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        
        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);
        
        // Calculate the result based on the operator
        let result;
        if (operator === '+') {
            result = num1 + xValue;
        } else {
            // For subtraction, ensure the result is non-negative
            if (num1 < xValue) {
                // Generate new xValue that's smaller than num1 but still has correct digit count
                xValue = this.random.getRandomInt(10**(digitCount-1), Math.min(num1, 10**digitCount - 1));
            }
            result = num1 - xValue;
        }

        // Format the equation text, only padding the operands, not the result
        const equationText = `${formatNumber(num1)} ${operator} x = ${result}`;
        
        const calcItem = {text: equationText, value: xValue};
        return [[calcItem], xValue];
    }
    generateLengthAddSub = ({digitCount, firstUnit='m', secondUnit='sm'}: {digitCount: number, firstUnit?: string, secondUnit?: string }): [[CalcItem], number, number] => {
        // Function to ensure meter has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');

        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);
        
        const cmDigitCount = digitCount + 2;
        const totalCm1 = this.random.getRandomInt(10**(cmDigitCount-1), 10**cmDigitCount - 1);
        const totalCm2 = this.random.getRandomInt(10**(cmDigitCount-1), operator === '+' ? 10**cmDigitCount - 1 : totalCm1);
        
        const m1 = Math.floor(totalCm1 / 100);
        const m2 = Math.floor(totalCm2 / 100);
        const cm1 = totalCm1 % 100;
        const cm2 = totalCm2 % 100;
        

        // Calculate result
        const resultCm = operator === '+' ? totalCm1 + totalCm2 : totalCm1 - totalCm2;
        
        // Format the expression text
        const text = `${formatNumber(m1)} ${firstUnit} ${cm1} ${secondUnit} ${operator} ${formatNumber(m2)} ${firstUnit} ${cm2} ${secondUnit}`;
        
        const calcItem = {text, value: resultCm};
        const correctM = Math.floor(resultCm / 100);
        const correctCm = resultCm % 100;
        return [[calcItem], correctM, correctCm];
    }
    generateRemainderDivision = ({firstDigitCount, secondDigitCount}: {firstDigitCount: number, secondDigitCount: number}): [[CalcItem], number, number] => {
        this.num1 = this.random.getRandomInt(10**(firstDigitCount-1), 10**firstDigitCount-1);
        // const maxNum2Value = 10**secondDigitCount - 1 < this.num1 ? 10**secondDigitCount - 1 : this.num1;
        this.num2 = this.random.getRandomInt(10**(secondDigitCount-1), secondDigitCount < firstDigitCount ? 10**secondDigitCount - 1 : this.num1);
        const text = `${this.num1} : ${this.num2}`;
        const value = this.num1 / this.num2;
        const calcItem = {text, value};
        const correctResult = Math.floor(this.num1 / this.num2);
        const correctRemainder = this.num1 % this.num2;
        return [[calcItem], correctResult, correctRemainder];
    }
    generatePercentAddSub = ({digitCount}: {digitCount: number}): [[CalcItem], number] => {
        // Function to ensure number has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');


        // Generate two numbers that will be inside parentheses
        const operator = this.random.choice(['+', '-']);
        let num1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);
        let num2 = this.random.getRandomInt(10**(digitCount-1), operator === '+' ? 10**digitCount-1 : num1);

        // Calculate the value inside parentheses
        let parenthesisValue = operator === '+' ? num1 + num2 : num1 - num2;

        // Find all percentages between 1 and 99 that would give a natural number result
        let validPercentages = [];
        for (let p = 1; p <= 99; p++) {
            const result = (parenthesisValue * p) / 100;
            // Only include percentages that give natural numbers and maintain digit count
            if (Number.isInteger(result) && 
                result >= 10**(digitCount-1) && 
                result < 10**digitCount) {
                validPercentages.push(p);
            }
        }

        // If no valid percentages found, adjust numbers to ensure at least one valid percentage
        if (validPercentages.length === 0) {
            // Try different combinations until we find valid percentages
            for (let attempt = 0; attempt < 10; attempt++) {
                num1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);
                const maxNum2 = operator === '+' ? 
                    10**digitCount - 1 - num1 : // Ensure sum doesn't exceed digit count
                    num1 - 10**(digitCount-1);  // Ensure difference maintains digit count
                
                num2 = this.random.getRandomInt(10**(digitCount-1), maxNum2);
                parenthesisValue = operator === '+' ? num1 + num2 : num1 - num2;

                // Check all possible percentages
                for (let p = 1; p <= 99; p++) {
                    const result = (parenthesisValue * p) / 100;
                    if (Number.isInteger(result) && 
                        result >= 10**(digitCount-1) && 
                        result < 10**digitCount) {
                        validPercentages.push(p);
                    }
                }
                
                if (validPercentages.length > 0) break;
            }

            // If still no valid percentages, use a fallback approach
            if (validPercentages.length === 0) {
                // Use 50% as fallback with adjusted numbers
                num1 = this._ensureDigitCount(200, digitCount);
                num2 = operator === '+' ? 0 : this._ensureDigitCount(100, digitCount);
                parenthesisValue = operator === '+' ? num1 + num2 : num1 - num2;
                validPercentages = [50];
            }
        }

        // Choose a random percentage from valid options
        const percentage = this.random.choice(validPercentages);
        
        // Calculate the final result
        const result = Math.floor((parenthesisValue * percentage) / 100);
        
        // Format the expression text
        const text = `(${formatNumber(num1)} ${operator} ${formatNumber(num2)}) ${percentage}%`;
        
        const calcItem = {text, value: result};
        return [[calcItem], result];
    }
    generateMultiply = ({firstDigitCount, secondDigitCount}: {firstDigitCount: number, secondDigitCount: number}): [[CalcItem], number] => {
        const num1 = this.random.getRandomInt(10**(firstDigitCount-1), 10**firstDigitCount-1);
        const num2 = this.random.getRandomInt(10**(secondDigitCount-1), 10**secondDigitCount-1);
        const text = `${num1}×${num2}`;
        const value = num1 * num2;
        const calcItem = {text, value};
        return [[calcItem], value];
    }
    generateDivision = ({firstDigitCount, secondDigitCount}: {firstDigitCount: number, secondDigitCount: number}): [[CalcItem], number] => {
        // Generate the divisor (second number) with secondDigitCount digits
        let divisor;
        if (firstDigitCount === secondDigitCount) {
            divisor = this.random.getRandomInt(10**(firstDigitCount-1), Math.floor(10**firstDigitCount - 1)/2);
        } else {
            divisor = this.random.getRandomInt(10**(secondDigitCount-1), 10**secondDigitCount - 1);
        }
        
        // Calculate the range of multipliers that would give firstDigitCount digits when multiplied with divisor
        const minMultiplier = Math.ceil(10**(firstDigitCount-1) / divisor);  // Smallest number that gives firstDigitCount digits
        const maxMultiplier = Math.floor((10**firstDigitCount - 1) / divisor);  // Largest number that gives firstDigitCount digits
        
        // Choose a random multiplier from the valid range
        const multiplier = this.random.getRandomInt(minMultiplier, maxMultiplier);
        
        // Calculate the dividend (first number)
        const dividend = divisor * multiplier;
        
        const text = `${dividend} : ${divisor}`;
        const value = multiplier;
        
        const calcItem = {text, value};
        return [[calcItem], value];
    }
}

export default Generator;
