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
    MULTIPLE_MONEY_ACTION,
    TIME_ACTION,
    LENGTH_ACTION,
    MASS_ACTION,
    SIMPLE_MULTIPLICATION_ACTION,
    SIMPLE_DIVISION_ACTION,
    SQUARE_ACTION,
    REMAINDER_DIVISION_ACTION,
    SQUARE_ROOT_ACTION,
    MUSICAL_INSTRUMENTS_ACTION,
    ANIMAL_SOUNDS_ACTION,
} from "./constants";
import { DIGIT_STEP, TABLE_MUL_DIV_STEP, TABLE_POWER_STEP, SOUND_INSTRUMENTS_STEP, SOUND_ANIMALS_STEP } from "../steps/constants";


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

    const handleNoteClick = (action: string, step: string = DIGIT_STEP) => {
        navigate(`/game/actions/${action}/steps/${step}`);
    }
    
    return (
        <div className="container mx-auto px-4 pb-10">
            {/* Title */}
            <h1 className="text-center text-4xl font-bold text-red-500 mt-10 mb-16">
                Sənə uyğun əməli seç!
            </h1>
            <div className="flex flex-wrap justify-evenly lg:grid-cols-4 gap-4 gap-y-10 px-5">
                <div onClick={() => handleNoteClick(FREE_WORK_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[0].front} backColor={COLOR_PALETTES[0].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>+2</span>
                        <p className={text()}>SƏRBƏST ÇALIŞMA</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(FREE_WORK_FLIPPED_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[1].front} backColor={COLOR_PALETTES[1].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large", transform: "flip" })}>2+</span>
                        <p className={text()}>SƏRBƏST ÇALIŞMA TƏRSİNƏ ƏDƏDLƏR</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(COMBINED_OPERATIONS_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[2].front} backColor={COLOR_PALETTES[2].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumLarge" })}>(8+9)*1</span>
                        <p className={text()}>Toplama və çıxma və vurma əməlləri birgə hesabla</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(DOUBLE_CALCULATION_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[3].front} backColor={COLOR_PALETTES[3].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumLarge" })}>+49 | -68</span>
                        <p className={text({ size: "large" })}>İkili hesab</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(DOUBLE_CALCULATION_FLIPPED_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[4].front} backColor={COLOR_PALETTES[4].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "medium", transform: "flip" })}>+49 | -68</span>
                        <p className={text({ size: "medium" })}>İkili hesab üzrə təsinə ədədlər</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(RANDOM_NUMBERS_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[5].front} backColor={COLOR_PALETTES[5].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "medium" })}>+49 |</span>
                        <p className={text()}>Oradan-buradan ədədlər</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(RANDOM_NUMBERS_ROTATED_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[6].front} backColor={COLOR_PALETTES[6].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large", transform: "rotate" })}>+49</span>
                        <p className={text()}>Oradan-buradan dönən ədədlər</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(PARENTHESES_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[7].front} backColor={COLOR_PALETTES[7].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumSmall" })}>84+(17+15)</span>
                        <p className={text()}>Mötərizəli misallar</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(EQUATION_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[8].front} backColor={COLOR_PALETTES[8].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>5-x=2</span>
                        <p className={text()}>Məhculun tapılması</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(PERCENTAGE_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[9].front} backColor={COLOR_PALETTES[9].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "medium" })}>3+2(29%)</span>
                        <p className={text()}>Faiz olan misallar hesabla</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(MONEY_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[10].front} backColor={COLOR_PALETTES[10].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <div className={number({ size: "small" })}>+ 15man 82qəp</div>
                        <div className={number({ size: "small" })}>15man 82qəp</div>
                        <p className={text({ size: "large" })}>Pul vahidi</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(MULTIPLE_MONEY_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[11].front} backColor={COLOR_PALETTES[11].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <div className={number({ size: "small" })}>+ 15man</div>
                        <div className={number({ size: "small" })}>82qəp</div>
                        <p className={text({ size: "large" })}>Çoxlu pul vahidi</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(TIME_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[12].front} backColor={COLOR_PALETTES[12].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <div className={number({ size: "small" })}>+ 2saat 54dəq</div>
                        <div className={number({ size: "small" })}>2saat 12dəq</div>
                        <p className={text({ size: "large" })}>Zaman vahidi</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(LENGTH_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[13].front} backColor={COLOR_PALETTES[13].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <div className={number({ size: "small" })}>+ 1m 12sm</div>
                        <div className={number({ size: "small" })}>1m 12sm</div>
                        <p className={text({ size: "large" })}>Uzunluq vahidi</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(MASS_ACTION)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[14].front} backColor={COLOR_PALETTES[14].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <div className={number({ size: "small" })}>+ 1kg 856q</div>
                        <div className={number({ size: "small" })}>6kg 126q</div>
                        <p className={text({ size: "large" })}>Kütlə vahidi</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(SIMPLE_MULTIPLICATION_ACTION, TABLE_MUL_DIV_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[15].front} backColor={COLOR_PALETTES[15].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumLarge" })}>12 * 23</span>
                        <p className={text({ size: "large" })}>Sadə Vurma</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(SIMPLE_DIVISION_ACTION, TABLE_MUL_DIV_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[16].front} backColor={COLOR_PALETTES[16].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumLarge" })}>64 : 16</span>
                        <p className={text({ size: "large" })}>Sadə Bölmə</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(SQUARE_ACTION, TABLE_POWER_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[17].front} backColor={COLOR_PALETTES[17].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>64<sup>2</sup></span>
                        <p className={text({ size: "large" })}>Kvadrata Yüksəltmə</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(REMAINDER_DIVISION_ACTION, TABLE_MUL_DIV_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[18].front} backColor={COLOR_PALETTES[18].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "mediumLarge" })}>64 : 13</span>
                        <p className={text()}>Qalıqlı bölmə</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(SQUARE_ROOT_ACTION, TABLE_POWER_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[19].front} backColor={COLOR_PALETTES[19].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>√64</span>
                        <p className={text()}>Kvadrat kök</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(MUSICAL_INSTRUMENTS_ACTION, SOUND_INSTRUMENTS_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[20].front} backColor={COLOR_PALETTES[20].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>🎸🎹🎺</span>
                        <p className={text()}>Musiqi alətləri üzrə</p>
                    </div>
                </div>
                <div onClick={() => handleNoteClick(ANIMAL_SOUNDS_ACTION, SOUND_ANIMALS_STEP)} className={actionCard({ size: "default" })}>
                    <div className={flowerContainer()}>
                        <Flower frontColor={COLOR_PALETTES[21].front} backColor={COLOR_PALETTES[21].back} size={250} />
                    </div>
                    <div className={contentContainer()}>
                        <span className={number({ size: "large" })}>🐶🐱🐮</span>
                        <p className={text()}>Heyvan səsləri üzrə</p>
                    </div>
                </div>
            </div>
        </div>
    );   
}

export default ActionsPage;
