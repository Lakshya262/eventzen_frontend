import { Routes, Route } from 'react-router-dom';
import Home from "./Page/Home";
import Login from "./Page/Login";
import Register from "./Page/Register";
import EventsList from './Components/Pages/EventList/EventsList';
import AdminDashboard from './Modules/admin/AdminDashboard';
import ManageEvents from './Modules/admin/ManageEvents';
import EventBookings from './Modules/admin/EventBookings';
import ManageAttendees from './Modules/admin/ManageAttendees';
import CustomerDashboard from './Modules/customer/CustomerDashboard';
import ManageProfile from './Components/ManageProfile/ManageProfile';
import AuthGuard from './Components/AuthGuard';
import Navigation from './Components/Navigation/Navigation';

function App() {
  return (
    <div className="app">
      <Navigation />
      <main className="content">
        <Routes>
          {/* Public Routes (No AuthGuard) */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventsList />} />

          {/* Admin Routes (Protected) */}
          <Route path="/admin">
            <Route
              path="dashboard"
              element={
                <AuthGuard requiredRole="ADMIN">
                  <AdminDashboard />
                </AuthGuard>
              }
            />
            <Route
              path="events"
              element={
                <AuthGuard requiredRole="ADMIN">
                  <ManageEvents />
                </AuthGuard>
              }
            />
            <Route
              path="events/:eventId/bookings"
              element={
                <AuthGuard requiredRole="ADMIN">
                  <EventBookings />
                </AuthGuard>
              }
            />
            <Route
              path="manage-attendees"
              element={
                <AuthGuard requiredRole="ADMIN">
                  <ManageAttendees />
                </AuthGuard>
              }
            />
          </Route>

          {/* Customer Routes (Protected) */}
          <Route
            path="/customer-dashboard"
            element={
              <AuthGuard requiredRole="CUSTOMER">
                <CustomerDashboard />
              </AuthGuard>
            }
          />

          {/* Shared Protected Route */}
          <Route
            path="/manage-profile"
            element={
              <AuthGuard>
                <ManageProfile />
              </AuthGuard>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
export default App;