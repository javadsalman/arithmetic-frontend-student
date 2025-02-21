import { useEffect, useState, useMemo, useRef } from "react";
import { tv } from "tailwind-variants";
import { AnimatePresence, motion } from "framer-motion";
import { useGameplayStore } from "../../stores/gameplayStore";
import { useGameStore } from "../../stores/gameStore";
import { playNumberSound, stopCurrentSound } from "../../stores/soundStore";
import { ModeFeatures } from "../../helpers/types";
import InputForm from "./components/InputForm";
import Random from "../../lib/formules/random";

const random = new Random();
interface CalcItem {
    text: string;
    value: number;
}

const gameScreenVariants = tv({
    base: "flex flex-col items-center justify-center h-full w-full",
    variants: {
        show: {
            true: "",
            false: "hidden",
        }
    }
})

const inputVariants = tv({
    slots: {
        container: "",
        input: "",
        timer: "",
        inputContainer: "",
    },
    variants: {
        doubleInput: {
            true: {
                container: "w-full grid grid-cols-2 items-center justify-center gap-x-5 pt-8",
                input: "w-full text-[40px]",
                timer: "col-span-2",
            },
            false: {
                container: "w-full flex items-center justify-center gap-1 pt-8",
                input: "w-full text-[40px]",
                timer: "ml-4",
            },
        },
        inputTitles: {
            true: {
                inputContainer: "flex flex-col gap-1"
            },
        }
    },
    compoundVariants: [
        {
            inputTitles: false,
            doubleInput: true,
            class: {
                container: "gap-y-5"
            }
        }
    ]
})

const numberVariants = tv({
    base: "flex flex-col items-center justify-center text-white font-leckerli-one tracking-wider absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
    variants: {
        size: {
            lessThan4: "text-[100px] md:text-[200px]",
            lessThan6: "text-[80px] md:text-[180px]",
            lessThan8: "text-[60px] md:text-[150px]",
            lessThan10: "text-[50px] md:text-[120px]",
            lessThan12: "text-[40px] md:text-[80px]",
            biggerThan12: "text-[30px] md:text-[60px]",
        },
        doubleQuestion: {
            true: "flex gap-1",
            false: "",
        }
    }
})

const columnVariants = tv({
    base: "",
    variants: {
        flipped: {
            true: "rotate-180",
            false: "",
        }
    }
})

const getFontSize = (text: string) => {
    const length = text.length;
    if (length < 4) return 'lessThan4';
    if (length < 6) return 'lessThan6';
    if (length < 8) return 'lessThan8';
    if (length < 10) return 'lessThan10';
    if (length < 12) return 'lessThan12';
    return 'biggerThan12';
};


interface GameScreenProps extends ModeFeatures {
    onComplete: () => void;
    onInputComplete: () => void;
}

const GameScreen = ({onComplete, onInputComplete, flipped, singleQuestion, randomPosition, doubleInput, doubleColumn, doubleRow, soundNumbers, inputTitles, randomRotate}: GameScreenProps) => {
    const {input, container, timer, inputContainer} = inputVariants({doubleInput: doubleInput, inputTitles: !!inputTitles});
    const {getCurrentCalcItems, getCurrentSecondCalcItems} = useGameplayStore();
    const calcItems = getCurrentCalcItems();
    const secondCalcItems = getCurrentSecondCalcItems();
    const [currentItem, setCurrentItem] = useState<CalcItem|null>(null);
    const [secondCurrentItem, setSecondCurrentItem] = useState<CalcItem|null>(null);
    const [counter, setCounter] = useState<number>(0);
    // const [setNumberPositions, setSetNumberPositions] = useState<[number, number]>([50, 50]);
    // const [setRotate, setSetRotate] = useState<number>(0);
    const { betweenDuration } = useGameStore();
    const { currentUserAnswer, secondUserAnswer, setCurrentUserAnswer, setSecondUserAnswer, answerCurrentRound, timestamp } = useGameplayStore();
    const { answerDuration } = useGameStore();
    const displayString = useMemo(() => {
        if (currentItem && secondCurrentItem) {
            return `${currentItem.text} | ${secondCurrentItem.text}`;
        }
        return currentItem?.text;
    }, [currentItem, secondCurrentItem]);

    const positions = useMemo(() => {
        if (randomPosition) {
            return [random.getRandomInt(25, 75), random.getRandomInt(25, 75)];
        }
        return [50, 50];
    }, [randomPosition, currentItem]);

    const rotate = useMemo(() => {
        if (randomRotate) {
            return random.getRandomInt(0, 360);
        }
        if (flipped && !doubleColumn) {
            return 180;
        }
        return 0;
    }, [randomRotate, flipped, doubleColumn, currentItem]);
    

    const numberRef = useRef<HTMLDivElement>(null);

    const numberFontSize = useMemo(() => {
        if (randomPosition || !displayString) {
            return 'lessThan12';
        }
        const size = getFontSize(displayString);
        return size;
    }, [displayString]);


    useEffect(() => {
        setCurrentUserAnswer("");
        setSecondUserAnswer("");
        return () => {
            answerCurrentRound();
        }
    }, [onInputComplete]);

    useEffect(() => {
        if (calcItems.length === 0) return;
        setCurrentItem(calcItems[0]);
        secondCalcItems && setSecondCurrentItem(secondCalcItems[0]);
        let counter = 1;

        if (singleQuestion) return;

        const interval = setInterval(() => {
            if (counter >= calcItems.length) {
                onComplete();
                clearInterval(interval);
                return;
            }
            const currentItem = calcItems[counter];

            // if (randomPosition) {
            //     setSetNumberPositions([random.getRandomInt(25, 75), random.getRandomInt(25, 75)]);
            // }
            // if (randomRotate) {
            //     setSetRotate(random.getRandomInt(0, 360));
            // } else if (flipped && !doubleColumn) {
            //     setSetRotate(180);
            // }


            setCurrentItem(currentItem);
            secondCalcItems && setSecondCurrentItem(secondCalcItems[counter]);
            setCounter(counter);

            counter++;

        }, betweenDuration * 1000);
        return () => clearInterval(interval);
    }, [calcItems, betweenDuration, randomPosition, randomRotate, flipped, singleQuestion]);

    useEffect(() => {
        if (soundNumbers && currentItem) {
            soundNumbers[currentItem.value]();
            return () => stopCurrentSound();
        } else {
            playNumberSound();
        }
    }, [currentItem, soundNumbers]);

    const displayContent = useMemo(() => {
        if (doubleColumn && displayString) {
            const displayStrings = displayString.split(' | ');
            return (<div className="flex items-center justify-center">
                <div className={columnVariants({flipped: flipped})}>{displayStrings[0]}</div>
                <div className="text-center mx-5">|</div>
                <div className={columnVariants({flipped: flipped})}>{displayStrings[1]}</div>
            </div>)
        }
        if (doubleRow && displayString) {
            let firstNumber, secondNumber, operator;
            if (displayString.includes('+')) {
                [firstNumber, secondNumber] = displayString.split('+');
                operator = '+';
            } else if (displayString.includes('-')) {
                [firstNumber, secondNumber] = displayString.split('-');
                operator = '-';
            }
            return (<div className="">
                <div className="text-5xl">{firstNumber}</div>
                <div className="text-center text-6xl">{operator}</div>
                <div className="text-5xl">{secondNumber}</div>
            </div>)
        }
        return displayString;
    }, [displayString, doubleColumn, flipped, doubleRow]);

    return (
        <div className={gameScreenVariants({show: true})}>
            <div className="flex flex-col h-full w-full relative">
                <AnimatePresence>
                    <motion.div
                        key={counter}
                        initial={{opacity: 0, scale: 0, left: `${positions[0]}%`, top: `${positions[1]}%`, rotate: `${rotate}deg`}}
                        animate={{opacity: 1, scale: 1, left: `${positions[0]}%`, top: `${positions[1]}%`, rotate: `${rotate}deg`}}
                        exit={{opacity: 0, scale: 0, left: `${positions[0]}%`, top: `${positions[1]}%`, rotate: `${rotate}deg`}}
                        transition={{duration: 0.3}}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                        <div key={counter} ref={numberRef} className={numberVariants({size: numberFontSize, doubleQuestion: true})}>
                            <div  className="whitespace-nowrap">{displayContent}</div>
                            {singleQuestion && (
                                <div className="flex items-center justify-center">
                                    <InputForm
                                        key={timestamp}
                                        currentUserAnswer={currentUserAnswer}
                                        secondUserAnswer={secondUserAnswer}
                                        onChange={setCurrentUserAnswer} 
                                        secondOnChange={setSecondUserAnswer}
                                        onComplete={onInputComplete}
                                        classes={{
                                            container: container(),
                                            input: input(),
                                            timer: timer(),
                                            inputContainer: inputContainer()
                                        }}
                                        autoFontScale={false}
                                        answerDuration={answerDuration} 
                                        doubleInput={doubleInput}
                                        titles={inputTitles}
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    )


}

export default GameScreen;
