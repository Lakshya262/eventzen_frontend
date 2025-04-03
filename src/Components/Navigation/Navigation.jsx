import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo_navbar.png";
import "./Navigation.css";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(user?.role || "");

  useEffect(() => {
    setRole(user?.role || ""); 
  }, [user]);

  console.log("User Role in Navbar:", role);

  if (["/login", "/register"].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logo} alt="EventZen Logo" className="navbar-logo" />
          </Link>
        </div>

        <div className="navbar-menu">
          {user ? (
            <>
              <div className="nav-links">
                {role.toUpperCase() === "ADMIN" ? (
                  <>
                    <NavLink to="/admin/manage-events">Manage Events</NavLink>
                    <NavLink to="/admin/manage-attendees">Attendees</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink to="/events">Browse Events</NavLink>
                    <NavLink to="/my-events">My Events</NavLink>
                    <NavLink to="/manage-profile">Profile</NavLink>
                  </>
                )}
              </div>

              <div className="user-section">
                <span className="welcome-message">
                  Welcome, {user.name.split(" ")[0]}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="logout-button"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-link">Sign In</Link>
              <Link to="/register" className="register-link">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link to={to} className={`nav-link ${isActive ? "active" : ""}`}>
      {children}
    </Link>
  );
};

export default Navigation;
