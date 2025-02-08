import { useEffect, useState } from "react";
import { Fullscreen, FullscreenExit, VolumeUp, VolumeOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useSoundStore } from "../../stores/soundStore";

interface ControllersProps {
    pageRef: React.RefObject<HTMLDivElement>;
    isFullscreen: boolean;
    onFullscreenChange: (isFullscreen: boolean) => void;
    showButton: boolean;
    buttonText: string;
    buttonOnClick: () => void;
}

function Controllers({pageRef, isFullscreen, onFullscreenChange, showButton, buttonText, buttonOnClick}: ControllersProps) {
    const { isMuted, toggleMute } = useSoundStore();

    const handleFullscreen = () => {
        if (!isFullscreen) {
            if (pageRef.current?.requestFullscreen) {
                pageRef.current.requestFullscreen();
                onFullscreenChange(true);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                onFullscreenChange(false);
            }
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                onFullscreenChange(false);
            }
        };

        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'F11') {
                e.preventDefault();
                if (pageRef.current) {
                    if (!document.fullscreenElement) {
                        pageRef.current.requestFullscreen();
                        onFullscreenChange(true);
                    } else {
                        document.exitFullscreen();
                        onFullscreenChange(false);
                    }
                }
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('keydown', handleKeyPress);
        
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    
    return (
        <div className="py-5 flex justify-end gap-4">
            {showButton && (
                <motion.button 
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0.9}}
                    transition={{duration: 0.5}}
                    onClick={buttonOnClick}
                    className="bg-[#FF5C5C] hover:bg-[#FF7070] text-white font-medium py-2 px-8 rounded-full text-lg shadow-lg transition-colors duration-200"
                >
                    {buttonText}
                </motion.button>
            )}
            <button
                title="Səs"
                onClick={toggleMute}
                className="bg-[#FF5C5C] hover:bg-[#FF7070] text-white font-medium py-2 px-3 rounded-full text-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
            >
                <div className="text-2xl">
                    {isMuted ? <VolumeOff fontSize="large" /> : <VolumeUp fontSize="large" />}
                </div>
            </button>
            <button
                title="Tam Ekran"
                onClick={handleFullscreen}
                className="bg-[#FF5C5C] hover:bg-[#FF7070] text-white font-medium py-2 px-3 rounded-full text-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
            >
                <div className="text-2xl">
                    {isFullscreen ? <FullscreenExit fontSize="large" /> : <Fullscreen fontSize="large" />}
                </div>
            </button>
        </div>
    )
}

export default Controllers;
