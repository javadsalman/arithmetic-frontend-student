import { tv } from "tailwind-variants";
import { Mode } from "../../pages/tests/types";
import { EASY_MODE, MEDIUM_MODE, HARD_MODE } from "../../pages/tests/constants";
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

interface ModeButtonsProps {
    onModeChange: (mode: Mode) => void;
}

function ModeButtons({ onModeChange }: ModeButtonsProps) {
    return (
        <div className="flex justify-center gap-4">
            <button className={buttonVariants({ color: 'green' })} onClick={() => onModeChange(EASY_MODE)}>
                Asan
            </button>
            <button className={buttonVariants({ color: 'yellow' })} onClick={() => onModeChange(MEDIUM_MODE)}>
                Normal
            </button>
            <button className={buttonVariants({ color: 'red' })} onClick={() => onModeChange(HARD_MODE)}>
                Çətin
            </button>
        </div>
    )
}

export default ModeButtons;
