import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import iqSoundBuffer from '../assets/audio/iq.wav';
import numberSoundBuffer from '../assets/audio/number.wav';
import chalkTwoSecondBuffer from '../assets/audio/chalk-two-second.wav';
import falseSoundBuffer from '../assets/audio/false.wav';
import secondSoundBuffer from '../assets/audio/second.wav';
import shortChalkSoundBuffer from '../assets/audio/short-chalk.wav';
import trueSoundBuffer from '../assets/audio/true.wav';

import fortePianoSoundBuffer from '../assets/audio/instruments/fortepiano.mp3'
import kamanSoundBuffer from '../assets/audio/instruments/kaman.mp3'
import nagaraSoundBuffer from '../assets/audio/instruments/nagara.mp3'
import qanunSoundBuffer from '../assets/audio/instruments/qanun.mp3'
import qaraZurnaSoundBuffer from '../assets/audio/instruments/qara-zurna.mp3'
import qarmonSoundBuffer from '../assets/audio/instruments/qarmon.mp3'
import sazSoundBuffer from '../assets/audio/instruments/saz.mp3'
import tarSoundBuffer from '../assets/audio/instruments/tar.mp3'
import tutekSoundBuffer from '../assets/audio/instruments/tutek.mp3'
import udSoundBuffer from '../assets/audio/instruments/ud.mp3'

import beeSoundBuffer from '../assets/audio/animals/bee.mp3'
import birdSoundBuffer from '../assets/audio/animals/bird.mp3'
import catSoundBuffer from '../assets/audio/animals/cat.mp3'
import cowSoundBuffer from '../assets/audio/animals/cow.mp3'
import dogSoundBuffer from '../assets/audio/animals/dog.mp3'
import frogSoundBuffer from '../assets/audio/animals/frog.mp3'
import horseSoundBuffer from '../assets/audio/animals/horse.mp3'
import roosterSoundBuffer from '../assets/audio/animals/rooster.mp3'
import sheepSoundBuffer from '../assets/audio/animals/sheep.mp3'
import wolfSoundBuffer from '../assets/audio/animals/wolf.mp3'


const iqSound = new Audio(iqSoundBuffer);
const numberSound = new Audio(numberSoundBuffer);
const chalkTwoSecondSound = new Audio(chalkTwoSecondBuffer);
const falseSound = new Audio(falseSoundBuffer);
const secondSound = new Audio(secondSoundBuffer);
const shortChalkSound = new Audio(shortChalkSoundBuffer);
const trueSound = new Audio(trueSoundBuffer);

const fortePianoSound = new Audio(fortePianoSoundBuffer);
const kamanSound = new Audio(kamanSoundBuffer);
const nagaraSound = new Audio(nagaraSoundBuffer);
const qanunSound = new Audio(qanunSoundBuffer);
const qaraZurnaSound = new Audio(qaraZurnaSoundBuffer);
const qarmonSound = new Audio(qarmonSoundBuffer);
const sazSound = new Audio(sazSoundBuffer);
const tarSound = new Audio(tarSoundBuffer);
const tutekSound = new Audio(tutekSoundBuffer);
const udSound = new Audio(udSoundBuffer);

const beeSound = new Audio(beeSoundBuffer);
const birdSound = new Audio(birdSoundBuffer);
const catSound = new Audio(catSoundBuffer);
const cowSound = new Audio(cowSoundBuffer);
const dogSound = new Audio(dogSoundBuffer);
const frogSound = new Audio(frogSoundBuffer);
const horseSound = new Audio(horseSoundBuffer);
const roosterSound = new Audio(roosterSoundBuffer);
const sheepSound = new Audio(sheepSoundBuffer);
const wolfSound = new Audio(wolfSoundBuffer);



interface SoundStore {
    isMuted: boolean;
    currentSound: HTMLAudioElement | null;
    toggleMute: () => void;
    setIsMuted: (isMuted: boolean) => void;
    setCurrentSound: (sound: HTMLAudioElement) => void;
}

export const useSoundStore = create<SoundStore>()(
    persist(
        (set) => ({
            isMuted: false,
            currentSound: null,
            toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
            setIsMuted: (isMuted: boolean) => set({ isMuted }),
            setCurrentSound: (sound: HTMLAudioElement) => set({ currentSound: sound }),
        }),
        {
            name: 'sound',
        }
    )
);


const _playSound = (sound: HTMLAudioElement) => {
    const { isMuted, currentSound, setCurrentSound } = useSoundStore.getState();
    if (!isMuted) {
        if (currentSound instanceof HTMLAudioElement) {
            currentSound.pause();
            currentSound.currentTime = 0;
        }
        sound.play();
        setCurrentSound(sound);
    }
}

export const stopCurrentSound = () => {
    const { currentSound } = useSoundStore.getState();
    if (currentSound instanceof HTMLAudioElement) {
        currentSound.pause();
        currentSound.currentTime = 0;
    }
}

export const playIqSound = () => _playSound(iqSound);
export const playNumberSound = () => _playSound(numberSound);
export const playChalkTwoSecondSound = () => _playSound(chalkTwoSecondSound);
export const playFalseSound = () => _playSound(falseSound);
export const playSecondSound = () => _playSound(secondSound);
export const playShortChalkSound = () => _playSound(shortChalkSound);
export const playTrueSound = () => _playSound(trueSound);


export const playFortePianoSound = () => _playSound(fortePianoSound);
export const playKamanSound = () => _playSound(kamanSound);
export const playNagaraSound = () => _playSound(nagaraSound);
export const playQanunSound = () => _playSound(qanunSound);
export const playQaraZurnaSound = () => _playSound(qaraZurnaSound);
export const playQarmonSound = () => _playSound(qarmonSound);
export const playSazSound = () => _playSound(sazSound);
export const playTarSound = () => _playSound(tarSound);
export const playTutekSound = () => _playSound(tutekSound);
export const playUdSound = () => _playSound(udSound);

export const playBeeSound = () => _playSound(beeSound);
export const playBirdSound = () => _playSound(birdSound);
export const playCatSound = () => _playSound(catSound);
export const playCowSound = () => _playSound(cowSound);
export const playDogSound = () => _playSound(dogSound);
export const playFrogSound = () => _playSound(frogSound);
export const playHorseSound = () => _playSound(horseSound);
export const playRoosterSound = () => _playSound(roosterSound);
export const playSheepSound = () => _playSound(sheepSound);
export const playWolfSound = () => _playSound(wolfSound);

