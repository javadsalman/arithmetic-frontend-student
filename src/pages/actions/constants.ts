import { ActionMode } from "./types";

export const COLOR_PALETTES = [
    { front: "#f29c1f", back: "#f3d541" }, // Orange
    { front: "#fe5c45", back: "#fe9282" }, // Red
    { front: "#0c6c2c", back: "#4f9e34" }, // Green
    { front: "#ed5575", back: "#f7bac7" }, // Pink
    { front: "#1c96f9", back: "#6eb9f6" }, // Blue
    { front: "#6b271d", back: "#b44131" }, // Brown
    { front: "#5169cd", back: "#9daae0" }, // Purple
    { front: "#49b668", back: "#9fd479" }, // Lime
    { front: "#f29c1f", back: "#f3d541" }, // Orange
    { front: "#fe5c45", back: "#fe9282" }, // Red
    { front: "#0c6c2c", back: "#4f9e34" }, // Green
    { front: "#ed5575", back: "#f7bac7" }, // Pink
    { front: "#1c96f9", back: "#6eb9f6" }, // Blue
    { front: "#6b271d", back: "#b44131" }, // Brown
    { front: "#5169cd", back: "#9daae0" }, // Purple
    { front: "#49b668", back: "#9fd479" }, // Lime
    { front: "#f29c1f", back: "#f3d541" }, // Orange
    { front: "#fe5c45", back: "#fe9282" }, // Red
    { front: "#0c6c2c", back: "#4f9e34" }, // Green
    { front: "#ed5575", back: "#f7bac7" }, // Pink
    { front: "#1c96f9", back: "#6eb9f6" }, // Blue
    { front: "#6b271d", back: "#b44131" }, // Brown
    { front: "#5169cd", back: "#9daae0" }, // Purple
    { front: "#49b668", back: "#9fd479" }, // Lime
    { front: "#f29c1f", back: "#f3d541" }, // Orange
    { front: "#fe5c45", back: "#fe9282" }, // Red
    { front: "#0c6c2c", back: "#4f9e34" }, // Green
    { front: "#ed5575", back: "#f7bac7" }, // Pink
    { front: "#1c96f9", back: "#6eb9f6" }, // Blue
    { front: "#6b271d", back: "#b44131" }, // Brown
    { front: "#5169cd", back: "#9daae0" }, // Purple
    { front: "#49b668", back: "#9fd479" }, // Lime
    { front: "#f29c1f", back: "#f3d541" }, // Orange
    { front: "#fe5c45", back: "#fe9282" }, // Red
    { front: "#0c6c2c", back: "#4f9e34" }, // Green
    { front: "#ed5575", back: "#f7bac7" }, // Pink
    { front: "#1c96f9", back: "#6eb9f6" }, // Blue
    { front: "#6b271d", back: "#b44131" }, // Brown
    { front: "#5169cd", back: "#9daae0" }, // Purple
    { front: "#49b668", back: "#9fd479" }, // Lime
    { front: "#f29c1f", back: "#f3d541" }, // Orange
    { front: "#fe5c45", back: "#fe9282" }, // Red
    { front: "#0c6c2c", back: "#4f9e34" }, // Green
    { front: "#ed5575", back: "#f7bac7" }, // Pink
    { front: "#1c96f9", back: "#6eb9f6" }, // Blue
    { front: "#6b271d", back: "#b44131" }, // Brown
    { front: "#5169cd", back: "#9daae0" }, // Purple
    { front: "#49b668", back: "#9fd479" }, // Lime
    { front: "#f29c1f", back: "#f3d541" }, // Orange
    { front: "#fe5c45", back: "#fe9282" }, // Red
    { front: "#0c6c2c", back: "#4f9e34" }, // Green
    { front: "#ed5575", back: "#f7bac7" }, // Pink
    { front: "#1c96f9", back: "#6eb9f6" }, // Blue
    { front: "#6b271d", back: "#b44131" }, // Brown
    { front: "#5169cd", back: "#9daae0" }, // Purple
    { front: "#49b668", back: "#9fd479" }, // Lime
]

export const FREE_WORK_ACTION: ActionMode = 'free-work';
export const FREE_WORK_FLIPPED_ACTION: ActionMode = 'free-work-flipped';
export const COMBINED_OPERATIONS_ACTION: ActionMode = 'combined-operations';
export const DOUBLE_CALCULATION_ACTION: ActionMode = 'double-calculation';
export const DOUBLE_CALCULATION_FLIPPED_ACTION: ActionMode = 'double-calculation-flipped';
export const RANDOM_NUMBERS_ACTION: ActionMode = 'random-numbers';
export const RANDOM_NUMBERS_ROTATED_ACTION: ActionMode = 'random-numbers-rotated';
export const PARENTHESES_ACTION: ActionMode = 'parentheses';
export const EQUATION_ACTION: ActionMode = 'equation';
export const PERCENTAGE_ACTION: ActionMode = 'percentage';
export const MONEY_ACTION: ActionMode = 'money';
export const MULTIPLE_MONEY_ACTION: ActionMode = 'multiple-money';
export const TIME_ACTION: ActionMode = 'time';
export const LENGTH_ACTION: ActionMode = 'length';
export const MASS_ACTION: ActionMode = 'mass';
export const SIMPLE_MULTIPLICATION_ACTION: ActionMode = 'simple-multiplication';
export const SIMPLE_DIVISION_ACTION: ActionMode = 'simple-division';
export const SQUARE_ACTION: ActionMode = 'square';
export const REMAINDER_DIVISION_ACTION: ActionMode = 'remainder-division';
export const SQUARE_ROOT_ACTION: ActionMode = 'square-root';
export const INSTRUMENT_SOUNDS_ACTION: ActionMode = 'musical-instruments';
export const ANIMAL_SOUNDS_ACTION: ActionMode = 'animal-sounds';


export const ACTION_TYPES: ActionMode[] = [
    FREE_WORK_ACTION,
    FREE_WORK_FLIPPED_ACTION,
    COMBINED_OPERATIONS_ACTION,
    DOUBLE_CALCULATION_ACTION,
    DOUBLE_CALCULATION_FLIPPED_ACTION,
    RANDOM_NUMBERS_ACTION,
    RANDOM_NUMBERS_ROTATED_ACTION,
    PARENTHESES_ACTION,
    EQUATION_ACTION,
    PERCENTAGE_ACTION,
    MONEY_ACTION,
    MULTIPLE_MONEY_ACTION,
    TIME_ACTION,
    LENGTH_ACTION,
    MASS_ACTION,
    SIMPLE_MULTIPLICATION_ACTION,
    SIMPLE_DIVISION_ACTION,
    SQUARE_ACTION,
    REMAINDER_DIVISION_ACTION,
    SQUARE_ROOT_ACTION,
    INSTRUMENT_SOUNDS_ACTION,
    ANIMAL_SOUNDS_ACTION,
]

import { DIGIT_STEP, NUMBER_STEP, TIME_STEP, TABLE_MUL_DIV_STEP, TABLE_POWER_STEP, SOUND_INSTRUMENTS_STEP, SOUND_ANIMALS_STEP } from "../steps/constants";
import { StepType } from "../steps/types";
import { playSazSound, playQarmonSound, playQaraZurnaSound, playQanunSound, playKamanSound, playFortePianoSound, playTarSound, playUdSound, playTutekSound, playNagaraSound, playSheepSound, playRoosterSound, playHorseSound, playFrogSound, playDogSound, playCowSound, playCatSound, playBirdSound, playBeeSound, playWolfSound } from "../../stores/soundStore";
import { ModeFeatures } from "../../helpers/types";

const STANDARD_STEPS: StepType[] = [DIGIT_STEP, NUMBER_STEP, TIME_STEP];
const INSTRUMENT_SOUND_NUMBERS = [
    playTarSound,
    playTutekSound,
    playUdSound,
    playFortePianoSound,
    playKamanSound,
    playNagaraSound,
    playQanunSound,
    playQaraZurnaSound,
    playQarmonSound,
    playSazSound
]

const ANIMAL_SOUND_NUMBERS = [
    playBeeSound,
    playBirdSound,
    playCatSound,
    playCowSound,
    playDogSound,
    playFrogSound,
    playHorseSound,
    playRoosterSound,
    playSheepSound,
    playWolfSound
]


export const ACTIONS_FEATURES: Record<ActionMode, ModeFeatures> = {
    [FREE_WORK_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: false,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [FREE_WORK_FLIPPED_ACTION]: {
        flipped: true,
        steps: STANDARD_STEPS,
        singleQuestion: false,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [COMBINED_OPERATIONS_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [DOUBLE_CALCULATION_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: false,
        randomPosition: false,
        randomRotate: false,
        doubleInput: true,
        doubleColumn: true,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [DOUBLE_CALCULATION_FLIPPED_ACTION]: {
        flipped: true,
        steps: STANDARD_STEPS,
        singleQuestion: false,
        randomPosition: false,
        randomRotate: false,
        doubleInput: true,
        doubleColumn: true,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [RANDOM_NUMBERS_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: false,
        randomPosition: true,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [RANDOM_NUMBERS_ROTATED_ACTION]: {
        flipped: true,
        steps: STANDARD_STEPS,
        singleQuestion: false,
        randomPosition: true,
        randomRotate: true,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [PARENTHESES_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [EQUATION_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [PERCENTAGE_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [MONEY_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: true,
        doubleColumn: false,
        doubleRow: true,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: ["man", "qəpik"]
    },
    [MULTIPLE_MONEY_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,  
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: true,
        doubleColumn: false,
        doubleRow: true,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: ["man", "qəpik"]
    },
    [TIME_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: true,
        doubleColumn: false,
        doubleRow: true,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: ["saat", "dəq"]
    },
    [LENGTH_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: true,
        doubleColumn: false,
        doubleRow: true,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: ["m", "sm"]
    },
    [MASS_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: true,
        doubleColumn: false,
        doubleRow: true,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: ["kq", "q"]
    },
    [SIMPLE_MULTIPLICATION_ACTION]: {
        flipped: false,
        steps: [TABLE_MUL_DIV_STEP, ...STANDARD_STEPS],
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: true,
        soundNumbers: null,
        inputTitles: null
    },
    [SIMPLE_DIVISION_ACTION]: {
        flipped: false,
        steps: [TABLE_MUL_DIV_STEP, ...STANDARD_STEPS],
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: true,
        soundNumbers: null,
        inputTitles: null
    },  
    [SQUARE_ACTION]: {
        flipped: false,
        steps: [TABLE_POWER_STEP, ...STANDARD_STEPS],
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [REMAINDER_DIVISION_ACTION]: {
        flipped: false,
        steps: STANDARD_STEPS,
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: true,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: true,
        soundNumbers: null,
        inputTitles: ["tam", "qalıq"]
    },
    [SQUARE_ROOT_ACTION]: {
        flipped: false,
        steps: [TABLE_POWER_STEP, ...STANDARD_STEPS],
        singleQuestion: true,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: null,
        inputTitles: null
    },
    [INSTRUMENT_SOUNDS_ACTION]: {
        flipped: false,
        steps: [SOUND_INSTRUMENTS_STEP, ...STANDARD_STEPS],
        singleQuestion: false,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: INSTRUMENT_SOUND_NUMBERS,
        inputTitles: null
    },
    [ANIMAL_SOUNDS_ACTION]: {
        flipped: false,
        steps: [SOUND_ANIMALS_STEP, ...STANDARD_STEPS],
        singleQuestion: false,
        randomPosition: false,
        randomRotate: false,
        doubleInput: false,
        doubleColumn: false,
        doubleRow: false,
        doubleDigitCount: false,
        soundNumbers: ANIMAL_SOUND_NUMBERS,
        inputTitles: null
    },
}