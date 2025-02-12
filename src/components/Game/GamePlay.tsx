import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import BoardLayout from "./BoardLayout";
import { tv } from "tailwind-variants";
import GameScreen from "./GameScreen";
import InputScreen from "./InputScreen";
import Controllers from "./Controllers";
import { AnimatePresence, motion } from "framer-motion";
import { finishInput, restartGame, startGame, useGameplayStore } from "../../stores/gameplayStore";
import ResultScreen from "./ResultScreen";
import EndScreen from "./EndScreen";
import EntranceScreen from "./EnteranceScreen";
import { content as langContent } from "./Lang";
import { useLanguageStore } from "../../stores/languageStore";

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

const heightVariants = {
    xs: 'h-[calc(100vh-500px)]',
    sm: 'h-[calc(100vh-400px)]',
    md: 'h-[calc(100vh-300px)]',
    lg: 'h-[calc(100vh-200px)]',
    xl: 'h-[calc(100vh-100px)]'
} as const;

type HeightVariant = keyof typeof heightVariants;

function GamePlay() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [heightSize, setHeightSize] = useState<HeightVariant>('md');
    const pageRef = useRef<HTMLDivElement>(null);
    const boardRef = useRef<HTMLDivElement>(null);
    const {
        screen, 
        setScreen,
    } = useGameplayStore();
    const { language } = useLanguageStore();
    
    const handleHeightChange = useCallback((type: 'increase' | 'decrease') => {
        setHeightSize(prev => {
            const sizes: HeightVariant[] = ['xs', 'sm', 'md', 'lg', 'xl'];
            const currentIndex = sizes.indexOf(prev);
            if (type === 'increase' && currentIndex < sizes.length - 1) {
                return sizes[currentIndex + 1];
            }
            if (type === 'decrease' && currentIndex > 0) {
                return sizes[currentIndex - 1];
            }
            return prev;
        });
    }, []);

    const controllerProps: ControllerProps = useMemo(() => {
        if (screen === "input") {
            return {
                showButton: true,
                buttonText: langContent[language]!['Cavabla'],
                buttonOnClick: finishInput
            }
        } else if (screen === 'result') {
            return {
                showButton: true,
                buttonText: langContent[language]!['Növbəti'],
                buttonOnClick: startGame
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
    }, [screen])

    const onEnteranceComplete = useCallback(() => {
        startGame()
    }, [])

    const onGameComplete = useCallback(() => {
        setScreen("input");
    }, [])

    const onInputComplete = useCallback(() => {
        finishInput()
    }, [])

    useEffect(() => {
        restartGame();
    }, [])

    const screenContent = useMemo(() => {
        switch (screen) {
            case "enterance":
                return <EntranceScreen boardRef={boardRef} onComplete={onEnteranceComplete} duration={1000} wait={3000} disappear={500} />;
            case "game":
                return <GameScreen onComplete={onGameComplete} />;
            case "input":
                return <InputScreen onComplete={onInputComplete} />;
            case "result":
                return <ResultScreen />;
            case "end":
                return <EndScreen />;
        }
    }, [screen]);

    return (
        <div ref={pageRef} className={page({fullscreen: isFullscreen})}>
            <div className={`w-full transition-all duration-300 ${heightVariants[heightSize]}`}>
                <BoardLayout boardRef={boardRef}>
                    <AnimatePresence mode="wait">
                        <motion.div className="w-full h-full" key={screen} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}}> 
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
                onHeightChange={handleHeightChange}
            />
        </div>
    );
}

export default GamePlay;

