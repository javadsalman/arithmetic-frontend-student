import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playSecondSound } from '../../../stores/soundStore';


interface TimerProps {
    start: boolean;
    duration: number;  // Duration in milliseconds
    size?: number;     // Size of the timer in pixels
    showText?: boolean;
    redAlertSeconds?: number;
    onComplete?: () => void;
    sound?: boolean;
}

function Timer({ 
    start,
    duration,
    size = 100,
    onComplete,
    showText = false,
    sound = false,
    redAlertSeconds,

}: TimerProps) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const center = size / 2;
    const radius = size / 2;

    const isRedAlert = redAlertSeconds && timeLeft <= redAlertSeconds * 1000;
    
    // Calculate the angle for the timer arc
    const angle = ((duration - timeLeft) / duration) * 360;
    
    // Create the arc path
    const createArc = (startAngle: number, endAngle: number) => {
        const start = polarToCartesian(center, center, radius, endAngle);
        const end = polarToCartesian(center, center, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        
        return [
            "M", center, center,
            "L", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            "Z"
        ].join(" ");
    };
    
    // Helper function to convert polar coordinates to cartesian
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    useEffect(() => {
        if (!start) return;
        if (timeLeft <= 0) {
            onComplete?.();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => Math.max(0, prev - 10));
        }, 10);

        return () => clearInterval(timer);
    }, [timeLeft, onComplete, start]);

    useEffect(() => {
        if (sound && start) {
            playSecondSound();
        }
    }, [Math.ceil(timeLeft / 1000), start]);

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration])

    return (
        <div className="relative  border-white rounded-full" style={{ width: size, height: size }}>

            <motion.svg 
                width={size} 
                height={size}
                animate={{
                    scale: isRedAlert ? [1, 1.1, 1] : 1
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <motion.path
                    d={createArc(angle, 360)}
                    animate={{
                        fill: isRedAlert ? "red" : "white"
                    }}
                    transition={{
                        duration: 1
                    }}
                />
            </motion.svg>
            {showText && (
                <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]">
                    {Math.ceil(timeLeft / 1000)}
                </div>
            )}
        </div>
    );
}

export default Timer;
