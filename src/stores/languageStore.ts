import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import azFlag from '../assets/images/azerbaijan.png';
import enFlag from '../assets/images/united-states.png';
import ruFlag from '../assets/images/russia.png';
import trFlag from '../assets/images/turkey.png';
import plFlag from '../assets/images/poland.png';
import kzFlag from '../assets/images/kazakhistan.png';

export type LanguageCode = 'az' | 'en' | 'ru' | 'tr' | 'pl' | 'kk';

export const DEFAULT_LANGUAGE: LanguageCode = 'az';


const LANGUAGES: { code: LanguageCode; name: string; icon: string }[] = [
    {
        code: 'az',
        name: 'Azərbaycan',
        icon: azFlag
    },
    {
        code: 'en',
        name: 'English',
        icon: enFlag
    },
    {
        code: 'ru',
        name: 'Русский',
        icon: ruFlag
    },
    {
        code: 'tr',
        name: 'Türk',
        icon: trFlag
    },
    {
        code: 'pl',
        name: 'Polski',
        icon: plFlag
    },
    {
        code: 'kk',
        name: 'Қазақша',
        icon: kzFlag
    }
]

interface LanguageState {
    languages: { code: LanguageCode; name: string; icon: string }[];
    language: LanguageCode;
    setLanguage: (language: LanguageCode) => void;
}


export const useLanguageStore = create<LanguageState>()(
    persist(
        (set) => ({
            languages: LANGUAGES,
            language: DEFAULT_LANGUAGE,
            setLanguage: (language: LanguageCode) => set({ language: language }),
        }),
        { name: 'language' }

    )
);

