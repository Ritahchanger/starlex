import React, { createContext, useState, useEffect, useContext } from "react";

import { axiosInstance } from "../config/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUser = async () => {
    setAuthLoading(true);
    try {
      const res = await axiosInstance.get("/api/v1/admin/me");
      console.log("User fetched:", res.data.user || res.data.data);
      setUser(res.data.user || res.data.data);
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true");
    } catch (err) {
      console.error("Fetch user failed:", err);
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("isAuthenticated");
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async () => {
    await fetchUser();
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/v1/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem("isAuthenticated");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        authLoading,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
