import React, { useState } from "react";
import axios from "axios";
import Sidebar from '../shared/sidebar/sidebar'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";
import styles from "./preferences.module.css";

const Preferences = () => {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [cilindraje, setCilindraje] = useState("");
  const [precioMin, setPrecioMin] = useState(null);
  const [precioMax, setPrecioMax] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlePrecioChange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number);
    setPrecioMin(min);
    setPrecioMax(max);
  };

  const handleBuscarPreferencias = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Obtener el ID del usuario desde localStorage
      if (!token || !userId) {
        throw new Error("Token o ID de usuario no encontrado");
      }

      const response = await axios.post(
        "http://localhost:3001/api/user/addPreference",
        {
          userId, // Usar el ID del usuario obtenido de localStorage
          nombre: nombre || null,
          marca: marca || null,
          cilindraje: cilindraje ? parseFloat(cilindraje) : null,
          precioMin: precioMin || null,
          precioMax: precioMax || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de que el token esté almacenado en localStorage
          },
        }
      );
      console.log("Preferencia agregada:", response.data);
      setMessage("Preferencia agregada exitosamente.");
      setTimeout(() => {
        navigate(`/recommendations/${userId}`); // Redirigir a la página de recomendaciones con el ID del usuario logueado
      }, 2000);
    } catch (error) {
      console.error("Error agregando preferencia:", error);
      setMessage("Error agregando preferencia. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles["preferences-container"]}>
      <div className={styles["sidebar"]}>
        <Sidebar />
      </div>
      <div className={styles["preferences-content"]}>
        <div className={styles["preference-box"]}>
          <h2 className={styles["form-title"]}>Ingresa tus preferencias</h2>
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
              <div className={styles["checkbox-container"]}>
                <div>
                  <input
                    type="radio"
                    name="precio"
                    value="1000000-5000000"
                    onChange={handlePrecioChange}
                  />
                  <label>$1,000,000 - $5,000,000</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="precio"
                    value="5000001-10000000"
                    onChange={handlePrecioChange}
                  />
                  <label>$5,000,001 - $10,000,000</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="precio"
                    value="10000001-20000000"
                    onChange={handlePrecioChange}
                  />
                  <label>$10,000,001 - $20,000,000</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="precio"
                    value="20000001-50000000"
                    onChange={handlePrecioChange}
                  />
                  <label>$20,000,001 - $50,000,000</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="precio"
                    value="50000001-100000000"
                    onChange={handlePrecioChange}
                  />
                  <label>$50,000,001 - $100,000,000</label>
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
    </div>
  );
};

export default Preferences;