import { tv } from "tailwind-variants";
import { Mode } from "../../pages/tests/types";
import { EASY_MODE, MEDIUM_MODE, HARD_MODE } from "../../pages/tests/constants";
import Lang from "../../pages/tests/Lang";

const buttonVariants = tv({
    base: 'px-8 py-2 rounded-full text-white font-medium hover:bg-green-500 transition-colors',
    variants: {
        color: {
            green: 'bg-green-400 hover:bg-green-500',
            yellow: 'bg-yellow-400 hover:bg-yellow-500',
            blue: 'bg-blue-400 hover:bg-blue-500',
            gray: 'bg-gray-400 hover:bg-gray-500'
        },
        selected: {
            true: 'bg-opacity-100',
            false: 'bg-opacity-80'
        },
        circle: {
            true: 'w-12 h-12 p-0 rounded-full flex items-center justify-center'
        }
    }
})

interface ModeButtonsProps {
    onModeChange: (mode: Mode) => void;
    currentMode: Mode;
}

function ModeButtons({ onModeChange, currentMode }: ModeButtonsProps) {
    return (
        <div className="flex justify-center gap-4">
            <button 
                className={buttonVariants({ 
                    color: 'yellow', 
                    selected: currentMode === EASY_MODE 
                })} 
                onClick={() => onModeChange(EASY_MODE)}
            >
                <Lang>*1</Lang>
            </button>
            <button 
                className={buttonVariants({ 
                    color: 'green', 
                    selected: currentMode === MEDIUM_MODE 
                })} 
                onClick={() => onModeChange(MEDIUM_MODE)}
            >
                <Lang>*1.5</Lang>
            </button>
            <button 
                className={buttonVariants({ 
                    color: 'blue', 
                    selected: currentMode === HARD_MODE 
                })} 
                onClick={() => onModeChange(HARD_MODE)}
            >
                <Lang>*2</Lang>
            </button>
        </div>
    )
}

export default ModeButtons;
