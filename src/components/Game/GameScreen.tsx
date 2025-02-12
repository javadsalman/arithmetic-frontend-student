import { useEffect, useState, useMemo } from "react";
import { tv } from "tailwind-variants";
import { AnimatePresence, motion } from "framer-motion";
import { useGameplayStore } from "../../stores/gameplayStore";
import { useGameStore } from "../../stores/gameStore";
import { playIqSound, playNumberSound } from "../../stores/soundStore";





interface GameScreenProps {
    onComplete: () => void;
}

const gameScreen = tv({
    base: "flex flex-col items-center justify-center h-full w-full",
    variants: {
        show: {
            true: "",
            false: "hidden",
        }
    }
})

const getFontSize = (number: number) => {
    const length = String(number).length;
    if (length < 4) return 'text-[100px] md:text-[200px]';
    if (length < 6) return 'text-[80px] md:text-[200px]';
    if (length < 8) return 'text-[60px] md:text-[170px]';
    if (length < 10) return 'text-[50px] md:text-[140px]';
    if (length < 12) return 'text-[40px] md:text-[110px]';
    return 'text-[30px] md:text-[80px]';
};

const GameScreen = ({onComplete}: GameScreenProps) => {
    const {getCurrentCalcItems} = useGameplayStore();
    const calcItems = getCurrentCalcItems();
    const [currentItem, setCurrentItem] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const { betweenDuration } = useGameStore();
    
    const numberFontSize = useMemo(() => getFontSize(currentItem), [currentItem]);

    useEffect(() => {
        if (calcItems.length === 0) return;
        setCurrentItem(calcItems[0]);
        playNumberSound();
        let counter = 1;

        const interval = setInterval(() => {
            if (counter >= calcItems.length) {
                onComplete();
                clearInterval(interval);
            }
            setCurrentItem(calcItems[counter]);
            setCounter(counter);
            counter < calcItems.length && playNumberSound();
            counter++;

        }, betweenDuration * 1000);
        return () => clearInterval(interval);
    }, [calcItems, betweenDuration]);


    useEffect(() => {
        playIqSound();
    }, []);


    return (
        <div className={gameScreen({show: true})}>
            <div className="flex flex-col items-center justify-center h-full w-full">
                <AnimatePresence>
                    <motion.div
                        key={counter}
                        initial={{opacity: 0, scale: 0}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0}}
                        transition={{duration: 0.3}}
                    >
                        <div key={counter} className={`text-white font-pangolin tracking-wider absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${numberFontSize}`}>
                            <span>{currentItem ? currentItem : null}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )


}

export default GameScreen;
