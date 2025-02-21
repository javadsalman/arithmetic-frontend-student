import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useGameStore } from './gameStore';
import { immer } from 'zustand/middleware/immer';
import { FormuleMode } from '../lib/formules/types';
import { FREE_WORK_ACTION, FREE_WORK_FLIPPED_ACTION, RANDOM_NUMBERS_ACTION, RANDOM_NUMBERS_ROTATED_ACTION, COMBINED_OPERATIONS_ACTION, ANIMAL_SOUNDS_ACTION, INSTRUMENT_SOUNDS_ACTION, DOUBLE_CALCULATION_ACTION, DOUBLE_CALCULATION_FLIPPED_ACTION, SQUARE_ROOT_ACTION, SQUARE_ACTION, PARENTHESES_ACTION, EQUATION_ACTION, PERCENTAGE_ACTION, SIMPLE_MULTIPLICATION_ACTION, SIMPLE_DIVISION_ACTION, MASS_ACTION, MONEY_ACTION, TIME_ACTION, LENGTH_ACTION } from '../pages/actions/constants';
import FormuleGenerator from '../lib/formules/generator';
import ActionGenerator from '../lib/actinos/generator';
import { CalcItem } from '../helpers/types';
import { ActionMode } from '../pages/actions/types';
import { MIXED_ADD_SUB } from '../lib/formules/constants';

export interface Round {
    calcItems: CalcItem[];
    secondCalcItems?: CalcItem[];
    userAnswer: number|null;
    secondUserAnswer?: number|null;
    correctAnswer: number;
    secondCorrectAnswer?: number;
    finished: boolean;
}

const formuleGenerator = new FormuleGenerator();
const actionGenerator = new ActionGenerator();

export type HeightSize = "xs" | "sm" | "md" | "lg" | "xl";

interface GamePlayState {
    rounds: Round[];
    currentUserAnswer: string;
    secondUserAnswer: string;
    screen: "enterance" | "game" | "input" | "result" | "end";
    heightSize: HeightSize;
    transformValue: ((value: number) => string) | null;
    transformColsToValue: ((col1: number, col2: number) => number) | null;   
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
    setTransformValue: (transformValue: ((value: number) => string) | null) => void;
    setTransformColsToValue: (transformColsToValue: ((col1: number, col2: number) => number) | null) => void;
    setTimestamp: (timestamp: number) => void;
}

export const useGamePlayStore = create<GamePlayState>()(
    persist(
        immer((set, get) => ({
            rounds: [],
            currentUserAnswer: "",
            secondUserAnswer: "",
            screen: "enterance",
            heightSize: 'md',
            transformValue: null,
            transformColsToValue: null,
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
                    if (state.transformColsToValue) {
                        currentRound.userAnswer = state.transformColsToValue(+state.currentUserAnswer, +state.secondUserAnswer);
                    } else {
                        currentRound.userAnswer = state.currentUserAnswer ? +state.currentUserAnswer : null;
                    }
                    currentRound.secondUserAnswer = state.secondUserAnswer ? +state.secondUserAnswer : null;
                    currentRound.finished = true;
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
            setTransformValue: (transformValue: ((value: number) => string) | null) => set(state => {
                state.transformValue = transformValue;
            }),
            setTransformColsToValue: (transformColsToValue: ((col1: number, col2: number) => number) | null) => set(state => {
                state.transformColsToValue = transformColsToValue;
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
    const { addRound, getCurrentRound } = useGamePlayStore.getState();
    const currentRound = getCurrentRound();
    if (currentRound && !currentRound.finished) {
        return;
    }
    const calcValues: number[] = formuleGenerator.generate({digitCount, numberCount, mixedCount: isMixedDigits, mode: gameMode as FormuleMode});
    const calcItems = calcValues.map(value => ({text: value > 0 ? `+${value}` : value.toString(), value}));

    const correctAnswer = calcItems.reduce((acc, item) => acc + item.value, 0);
    const newRound: Round = {calcItems, userAnswer: null, correctAnswer, finished: false};
    addRound(newRound);
}

export const createActionRound = () => {
    const { digitCount, numberCount, isMixedDigits, gameMode, secondDigitCount } = useGameStore.getState();
    const { addRound, getCurrentRound, setTransformValue, setTransformColsToValue } = useGamePlayStore.getState();
    const currentRound = getCurrentRound();
    if (currentRound && !currentRound.finished) {
        return;
    }
    let calcItems: CalcItem[] = [];
    let transformValue = null;
    let transformColsToValue = null;
    if ([FREE_WORK_ACTION, FREE_WORK_FLIPPED_ACTION, RANDOM_NUMBERS_ACTION, RANDOM_NUMBERS_ROTATED_ACTION].includes(gameMode as ActionMode)) {
        calcItems = actionGenerator.generateAddSub({digitCount, numberCount, mixedCount: isMixedDigits, formuleMode: MIXED_ADD_SUB});
    } else if ([ANIMAL_SOUNDS_ACTION, INSTRUMENT_SOUNDS_ACTION].includes(gameMode as ActionMode)) {
        calcItems = actionGenerator.generateRandomAdd({numberCount});
    } else if (gameMode === COMBINED_OPERATIONS_ACTION) {
        calcItems = actionGenerator.generateCombinedOperations({digitCount, mixedCount: isMixedDigits, formuleMode: MIXED_ADD_SUB});
    } else if ([DOUBLE_CALCULATION_ACTION, DOUBLE_CALCULATION_FLIPPED_ACTION].includes(gameMode as ActionMode)) {
        const firstCalcItems = actionGenerator.generateAddSub({digitCount, numberCount, mixedCount: isMixedDigits, formuleMode: MIXED_ADD_SUB});
        const secondCalcItems = actionGenerator.generateAddSub({digitCount, numberCount, mixedCount: isMixedDigits, formuleMode: MIXED_ADD_SUB});
        const firstCorrectAnswer = firstCalcItems.reduce((acc, item) => acc + item.value, 0);
        const secondCorrectAnswer = secondCalcItems.reduce((acc, item) => acc + item.value, 0);
        const newRound: Round = {calcItems: firstCalcItems, secondCalcItems, userAnswer: null, secondUserAnswer: null, correctAnswer: firstCorrectAnswer, secondCorrectAnswer, finished: false};
        addRound(newRound);
        return;
    } else if (gameMode === SQUARE_ACTION) {
        calcItems = actionGenerator.generateSquare({digitCount});
    } else if (gameMode === SQUARE_ROOT_ACTION) {
        calcItems = actionGenerator.generateSquareRoot({digitCount});
    } else if (gameMode === PARENTHESES_ACTION) {
        calcItems = actionGenerator.generatePharantesisAddSub({digitCount});
    } else if (gameMode === EQUATION_ACTION) {
        calcItems = actionGenerator.generateEquationAddSub({digitCount});
    } else if (gameMode === PERCENTAGE_ACTION) {
        calcItems = actionGenerator.generatePercentAddSub({digitCount});
    } else if (gameMode === SIMPLE_MULTIPLICATION_ACTION) {
        calcItems = actionGenerator.generateMultiply({firstDigitCount: digitCount, secondDigitCount: secondDigitCount});
    } else if (gameMode === SIMPLE_DIVISION_ACTION) {
        calcItems = actionGenerator.generateDivision({firstDigitCount: digitCount, secondDigitCount: secondDigitCount});
    } else if (gameMode === MASS_ACTION) {
        calcItems = actionGenerator.generateMassAddSub({digitCount});
        transformValue = actionGenerator.transformMassValue;
        transformColsToValue = actionGenerator.transformMassToValue;
    } else if (gameMode === MONEY_ACTION) {
        calcItems = actionGenerator.generateMoneyAddSub({digitCount});
        transformValue = actionGenerator.transformMoneyValue;
        transformColsToValue = actionGenerator.transformMoneyToValue;
    } else if (gameMode === TIME_ACTION) {
        calcItems = actionGenerator.generateTimeAddSub({digitCount});
        transformValue = actionGenerator.transformTimeValue;
        transformColsToValue = actionGenerator.transformTimeToValue;
    } else if (gameMode === LENGTH_ACTION) {
        calcItems = actionGenerator.generateLengthAddSub({digitCount});
        transformValue = actionGenerator.transformLengthValue;
        transformColsToValue = actionGenerator.transformLengthToValue;
    }
    const correctAnswer = calcItems.reduce((acc, item) => acc + item.value, 0);
    const newRound: Round = {calcItems, userAnswer: null, correctAnswer, finished: false};
    addRound(newRound);
    setTransformValue(transformValue);
    setTransformColsToValue(transformColsToValue);
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
    const { setScreen, setTimestamp } = useGamePlayStore.getState();
    setScreen("game");
    setTimestamp(Date.now());
    createNewRound();
}

export const restartGame = () => {
    const { clearRounds, setScreen } = useGamePlayStore.getState();
    clearRounds();
    setScreen("enterance");
    // temp
    // startGame();    
}

export const showInput = () => {
    const { setScreen } = useGamePlayStore.getState();
    setScreen("input");
}

export const showEnd = () => {
    const { setScreen } = useGamePlayStore.getState();
    setScreen("end");
}

export const showResult = () => {
    const { setScreen } = useGamePlayStore.getState();
    setScreen("result");
}

export const isAllRoundsFinished = () => {
    const { gameCount } = useGameStore.getState();
    const { rounds } = useGamePlayStore.getState();
    return rounds.length === gameCount;
}

export const changeHeightSize = (type: 'increase' | 'decrease') => {
    const { heightSize, setHeightSize } = useGamePlayStore.getState();
    const sizes: HeightSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(heightSize);
    if (type === 'increase' && currentIndex < sizes.length - 1) {
        setHeightSize(sizes[currentIndex + 1]);
    } else if (type === 'decrease' && currentIndex > 0) {
        setHeightSize(sizes[currentIndex - 1]);
    }
}

