import NavBar from "../../Components/NavBar";
import EventCard from "../../Components/EventCard";
import "./styles/AdminDashboard.css";

function AdminDashboard() {
  const events = [
    { name: "Tech Expo", venue: "Hall A", vendor: "Vendor X", date: "2025-04-10", image: "event1.jpg" },
    { name: "Music Fest", venue: "Stadium B", vendor: "Vendor Y", date: "2025-05-15", image: "event2.jpg" },
  ];

  return (
    <div className="admin-dashboard">
      <NavBar role="admin" />
      <h1>Admin Dashboard</h1>
      <div className="event-list">
        {events.map((event, index) => (
          <EventCard key={index} event={event} role="ADMIN" />
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;