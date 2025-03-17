import Lang, { content as langContent } from "../Lang";
import SoundCard from "../../../components/Step/SoundCard";
import { INSTRUMENTS, ANIMALS, NUMBER_STEP } from "../constants";
import { useSoundStore } from "../../../stores/soundStore";
import { useEffect, useState } from "react";
import { stopCurrentSound } from "../../../stores/soundStore";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useGameStore } from "../../../stores/gameStore";
import { useLanguageStore } from "../../../stores/languageStore";

interface SoundListProps {
    soundsType: 'instruments' | 'animals';
}

function SoundList({ soundsType }: SoundListProps) {
    const { setIsMuted } = useSoundStore();
    const [playingIndex, setPlayingIndex] = useState(-1);
    const currentPlaylist = soundsType === 'instruments' ? INSTRUMENTS : ANIMALS;
    const navigate = useNavigate();
    const { gameType, gameMode } = useGameStore();
    const { language } = useLanguageStore();

    const handlePlay = (index: number) => {
        if (playingIndex === index) {
            stopCurrentSound();
            setPlayingIndex(-1);
        } else {
            setPlayingIndex(index);
            currentPlaylist[index].onPlay();
        }
    }

    const handleNext = () => {
        navigate(`/game/${gameType}/${gameMode}/steps/${NUMBER_STEP}`);
    }

    const handleStart = () => {
        navigate(`/game/${gameType}/${gameMode}/game`);
    }

    useEffect(() => {
        setIsMuted(false);
        return () => stopCurrentSound();
    }, [setIsMuted]);
    return (
        <div className="mx-auto">
            <h2 className="text-2xl font-semibold text-[#FF4D4F] mb-8 text-center">
                <Lang>Rəqəmlərə uyğun səsləri öyrən</Lang>
            </h2>
            <div className="flex flex-wrap gap-10 justify-center">
                {currentPlaylist.map((item, index) => (
                    <SoundCard key={item.title} title={langContent[language]![item.title]} iconSrc={item.iconSrc}  index={index} isPlaying={playingIndex === index} onPlay={() => handlePlay(index)} />
                ))}
            </div>
            <div className="flex justify-center max-w-md mx-auto mt-7"> 
                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                >
                    <Lang>NÖVBƏTİ</Lang>
                </Button>
            </div>
            <div className="flex justify-center max-w-md mx-auto mt-2"> 
                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleStart}
                >
                    <Lang>BAŞLA</Lang>
                </Button>
            </div>
            <div className="flex justify-center max-w-md mx-auto mt-2"> 
                <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/actions`)}
                >
                    <Lang>GERİ</Lang>
                </Button>
            </div>
        </div>
    )
}

export default SoundList;
