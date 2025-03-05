import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Recommendations.css";

const Recommendations = () => {
  const { userId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/recommendations",
          {
            userId,
            num_recomendaciones: 10,
          }
        );
        setRecommendations(response.data);
        console.log("Recomendaciones:", response.data); // Imprimir en la consola del navegador

        // Guardar las recomendaciones en la tabla
        const motoIds = response.data.map(moto => moto.id).filter(id => id !== undefined);
        console.log("Moto IDs:", motoIds); // Agregar log para verificar los motoIds
        if (motoIds.length > 0) {
          const saveResponse = await axios.post("http://localhost:3001/api/recomendaciones", {
            userId: parseInt(userId, 10), // Asegurarse de que userId sea un número
            motoIds,
          });
          console.log("Guardar respuesta:", saveResponse.data); // Log para verificar la respuesta del guardado
        }
      } catch (error) {
        console.error("Error obteniendo recomendaciones:", error);
        setError("Error obteniendo recomendaciones");
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div className="recommendations-container">
      <h1>Recomendaciones</h1>
      {error && <p className="error">{error}</p>}
      <ul className="recommendations-list">
        {recommendations.map((motorcycle, index) => (
          <li key={index}>
            {motorcycle.nombre} - {motorcycle.marca} - {motorcycle.modelo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;