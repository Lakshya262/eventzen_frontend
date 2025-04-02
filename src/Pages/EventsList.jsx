import { useEffect, useState } from "react";
import eventService from "../services/eventServices";
import EventCard from "../Components/EventCard";
import "./EventsList.css";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAllEvents();
        console.log("Events data:", data); 
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from API");
        }
        setEvents(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  if (loading) return <div className="loading">Loading events...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="events-list-container">
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.length === 0 ? (
          <p className="no-events">No events available</p>
        ) : (
          events.map(event => (
            <EventCard 
              key={event.id || event._id} 
              event={event} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default EventsList;