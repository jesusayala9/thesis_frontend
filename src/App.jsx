import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
  return (
    <Router>
      <div className="app-container">
        <Sidebar /> {/* Asegúrate de que el Sidebar se muestre en todas las páginas */}
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/password-recovery" element={<PasswordRecovery />} />
            <Route path="/motorcycle-card" element={<MotorcycleCard />} />
            <Route path="/recommendations/:userId" element={<Recommendations />} />
            <Route path="/profile/:id" element={<Profile />} /> {/* Añadir la ruta para el perfil */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;