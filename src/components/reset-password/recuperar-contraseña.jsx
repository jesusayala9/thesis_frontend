//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordRecorvey } from "../api/password-recovery.js";
import styles from "./recover-password.module.css";

const PasswordRecovery = () => {
  const [correo, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();

    const userData = {
      correo: correo,
    };
    try {
      const response = await passwordRecorvey(userData);
      setMessage("Se ha enviado un correo para recuperar la contraseña.");
      setError("");
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al intentar recuperar la contraseña:", error);
      setError(
        "No se pudo enviar el correo. Verifica tu dirección de correo electrónico."
      );
      setMessage("");
    }
  };

  return (
    <div className={styles["password-container"]}>
      <div className={styles["password-box"]}>
        <h1 className={styles["title"]}>Recuperar Contraseña</h1>
        <form onSubmit={handlePasswordRecovery}>
          <div className={styles["form-group"]}>
            <label className={styles["label-email"]}>Correo Electrónico:</label>
            <input
              className={styles["input-email"]}
              type="email"
              value={correo}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          <button className={styles["button"]} type="submit">
            Recuperar Contraseña
          </button>
        </form>
        <p
          onClick={() => navigate("/")}
          style={{
            textDecoration: "none",
            color: "blue",
            cursor: "pointer",
          }}
        >
          Iniciar de sesión
        </p>
      </div>
    </div>
  );
};

export default PasswordRecovery;
