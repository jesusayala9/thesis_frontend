import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Index.css";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { correo: email, contraseña: password }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="index-container">
      <div className="index-box">
        <img src="/logo1.png" alt="Logo" className="logo" />
        <h1>Bienvenido a MotoMatch</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Iniciar Sesión</button>
        </form>
        <div className="separator">O</div>
        <button onClick={() => navigate("/register")}>Registrarse</button>
      </div>
    </div>
  );
};

export default Index;
