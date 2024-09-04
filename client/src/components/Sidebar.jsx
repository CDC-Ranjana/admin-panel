import React from 'react';
import { FaHome, FaEnvelope, FaCalendar, FaChartBar, FaPen, FaTable, FaMap } from 'react-icons/fa';

const Sidebar = ({ isCollapsed }) => {
  return (
    <div className={`h-screen bg-white 
    border transition-width duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-4 flex items-center space-x-2 ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && (
          <>
            <img
              src="https://colorlib.com/polygon/adminator/assets/static/images/logo.png"
              alt="Logo"
              className="w-12 h-12 ml-4"
            />
            <span className="text-xl font-bold">Adminator</span>
          </>
        )}
        {isCollapsed && (
          <img
            src="https://colorlib.com/polygon/adminator/assets/static/images/logo.png"
            alt="Logo"
            className="w-12 h-12"
          />
        )}
      </div>
      <nav className="mt-10">
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaHome className="text-xl ml-4 text-red-300" />
              {!isCollapsed && <span className="ml-4">Dashboard</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaEnvelope className="text-xl text-green-300 ml-4" />
              {!isCollapsed && <span className="ml-4">Email</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaPen className="text-xl text-blue-300 ml-4" />
              {!isCollapsed && <span className="ml-4">Compose</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaCalendar className="text-xl text-orange-300 ml-4" />
              {!isCollapsed && <span className="ml-4">Calendar</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaChartBar className="text-xl text-pink-300 ml-4" />
              {!isCollapsed && <span className="ml-4">Charts</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaTable className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Tables</span>}
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-gray-700 hover:bg-gray-100">
              <FaMap className="text-lg ml-4" />
              {!isCollapsed && <span className="ml-4">Maps</span>}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
