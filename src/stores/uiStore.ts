import { create } from 'zustand';

interface UiStore {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));

