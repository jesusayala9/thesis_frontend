import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                nombre: username,
                correo: email,
                contraseña: password
            });
            console.log('Usuario registrado:', response.data);
            setMessage('Registro exitoso. Redirigiendo...');
            setTimeout(() => {
                navigate('/home'); // Redirigir a la página Home después de 2 segundos
            }, 2000);
        } catch (error) {
            console.error('Error registrando usuario:', error);
            setMessage('Error registrando usuario. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="register-container">
            <h1>Registro de Usuario</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Correo Electrónico:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;