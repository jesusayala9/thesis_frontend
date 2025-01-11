// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Index.css";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        { correo: email, contraseña: password }
      );

      const authToken = response.data.token;
      localStorage.setItem("token", authToken);
      setToken(authToken);
      setUser(response.data.user);

      console.log("Token:", authToken);
      console.log("Datos del usuario:", response.data.user);

      navigate("/home");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
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

      {/* Mostrar los datos del usuario si están disponibles */}
      {user && (
        <div className="user-info">
          <h2>Información del Usuario</h2>
          <p>ID: {user.id}</p>
          <p>Nombre: {user.nombre}</p>
          <p>Correo: {user.correo}</p>
        </div>
      )}

      {/* Mostrar el token si está disponible */}
      {token && (
        <div className="token-info">
          <h2>Token</h2>
          <p>{token}</p>
        </div>
      )}
    </div>
  );
};

export default Index;
