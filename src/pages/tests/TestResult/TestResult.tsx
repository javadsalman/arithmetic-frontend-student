import { useState } from "react";
import GeneralResult from "./GeneralResult";
import DetailedResult from "./DetailedResult";
import { Tabs, Tab, Button } from "@mui/material";
import { resetTests } from "../../../stores/testStore";
import Lang, { content as langContent } from "../Lang";
import { useLanguageStore } from "../../../stores/languageStore";

function TestResult() {
    const [resultTab, setResultTab] = useState<"general" | "detailed">("general");
    const { language } = useLanguageStore();
    
    const handleTabChange = (_event: React.SyntheticEvent, newValue: "general" | "detailed") => {
        setResultTab(newValue);
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-4 font-nunito">
                {/* Empty div for spacing balance */}
                <div className="w-[180px]"></div>
                
                {/* Center tabs */}
                <div className="flex-grow flex justify-center mb-8">
                    <Tabs
                        value={resultTab}
                        onChange={handleTabChange}
                        centered
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab 
                            label={langContent[language]!['YEKUN NƏTİCƏ']} 
                            value="general"
                            className="px-8 py-3 text-sm font-medium"
                        />
                        <Tab 
                            label={langContent[language]!['TEST CAVABI']} 
                            value="detailed"
                            className="px-8 py-3 text-sm font-medium"
                        />
                    </Tabs>
                </div>
                
                {/* Play again button */}
                <div className="w-[180px] flex justify-end">
                    <Button 
                        variant="contained"
                        size="large"
                        onClick={resetTests}
                    >
                        <Lang>YENIDƏN OYNA</Lang>
                    </Button>
                </div>
            </div>
            {resultTab === "general" ? <GeneralResult /> : <DetailedResult />}
        </div>
    )
}

export default TestResult;
