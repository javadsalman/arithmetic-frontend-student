import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material";
import { useGameStore } from "../../stores/gameStore";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNavigate } from "react-router";
import { useForm, Controller, FieldErrors } from "react-hook-form";
import { KeyboardEvent, useEffect, useMemo, useCallback, useState } from "react";
import { FORMULE_TITLES } from "../../pages/formules/constants";
import { FormuleMode } from "../../lib/formules/types";
import { restartGame } from "../../stores/gameplayStore";
import Lang, { content as langContent } from "./Lang";
import { useLanguageStore } from "../../stores/languageStore";
import { useNotificationStore } from "../../stores/notificationStore";
import { ACTIONS_FEATURES, ACTION_TITLES } from "../../pages/actions/constants";
import { ActionMode } from "../../pages/actions/types";
import { tv } from "tailwind-variants";

const formElementVariants = tv({
    base: "",
    variants: {
        changed: {
            true: "bg-blue-200",
            false: ""
        }
    }
});
interface FormuleValues {
    mode: FormuleMode|ActionMode;
    digitCount: number;
    secondDigitCount: number;
    numberCount: number;
    gameCount: number;
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
        gameCount,
        betweenDuration, 
        answerDuration,
        setDigitCount,
        setSecondDigitCount,
        setNumberCount,
        setGameCount,
        setBetweenDuration,
        setAnswerDuration,
        gameType,
        gameMode,
        setGameMode
    } = useGameStore();

    const { setNotification } = useNotificationStore();
    const [lastResetTimestamp, setLastResetTimestamp] = useState<number>(Date.now());
    const { control, handleSubmit, setValue, watch, formState } = useForm<FormuleValues>({
        defaultValues: {
            mode: gameMode as FormuleMode|ActionMode,
            digitCount: digitCount,
            secondDigitCount: secondDigitCount,
            numberCount: numberCount,
            gameCount: gameCount,
            betweenDuration: betweenDuration,
            answerDuration: answerDuration
        }
    });
    
    const watchDigitCount = watch('digitCount');

    const { doubleDigitCount: isDoubleDigitCount, singleQuestion: isSingleQuestion, soundNumbers: isSoundNumbers } = useMemo(() => gameType === 'actions' ? ACTIONS_FEATURES[gameMode as ActionMode] : {doubleDigitCount: false, singleQuestion: false, soundNumbers: false}, [gameType, gameMode]);

    const onSubmit = useCallback((data: FormuleValues) => {
        setDigitCount(+data.digitCount);
        setSecondDigitCount(+data.secondDigitCount);
        setNumberCount(+data.numberCount);
        setGameCount(+data.gameCount);
        setBetweenDuration(+data.betweenDuration);
        setAnswerDuration(+data.answerDuration);
        setGameMode(data.mode);
        navigate(`/game/${gameType}/${data.mode}/game`);
        setLastResetTimestamp(Date.now());
        const hard = !formState.isDirty && (Date.now() - lastResetTimestamp) < 10000;
        restartGame({hard});
    }, [formState.isDirty, lastResetTimestamp]);

    const onError = useCallback((error: FieldErrors<FormuleValues>) => {
        if (error.secondDigitCount) {
            setNotification(error.secondDigitCount.message!, 'error', 'filled', { vertical: 'bottom', horizontal: 'center' });
        }
    }, [setNotification]);

    const onEnterPress = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            handleSubmit(onSubmit, onError)();
        }
    }, [handleSubmit, onSubmit, onError]);

    useEffect(() => {
        setValue('mode', gameMode as FormuleMode|ActionMode);
    }, [gameMode]);

    const titles = gameType === 'formules' ? FORMULE_TITLES : ACTION_TITLES;
    const showFormuleInput = true
    const showDigitCountInput = !isSoundNumbers
    const showSecondDigitCountInput = isDoubleDigitCount
    const showNumberCountInput = !isSingleQuestion
    const showGameCountInput = isSingleQuestion
    const showBetweenDurationInput = !isSingleQuestion
    const showAnswerDurationInput = isSingleQuestion


    
    return (
        <div className="w-full p-4 order-2 md:order-1 mt-0 md:mt-0">
                <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col md:flex-row gap-4">
                    <div>
                        {showFormuleInput && <Controller
                            control={control}
                            name="mode"
                            render={({ field }) => (
                                <FormControl fullWidth className="max-w-[300px]">
                                    <InputLabel><Lang>Mod</Lang></InputLabel>
                                    <Select
                                        {...field}
                                        value={field.value}
                                        label={<Lang>Mod</Lang>}
                                        onChange={field.onChange}
                                        className={formElementVariants({ changed: field.value !== gameMode })}
                                    >

                                        {Object.entries(titles).map(([key, title]) => (
                                            <MenuItem key={key} value={key}><Lang>{title}</Lang></MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                            )}
                        />}
                    </div>

                    {showDigitCountInput && (
                        <div className="w-full">
                            <Controller
                                control={control}
                                name="digitCount"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={<span className="font-bold">{langContent[language]!['Rəqəm sayı']}</span>}
                                        type="number"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onKeyDown={onEnterPress}
                                        className={formElementVariants({ changed: +field.value !== +digitCount })}
                                    />
                                )}
                            />
                        </div>
                    )}
                    
                    {showSecondDigitCountInput && (
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
                                        label={<span className="font-bold">{langContent[language]!['İkinci rəqəm sayı']}</span>}
                                        type="number"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onKeyDown={onEnterPress}
                                        className={formElementVariants({ changed: +field.value !== +secondDigitCount })}
                                    />
                                )}
                        />
                    </div>
                    )}

                    {showNumberCountInput && (
                        <div className="w-full">
                            <Controller
                                control={control}
                                name="numberCount"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={<span className="font-bold">{langContent[language]!['Ədəd sayı']}</span>}
                                        type="number"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onKeyDown={onEnterPress}
                                        className={formElementVariants({ changed: +field.value !== +numberCount })}
                                    />
                                )}
                            />
                        </div>
                    )}

                    {showGameCountInput && (
                        <div className="w-full">
                            <Controller
                                control={control}
                                name="gameCount"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={<span className="font-bold">{langContent[language]!['Oyun sayı']}</span>}
                                        type="number"
                                        value={field.value}
                                        onChange={field.onChange}
                                        onKeyDown={onEnterPress}
                                        className={formElementVariants({ changed: +field.value !== +gameCount })}
                                    />
                                )}
                            />
                        </div>
                    )}

                    {showAnswerDurationInput && (
                        <div className="w-full">
                            <Controller
                                control={control}
                                name="answerDuration"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label={<span className="font-bold">{langContent[language]!['Cavab üçün saniyə']}</span>}
                                        value={field.value}
                                        onChange={field.onChange}
                                        onKeyDown={onEnterPress}
                                        className={formElementVariants({ changed: +field.value !== +answerDuration })}
                                    />
                                )}
                        />
                    </div>
                    )}

                    {showBetweenDurationInput && (
                        <div className="w-full">
                            <Controller
                            control={control}
                            name="betweenDuration"
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label={<span className="font-bold">{langContent[language]!['Ədədlərarası saniyə']}</span>}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onKeyDown={onEnterPress}
                                    className={formElementVariants({ changed: +field.value !== +betweenDuration })}
                                />
                            )}
                            />
                        </div>
                    )}

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
