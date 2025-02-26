import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import BoardLayout from "./BoardLayout";
import { tv } from "tailwind-variants";
import GameScreen from "./GameScreen";
import InputScreen from "./InputScreen";
import Controllers from "./Controllers";
import { AnimatePresence, motion } from "framer-motion";
import { restartGame, startGame, useGameplayStore, changeHeightSize, HeightSize, showResult, showEnd, showInput, isAllRoundsFinished } from "../../stores/gameplayStore";
import ResultScreen from "./ResultScreen";
import EndScreen from "./EndScreen";
import EntranceScreen from "./EnteranceScreen";
import { content as langContent } from "./Lang";
import { useLanguageStore } from "../../stores/languageStore";
import { useGameStore } from "../../stores/gameStore";
import { ACTIONS_FEATURES } from "../../pages/actions/constants";
import { FORMULES_FEATURES } from "../../pages/formules/constants";
import { FormuleMode } from "../../lib/formules/types";
import { ActionMode } from "../../pages/actions/types";

type ControllerProps = {
    showButton: boolean;
    buttonText: string;
    buttonOnClick: () => void;
}

const page = tv({
    base: "w-full h-full user-select-none",
    variants: {
        fullscreen: {
            true: "absolute top-0 left-0 px-10 bg-main-pattern flex flex-col items-center justify-center",
        }
    }
})


export const heightVariants: Record<HeightSize, string> = {
    xs: 'h-[calc(100vh-500px)]',
    sm: 'h-[calc(100vh-400px)]',
    md: 'h-[calc(100vh-300px)]',
    lg: 'h-[calc(100vh-200px)]',
    xl: 'h-[calc(100vh-100px)]'
} as const;

function GamePlay() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const pageRef = useRef<HTMLDivElement>(null);
    const boardRef = useRef<HTMLDivElement>(null);
    const { gameType, gameMode } = useGameStore();
    const {
        screen, 
        heightSize,
    } = useGameplayStore();
    const { language } = useLanguageStore();
    const allRoundsFinished = isAllRoundsFinished();

    const gameFeatures = useMemo(() => {
        if (gameType === 'formules') {
            return FORMULES_FEATURES[gameMode as FormuleMode];
        } else if (gameType === 'actions') {
            return ACTIONS_FEATURES[gameMode as ActionMode];
        } else {
            throw new Error("Invalid game type");
        }
    }, [gameType, gameMode])

    const controllerProps: ControllerProps = useMemo(() => {
        if (screen === "input" || (screen === "game" && gameFeatures.singleQuestion)) {
            return {
                showButton: true,
                buttonText: langContent[language]!['Cavabla'],
                buttonOnClick: showResult
            }
        } else if (screen === 'result') {
            if (allRoundsFinished) {
                return {
                    showButton: true,
                    buttonText: langContent[language]!['Nəticə'],
                    buttonOnClick: showEnd
                }
            } else {
                return {
                    showButton: true,
                    buttonText: langContent[language]!['Növbəti'],
                    buttonOnClick: startGame
                }
            }
        } else if (screen === 'end') {
            return {
                showButton: true,
                buttonText: langContent[language]!['Yenidən oyna'],
                buttonOnClick: restartGame
            }
        }
        return {
            showButton: false,
            buttonText: "",
            buttonOnClick: () => {}
        }
    }, [screen, allRoundsFinished, language])


    const onGameComplete = useCallback(() => {
        if (gameFeatures.singleQuestion) {
            showResult();
        } else {
            showInput();
        }
    }, [])


    useEffect(() => {
        restartGame();
    }, [])


    const screenContent = useMemo(() => {
        switch (screen) {
            case "enterance":
                return <EntranceScreen boardRef={boardRef} onComplete={startGame} duration={1000} wait={3000} disappear={500} />;
            case "game":
                return <GameScreen onComplete={onGameComplete} onInputComplete={showResult} {...gameFeatures} />;
            case "input":
                return <InputScreen onComplete={showResult} doubleInput={gameFeatures.doubleInput} />;
            case "result":
                return <ResultScreen {...gameFeatures} onComplete={allRoundsFinished ? showEnd : startGame} />;
            case "end":
                return <EndScreen />;
        }
    }, [screen, gameFeatures, allRoundsFinished]);

    return (
        <div ref={pageRef} className={page({fullscreen: isFullscreen})}>
            <div className={`w-full transition-all duration-300 ${heightVariants[heightSize]} font-comic`}>
                <BoardLayout boardRef={boardRef}>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            className="w-full h-full" 
                            key={screen} 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}} 
                            exit={{opacity: 0}} 
                            transition={{
                                enter: {duration: 0.1},
                                exit: {duration: 0.02}
                            }}
                        > 
                            {screenContent}
                        </motion.div>
                    </AnimatePresence>
                </BoardLayout>
            </div>
            <Controllers 
                {...controllerProps} 
                pageRef={pageRef} 
                isFullscreen={isFullscreen} 
                onFullscreenChange={setIsFullscreen}
                onHeightChange={changeHeightSize}
            />
        </div>
    );
}

export default GamePlay;

