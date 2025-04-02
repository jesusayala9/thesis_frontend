import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Recommendations.css";

const Recommendations = () => {
  const { userId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true); // Inicia la carga
      try {
        const response = await axios.post(
          "http://localhost:3001/api/recommendations",
          {
            userId,
            num_recomendaciones: 10,
          }
        );

        if (response.data.message) {
          // Si el backend devuelve un mensaje, significa que no hay recomendaciones
          setError(response.data.message);
          setRecommendations([]);
        } else {
          setRecommendations(response.data);
          console.log("Recomendaciones:", response.data);

          // Guardar las recomendaciones en la base de datos
          const motoIds = response.data.map((moto) => moto.id).filter((id) => id !== undefined);
          if (motoIds.length > 0) {
            try {
              const saveResponse = await axios.post("http://localhost:3001/api/recomendaciones", {
                userId: parseInt(userId, 10), // Asegurarse de que userId sea un número
                motoIds,
              });
              console.log("Recomendaciones guardadas:", saveResponse.data);
            } catch (saveError) {
              console.error("Error guardando recomendaciones:", saveError);
            }
          }
        }
      } catch (error) {
        console.error("Error obteniendo recomendaciones:", error);
        setError("Error obteniendo recomendaciones");
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    fetchRecommendations();
  }, [userId]);

  const handleNewPreference = () => {
    navigate("/preferences"); // Redirige a la vista de preferencias
  };

  return (
    <div className="recommendations-container">
      <h1>Recomendaciones</h1>
      {loading && <p className="loading">Cargando recomendaciones...</p>}
      {!loading && error && <p className="error">{error}</p>}
      {!loading && recommendations.length === 0 && !error && (
        <div className="no-recommendations-container">
          <p className="no-recommendations">No se encontraron recomendaciones para las preferencias ingresadas.</p>
          <button className="new-preference-button" onClick={handleNewPreference}>
            Agregar nueva preferencia
          </button>
        </div>
      )}
      {!loading && recommendations.length > 0 && (
        <ul className="recommendations-list">
          {recommendations.map((motorcycle, index) => (
            <li key={index}>
              {motorcycle.nombre} - {motorcycle.marca} - {motorcycle.modelo}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Recommendations;