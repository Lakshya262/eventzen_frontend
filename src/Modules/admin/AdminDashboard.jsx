import Navigation from "../../Components/Navigation/Navigation";
import EventCard from "../../Components/EventCard/EventCard";
import "./AdminDashboard.css";

function AdminDashboard() {
  const events = [
    { name: "Tech Expo", venue: "Hall A", vendor: "Vendor X", date: "2025-04-10", image: "event1.jpg" },
    { name: "Music Fest", venue: "Stadium B", vendor: "Vendor Y", date: "2025-05-15", image: "event2.jpg" },
  ];

  return (
    <div className="admin-dashboard">
      <Navigation role="admin" />
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