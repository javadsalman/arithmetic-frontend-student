import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useGameStore } from './gameStore';
import { immer } from 'zustand/middleware/immer';
import { FormuleMode } from '../lib/formules/types';
import { FREE_WORK_ACTION, FREE_WORK_FLIPPED_ACTION, RANDOM_NUMBERS_ACTION, RANDOM_NUMBERS_ROTATED_ACTION, COMBINED_OPERATIONS_ACTION, ANIMAL_SOUNDS_ACTION, INSTRUMENT_SOUNDS_ACTION, DOUBLE_CALCULATION_ACTION, DOUBLE_CALCULATION_FLIPPED_ACTION, SQUARE_ROOT_ACTION, SQUARE_ACTION, PARENTHESES_ACTION, EQUATION_ACTION, PERCENTAGE_ACTION, SIMPLE_MULTIPLICATION_ACTION, SIMPLE_DIVISION_ACTION, MASS_ACTION, MONEY_ACTION, TIME_ACTION, LENGTH_ACTION, REMAINDER_DIVISION_ACTION, ACTIONS_FEATURES } from '../pages/actions/constants';
import { content as langContent } from '../pages/actions/Lang';
import { useLanguageStore } from './languageStore';
import FormuleGenerator from '../lib/formules/generator';
import ActionGenerator from '../lib/actinos/generator';
import { CalcItem } from '../helpers/types';
import { ActionMode } from '../pages/actions/types';
import { MIXED_ADD_SUB } from '../lib/formules/constants';

export interface Round {
    calcItems: CalcItem[];
    secondCalcItems: CalcItem[]|null;
    userAnswer: number|null;
    secondUserAnswer: number|null;
    correctAnswer: number;
    secondCorrectAnswer: number|null;
    finished: boolean;
    isCorrect: boolean;
}

const formuleGenerator = new FormuleGenerator();
const actionGenerator = new ActionGenerator();

export type HeightSize = "xs" | "sm" | "md" | "lg" | "xl";

interface GameplayState {
    rounds: Round[];
    currentUserAnswer: string;
    secondUserAnswer: string;
    screen: "enterance" | "game" | "input" | "result" | "end";
    heightSize: HeightSize;
    timestamp: number;
    setCurrentUserAnswer: (answer: string) => void;
    setSecondUserAnswer: (answer: string) => void;
    getCurrentRound: () => Round|undefined;
    addRound: (round: Round) => void;
    answerCurrentRound: () => void;
    getCurrentCalcItems: () => CalcItem[];
    getCurrentSecondCalcItems: () => CalcItem[] | null;
    clearRounds: () => void;
    setScreen: (screen: "enterance" | "game" | "input" | "result" | "end") => void;
    setHeightSize: (size: HeightSize) => void;
    setTimestamp: (timestamp: number) => void;
}

export const useGameplayStore = create<GameplayState>()(
    persist(
        immer((set, get) => ({
            rounds: [],
            currentUserAnswer: "",
            secondUserAnswer: "",
            screen: "enterance",
            heightSize: 'md',
            timestamp: 0,
            setCurrentUserAnswer: (answer: string) => set(state => {
                state.currentUserAnswer = answer;
            }),
            setSecondUserAnswer: (answer: string) => set(state => {
                state.secondUserAnswer = answer;
            }),
            getCurrentRound: () => get().rounds?.[get().rounds.length-1],
            addRound: (round: Round) => set(state => {
                state.rounds.push(round);
            }),
            answerCurrentRound: () => set(state => {
                const currentRound = state.rounds[state.rounds.length-1];
                if (currentRound) {
                    currentRound.userAnswer = state.currentUserAnswer ? +state.currentUserAnswer : null;
                    currentRound.secondUserAnswer = state.secondUserAnswer ? +state.secondUserAnswer : null;
                    currentRound.finished = true;
                    currentRound.isCorrect = currentRound.userAnswer === currentRound.correctAnswer && currentRound.secondUserAnswer === currentRound.secondCorrectAnswer;
                }

            }),
            getCurrentCalcItems: () => get().rounds?.[get().rounds.length-1]?.calcItems || [],
            getCurrentSecondCalcItems: () => get().rounds?.[get().rounds.length-1]?.secondCalcItems || null,
            clearRounds: () => set(state => {
                state.rounds = [];
            }),
            setScreen: (screen: "enterance" | "game" | "input" | "result" | "end") => set(state => {
                state.screen = screen;
            }),
            setHeightSize: (size: HeightSize) => set(state => {
                state.heightSize = size;
            }),
            setTimestamp: (timestamp: number) => set(state => {
                state.timestamp = timestamp;
            }),
        })),
        {name: "gameplay"}
    )

)

export const createFormuleRound = () => {
    const { digitCount, numberCount, isMixedDigits, gameMode } = useGameStore.getState();
    const { addRound, getCurrentRound } = useGameplayStore.getState();
    const currentRound = getCurrentRound();
    if (currentRound && !currentRound.finished) {
        return;
    }
    const calcValues: number[] = formuleGenerator.generate({digitCount, numberCount, mixedCount: isMixedDigits, mode: gameMode as FormuleMode});
    const calcItems = calcValues.map(value => ({text: value > 0 ? `+${value}` : value.toString(), value}));

    const correctAnswer = calcItems.reduce((acc, item) => acc + item.value, 0);
    const newRound: Round = {calcItems, userAnswer: null, correctAnswer, secondCalcItems: null, secondUserAnswer: null, secondCorrectAnswer: null, finished: false, isCorrect: false};
    addRound(newRound);
}

export const createActionRound = () => {
    const { digitCount, numberCount, isMixedDigits, gameMode, secondDigitCount } = useGameStore.getState();
    const { addRound, getCurrentRound } = useGameplayStore.getState();
    const { language } = useLanguageStore.getState();
    const currentRound = getCurrentRound();
    if (currentRound && !currentRound.finished) {
        return;
    }
    let calcItems: CalcItem[] = [];
    let correctAnswer: number = NaN;
    let secondCorrectAnswer: number|null = null;
    let secondCalcItems: CalcItem[] = [];
    if ([FREE_WORK_ACTION, FREE_WORK_FLIPPED_ACTION, RANDOM_NUMBERS_ACTION, RANDOM_NUMBERS_ROTATED_ACTION].includes(gameMode as ActionMode)) {
        [calcItems, correctAnswer] = actionGenerator.generateAddSub({digitCount, numberCount, mixedCount: isMixedDigits, formuleMode: MIXED_ADD_SUB});
    } else if ([ANIMAL_SOUNDS_ACTION, INSTRUMENT_SOUNDS_ACTION].includes(gameMode as ActionMode)) {
        [calcItems, correctAnswer] = actionGenerator.generateRandomAdd({numberCount});
    } else if (gameMode === COMBINED_OPERATIONS_ACTION) {
        [calcItems, correctAnswer] = actionGenerator.generateCombinedOperations({digitCount, mixedCount: isMixedDigits, formuleMode: MIXED_ADD_SUB});
    } else if ([DOUBLE_CALCULATION_ACTION, DOUBLE_CALCULATION_FLIPPED_ACTION].includes(gameMode as ActionMode)) {
        [calcItems, correctAnswer] = actionGenerator.generateAddSub({digitCount, numberCount, mixedCount: isMixedDigits, formuleMode: MIXED_ADD_SUB});
        [secondCalcItems, secondCorrectAnswer] = actionGenerator.generateAddSub({digitCount, numberCount, mixedCount: isMixedDigits, formuleMode: MIXED_ADD_SUB});
    } else if (gameMode === SQUARE_ACTION) {
        [calcItems, correctAnswer] = actionGenerator.generateSquare({digitCount});
    } else if (gameMode === SQUARE_ROOT_ACTION) {
        [calcItems, correctAnswer] = actionGenerator.generateSquareRoot({digitCount});
    } else if (gameMode === PARENTHESES_ACTION) {
        [calcItems, correctAnswer] = actionGenerator.generatePharantesisAddSub({digitCount});
    } else if (gameMode === EQUATION_ACTION) {
        [calcItems, correctAnswer] = actionGenerator.generateEquationAddSub({digitCount});
    } else if (gameMode === PERCENTAGE_ACTION) {
        [calcItems, correctAnswer] = actionGenerator.generatePercentAddSub({digitCount});
    } else if (gameMode === SIMPLE_MULTIPLICATION_ACTION) {
        [calcItems, correctAnswer] = actionGenerator.generateMultiply({firstDigitCount: digitCount, secondDigitCount: secondDigitCount});
    } else if (gameMode === SIMPLE_DIVISION_ACTION) {
        [calcItems, correctAnswer] = actionGenerator.generateDivision({firstDigitCount: digitCount, secondDigitCount: secondDigitCount});
    } else if (gameMode === MASS_ACTION) {
        const [firstUnit, secondUnit] = ACTIONS_FEATURES[gameMode].inputUnits!;
        const [translatedFirstUnit, translatedSecondUnit] = [langContent[language]![firstUnit], langContent[language]![secondUnit]];
        [calcItems, correctAnswer, secondCorrectAnswer] = actionGenerator.generateMassAddSub({digitCount, firstUnit: translatedFirstUnit, secondUnit: translatedSecondUnit});
    } else if (gameMode === MONEY_ACTION) {
        const [firstUnit, secondUnit] = ACTIONS_FEATURES[gameMode].inputUnits!;
        const [translatedFirstUnit, translatedSecondUnit] = [langContent[language]![firstUnit], langContent[language]![secondUnit]];
        [calcItems, correctAnswer, secondCorrectAnswer] = actionGenerator.generateMoneyAddSub({digitCount, firstUnit: translatedFirstUnit, secondUnit: translatedSecondUnit});
    } else if (gameMode === TIME_ACTION) {
        const [firstUnit, secondUnit] = ACTIONS_FEATURES[gameMode].inputUnits!;
        const [translatedFirstUnit, translatedSecondUnit] = [langContent[language]![firstUnit], langContent[language]![secondUnit]];
        [calcItems, correctAnswer, secondCorrectAnswer] = actionGenerator.generateTimeAddSub({digitCount, firstUnit: translatedFirstUnit, secondUnit: translatedSecondUnit});
    } else if (gameMode === LENGTH_ACTION) {
        const [firstUnit, secondUnit] = ACTIONS_FEATURES[gameMode].inputUnits!;
        const [translatedFirstUnit, translatedSecondUnit] = [langContent[language]![firstUnit], langContent[language]![secondUnit]];
        [calcItems, correctAnswer, secondCorrectAnswer] = actionGenerator.generateLengthAddSub({digitCount, firstUnit: translatedFirstUnit, secondUnit: translatedSecondUnit});
    } else if (gameMode === REMAINDER_DIVISION_ACTION) {
        [calcItems, correctAnswer, secondCorrectAnswer] = actionGenerator.generateRemainderDivision({firstDigitCount: digitCount, secondDigitCount: secondDigitCount});
    }
    const newRound: Round = {
        calcItems, 
        userAnswer: null, 
        correctAnswer, 
        secondCalcItems,
        secondUserAnswer: null,
        secondCorrectAnswer,
        finished: false,
        isCorrect: false
    };
    addRound(newRound);
}

export const createNewRound = () => {
    const { gameType } = useGameStore.getState();
    if (gameType === "formules") {
        createFormuleRound();
    } else if (gameType === "actions") {
        createActionRound();
    } else {
        throw new Error("Invalid game type");
    }
}

export const startGame = () => {
    const { setScreen, setTimestamp } = useGameplayStore.getState();
    setScreen("game");
    setTimestamp(Date.now());
    createNewRound();
}

export const restartGame = () => {
    const { clearRounds, setScreen } = useGameplayStore.getState();
    clearRounds();
    setScreen("enterance");
    // temp
    // startGame();    
}

export const showInput = () => {
    const { setScreen } = useGameplayStore.getState();
    setScreen("input");
}

export const showEnd = () => {
    const { setScreen } = useGameplayStore.getState();
    setScreen("end");
}

export const showResult = () => {
    const { setScreen } = useGameplayStore.getState();
    setScreen("result");
}

export const isAllRoundsFinished = () => {
    const { gameCount } = useGameStore.getState();
    const { rounds } = useGameplayStore.getState();
    return rounds.length === gameCount;
}

export const changeHeightSize = (type: 'increase' | 'decrease') => {
    const { heightSize, setHeightSize } = useGameplayStore.getState();
    const sizes: HeightSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(heightSize);
    if (type === 'increase' && currentIndex < sizes.length - 1) {
        setHeightSize(sizes[currentIndex + 1]);
    } else if (type === 'decrease' && currentIndex > 0) {
        setHeightSize(sizes[currentIndex - 1]);
    }
}

