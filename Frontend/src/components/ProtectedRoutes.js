import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(atob(token.split('.')[1]));
  
  if (user.role === 'employee' && window.location.pathname === '/dashboard') {
    return <Navigate to="/assemble" />;
  }
  
  if (user.role === 'admin' && window.location.pathname === '/assemble') {
    return <Navigate to="/dashboard" />;
  }

  return children; 
};

export default ProtectedRoute;
