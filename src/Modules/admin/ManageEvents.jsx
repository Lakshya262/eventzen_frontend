import { useState, useEffect } from "react";
import { getEvents, createEvent, deleteEvent } from "../../services/eventServices";
import "./AdminDashboard.css";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    date_time: "",
    vendor: "",
    description: "",
    available_seats: 0
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to load events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "available_seats" ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      setLoading(true);
      const eventToCreate = {
        ...formData,
        date_time: new Date(formData.date_time).toISOString()
      };
      
      const newEvent = await eventService.createEvent(eventToCreate);
      setEvents([...events, newEvent]);
      
      setFormData({
        name: "",
        venue: "",
        date_time: "",
        vendor: "",
        description: "",
        available_seats: 0
      });
    } catch (err) {
      setError(err.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    
    try {
      setLoading(true);
      await eventService.deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
    } catch (err) {
      setError("Failed to delete event");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading events...</div>;

  return (
    <div className="manage-events">
      <h2>Manage Events</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="event-form">
        <h3>Create New Event</h3>
        
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      <div className="events-list">
        <h3>Existing Events ({events.length})</h3>
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <div className="events-grid">
            {events.map(event => (
              <div key={event.id} className="event-card">
                <div className="event-header">
                  <h4>{event.name}</h4>
                  <span className="event-seats">
                    {event.available_seats} seats available
                  </span>
                </div>
                <div className="event-details">
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Date:</strong> {new Date(event.date_time).toLocaleString()}</p>
                  {event.vendor && <p><strong>Vendor:</strong> {event.vendor}</p>}
                  {event.description && <p><strong>Description:</strong> {event.description}</p>}
                </div>
                <div className="event-actions">
                  <Link to={`/admin/events/${event.id}/bookings`} className="btn-view-bookings">
                    View Bookings
                  </Link>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="btn-delete"
                  >
                    Delete Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;