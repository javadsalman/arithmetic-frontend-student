import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router';
import { loadNewGameParams, useGameStore } from '../../../stores/gameStore';
import { generateQueryString } from '../../../stores/gameStore';
import Lang, {content as langContent} from '../Lang';
import { useLanguageStore } from '../../../stores/languageStore';
import { ACTIONS_FEATURES } from '../../actions/constants';
import { ActionMode } from '../../actions/types';
import { useNotificationStore } from '../../../stores/notificationStore';
import { TIME_STEP } from '../constants';

function TimeStep() {
    const navigate = useNavigate();
    const { gameType, gameMode } = useParams();
    const { language } = useLanguageStore();
    const { setNotification } = useNotificationStore();
    const [searchParams] = useSearchParams();
    const { 
        betweenDuration,
        answerDuration,
        setBetweenDuration,
        setAnswerDuration,
    } = useGameStore();

    const currentFeature = ACTIONS_FEATURES[gameMode as ActionMode];
    const hideBetweenDurationInput = gameType === 'actions' && currentFeature.singleQuestion



    const [formData, setFormData] = useState({
        betweenDuration: String(betweenDuration),
        answerDuration: String(answerDuration),
    });



    useEffect(() => {
        setFormData({
            betweenDuration: String(betweenDuration),
            answerDuration: String(answerDuration),
        });
    }, [betweenDuration, answerDuration]);

    const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Update store based on field
        switch (field) {
            case 'betweenDuration':
                setBetweenDuration(Number(value));
                break;
            case 'answerDuration':
                setAnswerDuration(Number(value));
                break;
        }
    };

    useEffect(() => {
        if (searchParams.size > 0) {
            loadNewGameParams(Array.from(searchParams.entries()));
            navigate(window.location.pathname, { replace: true });
        }
    }, [searchParams]);


    const handleCopyLink = () => {
        const queryString = generateQueryString();
        const fullUrl = `${window.location.origin}${window.location.pathname}?${queryString}`;
        navigator.clipboard.writeText(fullUrl);
        setNotification('Link kopyalandı', 'success', 'filled', { vertical: 'bottom', horizontal: 'center' });
    };


    const handleStart = () => {
        const timestamp = new Date().getTime();
        navigate(`/game/${gameType}/${gameMode}/game?timestamp=${timestamp}`);
    };


    const handleBack = () => {
        const currentIndex = ACTIONS_FEATURES[gameMode as ActionMode].steps.indexOf(TIME_STEP);
        navigate(`/game/${gameType}/${gameMode}/steps/${ACTIONS_FEATURES[gameMode as ActionMode].steps[currentIndex - 1]}`);
    };


    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-[#FF4D4F] mb-8 text-center">
                <Lang>ƏDƏD və CAVAB gəlmə müddətini seçin.</Lang>
            </h2>


            <div className="space-y-6">
                {!!hideBetweenDurationInput || (
                    <div>
                        <TextField
                            fullWidth
                            label={langContent[language]!['Ədədlərarası saniyə']}
                            value={formData.betweenDuration}
                            onChange={handleChange('betweenDuration')}
                            variant="outlined"
                        inputProps={{ min: 1 }}

                        />
                    </div>
                )}

                <div>
                    <TextField
                        fullWidth
                        label={langContent[language]!['Cavab üçün saniyə']}
                        value={formData.answerDuration}
                        onChange={handleChange('answerDuration')}
                        variant="outlined"
                        inputProps={{ min: 1 }}

                    />
                </div>

                <div className="pt-4 space-y-3">
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleStart}
                        className="bg-[#1890FF] hover:bg-[#40A9FF] py-3 text-lg"
                        size="large"
                    >
                        <Lang>BAŞLA</Lang>
                    </Button>
                    <Button



                        fullWidth
                        variant="contained"
                        onClick={handleCopyLink}
                        className="bg-[#1890FF] hover:bg-[#40A9FF] py-3 text-lg"
                        size="large"
                    >
                        <Lang>Link Kopyala</Lang>
                    </Button>
                    <Button



                        fullWidth
                        variant="outlined"
                        onClick={handleBack}
                        className="py-3 text-lg"
                        size="large"
                    >
                        <Lang>GERİ</Lang>
                    </Button>
                </div>



            </div>
        </div>
    );
}

export default TimeStep;
