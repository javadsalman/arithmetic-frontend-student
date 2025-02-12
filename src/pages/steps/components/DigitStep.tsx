import { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { useGameStore } from '../../../stores/gameStore';
import NumberSelector from '../../../components/GameForm/NumberSelector';
import Lang from '../../home/Lang';


// Utility function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '900px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

function DigitStep() {
    const { digitCount, setDigitCount } = useGameStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');
    const navigate = useNavigate();
    const { gameType, gameMode } = useParams();


    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


    const handleNext = () => {
        navigate(`/game/${gameType}/${gameMode}/steps/number`);
    };

    const handleOpenVideo = (videoUrl: string) => {
        setCurrentVideo(videoUrl);
        setIsModalOpen(true);
    };

    const handleCloseVideo = () => {
        setIsModalOpen(false);
        setCurrentVideo('');
    };

    const handleStart = () => {
        const timestamp = new Date().getTime();
        navigate(`/game/${gameType}/${gameMode}/game?timestamp=${timestamp}`);
    }

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#FF4D4F] mb-8">
                <Lang>Rəqəm sayı seç</Lang>
            </h2>


            {/* Number selector with connected line */}
            <div className="w-full mb-12">
                <NumberSelector numbers={numbers} digitCount={digitCount} setDigitCount={setDigitCount} />
            </div>

            {/* Forward button */}
            <div className="max-w-md w-full mx-auto space-y-3">
                <Button
                    variant="contained"
                    onClick={handleNext}
                    className="bg-[#1890FF] hover:bg-[#40A9FF] py-3 text-lg"
                    size="large"
                    fullWidth
                >
                    <Lang>NÖVBƏTİ</Lang>
                </Button>

                <Button
                    variant="contained"
                    onClick={handleStart}
                    className="bg-[#1890FF] hover:bg-[#40A9FF] py-3 text-lg"
                    size="large"
                    fullWidth
                >
                    <Lang>BAŞLA</Lang>
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    className="py-3 text-lg"
                    size="large"
                    fullWidth
                >
                    <Lang>Formullar</Lang>
                </Button>
            </div>


            {/* Explanation section */}
            <div className="w-full mt-8">
                <p className="text-center mb-4 text-gray-600 text-lg font-bold">
                    <Lang>Formul izahı üçün</Lang>
                </p>
                <div className="max-w-md mx-auto space-y-3">
                    <Button
                        variant="outlined"
                        startIcon={<PlayCircleOutlineIcon />}
                        fullWidth
                        size="large"
                        className="py-3 text-lg"
                        onClick={() => handleOpenVideo('https://www.youtube.com/watch?v=UUga4-z7b6s')}
                    >
                        <Lang>ƏL İLƏ İZAH</Lang>
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<PlayCircleOutlineIcon />}
                        fullWidth
                        size="large"
                        className="py-3 text-lg"
                        onClick={() => handleOpenVideo('https://www.youtube.com/watch?v=UUga4-z7b6s')}
                    >
                        <Lang>ABAK İLƏ İZAH</Lang>
                    </Button>
                </div>
            </div>

            {/* Video Modal */}
            <Modal
                open={isModalOpen}
                onClose={handleCloseVideo}
                aria-labelledby="video-modal"
                BackdropProps={{
                    style: { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
                }}
            >
                <Box sx={modalStyle}>
                    <Button
                        onClick={handleCloseVideo}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon sx={{ fontSize: 30 }} />
                    </Button>
                    <div className="aspect-w-16 aspect-h-9 pt-8">
                        <iframe
                            width="100%"
                            height="500"
                            src={currentVideo ? getYouTubeEmbedUrl(currentVideo) : ''}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default DigitStep;
