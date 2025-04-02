import { useState, useEffect } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const userData = await authService.getProfile();
        setUser(userData);
      } catch (error) {
        console.error("Auth check failed:", error);
        authService.logout();
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  return { user, isLoading, logout };
};

export default useAuth;