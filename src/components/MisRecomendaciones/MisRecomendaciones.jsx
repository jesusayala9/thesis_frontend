import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MotorcycleCard from "../shared/card/card";
import "./MisRecomendaciones.css";

const MisRecomendaciones = () => {
  const { userId } = useParams();
  const [recommendations, setRecommendations] = useState({});
  const [error, setError] = useState("");
  const [visibleSearches, setVisibleSearches] = useState({});

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

  const toggleVisibility = (searchId) => {
    setVisibleSearches((prevState) => ({
      ...prevState,
      [searchId]: !prevState[searchId],
    }));
  };

  const deleteRecommendation = async (searchId) => {
    try {
      await axios.delete(`http://localhost:3001/api/recomendaciones/${searchId}`);
      setRecommendations((prevState) => {
        const newState = { ...prevState };
        delete newState[searchId];
        return newState;
      });
    } catch (error) {
      console.error("Error eliminando la recomendación:", error);
      setError("Error eliminando la recomendación");
    }
  };

  return (
    <div className="recommendations-container">
      <h1>Historial De Mis Recomendaciones</h1>
      {error && <p className="error">{error}</p>}
      {Object.keys(recommendations).map((searchId) => (
        <div key={searchId} className="recommendation-group">
          <h2>Búsqueda  {recommendations[searchId].createdAt}</h2>
          <div className="button-container">
            <button onClick={() => toggleVisibility(searchId)}>
              {visibleSearches[searchId] ? "Ocultar Recomendaciones" : "Ver Recomendaciones"}
            </button>
            <button onClick={() => deleteRecommendation(searchId)} className="delete-button">
              Eliminar Recomendación
            </button>
          </div>
          {visibleSearches[searchId] && (
            <div className="grid-container">
              {recommendations[searchId].recomendaciones.map((rec) => (
                <MotorcycleCard key={rec.moto.id} motorcycle={rec.moto} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MisRecomendaciones;