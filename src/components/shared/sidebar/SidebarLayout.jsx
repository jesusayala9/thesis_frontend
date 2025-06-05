import React from "react";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => (
  <div className="main-layout">
    <Sidebar />
    <div className="main-content">
      <Outlet />
    </div>
  </div>
);

export default SidebarLayout;