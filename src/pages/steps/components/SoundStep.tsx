import Lang from "../../home/Lang";
import SoundCard from "../../../components/Step/SoundCard";
import { INSTRUMENTS, ANIMALS, DIGIT_STEP } from "../constants";
import { useSoundStore } from "../../../stores/soundStore";
import { useEffect, useState } from "react";
import { stopCurrentSound } from "../../../stores/soundStore";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { useGameStore } from "../../../stores/gameStore";

interface SoundListProps {
    soundsType: 'instruments' | 'animals';
}

function SoundList({ soundsType }: SoundListProps) {
    const { setIsMuted } = useSoundStore();
    const [playingIndex, setPlayingIndex] = useState(0);
    const currentPlaylist = soundsType === 'instruments' ? INSTRUMENTS : ANIMALS;
    const navigate = useNavigate();
    const { gameType, gameMode } = useGameStore();

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
        navigate(`/game/${gameType}/${gameMode}/steps/${DIGIT_STEP}`);
    }

    useEffect(() => {
        setIsMuted(false);
    }, [setIsMuted]);
    return (
        <div className="mx-auto">
            <h2 className="text-2xl font-semibold text-[#FF4D4F] mb-8 text-center">
                <Lang>Rəqəmlərə uyğun səsləri öyrən</Lang>
            </h2>
            <div className="flex flex-wrap gap-10 justify-center">
                {currentPlaylist.map((item, index) => (
                    <SoundCard key={item.title} {...item} index={index} isPlaying={playingIndex === index} onPlay={() => handlePlay(index)} />
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
        </div>
    )
}

export default SoundList;
