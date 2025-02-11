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