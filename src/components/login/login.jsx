// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.css";

const Login = ({ setIsAuthenticated }) => {
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
      const userId = response.data.user.id; // Obtener el ID del usuario
      localStorage.setItem("token", authToken);
      localStorage.setItem("userId", userId); // Almacenar el ID del usuario en localStorage
      setToken(authToken);
      setUser(response.data.user);
      setIsAuthenticated(true); // Actualizar el estado de autenticación

      console.log("Token:", authToken);
      console.log("Datos del usuario:", response.data.user);

      navigate("/preferences"); // Cambiar la ruta de redirección a /preferences
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className={styles["index-container"]}>
      <div className={styles["index-box"]}>
        <h1 className={styles["title"]}>Inicia sesión</h1>
        <form onSubmit={handleLogin}>
          <div className={styles["form-group"]}>
            <label>Correo Electrónico:</label>
            <input
              className={styles["input"]}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles["form-group"]}>
            <label>Contraseña:</label>
            <input
              className={styles["input"]}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p
              className={styles["password-recovery"]}
              onClick={() => navigate("/password-recovery")}
              style={{
                textDecoration: "none",
                color: "blue",
                cursor: "pointer",
              }}
            >
              ¿Olvidaste tu contraseña?
            </p>
          </div>
          {error && <p className={styles["error"]}>{error}</p>}
          <button className={styles["button-login"]} type="submit">
            Iniciar Sesión
          </button>
        </form>
        <p>
          ¿No tienes una cuenta?
          <span
            onClick={() => navigate("/register")}
            style={{
              textDecoration: "none",
              color: "blue",
              cursor: "pointer",
            }}
          >
            Registrate
          </span>
        </p>
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

export default Login;