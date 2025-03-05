import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import './sidebar.css';

function Sidebar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Eliminar el ID del usuario del localStorage
    console.log("Token eliminado:", localStorage.getItem("token")); // Verificar que el token se elimine

    // Redirigir al usuario a la pantalla de login (raíz)
    navigate("/");
    window.location.reload(); // Recargar la página para actualizar el estado de autenticación
  };

  if (!userId) {
    return null; // No renderizar el sidebar si no hay un userId
  }

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <nav className="nav-menu">
        <ul className="nav-menu-items">
          <li className="nav-text">
            <Link to={`/profile/${userId}`}>
              <AiIcons.AiFillHome />
              <span>Perfil</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/reports">
              <IoIcons.IoIosPaper />
              <span>Mis Recomendaciones</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/preferences">
              <IoIcons.IoMdAddCircle />
              <span>Nueva Preferencia</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to="/motorcycle-card">
              <IoIcons.IoMdExit />
              <span>Motos</span>
            </Link>
          </li>
        </ul>
        <div className="logout-button-container">
          <button className="logout-button" onClick={handleLogout}>
            <IoIcons.IoMdExit />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;