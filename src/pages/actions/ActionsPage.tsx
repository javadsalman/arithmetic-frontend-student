import { useNavigate } from "react-router";
import Flower from "../../assets/dynamic/Flower";
import { tv } from "tailwind-variants";
import {
    COLOR_PALETTES,
    FREE_WORK_ACTION,
    FREE_WORK_FLIPPED_ACTION,
    COMBINED_OPERATIONS_ACTION,
    DOUBLE_CALCULATION_ACTION,
    DOUBLE_CALCULATION_FLIPPED_ACTION,
    RANDOM_NUMBERS_ACTION,
    RANDOM_NUMBERS_ROTATED_ACTION,
    PARENTHESES_ACTION,
    EQUATION_ACTION,
    PERCENTAGE_ACTION,
    MONEY_ACTION,
    TIME_ACTION,
    LENGTH_ACTION,
    MASS_ACTION,
    SIMPLE_MULTIPLICATION_ACTION,
    SIMPLE_DIVISION_ACTION,
    SQUARE_ACTION,
    REMAINDER_DIVISION_ACTION,
    SQUARE_ROOT_ACTION,
    INSTRUMENT_SOUNDS_ACTION,
    ANIMAL_SOUNDS_ACTION,
    ACTION_TITLES,
} from "./constants";
import { DIGIT_STEP, TABLE_MUL_DIV_STEP, TABLE_POWER_STEP, SOUND_INSTRUMENTS_STEP, SOUND_ANIMALS_STEP } from "../steps/constants";
import { useGameStore } from "../../stores/gameStore";
import { ActionMode } from "./types";
import Lang, { content as langContent } from "./Lang";
import { useLanguageStore } from "../../stores/languageStore";
import { useAuthStore } from "../../stores/authStore";
import { MIXED_ADD_SUB } from "../../lib/formules/constants";
import { FormuleMode } from "../../lib/formules/types";


const actionCard = tv({
    base: "relative flex items-center justify-center p-4 cursor-pointer hover:scale-105 transition-transform",
    variants: {
        size: {
            default: "w-[250px] h-[250px]",
            auto: "",
        }
    },
    defaultVariants: {
        size: "auto"
    }
});

const flowerContainer = tv({
    base: "absolute inset-0 flex items-center justify-center"
});

const contentContainer = tv({
    base: "relative z-10 text-center",
    variants: {
        spacing: {
            default: "",
            large: "mt-2",
            small: "mt-1"
        }
    },
    defaultVariants: {
        spacing: "default"
    }
});

const text = tv({
    base: "text-white font-medium mt-2 font-bold",
    variants: {
        size: {
            default: "",
            large: "text-2xl",
            medium: "text-xl",
        }
    },
    defaultVariants: {
        size: "default"
    }
});

const number = tv({
    base: "font-bold text-white",
    variants: {
        size: {
            default: "text-3xl",
            large: "text-6xl",
            mediumLarge: "text-5xl",
            medium: "text-4xl",
            mediumSmall: "text-3xl",
            small: "text-md"
        },
        transform: {
            default: "",
            flip: "transform scale-y-[-1] inline-block",
            rotate: "rotate-[-30deg] inline-block"
        }
    },
    defaultVariants: {
        size: "default",
        transform: "default"
    }
});

function ActionsPage() {
    const navigate = useNavigate();
    const { setGameType, setGameMode, setGameFormule } = useGameStore();
    const { language } = useLanguageStore();
    const actionCode = useAuthStore((state) => state.student?.allowed_challenge_formule?.code);

    const handleNoteClick = (action: string, step: string = DIGIT_STEP) => {
        const defaultFormuleMode = actionCode || MIXED_ADD_SUB;
        setGameType("actions");
        setGameMode(action as ActionMode);
        setGameFormule(defaultFormuleMode as FormuleMode);
        navigate(`/game/actions/${action}/steps/${step}`);
    }
    
    return (
        <div className="container mx-auto px-4 pb-10">
            {/* Title */}
            <h1 className="text-center text-4xl font-bold text-red-500 mt-10 mb-16">
                <Lang>Sənə uyğun əməli seç!</Lang>
            </h1>
            <div className="flex flex-wrap justify-evenly lg:grid-cols-4 gap-4 gap-y-10 px-5">
                {/* 1. Sərbəst çalışma */}
                <div onClick={() => handleNoteClick(FREE_WORK_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[0].front} backColor={COLOR_PALETTES[0].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>+2</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[FREE_WORK_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 2. Tərsinə ədədlər */}
                <div onClick={() => handleNoteClick(FREE_WORK_FLIPPED_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[1].front} backColor={COLOR_PALETTES[1].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large", transform: "flip" })}>2+</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[FREE_WORK_FLIPPED_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 3. Ordan burdan ədədlər */}
                <div onClick={() => handleNoteClick(RANDOM_NUMBERS_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[5].front} backColor={COLOR_PALETTES[5].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "medium" })}>+49 |</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[RANDOM_NUMBERS_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 4. Ordan -burdan dönən ədədlər */}
                <div onClick={() => handleNoteClick(RANDOM_NUMBERS_ROTATED_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[6].front} backColor={COLOR_PALETTES[6].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large", transform: "rotate" })}>+49</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[RANDOM_NUMBERS_ROTATED_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 5. İkili hesab */}
                <div onClick={() => handleNoteClick(DOUBLE_CALCULATION_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[3].front} backColor={COLOR_PALETTES[3].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "medium" })}>+49 | -68</span>
                        <p className={text({ size: "large" })}><Lang>{ACTION_TITLES[DOUBLE_CALCULATION_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 6. İkili hesab üzrə tərsinə ədədlər */}
                <div onClick={() => handleNoteClick(DOUBLE_CALCULATION_FLIPPED_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[4].front} backColor={COLOR_PALETTES[4].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumSmall", transform: "flip" })}>+49 | -68</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[DOUBLE_CALCULATION_FLIPPED_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 7. Mötərizəli misallar */}
                <div onClick={() => handleNoteClick(PARENTHESES_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[7].front} backColor={COLOR_PALETTES[7].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumSmall" })}>84+(17+15)</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[PARENTHESES_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 8. Məchulun tapılması */}
                <div onClick={() => handleNoteClick(EQUATION_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[8].front} backColor={COLOR_PALETTES[8].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>5-x=2</span>
                        <p className={text()}><Lang>{ACTION_TITLES[EQUATION_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 9. Musiqi səsləri */}
                <div onClick={() => handleNoteClick(INSTRUMENT_SOUNDS_ACTION, SOUND_INSTRUMENTS_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[20].front} backColor={COLOR_PALETTES[20].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "medium" })}>🎸🎺🎹</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[INSTRUMENT_SOUNDS_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 10. Heyvan səsləri */}
                <div onClick={() => handleNoteClick(ANIMAL_SOUNDS_ACTION, SOUND_ANIMALS_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[21].front} backColor={COLOR_PALETTES[21].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumLarge" })}>🐶🐱🐮</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[ANIMAL_SOUNDS_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 11. Pul vahidləri */}
                <div onClick={() => handleNoteClick(MONEY_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[10].front} backColor={COLOR_PALETTES[10].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <div className={number({ size: "small" })}>+ 15{langContent[language]!['manat']} 82{langContent[language]!['qəpik']}</div>
                        <div className={number({ size: "small" })}>15{langContent[language]!['manat']} 82{langContent[language]!['qəpik']}</div>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[MONEY_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 12. Kütlə vahidləri */}
                <div onClick={() => handleNoteClick(MASS_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[14].front} backColor={COLOR_PALETTES[14].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <div className={number({ size: "small" })}>+ 1{langContent[language]!['kq']} 856{langContent[language]!['q']}</div>
                        <div className={number({ size: "small" })}>6{langContent[language]!['kq']} 126{langContent[language]!['q']}</div>
                        <p className={text({ size: "large" })}><Lang>{ACTION_TITLES[MASS_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 13. Zaman vahidləri */}
                <div onClick={() => handleNoteClick(TIME_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[12].front} backColor={COLOR_PALETTES[12].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <div className={number({ size: "small" })}>+ 2{langContent[language]!['saat']} 54{langContent[language]!['dəq']}</div>
                        <div className={number({ size: "small" })}>2{langContent[language]!['saat']} 12{langContent[language]!['dəq']}</div>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[TIME_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 14. Uzunluq vahidi */}
                <div onClick={() => handleNoteClick(LENGTH_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[13].front} backColor={COLOR_PALETTES[13].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <div className={number({ size: "mediumSmall" })}>+ 1{langContent[language]!['m']} 12{langContent[language]!['sm']}</div>
                        <div className={number({ size: "mediumSmall" })}>1{langContent[language]!['m']} 12{langContent[language]!['sm']}</div>
                        <p className={text({ size: "large" })}><Lang>{ACTION_TITLES[LENGTH_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 15. Sadə vurma */}
                <div onClick={() => handleNoteClick(SIMPLE_MULTIPLICATION_ACTION, TABLE_MUL_DIV_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[15].front} backColor={COLOR_PALETTES[15].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumLarge" })}>12 * 23</span>
                        <p className={text({ size: "large" })}><Lang>{ACTION_TITLES[SIMPLE_MULTIPLICATION_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 16. Toplama, çıxma və vurma əməlləri birgə hesabla */}
                <div onClick={() => handleNoteClick(COMBINED_OPERATIONS_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[2].front} backColor={COLOR_PALETTES[2].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "medium" })}>(8+9)*1</span>
                        <p className={text()}><Lang>{ACTION_TITLES[COMBINED_OPERATIONS_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 17. Sadə bölmə */}
                <div onClick={() => handleNoteClick(SIMPLE_DIVISION_ACTION, TABLE_MUL_DIV_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[16].front} backColor={COLOR_PALETTES[16].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumLarge" })}>64 : 16</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[SIMPLE_DIVISION_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 18. Qalıqlı bölmə */}
                <div onClick={() => handleNoteClick(REMAINDER_DIVISION_ACTION, TABLE_MUL_DIV_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[18].front} backColor={COLOR_PALETTES[18].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumLarge" })}>64 : 13</span>
                        <p className={text()}><Lang>{ACTION_TITLES[REMAINDER_DIVISION_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 19. Kvadrata yüksəltmə */}
                <div onClick={() => handleNoteClick(SQUARE_ACTION, TABLE_POWER_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[17].front} backColor={COLOR_PALETTES[17].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>64<sup>2</sup></span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[SQUARE_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 20. Kvadrat kök misalları */}
                <div onClick={() => handleNoteClick(SQUARE_ROOT_ACTION, TABLE_POWER_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[19].front} backColor={COLOR_PALETTES[19].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>√64</span>
                        <p className={text()}><Lang>{ACTION_TITLES[SQUARE_ROOT_ACTION]}</Lang></p>
                    </div>
                </div>
                
                {/* 21. Faiz olan misallar */}
                <div onClick={() => handleNoteClick(PERCENTAGE_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[9].front} backColor={COLOR_PALETTES[9].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "medium" })}>3+2(29%)</span>
                        <p className={text({ size: "medium" })}><Lang>{ACTION_TITLES[PERCENTAGE_ACTION]}</Lang></p>
                    </div>
                </div>
            </div>
        </div>
    );   
}

export default ActionsPage;
