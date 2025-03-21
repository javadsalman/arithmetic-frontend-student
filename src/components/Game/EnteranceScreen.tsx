import { useEffect, useRef, memo } from "react";
import { draw } from "./utils";
import Lang from "./Lang";

interface EntranceProps {
    boardRef: React.RefObject<HTMLDivElement>;
    onComplete: () => void;
    duration: number;
    wait: number;
    disappear: number;
}

function Entrance({boardRef, onComplete, duration=1000, wait=3000, disappear=500}: EntranceProps) {
    const beReadyRef = useRef<HTMLDivElement>(null);
    const startRef = useRef<HTMLDivElement>(null);

    // Entrance animation
    useEffect(() => {
            if (!beReadyRef.current || !startRef.current || !boardRef.current) return;
            draw({elementToDraw: beReadyRef.current, container: boardRef.current, duration: duration, wait: wait, disappear: disappear});
            const timeout = setTimeout(() => {
                onComplete();
            }, wait);
            return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="text-white text-7xl md:text-9xl tracking-wider relative">
                <span ref={beReadyRef} className="my-10 px-10 hidden">
                    <Lang>Hazır ol</Lang>
                </span>
                <span ref={startRef} className="my-10 px-10 hidden">
                    <Lang>Başla</Lang>
                </span>
            </div>
        </div>
    );
}
    
export default memo(Entrance);

