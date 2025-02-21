import Lang from "../../home/Lang"
import { tv } from "tailwind-variants"
import { DIGIT_STEP, MULTIPY_DIVIDE_TABLE, POWER_TABLE } from "../constants"
import Button from "@mui/material/Button"
import { useNavigate } from "react-router";
import { useGameStore } from "../../../stores/gameStore";

const cellStyles = tv({
    base: "p-3 text-center border transition-colors duration-150 w-24 min-w-[6rem] select-none",
    variants: {
        isHeader: {
            true: "bg-[#d8f3c3] font-semibold",
            false: "bg-[#FFF1F0]"
        },
        isHighlighted: {
            true: "bg-[#FFB3B3]",
            false: ""
        }
    },
    compoundVariants: [
        {
            isHeader: false,
            isHighlighted: false,
            class: "hover:bg-[#FFD6D6]"
        }
    ]
})

interface TableStepProps {
    tableType: "multiply-divide" | "power";
}

function TableStep({ tableType }: TableStepProps) {
    const navigate = useNavigate();
    const { gameType, gameMode } = useGameStore();
    const table = tableType === "multiply-divide" ? MULTIPY_DIVIDE_TABLE : POWER_TABLE;
    const title = tableType === "multiply-divide" 
        ? "Vurma və bölmə cədvəlini öyrənək"
        : "Qüvvət cədvəlini öyrənək";

    const getIsHighlighted = (rowIndex: number, cellIndex: number, isHeader: boolean) => {
        if (isHeader || tableType === "power") return false;
        return rowIndex === cellIndex + 1;
    };

    const handleNext = () => {
        navigate(`/game/${gameType}/${gameMode}/steps/${DIGIT_STEP}`);
    }

    const handleStart = () => {
        navigate(`/game/${gameType}/${gameMode}/game`);
    }

    return (
        <div className="mx-auto">
            <h2 className="text-2xl font-semibold text-[#FF4D4F] mb-8 text-center">
                <Lang>{title}</Lang>
            </h2>
            
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <tbody>
                        {table.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cellValue: number | string, cellIndex) => {
                                    const isHeader = rowIndex === 0 || rowIndex === table.length - 1 || cellIndex === 0;
                                    const isHighlighted = getIsHighlighted(rowIndex, cellIndex, isHeader);

                                    return (
                                        <td
                                            key={cellIndex}
                                            className={cellStyles({ 
                                                isHeader, 
                                                isHighlighted 
                                            })}
                                        >
                                            {cellValue}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center max-w-md mx-auto mt-4"> 
                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                >
                    <Lang>NÖVBƏTİ</Lang>
                </Button>
            </div>
            <div className="flex justify-center max-w-md mx-auto mt-2"> 
                <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleStart}
                >
                    <Lang>BAŞLA</Lang>
                </Button>
            </div>
            <div className="flex justify-center max-w-md mx-auto mt-2"> 
                <Button
                    fullWidth
                    size="large"
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/actions`)}
                >
                    <Lang>Geri</Lang>
                </Button>
            </div>
        </div>
    );
}

export default TableStep;
