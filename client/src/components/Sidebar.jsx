import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/sobfLogo.avif";
import {
  FaHome,
  FaEnvelope,
  FaCalendar,
  FaChartBar,
  FaPen,
  FaTable,
  FaMap,
} from "react-icons/fa";

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <div
      className={`h-screen bg-[#1d1d42] border transition-width duration-300 ${
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
      <nav className="mt-10">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center p-2 ${
                location.pathname === "/"
                  ? "text-[rgba(255,255,255,1)]"
                  : "text-[rgba(255,255,255,0.7)]"
              }  hover:text-[rgba(255,255,255,1)] hover:bg-[rgb(39,39,79)] ${
                location.pathname === "/"
                  ? "bg-[rgb(39,39,79)]"
                  : "bg-[#1d1d42]"
              }`}
            >
              <FaHome className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4">Admin</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/recent-activities"
              className={`flex items-center p-2 ${
                location.pathname === "/recent-activities"
                  ? "text-[rgba(255,255,255,1)]"
                  : "text-[rgba(255,255,255,0.7)]"
              }  hover:text-[rgba(255,255,255,1)] hover:bg-[rgb(39,39,79)] ${
                location.pathname === "/recent-activities"
                  ? "bg-[rgb(39,39,79)]"
                  : "bg-[#1d1d42]"
              }`}
            >
              <FaPen className="text-xl ml-4" />
              {!isCollapsed && <span className="ml-4">Stories</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/all-activities"
              className={`flex items-center p-2 ${
                location.pathname === "/all-activities"
                  ? "text-[rgba(255,255,255,1)]"
                  : "text-[rgba(255,255,255,0.7)]"
              }  hover:text-[rgba(255,255,255,1)] hover:bg-[rgb(39,39,79)] ${
                location.pathname === "/all-activities"
                  ? "bg-[rgb(39,39,79)]"
                  : "bg-[#1d1d42]"
              }`}
            >
              <FaChartBar className="text-xl  ml-4" />
              {!isCollapsed && <span className="ml-4 ]">All Activities</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/bulletine"
              className={`flex items-center p-2 ${
                location.pathname === "/bulletine"
                  ? "text-[rgba(255,255,255,1)]"
                  : "text-[rgba(255,255,255,0.7)]"
              }  hover:text-[rgba(255,255,255,1)] hover:bg-[rgb(39,39,79)] ${
                location.pathname === "/bulletine"
                  ? "bg-[rgb(39,39,79)]"
                  : "bg-[#1d1d42]"
              }`}
            >
              <FaTable className="text-lg  ml-4" />
              {!isCollapsed && <span className="ml-4 ">Bulletins</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
