import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import "./sidebar.css";
import { IconContext } from "react-icons";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token de localStorage
    localStorage.removeItem("token");
    console.log("Token eliminado:", localStorage.getItem("token")); // Verificar que el token se elimine

    // Redirigir al usuario a la pantalla de login (raíz)
    navigate("/");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="nav-menu">
          <ul className="nav-menu-items">
            <li className="nav-text">
              <Link to="/">
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
    </>
  );
}

export default Sidebar;