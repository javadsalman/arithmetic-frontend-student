import { StepType } from "../pages/steps/types";

export interface ModeFeatures {
    steps: StepType[];
    flipped: boolean;
    singleQuestion: boolean;
    randomPosition: boolean;
    randomRotate: boolean;
    doubleInput: boolean;
    doubleDigitCount: boolean;
    inputTitles: [string, string] | null;
    doubleColumn: boolean;
    doubleRow: boolean;
    soundNumbers: (() => void)[] | null;
}

export interface CalcItem {
    text: string;
    value: number;
}
