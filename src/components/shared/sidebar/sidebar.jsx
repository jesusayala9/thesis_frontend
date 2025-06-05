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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    console.log("Token eliminado:", localStorage.getItem("token"));
    navigate("/");
    window.location.reload();
  };

  if (!userId) {
    return null;
  }

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <nav className="nav-menu">
        {/* Logo de la app arriba del menú */}
        <div className="sidebar-logo">
          <img src="/applogo.png" alt="App Logo" />
        </div>
        <ul className="nav-menu-items">
          <li className="nav-text">
            <Link to={`/profile/${userId}`}>
              <AiIcons.AiFillHome />
              <span>Perfil</span>
            </Link>
          </li>
          <li className="nav-text">
            <Link to={`/mis-recomendaciones/${userId}`}>
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