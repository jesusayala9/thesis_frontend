import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Recommendations from './components/Recommendations';
import './App.css';
import reactLogo from './assets/react.svg';

function App() {
    return (
        <Router>
            <div className="app-container">
                <header>
                    <img src="/logo1.png" className="logo" alt="Vite logo" /> {/* Ruta relativa desde la raíz */}
                    <h1>Sistema de Recomendación de Motocicletas</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/recommendations/:userId" element={<Recommendations />} />
                        <Route path="/" element={<Navigate to="/register" />} /> {/* Redirigir a /register */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;