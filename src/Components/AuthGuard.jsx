import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const AuthGuard = ({ children, requiredRole }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("No token found");
        }

        // Verify token by getting user profile
        const user = await authService.getProfile();
        
        // Check if required role matches
        if (requiredRole) {
          const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          if (!roles.includes(user.role)) {
            throw new Error("Unauthorized access");
          }
        }
        
        setIsAuthorized(true);
      } catch (error) {
        console.error("Auth check failed:", error);
        authService.logout();
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, requiredRole]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : null;
};

export default AuthGuard;