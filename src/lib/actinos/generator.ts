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
        const formatNumber = (num: number) => this._ensureDigitCount(num, digitCount);
        

        
        // Randomly decide whether parentheses will be on left or right
        const parenthesesOnLeft = this.random.getRandomInt(0, 1) === 1;
        
        // Randomly choose operators (+ or -) for inside and outside parentheses
        const innerOperator = this.random.choice(['+', '-']);

        // Generate three random numbers with the specified digit count
        const ranNum1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        const ranNum2 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        const [num1, num2] = [ranNum1, ranNum2].sort((a, b) => b - a);
        const num3 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        
        // Calculate the inner value and ensure it's not negative
        let innerValue: number;
        let innerExpression: string;
        
        if (innerOperator === '+') {
            innerValue = num1 + num2;
            innerExpression = `${formatNumber(num1)} + ${formatNumber(num2)}`;
        } else {
            innerValue = num1 - num2;
            innerExpression = `${formatNumber(num1)} - ${formatNumber(num2)}`;
        }

        // const outerOperator = parenthesesOnLeft ? this.random.choice(['+', '-']) : '+';
        let outerOperator;
        if (parenthesesOnLeft) {
            if (innerValue < num3) {
                outerOperator = '+';
            } else {
                outerOperator = this.random.choice(['+', '-']);
            }
        } else {
            outerOperator = '+';
        }

        
        // Calculate the final value and ensure it's not negative
        let finalValue: number;
        let expression: string;
        
        if (parenthesesOnLeft) {
            // Format: (num1 op num2) op num3
            if (outerOperator === '+') {
                finalValue = innerValue + num3;
                expression = `(${innerExpression}) + ${formatNumber(num3)}`;
            } else {
                // For subtraction, ensure the left side is larger to avoid negative results
                finalValue = innerValue - num3;
                expression = `(${innerExpression}) - ${formatNumber(num3)}`;
            }
        } else {
            // Format: num3 op (num1 op num2)
            finalValue = num3 + innerValue;
            expression = `${formatNumber(num3)} + (${innerExpression})`;
            
        }

        const calcItem = {text: expression, value: finalValue};
        return [[calcItem], finalValue];
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
        // const maxNum2Value = 10**secondDigitCount - 1 < this.num1 ? 10**secondDigitCount - 1 : this.num1;
        let mod = null
        while (!mod) {
            this.num1 = this.random.getRandomInt(10**(firstDigitCount-1), 10**firstDigitCount-1);
            this.num2 = this.random.getRandomInt(10**(secondDigitCount-1), secondDigitCount < firstDigitCount ? 10**secondDigitCount - 1 : this.num1);
            mod = this.num1 % this.num2
        }
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

        // Generate two numbers
        const operator = this.random.choice(['+', '-']);
        let num1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);
        
        // Find all percentages between 1 and 99 that could give valid results
        let validOptions = [];
        
        // Try different num2 and percentage combinations
        for (let attempt = 0; attempt < 15; attempt++) {
            let num2 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount-1);
            
            for (let p = 1; p <= 99; p++) {
                // Calculate percentage of num2
                const percentValue = Math.floor((num2 * p) / 100);
                
                // Skip if the percentage isn't a whole number
                if (percentValue * 100 !== num2 * p) continue;
                
                // Calculate final result based on operator
                const result = operator === '+' ? 
                    num1 + percentValue : 
                    num1 - percentValue;
                
                // Check if the result maintains proper digit count
                if (Number.isInteger(result) && 
                    result >= 10**(digitCount-1) && 
                    result < 10**digitCount) {
                    validOptions.push({num1, num2, percentage: p, result});
                }
            }
            
            if (validOptions.length > 0) break;
        }

        // If no valid options found, use a fallback approach
        if (validOptions.length === 0) {
            num1 = this._ensureDigitCount(500, digitCount);
            const num2 = this._ensureDigitCount(200, digitCount);
            const percentage = 50;  // 50% of 200 = 100
            const percentValue = (num2 * percentage) / 100;
            const result = operator === '+' ? num1 + percentValue : num1 - percentValue;
            validOptions = [{num1, num2, percentage, result}];
        }

        // Choose a random option from valid options
        const chosenOption = this.random.choice(validOptions);
        
        // Format the expression text
        const text = `${formatNumber(chosenOption.num1)} ${operator} ${formatNumber(chosenOption.num2)}%${chosenOption.percentage}`;
        
        const calcItem = {text, value: chosenOption.result};
        return [[calcItem], chosenOption.result];
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
