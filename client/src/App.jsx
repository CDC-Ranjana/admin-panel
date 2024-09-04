import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
// import Sidebar from './Sidebar';
// import Header from './Header';

const App = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-4">
          {/* Other content goes here */}
        </main>
      </div>
    </div>
  );
};

export default App;
