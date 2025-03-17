import { tv } from "tailwind-variants";
import { FormuleMode } from "../../../lib/formules/types";
import { Mode } from "../types";
import { MODE_COLORS } from "../constants";


const buttonVariants = tv({
    base: 'px-8 py-2 rounded-full text-white font-medium hover:bg-green-500 transition-colors',
    variants: {
        color: {
            green: 'bg-green-400 hover:bg-green-500',
            yellow: 'bg-yellow-400 hover:bg-yellow-500',
            red: 'bg-red-400 hover:bg-red-500',
            gray: 'bg-gray-400 hover:bg-gray-500'
        },
        circle: {
            true: 'w-12 h-12 p-0 rounded-full flex items-center justify-center'
        }
    }
})

interface OptionsProps {
    page: number;
    started: boolean;
    titles: Record<string, string>;
    digitCount: number;
    numberCount: number;
    gameMode: string|null;
    testMode: Mode;
    currentCoefficient: number;
    onDigitCountChange: (count: number) => void;
    onNumberCountChange: (count: number) => void;
    onGameModeChange: (mode: FormuleMode) => void;
}

function Options({ page, started, digitCount, numberCount, gameMode, testMode, currentCoefficient, onDigitCountChange, onNumberCountChange, onGameModeChange, titles }: OptionsProps) {
    return (
        <div className="flex gap-4 mb-5 justify-between md:justify-start ">
                <div className={buttonVariants({ color: MODE_COLORS[testMode], circle: true, className: 'text-2xl font-bold' })}>
                    {page}
                </div>
                <input type="text" className='w-12 p-2' placeholder='reqem' value={digitCount} onChange={(e) => onDigitCountChange(Number(e.target.value))} disabled={started} />
                <input type="text" className='w-12 p-2' placeholder='eded' value={numberCount} onChange={(e) => onNumberCountChange(Number(e.target.value))} disabled={started} />
                <select title='operator' className='w-12' value={gameMode!} onChange={(e) => onGameModeChange(e.target.value as FormuleMode)} disabled={started}>
                    {Object.entries(titles).map(([key, title]) => (
                        <option key={key} value={key}>{title}</option>
                    ))}
                </select>
                <div className={buttonVariants({ color: MODE_COLORS[testMode], className: 'text-xl font-bold px-8 rounded-full' })}>
                    {digitCount}R {numberCount}Ə ({gameMode}) *{currentCoefficient}
                </div>
            </div>
    )
}

export default Options;