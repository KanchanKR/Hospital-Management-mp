/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext,useEffect } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initial state from localStorage
    return localStorage.getItem("isAuthenticated") === "true";
  });
  
  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true); // State change will trigger a re-render
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false); // State change will trigger a re-render
    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    // Sync state with localStorage when component mounts
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
