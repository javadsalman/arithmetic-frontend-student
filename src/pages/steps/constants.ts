import { StepType } from "./types";

export const DIGIT_STEP = 'digit';
export const NUMBER_STEP = 'number';
export const TIME_STEP = 'time';

export const STEP_TITLES: Record<StepType, string> = {
    [DIGIT_STEP]: 'Rəqəm sayı',
    [NUMBER_STEP]: 'Ədəd sayı',
    [TIME_STEP]: 'Cavab müddəti'
}

export const STEP_ORDERS: StepType[] = [DIGIT_STEP, NUMBER_STEP, TIME_STEP];