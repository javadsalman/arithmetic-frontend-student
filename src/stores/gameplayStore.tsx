import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useGameStore } from './gameStore';
import { immer } from 'zustand/middleware/immer';
import Generator from '../lib/formules/generator';
import { FormuleMode } from '../lib/formules/types';


const generator = new Generator();

interface Round {
    calcItems: number[];
    userAnswer: number|null;
    correctAnswer: number;
    finished: boolean;
}


export type HeightSize = "xs" | "sm" | "md" | "lg" | "xl";

interface GameplayState {
    rounds: Round[];
    currentUserAnswer: string;
    screen: "enterance" | "game" | "input" | "result" | "end";
    heightSize: HeightSize;
    setCurrentUserAnswer: (answer: string) => void;
    getCurrentRound: () => Round|undefined;
    addRound: (round: Round) => void;
    answerCurrentRound: () => void;
    getCurrentCalcItems: () => number[];
    clearRounds: () => void;
    setScreen: (screen: "enterance" | "game" | "input" | "result" | "end") => void;
    setHeightSize: (size: HeightSize) => void;
}


export const useGameplayStore = create<GameplayState>()(
    persist(
        immer((set, get) => ({
            rounds: [],
            currentUserAnswer: "",
            screen: "enterance",
            heightSize: 'md',
            setCurrentUserAnswer: (answer: string) => set(state => {
                state.currentUserAnswer = answer;
            }),
            getCurrentRound: () => get().rounds?.[get().rounds.length-1],
            addRound: (round: Round) => set(state => {
                state.rounds.push(round);
            }),
            answerCurrentRound: () => set(state => {
                const currentRound = state.rounds[state.rounds.length-1];
                if (currentRound) {
                    currentRound.userAnswer = state.currentUserAnswer ? +state.currentUserAnswer : null;
                    currentRound.finished = true;
                }

            }),
            getCurrentCalcItems: () => get().rounds?.[get().rounds.length-1]?.calcItems || [],
            clearRounds: () => set(state => {
                state.rounds = [];
            }),
            setScreen: (screen: "enterance" | "game" | "input" | "result" | "end") => set(state => {
                state.screen = screen;
            }),
            setHeightSize: (size: HeightSize) => set(state => {
                state.heightSize = size;
            })
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
    let calcItems: number[] = generator.generate({digitCount, numberCount, mixedCount: isMixedDigits, mode: gameMode as FormuleMode});

    const correctAnswer = calcItems.reduce((acc, item) => acc + item, 0);
    const newRound: Round = {calcItems, userAnswer: null, correctAnswer, finished: false};
    addRound(newRound);
}

export const createNewRound = () => {
    const { gameType } = useGameStore.getState();
    if (gameType === "formules") {
        createFormuleRound();
    }
}

export const startGame = () => {
    const { setScreen } = useGameplayStore.getState();
    setScreen("game");
    createNewRound();
}

export const restartGame = () => {
    const { clearRounds, setScreen } = useGameplayStore.getState();
    clearRounds();
    setScreen("enterance");
    // temp
    // startGame();    
}



export const finishInput = () => {
    const { rounds, setScreen } = useGameplayStore.getState();
    const { gameCount } = useGameStore.getState();
    if (rounds.length === gameCount) {
        setScreen("end");
    } else {
        setScreen("result");
    }
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

