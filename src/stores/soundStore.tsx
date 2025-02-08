import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import iqSoundBuffer from '../assets/audio/iq.wav';
import numberSoundBuffer from '../assets/audio/number.wav';
import chalkTwoSecondBuffer from '../assets/audio/chalk-two-second.wav';
import falseSoundBuffer from '../assets/audio/false.wav';
import secondSoundBuffer from '../assets/audio/second.wav';

import shortChalkSoundBuffer from '../assets/audio/short-chalk.wav';
import trueSoundBuffer from '../assets/audio/true.wav';



const iqSound = new Audio(iqSoundBuffer);
const numberSound = new Audio(numberSoundBuffer);
const chalkTwoSecondSound = new Audio(chalkTwoSecondBuffer);
const falseSound = new Audio(falseSoundBuffer);
const secondSound = new Audio(secondSoundBuffer);
const shortChalkSound = new Audio(shortChalkSoundBuffer);
const trueSound = new Audio(trueSoundBuffer);



interface SoundStore {
    isMuted: boolean;
    toggleMute: () => void;
}

export const useSoundStore = create<SoundStore>()(
    persist(
        (set) => ({
            isMuted: false,
            toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
        }),
        {
            name: 'sound',
        }
    )
);


const _playSound = (sound: HTMLAudioElement) => {
    const { isMuted } = useSoundStore.getState();
    if (!isMuted) {
        sound.play();
    }
}

export const playIqSound = () => _playSound(iqSound);
export const playNumberSound = () => _playSound(numberSound);
export const playChalkTwoSecondSound = () => _playSound(chalkTwoSecondSound);
export const playFalseSound = () => _playSound(falseSound);
export const playSecondSound = () => _playSound(secondSound);
export const playShortChalkSound = () => _playSound(shortChalkSound);
export const playTrueSound = () => _playSound(trueSound);