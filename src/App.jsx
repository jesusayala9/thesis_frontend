import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Recommendations from "./components/Recommendations/Recommendations";
import Index from "./components/Index/Index";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <img src="/logo1.png" className="logo" alt="Vite logo" />{" "}
          {/* Ruta relativa desde la raíz */}
          <h1>Sistema de Recomendación MotoMatch</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/recommendations/:userId"
              element={<Recommendations />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
