import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from  './pages/Dashboard'
import UserList from './pages/Userlist';
import UserDetails from './pages/Userdetails';
import AddUser from './pages/AddUser';
import ProtectedRoute from './pages/ProtectedRoute';
import Signup from './pages/Signup';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/userlist"
//           element={
//             <ProtectedRoute>
//               <UserList />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/userdetails"
//           element={
//             <ProtectedRoute>
//               <UserDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/add-user"
//           element={
//             <ProtectedRoute>
//               <AddUser />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

