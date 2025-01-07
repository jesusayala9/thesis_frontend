import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Recommendations.css';

const Recommendations = () => {
    const { userId } = useParams();
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/recommendations', {
                    userId,
                    nombre_preferido: null,
                    marca_preferida: null,
                    cilindraje_preferido: null,
                    num_recomendaciones: 10
                });
                setRecommendations(response.data);
            } catch (error) {
                console.error('Error obteniendo recomendaciones:', error);
            }
        };

        fetchRecommendations();
    }, [userId]);

    return (
        <div className="recommendations-container">
            <h1>Recomendaciones de Motocicletas</h1>
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>{rec.nombre} - {rec.marca} - {rec.cilindraje}cc</li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;