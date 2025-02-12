import { TextField, Button, FormControlLabel, Switch } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useGameStore } from '../../../stores/gameStore';
import Lang, { content as langContent } from '../Lang';
import { useLanguageStore } from '../../../stores/languageStore';







function NumberStep() {
    const navigate = useNavigate();
    const { 
        numberCount, 
        isMixedDigits, 
        gameCount,
        setNumberCount,
        setIsMixedDigits,
        setGameCount
    } = useGameStore();

    const { gameType, gameMode } = useParams();
    const { language } = useLanguageStore();


    const handleNext = () => {
        navigate(`/game/${gameType}/${gameMode}/steps/time`);
    };


    const handleBack = () => {
        navigate(`/game/${gameType}/${gameMode}/steps/digit`);
    };

    const handleNumberCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNumberCount(Number(e.target.value));
    };

    const handleGameCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGameCount(Number(e.target.value));
    };



    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-[#FF4D4F] mb-8 text-center">
                <Lang>Neçə sayda ədəd ilə oyun oynamaq istəyirsiniz?</Lang>
            </h2>

            <div>
                <div className='mb-6'>
                    <TextField
                            fullWidth
                        label={langContent[language]!['Ədəd sayı']}
                        value={numberCount || ""}
                        onChange={handleNumberCountChange}
                        variant="outlined"
                        helperText={langContent[language]!['Oynamaq istədiyiniz ədəd sayını seçin']}
                    />
                </div>

                <div className='mb-2'>
                    <TextField
                        fullWidth
                        label={langContent[language]!['Oyun sayı']}
                        value={gameCount || ""}
                        onChange={handleGameCountChange}
                        variant="outlined"
                        helperText={langContent[language]!['Oyun sayını qeyd edin']}
                    />
                </div>
                <div className='mb-4'>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isMixedDigits}
                                onChange={(e) => setIsMixedDigits(e.target.checked)}
                                color="primary"
                            />


                        }
                        label={langContent[language]!['Rəqəm sayı qarışıq olsun']}
                    />
                </div>
                <div className="pt-4 space-y-3">
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleNext}
                        className="bg-[#1890FF] hover:bg-[#40A9FF] py-3 text-lg"
                        size="large"
                    >
                        <Lang>NÖVBƏTİ</Lang>
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

export default NumberStep;
