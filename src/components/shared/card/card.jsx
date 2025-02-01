// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { motorcycle } from "../../api/motorcycle";
import styles from "./card.module.css";

const MotorcycleCard = () => {
  const [motorcycles, setMotorcycles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const data = await motorcycle();
        setMotorcycles(data);
      } catch (err) {
        setError("Error al obtener las motos. Intenta nuevamente.");
      }
    };

    fetchMotorcycles();
  }, []);

  return (
    <div className={styles["index-container"]}>
      {error && <p className={styles["error"]}>{error}</p>}
      <div className={styles["grid-container"]}>
        {motorcycles.map((motorcycle) => (
          <div key={motorcycle.id} className={styles["index-box"]}>
            <img
              src={motorcycle.imagen}
              alt={motorcycle.nombre}
              className={styles["logo"]}
            />
            <h1>{motorcycle.nombre}</h1>
            <div className={styles["form-group"]}>
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
                <strong>Precio:</strong> {motorcycle.freno_trasero}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotorcycleCard;
