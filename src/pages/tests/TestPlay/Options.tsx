import { tv } from "tailwind-variants";
import { FormuleMode } from "../../../lib/formules/types";
import { Mode } from "../types";
import { MODE_COLORS } from "../constants";
import Lang, { content as langContent } from "../Lang";
import { useLanguageStore } from "../../../stores/languageStore";
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const buttonVariants = tv({
    base: 'px-8 py-2 rounded-full text-white font-medium hover:bg-green-500 transition-colors',
    variants: {
        color: {
            green: 'bg-green-400 hover:bg-green-500',
            yellow: 'bg-yellow-400 hover:bg-yellow-500',
            blue: 'bg-blue-400 hover:bg-blue-500',
            gray: 'bg-gray-400 hover:bg-gray-500'
        },
        circle: {
            true: 'w-12 h-12 p-0 rounded-full flex items-center justify-center'
        }
    }
})

interface OptionsProps {
    page: number;
    started: boolean;
    titles: Record<string, string>;
    digitCount: number;
    numberCount: number;
    gameMode: string|null;
    testMode: Mode;
    currentCoefficient: number;
    onDigitCountChange: (count: number) => void;
    onNumberCountChange: (count: number) => void;
    onGameModeChange: (mode: FormuleMode) => void;
}

function Options({ page, started, digitCount, numberCount, gameMode, testMode, onDigitCountChange, onNumberCountChange, onGameModeChange, titles }: OptionsProps) {
    const { language } = useLanguageStore();
    return (
        <div className="flex gap-4 mb-5 justify-between md:justify-start items-center">
                <div className={buttonVariants({ color: MODE_COLORS[testMode], circle: true, className: 'text-2xl font-bold' })}>
                    {page}
                </div>
                <TextField
                    size="small"
                    placeholder='reqem'
                    value={digitCount}
                    onChange={(e) => onDigitCountChange(Number(e.target.value))}
                    disabled={started}
                    sx={{ width: '100px' }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    label={langContent[language]?.['Rəqəm Sayı']}
                />
                <TextField
                    size="small"
                    placeholder='eded'
                    value={numberCount}
                    onChange={(e) => onNumberCountChange(Number(e.target.value))}
                    disabled={started}
                    sx={{ width: '100px' }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    label={langContent[language]?.['Ədəd Sayı']}
                />
                <FormControl>
                    <InputLabel id="gamemode-select-label">{langContent[language]?.['Formul']}</InputLabel>
                    <Select
                        size="small"
                        value={gameMode || ''}
                        onChange={(e) => onGameModeChange(e.target.value as FormuleMode)}
                        disabled={started}
                        labelId="gamemode-select-label"
                        label={langContent[language]?.['Formul']}
                    >
                        {Object.entries(titles).map(([key, title]) => (
                            <MenuItem key={key} value={key}><Lang>{title}</Lang></MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
    )
}

export default Options;