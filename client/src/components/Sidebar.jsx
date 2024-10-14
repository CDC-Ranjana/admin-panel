
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/sobfLogo.avif";
import {
  FaHome,
  FaPen,
  FaChartBar,
  FaTable,
} from "react-icons/fa";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();

  return (
    <div
      className={`bg-[#1d1d42] fixed top-0 left-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } h-full flex flex-col`}
    >
      {/* Logo and Title */}
      <div
        className={`p-4 flex items-center space-x-4 ${
          isCollapsed ? "justify-center" : ""
        }`}
      >
        <img src={logo} alt="Logo" className="w-[50px]" />
        {!isCollapsed && (
          <span className="text-xl text-[#edb259] font-bold">Soul Of Braj</span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="mt-10 flex-1">
        <ul className="space-y-2">
          {/* Admin */}
          <li>
            <Link
              to="/"
              className={`flex items-center p-2 ${
                location.pathname === "/"
                  ? "text-white bg-[rgb(39,39,79)]"
                  : "text-[rgba(255,255,255,0.7)]"
              } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaHome className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4">Admin</span>}
            </Link>
          </li>
          {/* Stories */}
          <li>
            <Link
              to="/recent-activities"
              className={`flex items-center p-2 ${
                location.pathname === "/recent-activities"
                  ? "text-white bg-[rgb(39,39,79)]"
                  : "text-[rgba(255,255,255,0.7)]"
              } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaPen className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4">Stories</span>}
            </Link>
          </li>
          {/* All Activities */}
          <li>
            <Link
              to="/all-activities"
              className={`flex items-center p-2 ${
                location.pathname === "/all-activities"
                  ? "text-white bg-[rgb(39,39,79)]"
                  : "text-[rgba(255,255,255,0.7)]"
              } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaChartBar className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4">All Activities</span>}
            </Link>
          </li>
          {/* Bulletins */}
          <li>
            <Link
              to="/bulletine"
              className={`flex items-center p-2 ${
                location.pathname === "/bulletine"
                  ? "text-white bg-[rgb(39,39,79)]"
                  : "text-[rgba(255,255,255,0.7)]"
              } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaTable className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Bulletins</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
