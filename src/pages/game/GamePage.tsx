import GamePlay from "../../components/Game/GamePlay";
import MiniForm from "../../components/Game/MiniForm";
import { useGameplayStore } from "../../stores/gameplayStore";


function GamePage() {
    const { timestamp } = useGameplayStore();

    return (
        <div className="flex flex-col items-center justify-center relative w-full md:w-[80%] mx-auto">
            <MiniForm />    
            <div className="w-full order-1 md:order-2">
                <GamePlay key={timestamp} />
            </div>
        </div>
    )
}

export default GamePage;
