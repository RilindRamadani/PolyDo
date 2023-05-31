import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/Auth/Auth";
import MainNavigation from "./components/SharedComponents/Navigation/MainNavigation";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { useState, useContext, useEffect } from "react";
import AuthContext, { AuthContextProvider } from "./context/auth-context";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";

function App() {
  return (
    <BrowserRouter>
      {/* Authentication pages with restriction/protection */}
      <AuthContextProvider>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
export default App;
