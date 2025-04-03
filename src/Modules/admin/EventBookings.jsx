import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById, getEventBookings } from "../../services/eventServices";
import "./AdminBookings.css";

const AdminBookings = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventAttendees = async () => {
      try {
        setLoading(true);
        const eventData = await eventService.getEventById(eventId);
        const bookingsData = await eventService.getEventBookings(eventId);
        
        setEvent(eventData);
        // Extract just the attendees info from bookings
        setAttendees(bookingsData.map(booking => ({
          id: booking.id,
          name: booking.user?.name || 'Anonymous',
          email: booking.user?.email || 'N/A',
          bookingDate: booking.booking_date,
          status: booking.status
        })));  // Now properly closed
      } catch (err) {
        setError(err.message || "Failed to load attendees");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventAttendees();
  }, [eventId]);

  if (loading) return <div className="loading-spinner">Loading attendees...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="admin-bookings-container">
      <div className="event-header">
        <h2>Attendees for: {event.name}</h2>
        <Link to="/admin/manage-events" className="btn-back">
          Back to All Events
        </Link>
      </div>
      
      <div className="event-details">
        <p><strong>Date:</strong> {new Date(event.date_time).toLocaleString()}</p>
        <p><strong>Venue:</strong> {event.venue}</p>
        <p><strong>Total Attendees:</strong> {attendees.length}</p>
      </div>

      <div className="attendees-section">
        <h3>Attendee List</h3>
        {attendees.length === 0 ? (
          <p>No attendees registered yet</p>
        ) : (
          <div className="attendees-table-container">
            <table className="attendees-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Registration Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map((attendee, index) => (
                  <tr key={attendee.id} className={`status-${attendee.status.toLowerCase()}`}>
                    <td>{index + 1}</td>
                    <td>{attendee.name}</td>
                    <td>{attendee.email}</td>
                    <td>{new Date(attendee.bookingDate).toLocaleString()}</td>
                    <td>
                      <span className="status-badge">{attendee.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;