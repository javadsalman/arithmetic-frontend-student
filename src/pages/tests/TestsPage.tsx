import TestPlay from "./TestPlay/TestPlay";
import { useTestStore } from "../../stores/testStore";
import TestResult from "./TestResult/TestResult";
function TestsPage() {

    const { finished } = useTestStore();

    return (
        <div className="container mx-auto px-4 pb-10 pt-12">
            {finished ? <TestResult /> : <TestPlay />}
        </div>
    )
}

export default TestsPage;