import ModeButtons from "../../../components/Test/ModeButtons";
import TestColumn from "../../../components/Test/TestColumn";

function DetailedResult() {
    return (
        <div>
            <div className="flex mb-8">
                <ModeButtons onModeChange={() => {}} />
            </div>
            <div>
                <div className="flex gap-1 mb-8">
                    {Array.from({ length: 11 }).map((_, index) => (
                        <TestColumn index={index} key={index} items={['456', '456', '456']} focused={false} result={'123'} title={'1'} titleBgColor={'orange'} resultBgColor={'gray'} />
                    ))}
                </div>
                <div className="flex gap-1">
                    {Array.from({ length: 11 }).map((_, index) => (
                        <TestColumn index={index} key={index} items={['456', '456', '456']} focused={false} result={'123'} title={'1'} titleBgColor={'orange'} resultBgColor={'gray'} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailedResult;