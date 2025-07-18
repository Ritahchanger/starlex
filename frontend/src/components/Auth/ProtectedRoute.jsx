import React from "react";

import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth/useAuth";

const ProtectedRoute = ({ children }) => {
  
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return <div className="text-center p-4">Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
