import Layout from "./HOC/Layout/Layout"
import { Route, Routes } from 'react-router';
import ProfilePage from "./pages/profile/ProfilePage";
import FormulesPage from "./pages/formules/FormulesPage";
import Actions from "./pages/actions/ActionsPage";
import HomePage from "./pages/home/HomePage";
import TestsPage from "./pages/tests/TestsPage";
import StepsPage from "./pages/steps/StepsPage";
import GamePage from "./pages/game/GamePage";

function App() {
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
