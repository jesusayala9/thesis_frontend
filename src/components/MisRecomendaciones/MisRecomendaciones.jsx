import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MotorcycleCard from "../shared/card/card";
import "./MisRecomendaciones.css";

const MisRecomendaciones = () => {
  const { userId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/recomendaciones/${userId}`);
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
      <h1>Mis Recomendaciones</h1>
      {error && <p className="error">{error}</p>}
      <div className="grid-container">
        {recommendations.map((motorcycle) => (
          <MotorcycleCard key={motorcycle.id} motorcycle={motorcycle} />
        ))}
      </div>
    </div>
  );
};

export default MisRecomendaciones;