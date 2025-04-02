import { useState, useEffect } from "react";
import eventService from "../../services/eventService";
import "./styles/AdminDashboard.css";

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
    fetchEvents();
  }, []);

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
      // Convert date to ISO format
      const eventToCreate = {
        ...formData,
        date_time: new Date(formData.date_time).toISOString()
      };
      
      const newEvent = await eventService.createEvent(eventToCreate);
      setEvents([...events, newEvent]);
      
      // Reset form
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="manage-events">
      <h2>Manage Events</h2>
      
      {/* Event Creation Form */}
      <form onSubmit={handleSubmit} className="event-form">
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Venue:</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Date & Time:</label>
          <input
            type="datetime-local"
            name="date_time"
            value={formData.date_time}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Vendor:</label>
          <input
            type="text"
            name="vendor"
            value={formData.vendor}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label>Available Seats:</label>
          <input
            type="number"
            name="available_seats"
            min="1"
            value={formData.available_seats}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
      
      {/* Events List */}
      <div className="events-list">
        <h3>Existing Events</h3>
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <ul>
            {events.map(event => (
              <li key={event.id}>
                <h4>{event.name}</h4>
                <p>Venue: {event.venue}</p>
                <p>Date: {new Date(event.date_time).toLocaleString()}</p>
                <p>Seats: {event.available_seats}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageEvents;