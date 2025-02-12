import { useEffect } from "react";
import { 
    Fullscreen, 
    FullscreenExit, 
    VolumeUp, 
    VolumeOff, 
    UnfoldMore,
    UnfoldLess
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useSoundStore } from "../../stores/soundStore";


interface ControllersProps {
    pageRef: React.RefObject<HTMLDivElement>;
    isFullscreen: boolean;
    onFullscreenChange: (isFullscreen: boolean) => void;
    showButton: boolean;
    buttonText: string;
    buttonOnClick: () => void;
    onHeightChange?: (type: 'increase' | 'decrease') => void;
}

function Controllers({pageRef, isFullscreen, onFullscreenChange, showButton, buttonText, buttonOnClick, onHeightChange}: ControllersProps) {
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
        <div className="py-5 flex flex-col md:flex-row gap-4">
            {/* Resize Controls - Left side */}
            <div className="flex justify-center md:justify-start gap-2 order-2 md:order-1 md:flex-1">
                <div className="flex gap-2">
                <button
                    title="Tam Ekran"
                    onClick={handleFullscreen}
                    className="relative w-14 h-14 bg-[#FF5C5C] hover:bg-[#FF7070] text-white font-medium rounded-full text-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
                >
                    <div className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {isFullscreen ? <FullscreenExit fontSize="large" /> : <Fullscreen fontSize="large" />}
                    </div>
                </button>
                <button
                    title="Səs"
                    onClick={toggleMute}
                    className="relative w-14 h-14 bg-[#FF5C5C] hover:bg-[#FF7070] text-white font-medium rounded-full text-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
                >
                    <div className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {isMuted ? <VolumeOff fontSize="large" /> : <VolumeUp fontSize="large" />}
                    </div>
                </button>
                
                    <button
                        title="Artır"
                        onClick={() => onHeightChange?.('increase')}
                        className="relative  w-14 h-14 bg-[#FF5C5C] hover:bg-[#FF7070] text-white font-medium rounded-full text-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
                    >
                        <div className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <UnfoldMore fontSize="large" />
                        </div>
                    </button>
                    <button
                        title="Azalt"
                        onClick={() => onHeightChange?.('decrease')}
                        className="relative w-14 h-14 bg-[#FF5C5C] hover:bg-[#FF7070] text-white font-medium rounded-full text-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
                    >   
                        <div className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <UnfoldLess fontSize="large" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Main Controls - Right side */}
            <div className="flex justify-center md:justify-end gap-4 order-1 md:order-2">
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
                
            </div>
        </div>
    )
}

export default Controllers;
