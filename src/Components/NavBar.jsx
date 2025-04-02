import { Link, useNavigate } from "react-router-dom";
import "./styles/NavBar.css";
import logo from "../assets/logo_navbar.png"; // Ensure correct path

function NavBar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="EventZen Logo" className="navbar-logo" />
      <div className="nav-links">
        <Link to="/customer-dashboard">Dashboard</Link> 
        {role === "ADMIN" ? (
          <>
            <Link to="/manage-events">Manage Events</Link>
            <Link to="/manage-venues">Manage Venues</Link>
            <Link to="/manage-vendors">Manage Vendors</Link>
          </>
        ) : role === "CUSTOMER" ? (
          <>
            <Link to="/manage-bookings">Manage Bookings</Link>
            <Link to="/manage-profile">Manage Profile</Link>
          </>
        ) : null}
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default NavBar;
