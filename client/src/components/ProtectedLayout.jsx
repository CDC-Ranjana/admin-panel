

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Table from "../components/AdminTable";
import AllActivities from "../Pages/AllActivities";
import ActivitiesAndBulletine from "../Pages/ActivitiesAndBulletine.jsx";

const ProtectedLayout = ({ setIsAuthenticated }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex bg-[#f8f8f8] justify-between relative  ">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col"  style={{ marginLeft: isCollapsed ? "5rem" : "15rem" }}>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} setIsAuthenticated={setIsAuthenticated} />

        {/* Main content */}
        <div className="flex-1 p-4 ">
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
              element={
                <ActivitiesAndBulletine
                  type="recentActivities"
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              }
            />
            <Route
              path="/bulletine"
              element={
                <ActivitiesAndBulletine
                  type="news"
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                />
              }
            />
            <Route path="/all-activities" element={<AllActivities />} />
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
