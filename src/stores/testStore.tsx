import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { FormuleMode } from "../lib/formules/types";
import { CalcItem } from "../helpers/types";
import { SIMPLE_ADD_SUB } from "../lib/formules/constants";
import Generator from "../lib/formules/generator";
import { EASY_MODE, HARD_MODE, MEDIUM_MODE } from "../pages/tests/constants";

const formuleGenerator = new Generator();

export type TestMode = typeof EASY_MODE | typeof MEDIUM_MODE | typeof HARD_MODE;

interface Round {
    index: number;
    calcItems: CalcItem[];
    correctAnswer: number;
    userAnswer: string;
    isCorrect: boolean|null;
}

interface Page {
    page: number;
    maxPage: number;
}

interface TestStore {
    finished: boolean;
    digitCount: number;
    numberCount: number;
    gameMode: FormuleMode|null;
    testMode: TestMode;
    coefficients: { [key in TestMode]: number };
    rounds: { [key in TestMode]: Round[] };
    pages: { [key in TestMode]: Page };
    focusIndexes: { [key in TestMode]: number };
    minutes: number;
    setFinished: (finished: boolean) => void;
    setDigitCount: (digitCount: number) => void;
    setNumberCount: (numberCount: number) => void;
    setGameMode: (gameMode: FormuleMode) => void;
    setTestMode: (testMode: TestMode) => void;
    setAnswer: (answer: string, testMode: TestMode, roundIndex: number) => void;
    setCoefficients: (coefficients: { [key in TestMode]: number }) => void;
    setPage: (page: number, testMode: TestMode) => void;
    setMaxPage: (maxPage: number, testMode: TestMode) => void;
    setNextPage: (testMode: TestMode) => void;
    setPreviousPage: (testMode: TestMode, focusIndex: number) => void;
    setFocusIndex: (index: number, testMode: TestMode) => void;
    getCurrentCoefficient: () => number;
    getLastIndexByMode: (testMode: TestMode) => number;
    setMinutes: (minutes: number) => void;
    checkAnswers: () => void;
    addRounds: (testMode: TestMode, rounds: Round[]) => void;
    clearRounds: () => void;
    clearLastEmptyRounds: () => void;
    clearPages: () => void;
    resetFocusIndexes: () => void;
    resetStore: () => void;
}

const initialPages = {
    easy: {page: 0, maxPage: 0},
    medium: {page: 0, maxPage: 0},
    hard: {page: 0, maxPage: 0},
}

const initialFocusIndexes = {
    easy: 0,
    medium: 0,
    hard: 0,
}

const initialState = {
    finished: false,
    digitCount: 1,
    numberCount: 1,
    gameMode: SIMPLE_ADD_SUB,
    testMode: "easy" as TestMode,
    pages: initialPages,
    coefficients: {
        easy: 1,
        medium: 1.5,
        hard: 2,
    },
    rounds: {
        easy: [],
        medium: [],
        hard: [],
    },
    focusIndexes: initialFocusIndexes,
    minutes: 15,
}

export const useTestStore = create<TestStore>()(
    persist(immer((set, get) => ({
        ...initialState,
        setFinished: (finished: boolean) => set({ finished }),
        setDigitCount: (digitCount: number) => set({ digitCount }),
        setNumberCount: (numberCount: number) => set({ numberCount }),
        setGameMode: (gameMode: FormuleMode) => set({ gameMode }),
        setTestMode: (testMode: TestMode) => set({ testMode }),
        setAnswer: (answer: string, testMode: TestMode, roundIndex: number) => set((state) => {
            state.rounds[testMode][roundIndex].userAnswer = answer;
        }),
        setCoefficients: (coefficients: { [key in TestMode]: number }) => set({ coefficients }),
        setPage: (page: number, testMode: TestMode) => set((state) => {
            state.pages[testMode].page = page;
        }),
        setMaxPage: (maxPage: number, testMode: TestMode) => set((state) => {
            state.pages[testMode].maxPage = maxPage;
        }),
        setNextPage: (testMode: TestMode) => set((state) => {
            state.pages[testMode].page += 1;
            if (state.pages[testMode].page >= state.pages[testMode].maxPage) {
                state.pages[testMode].maxPage += 1;
            }
            state.focusIndexes[testMode] = 0;
        }),
        setPreviousPage: (testMode: TestMode, focusIndex: number) => set((state) => {
            if (state.pages[testMode].page > 0) {
                state.pages[testMode].page -= 1;
                if (state.pages[testMode].page < 0) {
                    state.pages[testMode].page = 0;
                }
                state.focusIndexes[testMode] = focusIndex;
            }
        }),
        setFocusIndex: (index: number, testMode: TestMode) => set((state) => {
            state.focusIndexes[testMode] = index;
        }),
        getCurrentCoefficient: () => get().coefficients[get().testMode],
        getLastIndexByMode: (testMode: TestMode) => get().rounds[testMode].length,
        setMinutes: (minutes: number) => set({ minutes }),
        checkAnswers: () => set((state) => {
            Object.values(state.rounds).forEach((rounds) => {
                rounds.forEach((round) => {
                    if (round.userAnswer !== '') {
                        round.isCorrect = round.correctAnswer === parseInt(round.userAnswer);
                    }
                });
            });
        }),
        addRounds: (testMode: TestMode, rounds: Round[]) => set((state) => {
            state.rounds[testMode].push(...rounds);
        }),
        clearRounds: () => set({ rounds: { easy: [], medium: [], hard: [] } }),
        clearLastEmptyRounds: () => set((state) => {
            Object.values(state.rounds).forEach((rounds) => {
                let lastIndex = rounds.length - 1;
                while (lastIndex >= 0 && rounds[lastIndex].userAnswer === '') {
                    lastIndex--;
                }
                rounds.splice(lastIndex + 1);
            });
        }),
        clearPages: () => set({ pages: initialPages }),
        resetStore: () => set(initialState),
        resetFocusIndexes: () => set({ focusIndexes: initialFocusIndexes }),
    })), {
        name: "test",
    })
);


export const addRoundsByMode = (testMode: TestMode, roundCount: number) => {
    const { addRounds, digitCount, numberCount, gameMode, getLastIndexByMode } = useTestStore.getState();
    const properDigitCount = digitCount === 1 ? (testMode === "easy" ? 1 : 2) : (testMode === "easy" ? digitCount - 1 : digitCount);
    const mixedCount = testMode === "medium"
    const rounds: Round[] = [];
    const lastIndex = getLastIndexByMode(testMode);
    for (let i = 0; i < roundCount; i++) {
        const calcValues = formuleGenerator.generate({digitCount: properDigitCount, numberCount, mixedCount, mode: gameMode!});
        const calcItems = calcValues.map(value => ({text: value > 0 ? `+${value}` : value.toString(), value}));
        const correctAnswer = calcItems.reduce((acc, item) => acc + item.value, 0);
        rounds.push({ index: lastIndex + i, calcItems, correctAnswer, userAnswer: '', isCorrect: null });
    }
    addRounds(testMode, rounds);
}



export const resetTests = () => {
    const { clearPages, clearRounds, resetFocusIndexes, setFinished, setTestMode } = useTestStore.getState();
    setTestMode("easy");
    setFinished(false);
    clearPages();
    clearRounds();
    resetFocusIndexes();
}

export const finishTest = () => {
    const { checkAnswers, clearLastEmptyRounds, setFinished, setTestMode } = useTestStore.getState();
    setTestMode("easy");
    checkAnswers();
    clearLastEmptyRounds();
    setFinished(true);
}

