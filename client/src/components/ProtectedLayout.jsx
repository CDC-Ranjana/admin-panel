
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Table from "../components/AdminTable";
import ActivitiesAndBulletine from "../Pages/ActivitiesAndBulletine";

const ProtectedLayout = ({ setIsAuthenticated }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar visibility for small screens
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapsible state for medium+ screens
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      // Toggle visibility for small screens
      setIsSidebarVisible(!isSidebarVisible);
    } else {
      // Collapse or expand for medium+ screens
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleSidebarOptionClick = () => {
    if (window.innerWidth < 768) {
      setIsSidebarVisible(false); // Hide sidebar after clicking an option on small screens
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#f8f8f8] h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 md:static transition-all duration-300  ${
          isSidebarVisible ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${
          isCollapsed ? "md:w-20" : "md:w-[15rem]"
        } bg-[#1d1d42] shadow-lg h-full`}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          onOptionClick={handleSidebarOptionClick}
        />
      </div>

      {/* Main Content */}
      <div className={` flex-1 flex flex-col max-h-full overflow-y-auto  transition-all duration-300 `}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} setIsAuthenticated={setIsAuthenticated} />

        {/* Main Content */}
        <div className="flex-1 p-2 md:p-4 overflow-auto">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Table
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              }
            />
            <Route
              path="/recent-activities"
              element={<ActivitiesAndBulletine type="recentActivities" />}
            />
            <Route
              path="/bulletine"
              element={<ActivitiesAndBulletine type="news" />}
            />
           
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
