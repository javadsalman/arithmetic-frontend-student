import { useEffect, useMemo, forwardRef } from "react";
import { tv } from "tailwind-variants";
import { ModeColor } from "../../pages/tests/types";


const titleVariants = tv({
    base: 'p-2 border-gray-300 text-white rounded-t text-2xl',
    variants: {
        color: {
            green: 'bg-green-400',
            yellow: 'bg-yellow-400',
            red: 'bg-red-400',
            gray: 'bg-gray-400',
            orange: 'bg-orange-200 text-black text-xl' // Closest Tailwind color to #FDCFA1
        }
    }
})

const resultVariants = tv({
    base: 'p-3 border-gray-300 rounded-b text-xl',
    variants: {
        color: {
            green: 'bg-green-300',
            red: 'bg-red-300',
            gray: 'bg-gray-300',
        }
    }
})

// Column width variants based on content length
const columnVariants = tv({
    base: 'flex flex-col text-center bg-white/30 flex-shrink-0',
    variants: {
        size: {
            small: 'min-w-[84px] w-[84px]',           // For short content (less than 5 chars)
            medium: 'min-w-[120px] w-[120px]',        // For medium content (5-8 chars)
            large: 'min-w-[160px] w-[160px]',         // For longer content (9-12 chars)
            extraLarge: 'min-w-[200px] w-[200px]',    // For very long content (13+ chars)
        }
    },
    defaultVariants: {
        size: 'small'
    }
})

export interface TestColumnProps {
    index: number;
    items: string[];
    focused: boolean;
    result?: string;
    title?: string;
    inputRef?: React.RefObject<HTMLInputElement>;
    titleBgColor: ModeColor | 'gray' | 'orange';
    resultBgColor?: 'green' | 'red' | 'gray';
    userAnswer?: string;
    onInputFocus?: (index: number) => void;
    onInputBlur?: (index: number) => void;
    onAnswerChange?: (answer: string) => void;
    onKeyDown?: (key: string) => void;
}

const TestColumn = forwardRef<HTMLDivElement, TestColumnProps>(
    ({ index, items, result, title, titleBgColor, resultBgColor, onAnswerChange, onKeyDown, onInputFocus, onInputBlur, inputRef, focused, userAnswer }, ref) => {
    title = title || (index + 1).toString();

    useEffect(() => {
        if (focused && inputRef) {
            inputRef.current?.focus();
        }
    }, [focused, inputRef]);

    // Determine column size based on the longest item
    const columnSize = useMemo(() => {
        const maxLength = Math.max(
            ...items.map(item => item.length),
            title.toString().length
        );
        
        if (maxLength < 5) return 'small';
        if (maxLength < 9) return 'medium';
        if (maxLength < 13) return 'large';
        return 'extraLarge';
    }, [items, title]);

    const bottomContent = useMemo(() => {
        if (result) {
            return <div className={resultVariants({ color: resultBgColor })}>{result}</div>
        }
        return (
            <div>
                <input title="answer" type="text" className="w-full outline-none border-2 p-2 text-center rounded-b bg-white/70 text-xl" onChange={(e) => onAnswerChange?.(e.target.value)} onKeyDown={(e) => onKeyDown?.(e.key)} onFocus={() => onInputFocus?.(index)} onBlur={() => onInputBlur?.(index)} ref={inputRef} value={userAnswer} />
            </div>
        );
    }, [result, resultBgColor, inputRef, onAnswerChange, onKeyDown, onInputFocus, onInputBlur, index]);
    
    return (
        <div ref={ref} className={columnVariants({ size: columnSize })}>
            <div className={titleVariants({ color: titleBgColor })}>{title}</div>
            {items.map((item, index) => (
                <div key={index} className="p-2 px-1 border border-gray-300 break-words hyphens-auto text-lg">
                    {item}
                </div>
            ))}
            {bottomContent}
        </div>
    )
});

TestColumn.displayName = 'TestColumn';

export default TestColumn;