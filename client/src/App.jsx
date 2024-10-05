import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import Email from './pages/Email';
// import Compose from './pages/Compose';
// import Calendar from './pages/Calendar';
// import Charts from './pages/Charts';
// import Tables from './pages/Tables';
// import Maps from './pages/Maps';
import Table from './components/AdminTable';

import AllActivities from './Pages/AllActivities';
import ActivitiesAndBulletine from './Pages/ActivitiesAndBulletine.jsx';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Router>
      <div className="flex bg-[#f8f8f8]" >
        <Sidebar isCollapsed={isCollapsed} />
        <div className="flex-1">
          <Header toggleSidebar={toggleSidebar} />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Table isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>} />
              <Route path="/recent-activities" element={<ActivitiesAndBulletine type="recentActivities" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} />
              <Route path="/bulletine" element={<ActivitiesAndBulletine type="news" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />} />
              <Route path='/all-activities' element={<AllActivities />}/>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
