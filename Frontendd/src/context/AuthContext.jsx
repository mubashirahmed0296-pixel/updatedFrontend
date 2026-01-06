import { createContext, useState, useContext, useEffect } from "react";
import API from "../utils/api"; // Import the API utility we created

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true); // Added to prevent flickering

  // 1. Function to Load User Profile from Backend
  const loadUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      // Create a route in your backend later: router.get('/me', authMiddleware, ...)
      const res = await API.get("/auth/me"); 
      setUser(res.data);
    } catch (err) {
      // If token is invalid or expired
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // 2. Updated Login to handle Token AND User data
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData); // Set the actual user info (firstName, email, etc.)
  };

  // 3. Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);