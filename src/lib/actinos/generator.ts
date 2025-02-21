import Random from "../formules/random";
import { default as FormuleGenerator } from "../formules/generator";
import { CalcItem } from "../../helpers/types";
import { FormuleMode } from "../formules/types";
class Generator {
    random: Random;
    formuleGenerator: FormuleGenerator;
    constructor() {
        this.random = new Random();
        this.formuleGenerator = new FormuleGenerator();
    }

    generateAddSub = ({digitCount, numberCount, mixedCount, formuleMode}: {digitCount: number, numberCount: number, mixedCount: boolean, formuleMode: FormuleMode}): CalcItem[] => {
        const calcItems = this.formuleGenerator.generate({digitCount, numberCount, mixedCount, mode: formuleMode});
        return calcItems.map(item => ({text: item > 0 ? `+${item}` : item.toString(), value: item}));
    }
    generateRandomAdd = ({numberCount}: {numberCount: number}): CalcItem[] => {
        return Array.from({length: numberCount}, () => {
            const value = this.random.getRandomInt(0, 9);
            return {text: '+' + value.toString(), value};
        });
    }
        
    generateCombinedOperations = ({digitCount, mixedCount, formuleMode}: {digitCount: number, mixedCount: boolean, formuleMode: FormuleMode}): CalcItem[] => {
        const [firstValue, secondValue] = this.formuleGenerator.generate({digitCount, numberCount: 2, mixedCount, mode: formuleMode});
        const randomMulValue = this.random.getRandomInt(10**(digitCount-1), 10**digitCount);
        const paranthesis = `(${firstValue}${secondValue > 0 ? "+" : "-"}${Math.abs(secondValue)})`;
        const text = this.random.getRandomInt(0, 1) ? `${paranthesis}·${randomMulValue}` : `${randomMulValue}·${paranthesis}`;
        const value = (firstValue + secondValue) * randomMulValue;
        return [{text, value}];
    }

    generateSquare = ({digitCount}: {digitCount: number}): CalcItem[] => {
        const randomValue = this.random.getRandomInt(10**(digitCount-1), 10**digitCount);
        const text = `${randomValue}²`;
        const value = randomValue ** 2;
        return [{text, value}];
    }

    generateSquareRoot = ({digitCount}: {digitCount: number}): CalcItem[] => {
        const randomValue = this.random.getRandomInt(10**(digitCount-1), 10**digitCount);
        const text = `√${randomValue**2}`;
        return [{text, value: randomValue}];
    }
    generateMassAddSub = ({digitCount}: {digitCount: number}): CalcItem[] => {
        // Function to ensure kg has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');
        
        // Generate random kg values with specified digit count
        const kg1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        const kg2 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        
        // Generate random gram values (0-999)
        const gr1 = this.random.getRandomInt(0, 999);
        const gr2 = this.random.getRandomInt(0, 999);
        
        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);
        
        // Convert everything to grams for calculation
        const totalGrams1 = kg1 * 1000 + gr1;
        const totalGrams2 = kg2 * 1000 + gr2;
        
        // Calculate result
        let resultGrams;
        if (operator === '+') {
            resultGrams = totalGrams1 + totalGrams2;
        } else {
            // For subtraction, check if result would be negative
            if (totalGrams1 < totalGrams2) {
                // Try again if result would be negative
                return this.generateMassAddSub({digitCount});
            }
            resultGrams = totalGrams1 - totalGrams2;
        }
        
        // Format the expression text
        const text = `${formatNumber(kg1)}kg ${gr1}q ${operator} ${formatNumber(kg2)}kg ${gr2}q`;
        return [{
            text,
            value: resultGrams,  // Store total grams as value for easy comparison
        }];
    }
    transformMassValue = (value: number) => {
        const kg = Math.floor(value / 1000);
        const gr = value % 1000;
        return `${kg}kg ${gr}q`;
    }
    transformMassToValue = (kg: number, gr: number) => {
        return kg * 1000 + gr;
    }
    generateMoneyAddSub = ({digitCount}: {digitCount: number}): CalcItem[] => {
        // Function to ensure dollar has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');
        
        // Generate random dollar values with specified digit count
        const dollar1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        const dollar2 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        
        // Generate random cent values (0-99)
        const cent1 = this.random.getRandomInt(0, 99);
        const cent2 = this.random.getRandomInt(0, 99);
        
        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);
        
        // Convert everything to cents for calculation
        const totalCents1 = dollar1 * 100 + cent1;
        const totalCents2 = dollar2 * 100 + cent2;
        
        // Calculate result
        let resultCents;
        if (operator === '+') {
            resultCents = totalCents1 + totalCents2;
        } else {
            // For subtraction, check if result would be negative
            if (totalCents1 < totalCents2) {
                // Try again if result would be negative
                return this.generateMoneyAddSub({digitCount});
            }
            resultCents = totalCents1 - totalCents2;
        }
        
        // Format the expression text
        const text = `${formatNumber(dollar1)} dollar ${cent1} cent ${operator} ${formatNumber(dollar2)} dollar ${cent2} cent`;
        
        return [{
            text,
            value: resultCents  // Store total cents as value for easy comparison
        }];
    }
    transformMoneyValue = (value: number) => {
        const dollar = Math.floor(value / 100);
        const cent = value % 100;
        return `${dollar} dollar ${cent} cent`;
    }
    transformMoneyToValue = (dollar: number, cent: number) => { 
        return dollar * 100 + cent;
    }

    generateTimeAddSub = ({digitCount}: {digitCount: number}): CalcItem[] => {
        // Function to ensure hour has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');
        
        // Generate random hour values with specified digit count
        const hour1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        const hour2 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        
        // Generate random minute values (0-59)
        const minute1 = this.random.getRandomInt(0, 59);
        const minute2 = this.random.getRandomInt(0, 59);
        
        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);
        
        // Convert everything to minutes for calculation
        const totalMinutes1 = hour1 * 60 + minute1;
        const totalMinutes2 = hour2 * 60 + minute2;
        
        // Calculate result
        let resultMinutes;
        if (operator === '+') {
            resultMinutes = totalMinutes1 + totalMinutes2;
        } else {
            // For subtraction, check if result would be negative
            if (totalMinutes1 < totalMinutes2) {
                // Try again if result would be negative
                return this.generateTimeAddSub({digitCount});
            }
            resultMinutes = totalMinutes1 - totalMinutes2;
        }
        
        // Format the expression text
        const text = `${formatNumber(hour1)}h ${minute1}min ${operator} ${formatNumber(hour2)}h ${minute2}min`;
        
        return [{
            text,
            value: resultMinutes  // Store total minutes as value for easy comparison
        }];
    }
    transformTimeValue = (value: number) => {
        const hour = Math.floor(value / 60);
        const minute = value % 60;
        return `${hour}h ${minute}min`;
    }
    transformTimeToValue = (hour: number, minute: number) => {
        return hour * 60 + minute;
    }
    
    generatePharantesisAddSub = ({digitCount}: {digitCount: number}): CalcItem[] => {
        // Generate three random numbers with specified digit count
        const num1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount);
        const num2 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount);
        const num3 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount);

        // Function to ensure number has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');

        // Randomly choose operators (+ or -)
        const operators = ['+', '-'];
        const op1 = this.random.choice(operators);
        const op2 = this.random.choice(operators);

        // Calculate both possible arrangements and choose the non-negative one
        const leftParenthesis = {
            text: `(${formatNumber(num1)} ${op1} ${formatNumber(num2)}) ${op2} ${formatNumber(num3)}`,
            value: op2 === '+' ? 
                eval(`(${num1} ${op1} ${num2}) + ${num3}`) : 
                eval(`(${num1} ${op1} ${num2}) - ${num3}`)
        };

        const rightParenthesis = {
            text: `${formatNumber(num1)} ${op1} (${formatNumber(num2)} ${op2} ${formatNumber(num3)})`,
            value: eval(`${num1} ${op1} (${num2} ${op2} ${num3})`)
        };

        // Choose the arrangement that gives a non-negative result
        let result;
        if (leftParenthesis.value >= 0 && rightParenthesis.value >= 0) {
            result = this.random.choice([leftParenthesis, rightParenthesis]);
        } else if (leftParenthesis.value >= 0) {
            result = leftParenthesis;
        } else if (rightParenthesis.value >= 0) {
            result = rightParenthesis;
        } else {
            // If both are negative, retry with different operators
            return this.generatePharantesisAddSub({digitCount});
        }

        return [result];
    }
    generateEquationAddSub = ({digitCount}: {digitCount: number}): CalcItem[] => {
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
        
        return [{
            text: equationText,
            value: xValue // The value property will hold the value of x
        }];
    }
    generateLengthAddSub = ({digitCount}: {digitCount: number}): CalcItem[] => {
        // Function to ensure meter has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');
        
        // Generate random meter values with specified digit count
        const m1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        const m2 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount - 1);
        
        // Generate random centimeter values (0-99)
        const cm1 = this.random.getRandomInt(0, 99);
        const cm2 = this.random.getRandomInt(0, 99);
        
        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);
        
        // Convert everything to centimeters for calculation
        const totalCm1 = m1 * 100 + cm1;
        const totalCm2 = m2 * 100 + cm2;
        
        // Calculate result
        let resultCm;
        if (operator === '+') {
            resultCm = totalCm1 + totalCm2;
        } else {
            // For subtraction, check if result would be negative
            if (totalCm1 < totalCm2) {
                // Try again if result would be negative
                return this.generateLengthAddSub({digitCount});
            }
            resultCm = totalCm1 - totalCm2;
        }
        
        // Format the expression text
        const text = `${formatNumber(m1)}m ${cm1}cm ${operator} ${formatNumber(m2)}m ${cm2}cm`;
        
        return [{
            text,
            value: resultCm  // Store total centimeters as value for easy comparison
        }];
    }
    transformLengthValue = (value: number) => {
        const m = Math.floor(value / 100);
        const cm = value % 100;
        return `${m}m ${cm}cm`;
    }
    transformLengthToValue = (m: number, cm: number) => {
        return m * 100 + cm;
    }
    generatePercentAddSub = ({digitCount}: {digitCount: number}): CalcItem[] => {
        // Function to ensure number has exact digit count
        const formatNumber = (num: number) => num.toString().padStart(digitCount, '0');

        // Generate random numbers with specified digit count
        const num1 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount);
        const num2 = this.random.getRandomInt(10**(digitCount-1), 10**digitCount);
        
        // Randomly choose operator (+ or -)
        const operator = this.random.choice(['+', '-']);
        
        // Calculate the result inside parentheses
        const parenthesisResult = operator === '+' ? num1 + num2 : num1 - num2;
        
        // Only proceed if parenthesis result is positive
        if (parenthesisResult < 0) {
            return this.generatePercentAddSub({digitCount}); // Try again if negative
        }

        // Find factors of parenthesisResult that would give whole numbers when calculating percentage
        const possiblePercentages = [];
        for (let i = 1; i <= 99; i++) {
            if ((parenthesisResult * i) % 100 === 0) {
                possiblePercentages.push(i);
            }
        }

        // If no valid percentages found, try again with different numbers
        if (possiblePercentages.length === 0) {
            return this.generatePercentAddSub({digitCount});
        }

        // Choose a random percentage from valid options
        const percentage = this.random.choice(possiblePercentages);
        
        // Calculate final result (guaranteed to be whole number)
        const value = (parenthesisResult * percentage) / 100;
        
        // Format the expression text
        const text = `(${formatNumber(num1)} ${operator} ${formatNumber(num2)}) ${percentage}%`;
        
        return [{
            text,
            value
        }];
    }
    generateMultiply = ({firstDigitCount, secondDigitCount}: {firstDigitCount: number, secondDigitCount: number}): CalcItem[] => {
        const num1 = this.random.getRandomInt(10**(firstDigitCount-1), 10**firstDigitCount);
        const num2 = this.random.getRandomInt(10**(secondDigitCount-1), 10**secondDigitCount);
        const text = `${num1}·${num2}`;
        const value = num1 * num2;
        return [{text, value}];
    }
    generateDivision = ({firstDigitCount, secondDigitCount}: {firstDigitCount: number, secondDigitCount: number}): CalcItem[] => {
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
        
        // // If no valid multiplier exists, try again
        // if (minMultiplier > maxMultiplier) {
        //     return this.generateDivision({firstDigitCount, secondDigitCount});
        // }
        
        // Choose a random multiplier from the valid range
        const multiplier = this.random.getRandomInt(minMultiplier, maxMultiplier);
        
        // Calculate the dividend (first number)
        const dividend = divisor * multiplier;
        
        const text = `${dividend} : ${divisor}`;
        const value = multiplier;
        
        return [{text, value}];
    }
}

export default Generator;
