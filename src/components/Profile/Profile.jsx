import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false); // Estado para manejar la visibilidad de las opciones de imágenes

  const images = [
    '/images/profile1.png',
    '/images/profile2.jpeg',
    '/images/profile3.png',
    // Agrega más rutas de imágenes según sea necesario
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/profile/${id}`);
        console.log('Datos del usuario:', response.data); // Verificar los datos del usuario
        setUser(response.data);
        setSelectedImage(response.data.profileImage); // Asignar la imagen de perfil actual
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
        setError('Error al obtener el perfil del usuario');
      }
    };

    fetchUserProfile();
  }, [id]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    // Aquí puedes hacer una solicitud para guardar la imagen seleccionada en el perfil del usuario
    axios.put(`http://localhost:3001/api/profile/${id}`, { profileImage: image })
      .then(response => {
        console.log('Imagen de perfil actualizada:', response.data);
      })
      .catch(error => {
        console.error('Error al actualizar la imagen de perfil:', error);
      });
  };

  const toggleImageOptions = () => {
    setShowImageOptions(!showImageOptions); // Alternar la visibilidad de las opciones de imágenes
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Perfil del Usuario</h1>
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={selectedImage} alt="Imagen de perfil" className="profile-image" />
        </div>
        <div className="profile-info">
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Email:</strong> {user.correo}</p>
          {/* Agrega más campos según sea necesario */}
        </div>
      </div>
      <div className="image-selection">
        <button className="toggle-button" onClick={toggleImageOptions}>
          {showImageOptions ? 'Ocultar opciones de imagen' : 'Seleccionar imagen de perfil'}
        </button>
        {showImageOptions && (
          <div className="image-options">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Opción ${index + 1}`}
                className={`image-option ${selectedImage === image ? 'selected' : ''}`}
                onClick={() => handleImageSelect(image)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;