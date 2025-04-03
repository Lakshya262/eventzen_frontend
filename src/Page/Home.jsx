import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";

function Home() {
  return (
    <div className="home">
      <div className="logo-container">
        <img src={logo} alt="EventZen Logo" className="logo" />
      </div>
    
      <div className="auth-buttons">
        <Link to="/login">
          <button className="button">Login</button>
        </Link>
        <Link to="/register">
          <button className="button">Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;