import likeImageSource from '../../assets/images/like.png';
import dislikeImageSource from '../../assets/images/dislike.png';
import sadImageSource from '../../assets/images/sad.png';
import wellDoneImageSource from '../../assets/images/well-done.png';
import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGameplayStore } from '../../stores/gameplayStore';
import { useGameStore } from '../../stores/gameStore';
import { playTrueSound, playFalseSound } from '../../stores/soundStore';
import Lang from './Lang';

interface RoundReport {
    remainingGames: number;
    userAnswer: number|null;
    correctAnswer: number;
    isCorrect: boolean;
    totalCorrect: number;
    totalIncorrect: number;
}


const reportItemVariant = tv({
    base: 'flex items-center justify-between text-white text-2xl font-semibold py-4 lg:text-xl lg:text-2xl',
})

function ResultScreen() {
    const { rounds, getCurrentRound } = useGameplayStore();
    const { gameCount } = useGameStore();
    const currentRound = getCurrentRound();
    const [report, setReport] = useState<RoundReport>();
    const { remainingGames, userAnswer, correctAnswer, isCorrect, totalCorrect, totalIncorrect } = report || {};

    useEffect(() => {
        if (currentRound && currentRound.finished) {
            const remainingGames = gameCount - rounds.length;
            const userAnswer = currentRound.userAnswer;
            const correctAnswer = currentRound.correctAnswer;
            const isCorrect = userAnswer === correctAnswer;
            const totalCorrect = rounds.filter(round => round.userAnswer === round.correctAnswer).length;
            const totalIncorrect = rounds.filter(round => round.userAnswer !== round.correctAnswer).length;
            setReport({
                remainingGames,
                userAnswer,
                correctAnswer,
                isCorrect,
                totalCorrect,
                totalIncorrect
            })
        }
    }, [currentRound])


    const firstImageSource = isCorrect ? likeImageSource : dislikeImageSource;
    const secondImageSource = isCorrect ? wellDoneImageSource : sadImageSource;

    useEffect(() => {
        if (isCorrect) {
            playTrueSound();
        } else {
            playFalseSound();
        }
    }, [isCorrect]);
    
    
    return (
        <div className="flex flex-col px-4 sm:px-10 lg:px-0 lg:flex-row gap-4 lg:gap-8 items-center justify-evenly h-full w-full">
            {/* Left Column - Text Content */}
            <div className="flex flex-col divide-y divide-white/20 w-full lg:w-1/2 max-w-[600px]">
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.5, delay: 0}}
                    className={reportItemVariant()}
                >
                    <span className="text-left text-lg sm:text-xl lg:text-2xl"><Lang>Qalan Oyun sayı</Lang>:</span>
                    <span className="text-right text-lg sm:text-xl lg:text-2xl">{remainingGames}</span>
                </motion.div>
                
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.5, delay: 0.25}}
                    className={reportItemVariant()}
                >
                    <span className="text-left text-lg sm:text-xl lg:text-2xl"><Lang>Sizin Cavab</Lang>:</span>
                    <span className="text-right text-lg sm:text-xl lg:text-2xl">{userAnswer}</span>
                </motion.div>
                
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.5, delay: 0.5}}
                    className={reportItemVariant()}
                >
                    <span className="text-left text-lg sm:text-xl lg:text-2xl"><Lang>Doğru Cavab</Lang>:</span>
                    <span className="text-right text-lg sm:text-xl lg:text-2xl">{correctAnswer}</span>
                </motion.div>
                
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.5, delay: 0.75}}
                    className={reportItemVariant()}
                >
                    <div className="text-left">
                        <div className='mb-2 underline text-lg sm:text-xl lg:text-2xl'><Lang>Ümumi Doğru</Lang></div>
                        <div className='text-center text-2xl sm:text-3xl lg:text-4xl'>{totalCorrect}</div>
                    </div>
                    <div className="text-left">
                        <div className='mb-2 underline text-lg sm:text-xl lg:text-2xl'><Lang>Ümumi Yanlış</Lang></div>
                        <div className='text-center text-2xl sm:text-3xl lg:text-4xl'>{totalIncorrect}</div>
                    </div>
                </motion.div>
            </div>

            {/* Right Column - Images */}
            <div className="hidden sm:flex flex-row gap-6 lg:flex-col lg:gap-0 items-center justify-center space-y-0 lg:space-y-4">
                <motion.img
                    initial={{opacity: 0, scale: 0, rotate: -90}}
                    animate={{opacity: 1, scale: 1, rotate: 0}} 
                    exit={{opacity: 0, scale: 0, rotate: -90}}
                    transition={{
                        duration: 0.5,
                        delay: 0,
                        rotate: {
                            duration: 0.8,
                            ease: "easeOut",
                            originX: 0
                        }
                    }}
                    src={firstImageSource} 
                    alt="Thumbs up" 
                    className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40" 
                />
                <motion.img
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}} 
                    exit={{opacity: 0, scale: 0}}
                    transition={{
                        duration: 0.5,
                        delay: 0.5,
                    }}
                    src={secondImageSource} 
                    alt="Well done badge" 
                    className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40" 
                />
            </div>
        </div>
    );
}

export default ResultScreen;
