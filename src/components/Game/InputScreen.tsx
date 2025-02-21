import { tv } from "tailwind-variants";
import { useEffect } from "react";
import { useGameplayStore } from "../../stores/gameplayStore";
import { useGameStore } from "../../stores/gameStore";
import InputForm from "./components/InputForm";

const inputScreenVariants = tv({
    base: "flex flex-col items-center justify-center h-full w-full transition-all duration-500",
    variants: {
        show: {
            true: "",
            false: "opacity-0 invisible scale-0",
        }
    }
})

const inputVariants = tv({
    slots: {
        container: "",
        input: "",
        timer: "",
    },
    variants: {
        doubleInput: {
            true: {
                container: "grid grid-cols-2 gap-8 gap-y-10 w-11/12",
                input: "w-full text-[40px]",
                timer: "col-span-2"
            },
            false: {
                container: "w-10/12",
                input: "w-full",
                timer: "mt-8"
            }
        }
    }
})

interface InputScreenProps {
    onComplete: () => void;
    doubleInput: boolean;
}

function InputScreen({onComplete, doubleInput}: InputScreenProps) {
    const { container, input, timer } = inputVariants({doubleInput});

    const { answerDuration } = useGameStore();
    const { currentUserAnswer, setCurrentUserAnswer, answerCurrentRound, secondUserAnswer, setSecondUserAnswer } = useGameplayStore();


    useEffect(() => {
        setCurrentUserAnswer("");
        return () => {
            answerCurrentRound();
        }
    }, [onComplete]);


    return (
        <div className={inputScreenVariants({show: true})}>
                <InputForm 
                    currentUserAnswer={currentUserAnswer} 
                    secondUserAnswer={secondUserAnswer}
                    onChange={setCurrentUserAnswer} 
                    secondOnChange={setSecondUserAnswer}
                    onComplete={onComplete} 
                    answerDuration={answerDuration} 
                    classes={{
                        container: container(),
                        input: input(),
                        timer: timer()
                    }}
                    autoFontScale={doubleInput ? false : true}
                    doubleInput={doubleInput}
                />
        </div>
    )
}

export default InputScreen;
