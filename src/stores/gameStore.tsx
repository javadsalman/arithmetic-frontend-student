import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActionMode } from '../pages/actions/types';
import { FormuleMode } from '../lib/formules/types';
import { immer } from 'zustand/middleware/immer';

interface GameState {
    digitCount: number;
    secondDigitCount: number;   
    numberCount: number;
    isMixedDigits: boolean;
    gameCount: number;
    betweenDuration: number;
    answerDuration: number;
    enterAnimationDuration: number;
    exitAnimationDuration: number;
    gameType: "formules" | "actions"| null;
    gameMode: FormuleMode|ActionMode|null;
    setDigitCount: (count: number) => void;
    setSecondDigitCount: (count: number) => void;
    setNumberCount: (count: number) => void;
    setIsMixedDigits: (isRandom: boolean) => void;
    setGameCount: (count: number) => void;
    setBetweenDuration: (time: number) => void;
    setAnswerDuration: (time: number) => void;
    resetStore: () => void;
    setGameType: (gameType: "formules" | "actions") => void;
    setGameMode: (gameMode: FormuleMode|ActionMode) => void;
    setEnterAnimationDuration: (time: number) => void;
    setExitAnimationDuration: (time: number) => void;
}


const initialState = {
    digitCount: 1,
    secondDigitCount: 1,
    numberCount: 3,
    isMixedDigits: false,
    gameCount: 10,
    betweenDuration: 10,
    answerDuration: 10,
    gameMode: null,
    gameType: null,
    enterAnimationDuration: 0,
    exitAnimationDuration: 0,
}



export const useGameStore = create<GameState>()(
    persist(
        immer((set, get) => ({
            ...initialState,
            setGameType: (gameType: "formules" | "actions") => set({ gameType }),
            setGameMode: (gameMode: FormuleMode|ActionMode) => set({ gameMode }),
            setDigitCount: (count: number) => set({ digitCount: count }),
            setSecondDigitCount: (count: number) => get().digitCount >= count && set({ secondDigitCount: count }),
            setNumberCount: (count: number) => set({ numberCount: count }),
            setIsMixedDigits: (isRandom: boolean) => set({ isMixedDigits: isRandom }),
            setGameCount: (count: number) => set({ gameCount: count }),
            setBetweenDuration: (time: number) => set({ betweenDuration: time }),
            setAnswerDuration: (time: number) => set({ answerDuration: time }),
            resetStore: () => set(initialState),
            setNewState: (newState: GameState) => set(newState),
            setEnterAnimationDuration: (time: number) => set({ enterAnimationDuration: time }),
            setExitAnimationDuration: (time: number) => set({ exitAnimationDuration: time }),
        })), 
        {
            name: 'game',
        }
    )
);

export function generateQueryString() {
    const state = useGameStore.getState();
    const queryString = new URLSearchParams();
    queryString.set('digitCount', state.digitCount.toString());
    queryString.set('numberCount', state.numberCount.toString());
    queryString.set('isMixedDigits', state.isMixedDigits.toString());
    queryString.set('gameCount', state.gameCount.toString());
    queryString.set('betweenDuration', state.betweenDuration.toString());
    queryString.set('answerDuration', state.answerDuration.toString());
    return queryString.toString();
}

export function loadNewGameParams(entries: [string, string][]) {
    const oldState = useGameStore.getState();
    const newState = {}
    entries.forEach(([key, value]) => {
        if (key in oldState) {

            (newState as Record<string, string>)[key] = value;
        }
    });
    useGameStore.setState(newState);
}
