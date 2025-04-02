import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminDashboard from "./Modules/admin/AdminDashboard";
import CustomerDashboard from "./Modules/customer/CustomerDashboard";
import ManageProfile from "./Pages/ManageProfile";
import AuthGuard from "./Components/AuthGuard";
import NavBar from "./Components/NavBar";
import EventsList from "./Pages/EventsList"; 
import AdminBookings from "./Modules/admin/AdminBookings"; 
import "./App.css";

function App() {
  return (
    <div className="app">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventsList />} />
          
          <Route
            path="/admin-dashboard"
            element={
              <AuthGuard requiredRole="ADMIN">
                <AdminDashboard />
              </AuthGuard>
            }
          />
          
          <Route
            path="/customer-dashboard"
            element={
              <AuthGuard requiredRole="CUSTOMER">
                <CustomerDashboard />
              </AuthGuard>
            }
          />
          
          <Route
            path="/manage-profile"
            element={
              <AuthGuard>
                <ManageProfile />
              </AuthGuard>
            }
          />
          
          <Route
            path="/admin/events/:eventId/bookings"
            element={
              <AuthGuard requiredRole="ADMIN">
                <AdminBookings />
              </AuthGuard>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;