import { useState, useEffect } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import EventCard from "../../Components/EventCard/EventCard";
import "./AdminDashboard.css";
import { getEvents, deleteEvent } from "../../services/eventServices";

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        console.log('Fetched events:', data);
        if (!data || data.length === 0) {
          setError("No events found");
        }
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message || err.response?.data?.message || "Failed to load events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (err) {
      console.error("Failed to delete event:", err);
      setError("Failed to delete event");
    }
  };

  if (loading) return <div className="admin-dashboard">Loading...</div>;
  if (error) return <div className="admin-dashboard">{error}</div>;

  return (
    <div className="admin-dashboard">
      <Navigation role="admin" />
      <h1>Admin Dashboard</h1>
      <div className="event-list">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard 
              key={event.id} 
              event={event} 
              onDelete={() => handleDeleteEvent(event.id)}
            />
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;