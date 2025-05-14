import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useLanguageStore } from './languageStore';
import { FormuleMode } from '../lib/formules/types';
interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  father_name: string;
  address: string;
  phone: string;
  birth_date: string;
  is_active: boolean;
  is_graduated: boolean;
  last_deactivation_date: string | null;
  school: string;
  branch: {
    id: number;
    name: string;
  } | null;
  group: {
    id: number;
    name: string;
    teacher: {
      id: number;
      first_name: string;
      last_name: string;
    };
  } | null;
  city: {
    id: number;
    country_id: number;
    name_az: string;
    name_tr: string;
    name_en: string;
    name_ru: string;
    name_kk: string;
    name_pl: string;
    country: {
      id: number;
      name_az: string;
      name_tr: string;
      name_en: string;
      name_ru: string;
      name_kk: string;
      name_pl: string;
    };
  };
  allowed_challenge_formule: {
    id: number;
    title: string;
    level: number;
    code: FormuleMode;
  } | null;
  allowed_test_formule: {
    id: number;
    title: string;
    level: number;
    code: FormuleMode;
  } | null;
  allowed_formules: {
    id: number;
    title: string;
    level: number;
    code: FormuleMode;
  }[] | null;
  created: string;
}

interface AuthState {
  token: string | null;
  student: Student | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  setStudent: (student: Student | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      student: null,
      isAuthenticated: false,
      setToken: (token) => set({ token, isAuthenticated: !!token }),
      setStudent: (student) => set({ student }),
      logout: () => set({ token: null, student: null, isAuthenticated: false }),
    }),
    { 
      name: 'auth',
      partialize: (state) => ({ token: state.token })
    }
  )
);


export const getLoginURL = () => {
  const language = useLanguageStore.getState().language;
  const url = import.meta.env.VITE_LOGIN_URL.replace('{langCode}', language);
  console.log(url, import.meta.env.VITE_LOGIN_URL);
  return url;
}

export const getAllowedFormuleCodes = () => {
  const allowedFormules = useAuthStore.getState().student?.allowed_formules;
  return allowedFormules?.map(formule => formule.code);
}
