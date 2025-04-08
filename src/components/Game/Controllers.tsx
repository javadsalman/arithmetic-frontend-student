import { useEffect } from "react";
import { 
    Fullscreen, 
    FullscreenExit, 
    VolumeUp, 
    VolumeOff, 
    UnfoldMore,
    UnfoldLess
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundStore } from "../../stores/soundStore";
import { useGameplayStore } from "../../stores/gameplayStore";
import { useGameStore } from "../../stores/gameStore";
import { useNotificationStore } from "../../stores/notificationStore";

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
    const gameplayStore = useGameplayStore();
    const gameStore = useGameStore();
    const { setNotification } = useNotificationStore();

    const handleReportDownload = () => {
        const report = {gameplayStore, gameStore};
        const title = window.prompt('Hansı problemlə üzləşdiyinizi qeyd edin:');
        
        if (!title) {
            setNotification(
                'Başlıq daxil edilmədi. Report yaradılmadı.',
                'error',
                'filled',
                { vertical: 'top', horizontal: 'right' }
            );
            return;
        }
        
        try {
            // Convert report data to a string (formatted JSON)
            const reportData = JSON.stringify(report, null, 2);
            
            // Create a Blob with the data - use text/plain for simplicity
            const blob = new Blob([
                `Title: ${title}\n\n`,
                `Generated Date: ${new Date().toLocaleString()}\n\n`,
                `Report Data:\n${reportData}`
            ], { type: 'text/plain' });
            
            // Create a temporary anchor element to trigger download
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${title.replace(/\s+/g, '_')}_report.txt`;
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);
            
            setNotification(
                'Report uğurla endirildi',
                'success',
                'filled',
                { vertical: 'top', horizontal: 'right' }
            );
        } catch (error) {
            setNotification(
                'Report yaradılarkən xəta baş verdi',
                'error',
                'filled',
                { vertical: 'top', horizontal: 'right' }
            );
        }
    }

    const handleFullscreen = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur();
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
                    <button
                        title="Report Kopyala"
                        onClick={handleReportDownload}
                        className="relative w-14 h-14 bg-[#FF5C5C] hover:bg-[#FF7070] text-white font-medium rounded-full text-lg shadow-lg transition-colors duration-200 flex items-center gap-2"
                    >   
                        <div className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            R
                        </div>
                    </button>
                </div>
            </div>

            {/* Main Controls - Right side */}
            <div className="flex justify-center md:justify-end gap-4 order-1 md:order-2 h-14">
                <AnimatePresence mode="wait">
                    {showButton && (
                        <motion.button 
                            key={buttonText}
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
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Controllers;
