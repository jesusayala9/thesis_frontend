// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./preferences.module.css";

const Preferences = () => {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [cilindraje, setCilindraje] = useState("");
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(100000);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleBuscarPreferencias = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/user/addPreference",
        {
          userId: 1,
          nombre: nombre || null,
          marca: marca || null,
          cilindraje: cilindraje ? parseFloat(cilindraje) : null,
          precioMin: precioMin || null,
          precioMax: precioMax || null,
        }
      );
      console.log("Preferencia agregada:", response.data);
      setMessage("Preferencia agregada exitosamente.");
      setTimeout(() => {
        navigate(`/recommendations/1`);
      }, 2000);
    } catch (error) {
      console.error("Error agregando preferencia:", error);
      setMessage("Error agregando preferencia. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles["preference-container"]}>
      <div className={styles["preference-box"]}>
        <h1>Ingresar sus Preferencias</h1>
        <form onSubmit={handleBuscarPreferencias}>
          <div className={styles["form-group"]}>
            <label>Nombre:</label>
            <input
              className={styles["input-form"]}
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Marca:</label>
            <input
              className={styles["input-form"]}
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Cilindraje:</label>
            <input
              className={styles["input-form"]}
              type="text"
              value={cilindraje}
              onChange={(e) => setCilindraje(e.target.value)}
            />
          </div>

          <div className={styles["form-group"]}>
            <label>Rango de Precio:</label>
            <div className={styles["slider-container"]}>
              <div>
                <label>Mínimo: ${precioMin}</label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                  className={styles["slider"]}
                />
              </div>
              <div>
                <label>Máximo: ${precioMax}</label>
                <input
                  type="range"
                  min="1000000"
                  max="3000000"
                  step="1000"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                  className={styles["slider"]}
                />
              </div>
            </div>
          </div>

          <button className={styles["preference-button"]} type="submit">
            Buscar Preferencias
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Preferences;
