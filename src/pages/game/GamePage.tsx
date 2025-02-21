import Gameplay from "../../components/Game/Gameplay";
import MiniForm from "../../components/Game/MiniForm";


function GamePage() {

    return (
        <div className="flex flex-col items-center justify-center relative w-full md:w-[80%] mx-auto">
            <MiniForm />    
            <div className="w-full order-1 md:order-2">
                <Gameplay />
            </div>
        </div>
    )
}

export default GamePage;
