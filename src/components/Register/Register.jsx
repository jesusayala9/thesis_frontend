// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/register.js";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      nombre: username,
      correo: email,
      contraseña: password,
    };

    try {
      const response = await registerUser(userData);
      console.log("Usuario registrado:", response);
      setMessage("Registro exitoso. Redirigiendo...");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error registrando usuario:", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="email">
              <label>Correo Electrónico:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Registrar</button>
        </form>
        <p>
          ¿Ya tienes una cuenta?{" "}
          <span
            onClick={() => navigate("/")}
            style={{
              textDecoration: "none",
              color: "blue",
              cursor: "pointer",
            }}
          >
            Ingresa aquí
          </span>
        </p>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Register;
