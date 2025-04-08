import likeImageSource from '../../assets/images/like.png';
import dislikeImageSource from '../../assets/images/dislike.png';
import sadImageSource from '../../assets/images/sad.png';
import wellDoneImageSource from '../../assets/images/well-done.png';
import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useGameplayStore } from '../../stores/gameplayStore';
import { useGameStore } from '../../stores/gameStore';
import { playTrueSound, playFalseSound, stopCurrentSound } from '../../stores/soundStore';
import Lang from './Lang';
import { Round } from '../../stores/gameplayStore';
import { ModeFeatures } from '../../helpers/types';
import { content as actionLangContent } from '../../pages/actions/Lang';
import { useLanguageStore } from '../../stores/languageStore';

interface RoundReport {
    remainingGames: number;
    userAnswer: number|null;
    userSecondAnswer: number|null;
    correctAnswer: number;
    correctSecondAnswer: number|null;
    result: 'correct' | 'wrong' | 'missed' | 'empty';
    totalCorrect: number;
    totalIncorrect: number;
}


const reportItemVariant = tv({
    base: 'flex items-center justify-between text-white text-2xl font-semibold py-4 lg:text-xl lg:text-4xl',
})

interface ResultScreenProps extends ModeFeatures {
    onComplete: () => void;
}

function ResultScreen({doubleInput, inputUnits, onComplete}: ResultScreenProps) {
    const { rounds, getCurrentRound } = useGameplayStore();
    const { gameCount } = useGameStore();
    const currentRound = getCurrentRound();
    const [report, setReport] = useState<RoundReport>();
    const [firstImageSource, setFirstImageSource] = useState<string>(likeImageSource);
    const [secondImageSource, setSecondImageSource] = useState<string>(wellDoneImageSource);
    const { remainingGames, userAnswer, userSecondAnswer, correctAnswer, correctSecondAnswer, result, totalCorrect, totalIncorrect } = report || {};
    const { language } = useLanguageStore();

    const [firstUnit, secondUnit] = useMemo(() => {
        if (inputUnits) {
            const units = inputUnits as string[];
            return [actionLangContent[language]![units[0]], actionLangContent[language]![units[1]]];
        }
        return [null, null];
    }, [inputUnits, language]);

    useEffect(() => {
        if (currentRound && currentRound.finished) {
            const remainingGames = gameCount - rounds.length;
            const userAnswer = currentRound.userAnswer;
            const userSecondAnswer = currentRound.secondUserAnswer;
            const correctAnswer = currentRound.correctAnswer;
            const correctSecondAnswer = currentRound.secondCorrectAnswer;
            const result = currentRound.result;
            if (result === 'correct') {
                setFirstImageSource(likeImageSource);
                setSecondImageSource(wellDoneImageSource);
            } else {
                setFirstImageSource(dislikeImageSource);
                setSecondImageSource(sadImageSource);
            }
            const totalCorrect = rounds.filter((round: Round) => round.result === 'correct').length;
            const totalIncorrect = rounds.length - totalCorrect;
            setReport({
                remainingGames,
                userAnswer,
                userSecondAnswer,
                correctAnswer,
                correctSecondAnswer,
                result,
                totalCorrect,
                totalIncorrect
            })
        }
    }, [currentRound, doubleInput, inputUnits])

    useEffect(() => {
        if (result === 'correct') {
            playTrueSound();
        } else {
            playFalseSound();
        }
        return () => stopCurrentSound();
    }, [result]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Skip if any input element is focused
            if (document.activeElement?.tagName.toLowerCase() === 'input') {
                return;
            }
            
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
        if (doubleInput) {
            const userSecondAnswerString = userSecondAnswer === null ? "-" : userSecondAnswer;
            if (inputUnits) {
                return `${userAnswerString} ${firstUnit} və ${userSecondAnswerString} ${secondUnit}`;
            }
            return `${userAnswerString} və ${userSecondAnswerString}`;
        }
        return userAnswerString;
    }, [userSecondAnswer, userAnswer, doubleInput, inputUnits, firstUnit, secondUnit]);

    const correctAnswerContent = useMemo(() => {
        if (doubleInput) {
            if (inputUnits) {
                return `${correctAnswer} ${firstUnit} və ${correctSecondAnswer} ${secondUnit}`;
            }
            return `${correctAnswer} və ${correctSecondAnswer}`;
        }
        return correctAnswer;
    }, [correctSecondAnswer, correctAnswer, doubleInput, inputUnits, firstUnit, secondUnit]);
    
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
                    <span className="text-left text-lg sm:text-xl lg:text-4xl"><Lang>Qalan Oyun Sayı</Lang>:</span>
                    <span className="text-right text-lg sm:text-xl lg:text-6xl">{remainingGames}</span>
                </motion.div>
                
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.5, delay: 0.25}}
                    className={reportItemVariant()}
                >
                    <span className="text-left text-lg sm:text-xl lg:text-4xl"><Lang>Sizin Cavab</Lang>:</span>
                    <span className="text-right text-lg sm:text-xl lg:text-6xl">{userAnswerContent}</span>
                </motion.div>
                
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.5, delay: 0.5}}
                    className={reportItemVariant()}
                >
                    <span className="text-left text-lg sm:text-xl lg:text-4xl"><Lang>Doğru Cavab</Lang>:</span>
                    <span className="text-right text-lg sm:text-xl lg:text-6xl">{correctAnswerContent}</span>
                </motion.div>
                
                <motion.div
                    initial={{opacity: 0, scale: 0}}
                    animate={{opacity: 1, scale: 1}}
                    exit={{opacity: 0, scale: 0}}
                    transition={{duration: 0.5, delay: 0.75}}
                    className={reportItemVariant()}
                >
                    <div className="text-left">
                        <div className='mb-2 underline text-lg sm:text-xl lg:text-4xl'><Lang>Ümumi Doğru</Lang></div>
                        <div className='text-center text-2xl sm:text-3xl lg:text-6xl'>{totalCorrect}</div>
                    </div>
                    <div className="text-left">
                        <div className='mb-2 underline text-lg sm:text-xl lg:text-4xl'><Lang>Ümumi Yanlış</Lang></div>
                        <div className='text-center text-2xl sm:text-3xl lg:text-6xl'>{totalIncorrect}</div>
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
