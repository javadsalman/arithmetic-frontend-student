import Layout from "./HOC/Layout/Layout"
import { Route, Routes } from 'react-router';
import ProfilePage from "./pages/profile/ProfilePage";
import FormulesPage from "./pages/formules/FormulesPage";
import Actions from "./pages/actions/ActionsPage";
import HomePage from "./pages/home/HomePage";
import TestsPage from "./pages/tests/TestsPage";
import StepsPage from "./pages/steps/StepsPage";
import GamePage from "./pages/game/GamePage";
import { useState, useCallback, useRef } from "react";

const password = "12tiamo34";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const checkAuth = useCallback(() => {
        const newEnteredPassword = inputRef.current?.value;
        if (newEnteredPassword === password) {
            setIsAuthenticated(true);
        } else {
            setWrongPassword(true);
        }
    }, [inputRef]);


    if (!isAuthenticated) {
        return <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Giriş məlumatlarınızı daxil edin</h1>
            {wrongPassword && <p className="text-red-500 mb-2">Şifrə yanlışdır</p>}
            <input className="border-2 border-gray-300 rounded-md p-2 mb-2" type="password" placeholder="Şifrəni daxil edin" ref={inputRef} onKeyDown={e => e.key === "Enter" && checkAuth()} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={checkAuth}>Giriş et</button>
        </div>
    }

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/formules">
                    <Route index element={<FormulesPage />} />
                </Route>
                <Route path="/actions">
                    <Route index element={<Actions />} />
                </Route>
                <Route path="/game/:gameType/:gameMode">
                    <Route path="steps/:step" element={<StepsPage />} />
                    <Route path="game" element={<GamePage />} />
                </Route>
                <Route path="/tests" element={<TestsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Layout>
    )
}

export default App
