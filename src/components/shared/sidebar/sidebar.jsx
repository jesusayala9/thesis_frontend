// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import "./sidebar.css";
import { IconContext } from "react-icons";

function Sidebar() {
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
              <Link to="/products">
                <FaIcons.FaCartPlus />
                <span>Motos</span>
              </Link>
            </li>

            <li className="nav-text nav-menu-items-bottom">
              <Link to="/logout">
                <IoIcons.IoMdExit />
                <span>Cerrar sesión</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
