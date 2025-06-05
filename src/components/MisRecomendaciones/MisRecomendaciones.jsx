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
        console.log("Recomendaciones:", response.data);
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
              {visibleSearches[searchId] ? (
                <>
                  {/* Ojo abierto */}
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{verticalAlign: 'middle', marginRight: 6}}>
                    <path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 13c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10a4 4 0 100 8 4 4 0 000-8z"/>
                  </svg>
                  Ocultar Recomendaciones
                </>
              ) : (
                <>
                  {/* Ojo cerrado */}
                  <svg width="18" height="18" viewBox="0 0 24 24" style={{verticalAlign: 'middle', marginRight: 6}}>
                    <path fill="currentColor" d="M12 6a9.77 9.77 0 018.94 6A9.77 9.77 0 0112 18a9.77 9.77 0 01-8.94-6A9.77 9.77 0 0112 6m0-2C6.48 4 1.73 7.61 0 12c1.73 4.39 6.48 8 12 8s10.27-3.61 12-8c-1.73-4.39-6.48-8-12-8zm0 5a3 3 0 013 3 3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3zm0 8a5 5 0 005-5 5 5 0 00-10 0 5 5 0 005 5z"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Ver Recomendaciones
                </>
              )}
            </button>
            <button onClick={() => deleteRecommendation(searchId)} className="delete-button">
              {/* Icono de papelera */}
              <svg width="18" height="18" viewBox="0 0 24 24" style={{verticalAlign: 'middle', marginRight: 6}}>
                <path fill="currentColor" d="M9 3v1H4v2h16V4h-5V3H9zm2 4v12h2V7h-2zm-4 0v12h2V7H7zm8 0v12h2V7h-2z"/>
              </svg>
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