import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom"; // Importar Navigate
import Register from "./components/Register/Register";
import Recommendations from "./components/Recommendations/Recommendations";
import Sidebar from "./components/shared/sidebar/sidebar";
import "./App.css";
import Login from "./components/login/login";
import Preferences from "./components/preferences/preferences";
import PasswordRecovery from "./components/reset-password/recuperar-contraseña";
import MotorcycleCard from "./components/shared/card/card";
import Profile from "./components/Profile/Profile"; // Importar el componente Profile

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') !== null);

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('token') !== null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <main>
          <Routes>
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
            <Route element={isAuthenticated ? <SidebarLayout /> : <Navigate to="/" />} >
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/motorcycle-card" element={<MotorcycleCard />} />
              <Route path="/recommendations/:userId" element={<Recommendations />} />
              <Route path="/profile/:id" element={<Profile />} /> {/* Añadir la ruta para el perfil */}
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const SidebarLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

export default App;