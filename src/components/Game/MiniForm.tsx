import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { useGameStore } from "../../stores/gameStore";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { KeyboardEvent, useEffect } from "react";
import { FORMULE_TITLES } from "../../pages/formules/constants";
import { FormuleMode } from "../../lib/formules/types";
import { restartGame } from "../../stores/gameplayStore";
import Lang, { content as langContent } from "./Lang";
import { useLanguageStore } from "../../stores/languageStore";


interface FormuleValues {
    formuleMode: FormuleMode;
    digitCount: number;
    numberCount: number;
    betweenDuration: number;
    answerDuration: number;
}


function MiniForm() {
    const { language } = useLanguageStore();
    const navigate = useNavigate();
    const { 
        digitCount, 
        numberCount, 
        betweenDuration, 
        answerDuration,
        setDigitCount,
        setNumberCount,
        setBetweenDuration,
        setAnswerDuration,
        gameType,
        gameMode,
        setGameMode
    } = useGameStore();

    const { control, handleSubmit, setValue } = useForm<FormuleValues>({
        defaultValues: {
            formuleMode: gameMode as FormuleMode,
            digitCount: digitCount,
            numberCount: numberCount,
            betweenDuration: betweenDuration,
            answerDuration: answerDuration
        }
    });


    const onSubmit = (data: FormuleValues) => {
        setDigitCount(data.digitCount);
        setNumberCount(data.numberCount);
        setBetweenDuration(data.betweenDuration);
        setAnswerDuration(data.answerDuration);
        setGameMode(data.formuleMode);
        navigate(`/game/${gameType}/${data.formuleMode}/game`);
        restartGame();
    };

    const onEnterPress = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleSubmit(onSubmit)();
        }
    }

    useEffect(() => {
        setValue('formuleMode', gameMode as FormuleMode);
    }, [gameMode]);
    
    
    return (
        <div className="w-full max-w-6xl p-4 order-2 md:order-1 mt-0 md:mt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row gap-4">
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
                            onClick={handleSubmit(onSubmit)}
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
