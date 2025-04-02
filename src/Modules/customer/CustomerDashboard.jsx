import { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import EventCard from "../../Components/EventCard";
import eventService from "../../services/eventServices";
import "./styles/CustomerDashboard.css";

function CustomerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllEvents();
        setEvents(data);
      } catch (err) {
        setError("Failed to load events");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="customer-dashboard">
      <NavBar />
      <div className="dashboard-content">
        <h1>Available Events</h1>
        <div className="events-container">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                role="CUSTOMER"
              />
            ))
          ) : (
            demoEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                role="CUSTOMER"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
