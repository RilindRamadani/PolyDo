import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/Auth/Auth";
import Task from "./components/Task/Task";

import MainNavigation from "./components/SharedComponents/Navigation/MainNavigation";

function App() {
  return (
    <BrowserRouter>
      {/* Authentication pages with restriction/protection */}
      {/* Match all the endpoints on graphQL, with specific components */}

      <>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/tasks" element={<Task />} />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
