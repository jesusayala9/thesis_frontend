import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Recommendations = () => {
    const { userId } = useParams();
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/recommendations', {
                    userId,
                    num_recomendaciones: 10
                });
                setRecommendations(response.data);
            } catch (error) {
                console.error('Error obteniendo recomendaciones:', error);
                setError('Error obteniendo recomendaciones');
            }
        };

        fetchRecommendations();
    }, [userId]);

    return (
        <div>
            <h1>Recomendaciones</h1>
            {error && <p>{error}</p>}
            <ul>
                {recommendations.map((rec, index) => (
                    <li key={index}>
                        {rec.nombre} - {rec.marca} - {rec.cilindraje}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Recommendations;