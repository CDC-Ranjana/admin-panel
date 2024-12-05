
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/sobfLogo.avif";
import {
  FaHome,
  FaPen,
  FaChartBar,
  FaTable,
} from "react-icons/fa";


const Sidebar = ({ isCollapsed, onOptionClick }) => {
  const location = useLocation();

  return (
    <div
      className={`transition-all duration-300 h-screen flex flex-col  ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
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
      <nav className="mt-10 flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              onClick={onOptionClick} // Hide sidebar on option click
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
          <li>
            <Link
              to="/recent-activities"
              onClick={onOptionClick}
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
          {/* <li>
            <Link
              to="/all-activities"
              onClick={onOptionClick}
              className={`flex items-center p-2 ${
                location.pathname === "/all-activities"
                  ? "text-white bg-[rgb(39,39,79)]"
                  : "text-[rgba(255,255,255,0.7)]"
              } hover:text-white hover:bg-[rgb(39,39,79)] rounded`}
            >
              <FaChartBar className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4">All Activities</span>}
            </Link>
          </li> */}
          <li>
            <Link
              to="/bulletine"
              onClick={onOptionClick}
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
