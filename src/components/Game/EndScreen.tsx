import medalImageSource from '../../assets/images/medal.png';
import { motion } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { restartGame, useGameplayStore } from '../../stores/gameplayStore';
import { playEndSound, stopCurrentSound } from '../../stores/soundStore';
import { useEffect } from 'react';
import Lang from './Lang';
import { Round } from '../../stores/gameplayStore';


function EndScreen() {
    const {rounds} = useGameplayStore();
    const {gameCount} = useGameStore();

    const totalGames = gameCount;
    const correctAnswers = rounds.filter((round: Round) => round.userAnswer === round.correctAnswer).length;
    const wrongAnswers = rounds.filter((round: Round) => round.userAnswer !== round.correctAnswer).length;

    useEffect(() => {
        playEndSound();
        return () => stopCurrentSound();
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Skip if any input element is focused
            if (document.activeElement?.tagName.toLowerCase() === 'input') {
                return;
            }
            
            if (e.key === 'Enter') {
                restartGame();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    

    return (
            <div className="flex flex-col items-center justify-center w-full h-full gap-2 lg:gap-8 p-4">
                {/* Top Section - Title with Medals */}
                <div className="flex items-center justify-center gap-4">
                    <motion.img
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0, rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        src={medalImageSource}
                        alt="Medal"
                        className="w-16 h-16"
                    />
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-white text-4xl font-bold"
                    >
                        <Lang>AFƏRİN</Lang>
                    </motion.h1>
                    <motion.img
                        initial={{ opacity: 0, scale: 0, rotate: 180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0, rotate: -180 }}
                        transition={{ duration: 0.5 }}
                        src={medalImageSource}
                        alt="Medal"
                        className="w-16 h-16"
                    />
                </div>

                {/* Results Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="rounded-3xl p-4 lg:p-8 w-full max-w-4xl"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.4, delay: 0.9 }}
                            className="flex lg:flex-col justify-evenly items-center bg-emerald-800 rounded-xl px-8 py-3 lg:py-5 backdrop-blur-sm border border-emerald-400 transition-all duration-300 hover:bg-emerald-700/50 hover:shadow-lg cursor-pointer group"
                        >
                            <span className="text-emerald-200 w-10/12 lg:w-auto text-2xl lg:text-lg font-semibold tracking-wide transition-transform duration-300 group-hover:-translate-y-1">
                                <Lang>DOĞRU</Lang>
                            </span>
                            <span className="text-4xl font-bold mt-0 lg:mt-2 text-emerald-400 drop-shadow-glow transition-transform duration-300 group-hover:scale-110">
                                {correctAnswers}
                            </span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.4, delay: 0.7 }}
                            className="flex lg:flex-col justify-evenly items-center bg-emerald-800 rounded-xl px-8 py-3 lg:py-5 backdrop-blur-sm border border-amber-400/30 transition-all duration-300 hover:bg-emerald-700/50 hover:shadow-lg cursor-pointer group"
                        >

                            <span className="text-amber-200 w-10/12 lg:w-auto text-2xl lg:text-lg font-semibold tracking-wide transition-transform duration-300 group-hover:-translate-y-1">
                                <Lang>OYUN SAYI</Lang>
                            </span>
                            <span className="text-4xl font-bold mt-0 lg:mt-2 text-amber-400 drop-shadow-glow transition-transform duration-300 group-hover:scale-110">
                                {totalGames}
                            </span>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.4, delay: 1.1 }}
                            className="flex lg:flex-col justify-evenly items-center bg-emerald-800 rounded-xl px-8 py-3 lg:py-5 backdrop-blur-sm border border-rose-400/30 transition-all duration-300 hover:bg-emerald-700/50 hover:shadow-lg cursor-pointer group"
                        >

                            <span className="text-rose-200 w-10/12 lg:w-auto text-2xl lg:text-lg font-semibold tracking-wide transition-transform duration-300 group-hover:-translate-y-1">
                                <Lang>YANLIŞ</Lang> 
                            </span>
                            <span className="text-4xl font-bold mt-0 lg:mt-2 text-rose-400 drop-shadow-glow transition-transform duration-300 group-hover:scale-110">
                                {wrongAnswers}
                            </span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bottom Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                    className="flex items-center gap-4"
                >

                    <h2 className="text-white text-3xl lg:text-5xl font-bold"><Lang>Sən dahisən!</Lang></h2>
                    <span className="text-3xl lg:text-5xl">👍</span>
                </motion.div>
            </div>
    );
}

export default EndScreen;
