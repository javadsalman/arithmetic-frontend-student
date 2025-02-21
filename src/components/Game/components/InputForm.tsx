import { motion } from "framer-motion";
import Timer from "./Timer";
import { useRef, useCallback, useEffect, useMemo } from "react";

interface InputFormProps {
    currentUserAnswer: string;
    onChange: (value: string) => void;
    secondUserAnswer: string;
    secondOnChange: (value: string) => void;
    onComplete: () => void;
    answerDuration: number;
    classes: {
        container?: string;
        input?: string;
        inputContainer?: string;
        inputLabel?: string;
        input1?: string;
        input2?: string;
        inputContainer1?: string;
        inputContainer2?: string;
        inputLabel1?: string;
        inputLabel2?: string;
        timer?: string;
    }
    doubleInput?: boolean;
    titles?: [string, string]|null;
    autoFontScale?: boolean;
}

    
const getFontSize = (length: number) => {
    if (length > 10) return 'text-[25px] md:text-[50px]';
    if (length > 8) return 'text-[50px] md:text-[70px]';
    if (length > 5) return 'text-[75px] md:text-[100px]';
    return 'text-[100px] md:text-[120px]';
};

function InputForm({currentUserAnswer, onChange, secondUserAnswer, secondOnChange, onComplete, answerDuration, classes, autoFontScale, doubleInput, titles }: InputFormProps) {

    const inputRef = useRef<HTMLInputElement>(null);
    const inputFontSize = useMemo(() => autoFontScale ? getFontSize(currentUserAnswer.length) : '', [currentUserAnswer.length, autoFontScale]);

    const focusInput = useCallback(() => {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 200);
    }, []);

    useEffect(() => {
        return focusInput();
    }, [focusInput]);

    const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            onChange(value);
        }
    }

    const secondInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d+$/.test(value)) {
            secondOnChange(value);
        }
    }

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onComplete();
        }
    }

    return (
        <motion.div className={`relative ${classes.container}`}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.7}}>
            <div className={`flex items-center ${classes.inputContainer} ${classes.inputContainer1}`}>
                <input 
                    title="Enter your answer" 
                    ref={inputRef}  
                    type="text" 
                    value={currentUserAnswer}
                    onChange={inputOnChange}
                    onKeyDown={onKeyPress}
                    className={`d-block bg-transparent text-center text-white font-pangolin border-4 border-dotted border-white/50 rounded-xl outline-none transition-all duration-300 ${inputFontSize} ${classes.input} ${classes.input1}`}
                    
                />
                { titles && <label className={`text-white text-[20px] ${classes.inputLabel} ${classes.inputLabel1} font-nunito`}>{titles[0]}</label> }
            </div>
            {doubleInput && (
                <div className={`flex items-center ${classes.inputContainer} ${classes.inputContainer2}`}>
                    <input 
                        title="Enter your answer" 
                        type="text" 
                        value={secondUserAnswer}
                        onChange={secondInputOnChange}
                        onKeyDown={onKeyPress}
                    className={`d-block bg-transparent text-center text-white font-pangolin border-4 border-dotted border-white/50 rounded-xl outline-none transition-all duration-300 ${inputFontSize} ${classes.input} ${classes.input2}`}
                    
                />
                    { titles && <label className={`text-white text-[20px] ${classes.inputLabel} ${classes.inputLabel2} font-nunito`}>{titles[1]}</label>}
                </div>
            )}
            <div className={`flex items-center justify-center ${classes.timer}`}>
                <Timer 
                    duration={answerDuration * 1000} 
                    redAlertSeconds={Math.floor(answerDuration / 2)} 
                    showText 
                    size={80} 
                    sound 
                    start={true} 
                    onComplete={onComplete}
                />
            </div>
        </motion.div>
    )
}

export default InputForm;
