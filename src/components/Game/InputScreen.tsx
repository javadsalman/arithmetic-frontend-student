import { tv } from "tailwind-variants";
import Timer from "./components/Timer";
import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useGameplayStore } from "../../stores/gameplayStore";
import { useGameStore } from "../../stores/gameStore";


const inputScreen = tv({
    base: "flex flex-col items-center justify-center h-full w-full transition-all duration-500",
    variants: {
        show: {
            true: "",
            false: "opacity-0 invisible scale-0",
        }
    }
})

interface InputScreenProps {
    onComplete: () => void;
}

function InputScreen({onComplete}: InputScreenProps) {

    const { answerDuration } = useGameStore();
    const { currentUserAnswer, setCurrentUserAnswer, answerCurrentRound } = useGameplayStore();

    const inputRef = useRef<HTMLInputElement>(null);
    
    const focusInput = useCallback(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 200);
    }, []);

    useEffect(() => {
        return focusInput();
    }, [focusInput]);

    const timerOnComplete = () => {
        onComplete();
    }

    useEffect(() => {
        setCurrentUserAnswer("");
    }, [onComplete]);

    useEffect(() => {
        return () => {
            answerCurrentRound();
        }
    }, [])


    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            setCurrentUserAnswer(value);
        }
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onComplete();
        }
    }

    return (
        <div className={inputScreen({show: true})}>


            <motion.input 
                title="Enter your answer" 
                ref={inputRef} 
                type="text" 
                value={currentUserAnswer}
                onChange={inputOnChange}
                onKeyDown={onKeyPress}
                className="bg-transparent text-center text-white text-[200px] font-pangolin w-10/12 border-4 border-dotted border-white/50 rounded-xl px-10 outline-none mb-10" 
                initial={{opacity: 0, y: -100}}


                animate={{opacity: 1, y: 0}}


                transition={{duration: 0.7}}
            />
            <motion.div 
                className="relative"
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.7}}
            >
                <div className="flex items-center justify-center">
                    <Timer 
                        duration={answerDuration * 1000} 
                        redAlertSeconds={Math.floor(answerDuration / 2)} 
                        showText 
                        size={80} 
                        sound 
                        start={true} 
                        onComplete={timerOnComplete}
                    />
                </div>
            </motion.div>
        </div>
    )
}

export default InputScreen;
