import { useParams, useNavigate } from "react-router";
import { Stepper, Step, StepButton } from "@mui/material";
import DigitStep from "./components/DigitStep";
import NumberStep from "./components/NumberStep";
import TimeStep from "./components/TimeStep";
import { StepType } from "./types";
import { DIGIT_STEP, NUMBER_STEP, TIME_STEP, TABLE_MUL_DIV_STEP, TABLE_POWER_STEP, SOUND_INSTRUMENTS_STEP, SOUND_ANIMALS_STEP, STEP_TITLES } from "./constants";
import Lang from "./Lang";
import TableStep from "./components/TableStep";
import SoundList from "./components/SoundStep";
import { useMemo } from "react";
import { ActionMode } from "../actions/types";
import { ACTIONS_FEATURES } from "../actions/constants";

function StepsPage() {
    const { gameType, gameMode, step} = useParams();
    const navigate = useNavigate();

    const stepOrders: StepType[] = useMemo(() => {
        if (gameType === 'actions') {
            if (ACTIONS_FEATURES[gameMode as ActionMode].steps.includes(TABLE_MUL_DIV_STEP)) {
                return [TABLE_MUL_DIV_STEP, DIGIT_STEP, NUMBER_STEP, TIME_STEP];
            }
            if (ACTIONS_FEATURES[gameMode as ActionMode].steps.includes(TABLE_POWER_STEP)) {
                return [TABLE_POWER_STEP, DIGIT_STEP, NUMBER_STEP, TIME_STEP];
            }
            if (ACTIONS_FEATURES[gameMode as ActionMode].steps.includes(SOUND_INSTRUMENTS_STEP)) {
                return [SOUND_INSTRUMENTS_STEP, NUMBER_STEP, TIME_STEP];
            }
            if (ACTIONS_FEATURES[gameMode as ActionMode].steps.includes(SOUND_ANIMALS_STEP)) {
                return [SOUND_ANIMALS_STEP, NUMBER_STEP, TIME_STEP];
            }
        }
        return [DIGIT_STEP, NUMBER_STEP, TIME_STEP]
    }, [])

    
    const stepIndex = stepOrders.indexOf(step as StepType);

    const handleStep = (step: StepType) => {
        navigate(`/game/${gameType}/${gameMode}/steps/${step}`);
    };


    const renderStepContent = (step: StepType) => {
        switch (step) {
            case DIGIT_STEP:
                return <DigitStep />;
            case NUMBER_STEP:
                return <NumberStep />;
            case TIME_STEP:
                return <TimeStep />;
            case TABLE_MUL_DIV_STEP:
                return <TableStep tableType="multiply-divide" />;
            case TABLE_POWER_STEP:
                return <TableStep tableType="power" />;
            case SOUND_INSTRUMENTS_STEP:
                return <SoundList soundsType="instruments" />;
            case SOUND_ANIMALS_STEP:
                return <SoundList soundsType="animals" />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="w-10/12 mx-auto">
                <Stepper activeStep={stepIndex} alternativeLabel nonLinear>
                    {stepOrders.map((stepItem, index) => (
                        <Step key={stepItem} completed={index < stepIndex}>
                            <StepButton onClick={() => handleStep(stepItem)}>
                                <Lang>{STEP_TITLES[stepItem]}</Lang>
                            </StepButton>
                        </Step>

                    ))}
                </Stepper>
            </div>
            <div className="mt-8">
                {renderStepContent(step as StepType)}
            </div>
        </div>
    );
}

export default StepsPage;
