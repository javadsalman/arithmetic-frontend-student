import { IconButton } from '@mui/material';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import VolumeOffRoundedIcon from '@mui/icons-material/VolumeOffRounded';
import { NUMBER_COLORS } from '../../pages/steps/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface SoundCardProps {
    title: string;
    index: number;
    onPlay: () => void;
    iconSrc: string;
    isPlaying: boolean;
}

function SoundCard({ 
    title, 
    index, 
    onPlay,
    isPlaying,  
    iconSrc 
}: SoundCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const bgColor = NUMBER_COLORS[index % NUMBER_COLORS.length];
    
    return (
        <div className="bg-white rounded-[28px] p-6 w-[230px] font-nunito shadow-lg">
            {/* First row - Image/Number with flip animation */}
            <motion.div 
                className="w-32 h-32 mx-auto mb-6 cursor-pointer"
                onClick={onPlay}
                onHoverStart={() => setIsFlipped(true)}
                onHoverEnd={() => setIsFlipped(false)}
            >
                <AnimatePresence initial={false} mode="wait">
                    {!isFlipped ? (
                        <motion.div
                            key="image"
                            initial={{ opacity: 0, rotateY: 90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: -90 }}
                            transition={{ duration: 0.15 }}
                            className="w-full h-full"
                        >
                            <img 
                                src={iconSrc} 
                                alt={`${title} instrument`} 
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="number"
                            initial={{ opacity: 0, rotateY: -90 }}
                            animate={{ opacity: 1, rotateY: 0 }}
                            exit={{ opacity: 0, rotateY: 90 }}
                            transition={{ duration: 0.15 }}
                            className="w-full h-full rounded-full flex items-center justify-center"
                            style={{ backgroundColor: bgColor }}
                        >
                            <span className="text-4xl font-bold text-white">{index}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Second row - Text and Sound button */}
            <div className="flex items-center justify-between">
                <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900 uppercase">{title}</h3>
                    <p className="text-lg text-gray-600 mt-1 font-bold">{index}</p>
                </div>
                <IconButton
                    onClick={onPlay}
                    className="w-12 h-12 shadow-none"
                    sx={{
                        backgroundColor: '#ffefec',
                        '&:hover': {
                            backgroundColor: '#ffe5e0',
                        }
                    }}
                >
                    {isPlaying ? (
                        <VolumeOffRoundedIcon 
                            className="text-gray-800" 
                            sx={{ fontSize: 24 }}
                        />
                    ) : (
                        <VolumeUpRoundedIcon 
                            className="text-gray-800" 
                            sx={{ fontSize: 24 }}
                        />
                    )}
                </IconButton>
            </div>
        </div>
    );
}

export default SoundCard;