import ModeButtons from "../../../components/Test/ModeButtons";
import TestList from "../../../HOC/Test/TestList";
import { useState } from "react";
import { useTestStore } from "../../../stores/testStore";
import { TestColumnProps } from "../../../components/Test/TestColumn";
import { DEFAULT_COLUMN_COUNT, MODE_COLORS } from "../constants";


function DetailedResult() {
    const [columnCount, setColumnCount] = useState(DEFAULT_COLUMN_COUNT);

    const { rounds, testMode, setTestMode } = useTestStore();

    const modeRounds = rounds[testMode];
    const columns: TestColumnProps[] = modeRounds.map((round) => {
        const resultBgColor = round.userAnswer ? (round.isCorrect ? 'green' : 'red') : 'gray';
        const result = round.userAnswer ? round.userAnswer : '-';
        return {
            index: round.index,
            focused: false,
            items: round.calcItems.map((item) => item.text),
            titleBgColor: MODE_COLORS[testMode],
            resultBgColor,
            result,
        }
    });

    const columnChunks: TestColumnProps[][] = columns.reduce((acc, col, index) => {
        const chunkIndex = Math.floor(index / columnCount);
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(col);
        return acc;
    }, [] as TestColumnProps[][]);

    
    return (
        <div>
            <div className="flex mb-8">
                <ModeButtons onModeChange={setTestMode} />
            </div>
            <div>
                {columnChunks.map((chunk, index) => (
                    <div key={index} className="flex gap-1 mb-8">
                        <TestList columns={chunk} columnCount={columnCount} onColumnCountChange={setColumnCount} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DetailedResult;