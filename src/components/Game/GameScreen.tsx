import { useEffect, useState, useMemo, useRef } from "react";
import { tv } from "tailwind-variants";
import { useGameplayStore } from "../../stores/gameplayStore";
import { useGameStore } from "../../stores/gameStore";
import { playNumberSound, stopCurrentSound } from "../../stores/soundStore";
import { ModeFeatures } from "../../helpers/types";
import InputForm from "./components/InputForm";
import Random from "../../lib/formules/random";
import { content as langContent } from '../../pages/actions/Lang';
import { useLanguageStore } from '../../stores/languageStore';

const BREAK_DURATION = 50;

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
        inputUnits: {
            true: {
                inputContainer: "flex flex-col gap-1"
            },
        }
    },
    compoundVariants: [
        {
            inputUnits: false,
            doubleInput: true,
            class: {
                container: "gap-y-5"
            }
        }
    ]
})

const numberVariants = tv({
    base: "flex flex-col items-center justify-center tracking-wider absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
    variants: {
        size: {
            lessThan4: "text-[100px] md:text-[320px]",
            lessThan6: "text-[90px] md:text-[216px]",
            lessThan8: "text-[80px] md:text-[180px]",
            lessThan10: "text-[70px] md:text-[144px]",
            lessThan12: "text-[60px] md:text-[96px]",
            lessThan14: "text-[50px] md:text-[72px]",
            restBigger: "text-[40px] md:text-[48px]",
        },
        doubleQuestion: {
            true: "flex gap-1",
            false: "",
        }
    }
})

const columnVariants = tv({
    base: "text-white",
    variants: {
        size: {
            lessThan4: "text-[100px] md:text-[320px]",
            lessThan6: "text-[90px] md:text-[216px]",
            lessThan8: "text-[80px] md:text-[180px]",
            lessThan10: "text-[70px] md:text-[144px]",
            lessThan12: "text-[60px] md:text-[96px]",
            lessThan14: "text-[50px] md:text-[72px]",
            restBigger: "text-[40px] md:text-[48px]",

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
    if (length < 14) return 'lessThan14';
    return 'restBigger';
};

interface GameScreenProps extends ModeFeatures {
    onComplete: () => void;
    onInputComplete: () => void;
}

const GameScreen = ({onComplete, onInputComplete, flipped, singleQuestion, randomPosition, doubleInput, doubleColumn, doubleRow, soundNumbers, inputUnits, randomRotate}: GameScreenProps) => {
    const {input, container, timer, inputContainer} = inputVariants({doubleInput: doubleInput, inputUnits: !!inputUnits});
    const {getCurrentCalcItems, getCurrentSecondCalcItems} = useGameplayStore();
    const calcItems = getCurrentCalcItems();
    const secondCalcItems = getCurrentSecondCalcItems();
    const [currentItem, setCurrentItem] = useState<CalcItem|null>(null);
    const [secondCurrentItem, setSecondCurrentItem] = useState<CalcItem|null>(null);
    const [counter, setCounter] = useState<number>(0);

    const { currentUserAnswer, secondUserAnswer, setCurrentUserAnswer, setSecondUserAnswer, answerCurrentRound, timestamp } = useGameplayStore();
    const { betweenDuration, answerDuration } = useGameStore();
    const { language } = useLanguageStore();
    
    const numberWrapperRef = useRef<HTMLDivElement>(null);
    const firstDisplayRef = useRef<HTMLDivElement>(null);
    const secondDisplayRef = useRef<HTMLDivElement>(null);
    
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

    
    const [firstUnit, secondUnit] = useMemo(() => {
        if (inputUnits) {
            const units = inputUnits as string[];
            return [langContent[language]![units[0]], langContent[language]![units[1]]];
        }
        return [null, null];
    }, [inputUnits, language]);


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
            setCurrentItem(currentItem);

            if (secondCalcItems) {
                const secondCurrentItem = secondCalcItems[counter];
                setSecondCurrentItem(secondCurrentItem);
            }

            setTimeout(() => {
                if (firstDisplayRef.current) {
                    firstDisplayRef.current.style.display = 'block';
                }
                if (secondDisplayRef.current) {
                    secondDisplayRef.current.style.display = 'block';
                }
            }, BREAK_DURATION);


            setCounter(counter);
            counter++;

        }, betweenDuration * 1000 + BREAK_DURATION);
        return () => clearInterval(interval);
    }, [calcItems, betweenDuration, randomPosition, randomRotate, flipped, singleQuestion, firstDisplayRef, secondDisplayRef]);

    useEffect(() => {
        if (soundNumbers && currentItem) {
            soundNumbers[currentItem.value]();
            return () => stopCurrentSound();
        } else {
            playNumberSound();
        }
    }, [currentItem, soundNumbers]);


    const displayContent = useMemo(() => {
        const style = {display: counter === 0 ? 'block' : 'none'};
        if (doubleColumn && displayString) {
            const [firstString, secondString] = displayString.split(' | ');
            return (<div className="flex items-center justify-center">
                <div style={style} ref={firstDisplayRef} className={`${columnVariants({size: getFontSize(firstString)})}`}>{firstString}</div>
                <div className="text-center mx-3 sm:mx-7 md:mx-10 lg:mx-16 w-1 h-96 bg-white"></div>
                <div style={style} ref={secondDisplayRef} className={`${columnVariants({size: getFontSize(secondString)})}`}>{secondString}</div>
            </div>)
        }
        if (doubleRow && displayString) {
            let firstString: string = '', secondString: string = '', operator: string = '';
            if (displayString.includes('+')) {
                [firstString, secondString] = displayString.split('+');
                operator = '+';
            } else if (displayString.includes('-')) {
                [firstString, secondString] = displayString.split('-');
                operator = '-';
            }
            return (<div className="">
                <div style={style} ref={firstDisplayRef} className={`${columnVariants({size: getFontSize(firstString)})}`}>{firstString}</div>
                <div className="text-center text-6xl">{operator}</div>
                <div style={style} ref={secondDisplayRef} className={`${columnVariants({size: getFontSize(secondString)})}`}>{secondString}</div>
            </div>)
        }

        const fontSize = (randomPosition || !displayString) ? 'lessThan10' : getFontSize(displayString || '');
        return <div style={style} ref={firstDisplayRef} className={columnVariants({size: fontSize})}>{displayString}</div>;
    }, [displayString, doubleColumn, doubleRow, firstUnit, secondUnit, firstDisplayRef, secondDisplayRef, counter]);

    return (
        <div className={gameScreenVariants({show: true})}>
            <div className="flex flex-col h-full w-full relative">
                    <div
                        key={counter}
                        ref={numberWrapperRef}
                        style={{left: `${positions[0]}%`, top: `${positions[1]}%`, rotate: `${rotate}deg`}}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                    >
                        <div key={counter} ref={numberRef} className={numberVariants({doubleQuestion: true})}>
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
                                        firstTitle={firstUnit}
                                        secondTitle={secondUnit}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
            </div>
        </div>
    )


}

export default GameScreen;
