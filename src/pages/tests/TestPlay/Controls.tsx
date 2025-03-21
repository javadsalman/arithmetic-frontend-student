import { Button } from "@mui/material";
import Lang from "../Lang";

interface ControlsProps {
    started: boolean;
    hasPreviousPage: boolean;
    onStart: () => void;
    onFinish: () => void;
    onNextPage: () => void;
    onPreviousPage: () => void;
}

function Controls({ started, onStart, onFinish, hasPreviousPage, onNextPage, onPreviousPage }: ControlsProps) {
    if (started) {
        return (
            <div className='flex w-full gap-4 mt-4 flex-wrap justify-center md:justify-start'>
                <Button className="w-full md:w-32 order-3 md:order-1" sx={{ marginRight: 'auto' }} size="large" variant="contained" color="warning" onClick={onFinish}><Lang>BİTİR</Lang></Button>
                { hasPreviousPage && <Button className="w-full md:w-32 order-2 md:order-2" size="large" variant="outlined" color="primary" onClick={onPreviousPage}><Lang>GERİ</Lang></Button> }
                <Button className="w-full md:w-32 order-1 md:order-3" size="large" variant="contained" color="primary" onClick={onNextPage}><Lang>IRƏLİ</Lang></Button>
                </div>
            )
        }
    return (
        <div className='flex mt-4 justify-end'>
            <Button className="w-32" size="large" variant="contained" color="primary" onClick={onStart}><Lang>BAŞLA</Lang></Button>
        </div>
    )
}

export default Controls;