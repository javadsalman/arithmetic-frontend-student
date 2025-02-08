import { useParams, useNavigate } from "react-router";
import { Stepper, Step, StepButton } from "@mui/material";
import DigitStep from "./components/DigitStep";
import NumberStep from "./components/NumberStep";
import TimeStep from "./components/TimeStep";
import { StepType } from "./types";
import { DIGIT_STEP, NUMBER_STEP, TIME_STEP, STEP_TITLES, STEP_ORDERS } from "./constants";
import Lang, {content as langContent} from "./Lang";

const stepKeys = ['digit', 'number', 'time'] as const;

function StepsPage() {
    const { gameType, gameMode, step} = useParams();
    const navigate = useNavigate();
    const stepIndex = STEP_ORDERS.indexOf(step as StepType);

    const handleStep = (index: number) => {
        const stepKey = stepKeys[index];
        navigate(`/game/${gameType}/${gameMode}/steps/${stepKey}`);
    };


    const renderStepContent = (step: StepType) => {
        switch (step) {
            case DIGIT_STEP:
                return <DigitStep />;
            case NUMBER_STEP:
                return <NumberStep />;
            case TIME_STEP:
                return <TimeStep />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="w-10/12 mx-auto">
                <Stepper activeStep={stepIndex} alternativeLabel nonLinear>
                    {STEP_ORDERS.map((step, index) => (
                        <Step key={step} completed={index < stepIndex}>
                            <StepButton onClick={() => handleStep(index)}>
                                <Lang>{STEP_TITLES[step]}</Lang>
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
