import { useEffect, useState } from "react";
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


const GameScreen = ({onComplete}: GameScreenProps) => {
    const {getCurrentCalcItems} = useGameplayStore();
    const calcItems = getCurrentCalcItems();
    const [currentItem, setCurrentItem] = useState<number>(0);
    const [counter, setCounter] = useState<number>(0);
    const { betweenDuration } = useGameStore();
    

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
                        <div key={counter} className="text-white text-[200px] font-pangolin tracking-wider absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span>{currentItem ? currentItem : null}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )


}

export default GameScreen;
