import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import authService from "../services/authService";
import "./AuthGuard.css"; 

const AuthGuard = ({ children, requiredRole }) => {
  console.log("AuthGuard rendered"); 
  console.log("Token:", localStorage.getItem("token")); 
  console.log("User data:", localStorage.getItem("user")); 
  const [authStatus, setAuthStatus] = useState("checking"); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("No authentication token found");
        }

        
        const user = await authService.getProfile();
        
        
        if (requiredRole) {
          const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
          if (!roles.includes(user.role)) {
            setAuthStatus("unauthorized");
            return;
          }
        }

        setAuthStatus("authorized");
      } catch (error) {
        console.error("Authentication error:", error.message);
        authService.logout();
        setAuthStatus("unauthorized");
        
        
        navigate("/login", { 
          state: { from: location.pathname }, 
          replace: true 
        });
      }
    };

    verifyAuth();
  }, [navigate, requiredRole, location]);

  
  if (authStatus === "checking") {
    return (
      <div className="auth-loading">
        <div className="loading-spinner"></div>
        <p>Verifying access...</p>
      </div>
    );
  }

  
  if (authStatus === "unauthorized" && localStorage.getItem("token")) {
    return (
      <div className="auth-unauthorized">
        <h2>Access Denied</h2>
        <p>You don't have permission to view this page.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="auth-back-button"
        >
          Go Back
        </button>
      </div>
    );
  }

  
  if (authStatus === "authorized") {
    return children;
  }

  
  return null;
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOfType([
    PropTypes.oneOf(["ADMIN", "CUSTOMER"]),
    PropTypes.arrayOf(PropTypes.oneOf(["ADMIN", "CUSTOMER"]))
  ])
};

export default AuthGuard;