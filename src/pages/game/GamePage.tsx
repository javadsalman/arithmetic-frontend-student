import { useEffect } from "react";
import GamePlay from "../../components/Game/GamePlay";
import MiniForm from "../../components/Game/MiniForm";
import { useSearchParams } from "react-router";
import { useGameStore } from "../../stores/gameStore";
import { useParams } from "react-router";
import { ActionMode } from "../actions/types";
import { FormuleMode } from "../formules/index/types";



function GamePage() {
    const [searchParams] = useSearchParams();
    const timestamp = searchParams.get('timestamp') || 1;
    const { gameType, gameMode } = useParams();
    const { setGameType, setGameMode } = useGameStore();



    useEffect(() => {
        setGameType(gameType as "formules" | "actions");
        setGameMode(gameMode as FormuleMode | ActionMode);
    }, [gameType, gameMode]);


    return (
        <div className="flex flex-col items-center justify-center relative w-full md:w-[80%] mx-auto">
            <MiniForm />    
            <div className="w-full order-1 md:order-2">
                <GamePlay gameKey={timestamp} />
            </div>
        </div>


    )
}

export default GamePage;
