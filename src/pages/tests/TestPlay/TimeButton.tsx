import { useState, useRef, useEffect } from 'react';
import { useTestStore } from '../../../stores/testStore';
import { tv } from 'tailwind-variants';

const buttonVariants = tv({
    base: 'w-full px-8 py-2 rounded-full text-white font-medium hover:bg-green-500 transition-colors bg-gray-500',
    variants: {
        less1min: {
            true: 'bg-red-500',
            false: 'bg-gray-500',
        },
        started: {
            true: 'hover:bg-gray-700',
            false: 'hover:bg-green-500',
        }
    }
});



interface TimeButtonProps {
    start: boolean;
    onFinish: () => void;
}


function TimeButton({ start, onFinish }: TimeButtonProps) {
    const { minutes, setMinutes, seconds, setSeconds } = useTestStore();
    const [edit, setEdit] = useState(false);

    const minutesString = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secondsString = (seconds % 60).toString().padStart(2, '0');
    const timeString = `${minutesString}:${secondsString}`;

    const inputRef = useRef<HTMLInputElement>(null);

    const onButtonClick = () => {
        if (!start) setEdit(true);
    }

    useEffect(() => {
        if (edit && inputRef.current) {
            inputRef.current.focus();
        }
    }, [edit])

    useEffect(() => {
        if (start) {
            let secondsCounter = seconds;
            const interval = setInterval(() => {
                setSeconds(secondsCounter - 1);
                if (secondsCounter <= 0) {
                    onFinish();
                    clearInterval(interval);
                }
                secondsCounter--;
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setSeconds(minutes * 60);
        }
    }, [start])

    const onBlur = () => {
        setEdit(false);
        setSeconds(parseInt(inputRef.current?.value || minutes.toString()) * 60);
        setMinutes(parseInt(inputRef.current?.value || minutes.toString()));
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            onBlur();
        }
    }

    
    return (
        <div className="w-32">
            {(start || !edit) ? (
                <button 
                    className={buttonVariants({ less1min: seconds < 60, started: start })} 
                    onClick={onButtonClick}>
                    {timeString}
                </button>
            ) : (
                <input 
                    title="time" 
                    type="text" 
                    className="w-full rounded-full bg-gray-300 px-4 py-2 text-center outline-none" 
                    onBlur={onBlur}
                    ref={inputRef}
                    onKeyDown={onKeyDown}
                />
            )}
        </div>
    )
}

export default TimeButton;
