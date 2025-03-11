import React, { useState } from "react";
import styles from "./card.module.css";

const MotorcycleCard = ({ motorcycle }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className={`${styles["index-box"]} ${showDetails ? styles.show : ""}`}>
      <img
        src={motorcycle.imagen}
        alt={motorcycle.nombre}
        className={styles["logo"]}
      />
      <h1>{motorcycle.nombre}</h1>
      <button className={styles["toggle-button"]} onClick={toggleDetails}>
        Características {showDetails ? "▲" : "▼"}
      </button>
      <div className={styles["details"]}>
        <p>
          <strong>Marca:</strong> {motorcycle.marca}
        </p>
        <p>
          <strong>Modelo:</strong> {motorcycle.modelo}
        </p>
        <p>
          <strong>Cilindraje:</strong> {motorcycle.cilindraje} cc
        </p>
        <p>
          <strong>Peso:</strong> {motorcycle.peso}
        </p>
        <p>
          <strong>Transmisión:</strong> {motorcycle.transmision}
        </p>
        <p>
          <strong>Freno delantero:</strong> {motorcycle.freno_delantero}
        </p>
        <p>
          <strong>Freno trasero:</strong> {motorcycle.freno_trasero}
        </p>
        <p>
          <strong>Precio:</strong> {motorcycle.precio}
        </p>
      </div>
    </div>
  );
};

export default MotorcycleCard;