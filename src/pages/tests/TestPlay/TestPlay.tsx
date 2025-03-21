import ModeButtons from '../../../components/Test/ModeButtons';
import { useEffect, useState, createRef } from 'react';
import TimeButton from './TimeButton';
import { FORMULE_TITLES } from '../../formules/constants';
import { addRoundsByMode, resetTests, useTestStore, finishTest } from '../../../stores/testStore';
import TestList from '../../../HOC/Test/TestList';
import Options from './Options';
import Controls from './Controls';
import { EASY_MODE, HARD_MODE, MEDIUM_MODE, MODE_COLORS } from '../constants';
import { TestColumnProps } from '../../../components/Test/TestColumn';
import { DEFAULT_COLUMN_COUNT, DEFAULT_ROUND_COUNT } from '../constants';

function TestPlay() {
    const [columnCount, setColumnCount] = useState(DEFAULT_COLUMN_COUNT)
    const { started, setStarted } = useTestStore()
    
    const {
        rounds,
        digitCount,
        setDigitCount,
        numberCount,
        setNumberCount,
        gameMode,
        setGameMode,
        getCurrentCoefficient,
        testMode,
        setTestMode,
        setAnswer,
        pages,
        setPage,
        setNextPage,
        setPreviousPage,
        setFocusIndex,
        focusIndexes,
    } = useTestStore()

    const inputRefs = Array.from({ length: columnCount }, () => createRef<HTMLInputElement>());

    const currentPage = pages[testMode].page;

    useEffect(() => {
        if (!started) {
            setPage(0, testMode);
            resetTests();
        }
    }, [started]);


    const addDefaultRounds = () => {
        addRoundsByMode(EASY_MODE, DEFAULT_ROUND_COUNT);
        addRoundsByMode(MEDIUM_MODE, DEFAULT_ROUND_COUNT);
        addRoundsByMode(HARD_MODE, DEFAULT_ROUND_COUNT);
    }


    const handleNextPage = () => {
        setNextPage(testMode);
        if ((currentPage+2)*columnCount >= rounds[testMode].length) {
            addRoundsByMode(testMode, DEFAULT_ROUND_COUNT);
        }
    }

    const handlePreviousPage = () => {
        setPreviousPage(testMode, columnCount - 1);
    }

    const handleStart = () => {
        setStarted(true);
        resetTests();
        addDefaultRounds();
        setFocusIndex(0, testMode);
    }

    const handleFinish = () => {
        setStarted(false);
        finishTest();
    }

    const handleNext = (colIndex: number) => {
        if (colIndex === columnCount - 1) {
            handleNextPage();
        } else {
            const nextInputRef = inputRefs[colIndex + 1];
            if (nextInputRef) {
                nextInputRef.current?.focus();
            }
            setFocusIndex(colIndex + 1, testMode);
        }
    }

    const handlePrevious = (colIndex: number) => {
        if (colIndex > 0) {
            const previousInputRef = inputRefs[colIndex - 1];
            if (previousInputRef) {
                previousInputRef.current?.focus();
            }
            setFocusIndex(colIndex - 1, testMode);
        } else {
            handlePreviousPage();
        }
    }

    const onInputKeyDown = ({key, colIndex}: {key: string, colIndex: number}) => {
        if (key === 'Enter') {
            handleNext(colIndex);
        } else if (key === 'Backspace' && inputRefs[colIndex].current?.value === '') {
            handlePrevious(colIndex);
        } else if (key === 'ArrowRight') {
            handleNext(colIndex);
        } else if (key === 'ArrowLeft') {
            handlePrevious(colIndex);
        }
    }

    const modeRounds = rounds[testMode];
    const currentRounds = modeRounds.slice(currentPage * columnCount, (currentPage + 1) * columnCount);
    const columns: TestColumnProps[] = currentRounds.map((round, colIndex) => {
        return {
            index: round.index,
            focused: colIndex === focusIndexes[testMode],
            inputRef: inputRefs[colIndex],
            items: round.calcItems.map((item) => item.text),
            titleBgColor: MODE_COLORS[testMode],
            resultBgColor: round.isCorrect ? 'green' : 'red',
            userAnswer: round.userAnswer,
            onInputFocus: () => {
                setFocusIndex(colIndex, testMode);
            },
            onAnswerChange: (answer: string) => {
                setAnswer(answer, testMode, round.index);
            },
            onKeyDown: (key: string) => {
                onInputKeyDown({key, colIndex});
            },
        }
    })

    return (
        <div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-between items-center mb-16">
                <ModeButtons onModeChange={setTestMode} />
                <TimeButton start={started} onFinish={handleFinish} />
            </div>
            <Options
                page={currentPage+1}
                started={started}
                digitCount={digitCount}
                numberCount={numberCount}
                gameMode={gameMode}
                testMode={testMode}
                currentCoefficient={getCurrentCoefficient()}
                onDigitCountChange={setDigitCount}
                onNumberCountChange={setNumberCount}
                onGameModeChange={setGameMode}
                titles={FORMULE_TITLES}
            />
            <div className="relative w-full">
                <TestList
                    columns={columns}
                    columnCount={columnCount}
                    onColumnCountChange={setColumnCount}
                />
            </div>
            <Controls started={started} onStart={handleStart} onFinish={handleFinish} hasPreviousPage={currentPage > 0} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />
        </div>
    );
}

export default TestPlay;
