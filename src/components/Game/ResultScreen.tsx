import likeImageSource from '../../assets/images/like.png';
import dislikeImageSource from '../../assets/images/dislike.png';
import sadImageSource from '../../assets/images/sad.png';
import wellDoneImageSource from '../../assets/images/well-done.png';
import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useGamePlayStore } from '../../stores/gamePlayStore';
import { useGameStore } from '../../stores/gameStore';
import { playTrueSound, playFalseSound } from '../../stores/soundStore';
import Lang from './Lang';

interface RoundReport {
    remainingGames: number;
    userAnswer: number|null;
    userSecondAnswer?: number|null;
    correctAnswer: number;
    correctSecondAnswer?: number;
    isCorrect: boolean;
    totalCorrect: number;
    totalIncorrect: number;
}


const reportItemVariant = tv({
    base: 'flex items-center justify-between text-white text-2xl font-semibold py-4 lg:text-xl lg:text-2xl',
})

interface ResultScreenProps {
    double: boolean;
    onComplete: () => void;
}

function ResultScreen({double, onComplete}: ResultScreenProps) {
    const { rounds, getCurrentRound, transformValue } = useGamePlayStore();
    const { gameCount } = useGameStore();
    const currentRound = getCurrentRound();
    const [report, setReport] = useState<RoundReport>();
    const { remainingGames, userAnswer, userSecondAnswer, correctAnswer, correctSecondAnswer, isCorrect, totalCorrect, totalIncorrect } = report || {};

    useEffect(() => {
        if (currentRound && currentRound.finished) {
            const remainingGames = gameCount - rounds.length;
            const userAnswer = currentRound.userAnswer;
            const userSecondAnswer = currentRound.secondUserAnswer;
            const correctAnswer = currentRound.correctAnswer;
            const correctSecondAnswer = currentRound.secondCorrectAnswer;
            let isCorrect, totalCorrect, totalIncorrect;
            if (double) {
                const isFirstCorrect = userAnswer === correctAnswer;
                const isSecondCorrect = userSecondAnswer === correctSecondAnswer;
                isCorrect = double ? isFirstCorrect && isSecondCorrect : isFirstCorrect;
                totalCorrect = rounds.filter(round => round.userAnswer === round.correctAnswer && round.secondUserAnswer === round.secondCorrectAnswer).length;
                totalIncorrect = rounds.filter(round => round.userAnswer !== round.correctAnswer || round.secondUserAnswer !== round.secondCorrectAnswer).length;
            } else {
                isCorrect = userAnswer === correctAnswer;
                totalCorrect = rounds.filter(round => round.userAnswer === round.correctAnswer).length;
                totalIncorrect = rounds.filter(round => round.userAnswer !== round.correctAnswer).length;
            }
            setReport({
                remainingGames,
                userAnswer,
                userSecondAnswer,
                correctAnswer,
                correctSecondAnswer,
                isCorrect,
                totalCorrect,
                totalIncorrect
            })
        }
    }, [currentRound, double])


    const firstImageSource = isCorrect ? likeImageSource : dislikeImageSource;
    const secondImageSource = isCorrect ? wellDoneImageSource : sadImageSource;

    useEffect(() => {
        if (isCorrect) {
            playTrueSound();
        } else {
            playFalseSound();
        }
    }, [isCorrect]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onComplete();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    
    const userAnswerContent = useMemo(() => {
        const userAnswerString = userAnswer === null ? "-" : userAnswer;
        if (double) {
            const userSecondAnswerString = userSecondAnswer === null ? "-" : userSecondAnswer;
            return `${userAnswerString} və ${userSecondAnswerString}`;
        }
        if (userAnswer && transformValue) {
            return transformValue(userAnswer);
        }
        return userAnswerString;
    }, [userSecondAnswer, userAnswer, double, transformValue]);

    const correctAnswerContent = useMemo(() => {
        if (double) {
            return `${correctSecondAnswer} və ${correctSecondAnswer}`;
        }
        if (correctAnswer && transformValue) {
            return transformValue(correctAnswer);
        }
        return correctAnswer;
    }, [correctSecondAnswer, correctAnswer, double, transformValue]);
    
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
                    <span className="text-right text-lg sm:text-xl lg:text-2xl">{userAnswerContent}</span>
                </motion.div>
                
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.5, delay: 0.5}}
                    className={reportItemVariant()}
                >
                    <span className="text-left text-lg sm:text-xl lg:text-2xl"><Lang>Doğru Cavab</Lang>:</span>
                    <span className="text-right text-lg sm:text-xl lg:text-2xl">{correctAnswerContent}</span>
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
