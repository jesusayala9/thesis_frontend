import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [cilindraje, setCilindraje] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleBuscarPreferencias = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/addPreference', {
                userId: 1, // Reemplaza con el ID del usuario actual
                nombre: nombre || null,
                marca: marca || null,
                cilindraje: cilindraje ? parseFloat(cilindraje) : null,
            });
            console.log('Preferencia agregada:', response.data);
            setMessage('Preferencia agregada exitosamente.');
            setTimeout(() => {
                navigate(`/recommendations/${1}`); // Redirigir a la página de recomendaciones
            }, 2000);
        } catch (error) {
            console.error('Error agregando preferencia:', error);
            setMessage('Error agregando preferencia. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="home-container">
            <h1>Ingresar sus Preferencias</h1>
            <form onSubmit={handleBuscarPreferencias}>
                <div className="form-group">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Marca:</label>
                    <input
                        type="text"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Cilindraje:</label>
                    <input
                        type="text"
                        value={cilindraje}
                        onChange={(e) => setCilindraje(e.target.value)}
                    />
                </div>
                <button type="submit">Buscar Preferencias</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Home;