import React from "react";

import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth/useAuth";

const ProtectedRoute = ({ children }) => {
    
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }


  return children;

};

export default ProtectedRoute;
