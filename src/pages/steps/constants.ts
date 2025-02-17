import { StepType } from "./types";

export const DIGIT_STEP = 'digit';
export const NUMBER_STEP = 'number';
export const TIME_STEP = 'time';
export const TABLE_MUL_DIV_STEP = 'table-muldiv';
export const TABLE_POWER_STEP = 'table-power';
export const SOUND_INSTRUMENTS_STEP = 'sound-instruments';
export const SOUND_ANIMALS_STEP = 'sound-animals';

export const STEP_TITLES: Record<StepType, string> = {
    [DIGIT_STEP]: 'Rəqəm sayı',
    [NUMBER_STEP]: 'Ədəd sayı',
    [TIME_STEP]: 'Cavab müddəti',
    [TABLE_MUL_DIV_STEP]: 'Sadə Vurma',
    [TABLE_POWER_STEP]: 'Sadə Vurma',
    [SOUND_INSTRUMENTS_STEP]: 'Səs',
    [SOUND_ANIMALS_STEP]: 'Səs'
}


export const MULTIPY_DIVIDE_TABLE = [
    ['Ədəd', 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [2, 4, 6, 8, 10, 12, 14, 16, 18],
    [3, 6, 9, 12, 15, 18, 21, 24, 27],
    [4, 8, 12, 16, 20, 24, 28, 32, 36],
    [5, 10, 15, 20, 25, 30, 35, 40, 45],
    [6, 12, 18, 24, 30, 36, 42, 48, 54],
    [7, 14, 21, 28, 35, 42, 49, 56, 63],
    [8, 16, 24, 32, 40, 48, 56, 64, 72],
    [9, 18, 27, 36, 45, 54, 63, 72, 81],
    ['Ədəd', 2, 3, 4, 5, 6, 7, 8, 9],
]

export const POWER_TABLE = [
    ['Ədəd', 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 4, 9, 16, 25, 36, 49, 64, 81],
    [1, 121, 144, 169, 196, 225, 256, 289, 324, 361],
    [2, 441, 484, 529, 576, 625, 676, 729, 784, 841],
    [3, 961, 1024, 1089, 1156, 1225, 1296, 1369, 1444, 1521],
    [4, 1681, 1764, 1849, 1936, 2025, 2116, 2209, 2304, 2401],
    [5, 2601, 2704, 2809, 2916, 3025, 3136, 3249, 3364, 3481],
    [6, 3721, 3844, 3969, 4096, 4225, 4356, 4489, 4624, 4761],
    [7, 5041, 5184, 5329, 5476, 5625, 5776, 5929, 6084, 6241],
    [8, 6561, 6724, 6889, 7056, 7225, 7396, 7569, 7744, 7921],
    [9, 8281, 8464, 8649, 8836, 9025, 9216, 9409, 9604, 9801],
    ['Ədəd', 1, 2, 3, 4, 5, 6, 7, 8, 9]
]

import fortePianoIconSource from '../../assets/images/instruments/fortepiano.png';
import qarmonIconSource from '../../assets/images/instruments/qarmon.png';
import kamanIconSource from '../../assets/images/instruments/kaman.png';
import nagaraIconSource from '../../assets/images/instruments/nagara.png';
import qanunIconSource from '../../assets/images/instruments/qanun.png';
import qaraZurnaIconSource from '../../assets/images/instruments/qara-zurna.png';
import sazIconSource from '../../assets/images/instruments/saz.png';
import tarIconSource from '../../assets/images/instruments/tar.png';
import tutekIconSource from '../../assets/images/instruments/tutek.png';
import udIconSource from '../../assets/images/instruments/ud.png';
import { 
    playTarSound,
    playTutekSound,
    playUdSound,
    playFortePianoSound,
    playKamanSound,
    playNagaraSound,
    playQanunSound,
    playQaraZurnaSound,
    playQarmonSound,
    playSazSound,
 } from "../../stores/soundStore";


export const INSTRUMENTS = [
    {
        title: 'Tar',
        iconSrc: tarIconSource,
        onPlay: playTarSound
    },
    {
        title: 'Tutek',
        iconSrc: tutekIconSource,
        onPlay: playTutekSound
    },
    {
        title: 'Ud',
        iconSrc: udIconSource,
        onPlay: playUdSound
    },
    {
        title: 'Forte Piano',
        iconSrc: fortePianoIconSource,
        onPlay: playFortePianoSound
    },
    {
        title: 'Kaman',
        iconSrc: kamanIconSource,
        onPlay: playKamanSound
    },
    {
        title: 'Nagara',
        iconSrc: nagaraIconSource,
        onPlay: playNagaraSound
    },
    {
        title: 'Qanun',
        iconSrc: qanunIconSource,
        onPlay: playQanunSound
    },
    {
        title: 'Qara Zurna',
        iconSrc: qaraZurnaIconSource,
        onPlay: playQaraZurnaSound
    },
    {
        title: 'Qarmon',
        iconSrc: qarmonIconSource,
        onPlay: playQarmonSound
    },
    {
        title: 'Saz',
        iconSrc: sazIconSource,
        onPlay: playSazSound
    },
]

import beeIconSource from '../../assets/images/animals/bee.png';
import birdIconSource from '../../assets/images/animals/bird.png';
import catIconSource from '../../assets/images/animals/cat.png';
import cowIconSource from '../../assets/images/animals/cow.png';
import dogIconSource from '../../assets/images/animals/dog.png';
import frogIconSource from '../../assets/images/animals/frog.png';
import horseIconSource from '../../assets/images/animals/horse.png';
import roosterIconSource from '../../assets/images/animals/rooster.png';
import sheepIconSource from '../../assets/images/animals/sheep.png';
import wolfIconSource from '../../assets/images/animals/wolf.png';
import { 
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
 } from "../../stores/soundStore";


export const ANIMALS = [
    {
        title: 'Bee',
        iconSrc: beeIconSource,
        onPlay: playBeeSound
    },
    {
        title: 'Bird',
        iconSrc: birdIconSource,
        onPlay: playBirdSound
    },
    {
        title: 'Cat',
        iconSrc: catIconSource,
        onPlay: playCatSound
    },
    {
        title: 'Cow',
        iconSrc: cowIconSource,
        onPlay: playCowSound
    },
    {
        title: 'Dog',
        iconSrc: dogIconSource,
        onPlay: playDogSound
    },
    {
        title: 'Frog',
        iconSrc: frogIconSource,
        onPlay: playFrogSound
    },
    {
        title: 'Horse',
        iconSrc: horseIconSource,
        onPlay: playHorseSound
    },
    {
        title: 'Rooster',
        iconSrc: roosterIconSource,
        onPlay: playRoosterSound
    },
    {
        title: 'Sheep',
        iconSrc: sheepIconSource,
        onPlay: playSheepSound
    },
    {
        title: 'Wolf',
        iconSrc: wolfIconSource,
        onPlay: playWolfSound
    }
]

export const NUMBER_COLORS = [
    '#8B4513', // brown for 0 (tar)
    '#F4D03F', // yellow for 1 (kaman) 
    '#FF6B6B', // coral red for 2 (nagara)
    '#003F87', // navy blue for 3 (fortepiano)
    '#4CAF50', // green for 4 (qarmon)
    '#2196F3', // blue for 5 (saz)
    '#5C6BC0', // indigo for 6 (tutek)
    '#8BC34A', // light green for 7 (qanun)
    '#E91E63', // pink for 8 (qara zurna)
    '#F57C00'  // orange for 9 (ud)
]