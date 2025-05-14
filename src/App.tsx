import Layout from "./HOC/Layout/Layout"
import { Route, Routes } from 'react-router';
import ProfilePage from "./pages/profile/ProfilePage";
import FormulesPage from "./pages/formules/FormulesPage";
import Actions from "./pages/actions/ActionsPage";
import HomePage from "./pages/home/HomePage";
import TestsPage from "./pages/tests/TestsPage";
import StepsPage from "./pages/steps/StepsPage";
import GamePage from "./pages/game/GamePage";
import LoginPage from "./pages/login/LoginPage";
import { useAuthStore } from "./stores/authStore";
import CheckAuth from "./pages/InitialCheck";
import PageSpinner from "./components/Loading/PageSpinner";
import { useUiStore } from "./stores/uiStore";
function App() {
    const {student} = useAuthStore((state) => state);
    const {isLoading} = useUiStore((state) => state);

    if (!student) {
        return (
            <>
                {isLoading && <PageSpinner />}
                <Routes>
                    <Route path="/login/:langCode/:userID/:userToken" element={<LoginPage />} />
                    <Route path="*" element={<CheckAuth />} />
                </Routes>
            </>
        )
    }

    return (
        <Layout>
            {isLoading && <PageSpinner />}
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
