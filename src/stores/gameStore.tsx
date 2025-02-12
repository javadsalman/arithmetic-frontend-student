import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActionMode } from '../pages/actions/types';
import { FormuleMode } from '../lib/formules/types';
import { immer } from 'zustand/middleware/immer';

interface GameState {
    digitCount: number;
    numberCount: number;
    isMixedDigits: boolean;
    gameCount: number;
    betweenDuration: number;
    answerDuration: number;
    gameType: "formules" | "actions"| null;
    gameMode: FormuleMode|ActionMode|null;
    setDigitCount: (count: number) => void;
    setNumberCount: (count: number) => void;
    setIsMixedDigits: (isRandom: boolean) => void;
    setGameCount: (count: number) => void;
    setBetweenDuration: (time: number) => void;
    setAnswerDuration: (time: number) => void;
    resetStore: () => void;
    setGameType: (gameType: "formules" | "actions") => void;
    setGameMode: (gameMode: FormuleMode|ActionMode) => void;
}


const initialState = {
    digitCount: 1,
    numberCount: 3,
    isMixedDigits: false,
    gameCount: 10,
    betweenDuration: 10,
    answerDuration: 10,
    gameMode: null,
    gameType: null,
}



export const useGameStore = create<GameState>()(
    persist(
        immer((set) => ({
            ...initialState,
            setGameType: (gameType: "formules" | "actions") => set({ gameType }),
            setGameMode: (gameMode: FormuleMode|ActionMode) => set({ gameMode }),
            setDigitCount: (count: number) => set({ digitCount: count }),
            setNumberCount: (count: number) => set({ numberCount: count }),
            setIsMixedDigits: (isRandom: boolean) => set({ isMixedDigits: isRandom }),
            setGameCount: (count: number) => set({ gameCount: count }),
            setBetweenDuration: (time: number) => set({ betweenDuration: time }),
            setAnswerDuration: (time: number) => set({ answerDuration: time }),
            resetStore: () => set(initialState),
            setNewState: (newState: GameState) => set(newState),
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
