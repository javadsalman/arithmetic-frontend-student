import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameCategory {
    id: number;
    title: string;
    code: string;
}

interface Game {
    id: number;
    title: string;
    code: string;
    game_category_id: number;
}

interface Formule {
    id: number;
    title: string;
    level: string;
    code: string;
}


interface GameConfig {
    formules: Formule[];
    gameCategories: GameCategory[];
    games: Game[];
}

interface GameConfigState {
    gameConfig: GameConfig;
    setGameConfig: (gameConfig: GameConfig) => void;
}

export const useGameConfigStore = create<GameConfigState>()(
    persist(
        (set) => ({
            gameConfig: {
                formules: [],
                gameCategories: [],
                games: [],
            },
            setGameConfig: (gameConfig) => set({ gameConfig }),
        }),
        { name: 'game-config' }
    )
);

