import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { useGameStore } from "../../stores/gameStore";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { KeyboardEvent, useEffect } from "react";
import { FORMULE_TITLES } from "../../pages/formules/constants";
import { FormuleMode } from "../../lib/formules/types";
import { restartGame } from "../../stores/gamePlayStore";
import Lang, { content as langContent } from "./Lang";
import { useLanguageStore } from "../../stores/languageStore";
import { useNotificationStore } from "../../stores/notificationStore";

interface FormuleValues {
    formuleMode: FormuleMode;
    digitCount: number;
    secondDigitCount: number;
    numberCount: number;
    betweenDuration: number;
    answerDuration: number;
}


function MiniForm() {
    const { language } = useLanguageStore();
    const navigate = useNavigate();
    const { 
        digitCount, 
        secondDigitCount,
        numberCount, 
        betweenDuration, 
        answerDuration,
        setDigitCount,
        setSecondDigitCount,
        setNumberCount,
        setBetweenDuration,
        setAnswerDuration,
        gameType,
        gameMode,
        setGameMode
    } = useGameStore();

    const { setNotification } = useNotificationStore();

    const { control, handleSubmit, setValue, watch } = useForm<FormuleValues>({
        defaultValues: {
            formuleMode: gameMode as FormuleMode,
            digitCount: digitCount,
            secondDigitCount: secondDigitCount,
            numberCount: numberCount,
            betweenDuration: betweenDuration,
            answerDuration: answerDuration
        }
    });
    
    const watchDigitCount = watch('digitCount');


    const onSubmit = (data: FormuleValues) => {
        setDigitCount(data.digitCount);
        setSecondDigitCount(data.secondDigitCount);
        setNumberCount(data.numberCount);
        setBetweenDuration(data.betweenDuration);
        setAnswerDuration(data.answerDuration);
        setGameMode(data.formuleMode);
        navigate(`/game/${gameType}/${data.formuleMode}/game`);
        restartGame();
    };

    const onError = (error: FieldErrors<FormuleValues>) => {
        if (error.secondDigitCount) {
            setNotification(error.secondDigitCount.message!, 'error', 'filled', { vertical: 'bottom', horizontal: 'center' });
        }
    }

    const onEnterPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleSubmit(onSubmit, onError)();
        }
    }

    useEffect(() => {
        setValue('formuleMode', gameMode as FormuleMode);
    }, [gameMode]);

    
    return (
        <div className="w-full max-w-6xl p-4 order-2 md:order-1 mt-0 md:mt-0">
                <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col md:flex-row gap-4">
                    <div>
                        { gameType === 'formules' && <Controller
                            control={control}
                            name="formuleMode"
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel><Lang>Formul</Lang></InputLabel>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        label={langContent[language]!['Formul']}
                                        onChange={field.onChange}
                                    >

                                        {Object.entries(FORMULE_TITLES).map(([key, title]) => (
                                            <MenuItem key={key} value={key}>{langContent[language]![title]}</MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                            )}
                        />}
                    </div>

                    <div className="w-full">
                        <Controller
                            control={control}
                            name="digitCount"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={langContent[language]!['Rəqəm sayı']}
                                    type="number"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onKeyDown={onEnterPress}

                                />
                            )}
                        />
                    </div>
                    
                    {secondDigitCount && (
                        <div className="w-full">
                            <Controller
                                control={control}
                                name="secondDigitCount"
                                rules={{
                                    validate: (value) => {
                                        if (watchDigitCount < value) {
                                            return 'Birinci rəqəm sayı ikincidən kiçik ola bilməz';
                                        }
                                        return true;
                                    }
                                }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={langContent[language]!['İkinci rəqəm sayı']}
                                        type="number"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onKeyDown={onEnterPress}

                                    />
                                )}
                        />
                    </div>
                    )}


                    <div className="w-full">
                        <Controller
                            control={control}
                            name="numberCount"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={langContent[language]!['Ədəd sayı']}
                                    type="number"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onKeyDown={onEnterPress}

                                />
                            )}
                        />
                    </div>


                    <div className="w-full">
                        <Controller
                            control={control}
                            name="betweenDuration"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={langContent[language]!['Ədədlərarası saniyə']}
                                    type="number"
                                    value={field.value}
                                    onChange={field.onChange}
                                    onKeyDown={onEnterPress}

                                />
                            )}
                        />

                    </div>

                    <div className="w-full md:w-auto ml-auto">
                        <Button
                            variant="outlined"
                            onClick={handleSubmit(onSubmit, onError)}
                            startIcon={<RefreshIcon />}
                            color="inherit"
                            className="h-[56px] w-full"
                        >
                            <Lang>YENİLƏ</Lang>
                        </Button>
                    </div>
                </form>

            </div>
    )
}

export default MiniForm;
