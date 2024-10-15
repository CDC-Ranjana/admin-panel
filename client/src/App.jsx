
// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import ProtectedLayout from "./components/ProtectedLayout";
// import Login from "./Pages/Login.jsx";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(() => {
//     // Initialize from localStorage to persist authentication state
//     return localStorage.getItem('isAuthenticated') === 'true';
//   });

//   useEffect(() => {
//     // Sync isAuthenticated with localStorage
//     if (isAuthenticated) {
//       localStorage.setItem('isAuthenticated', 'true');
//     } else {
//       localStorage.removeItem('isAuthenticated');
//     }
//   }, [isAuthenticated]);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route
//           path="/login"
//           element={<Login setIsAuthenticated={setIsAuthenticated} />}
//         />

//         {/* Redirect root to login if not authenticated */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/dashboard" replace />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Protected Routes */}
//         <Route
//           path="/*"
//           element={
//             isAuthenticated ? (
//               <ProtectedLayout setIsAuthenticated={setIsAuthenticated} />
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Catch-all Route */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Login from "./Pages/Login.jsx";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");
    } else {
      localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <ProtectedLayout setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
