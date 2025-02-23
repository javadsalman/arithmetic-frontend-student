import { FormuleMode } from "../../lib/formules/types";
import { DIGIT_STEP, NUMBER_STEP, TIME_STEP } from "../steps/constants";
import { ModeFeatures } from "../../helpers/types";

export const NOTE_SIZE = 'w-[180px] h-[180px]';
export const ATTACH_SIZE = 'w-14 h-14';


export const FORMULE_TITLES: Record<FormuleMode, string> = {
    'simple-add-sub': "Basit toplama-çıxma",
    '5-add': "5 Əsasda Toplama",
    '5-add-sub': "5 Əsasda Toplama-Çıxma",
    '10-add': "10 Əsasda Toplama",
    '10-add-sub': "10 Əsasda Toplama-Çıxma",
    '5k-add': "5K Əsasda Toplama",
    '5k-add-sub': "5K Əsasda Toplama-Çıxma",
    'mixed-add-sub': "Qarışıq Toplama-Çıxma"
}

const FORMULE_FEATURE: ModeFeatures = {
    flipped: false,
    steps: [DIGIT_STEP, NUMBER_STEP, TIME_STEP],
    singleQuestion: false,
    randomPosition: false,
    doubleInput: false,
    doubleDigitCount: false,
    soundNumbers: null,
    randomRotate: false,
    inputUnits: null,
    doubleColumn: false,
    doubleRow: false,
}

export const FORMULES_FEATURES: Record<FormuleMode, ModeFeatures> = {
    'simple-add-sub': FORMULE_FEATURE,
    '5-add': FORMULE_FEATURE,
    '5-add-sub': FORMULE_FEATURE,
    '10-add': FORMULE_FEATURE,
    '10-add-sub': FORMULE_FEATURE,
    '5k-add': FORMULE_FEATURE,
    '5k-add-sub': FORMULE_FEATURE,
    'mixed-add-sub': FORMULE_FEATURE,
}
