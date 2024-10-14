
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <button onClick={toggleSidebar} className="text-xl pl-[10px]">
        ☰
      </button>
      <button onClick={handleLogout} className="text-red-500">
        Logout
      </button>
    </header>
  );
};

export default Header;
