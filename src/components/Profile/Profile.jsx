import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/profile/${id}`);
        console.log('Datos del usuario:', response.data); // Verificar los datos del usuario
        setUser(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setError('Error al obtener el perfil del usuario');
      }
    };

    fetchUserProfile();
  }, [id]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Perfil del Usuario</h1>
      <p><strong>Nombre:</strong> {user.nombre}</p> {/* Ajustar a 'nombre' */}
      <p><strong>Email:</strong> {user.correo}</p> {/* Ajustar a 'correo' */}
      {/* Agrega más campos según sea necesario */}
    </div>
  );
};

export default Profile;