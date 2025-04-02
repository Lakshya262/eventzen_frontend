import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventService from "../../services/eventServices";

const AdminBookings = () => {
  const { eventId } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await eventService.getEventBookings(eventId);
        setBookings(data);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [eventId]);

  if (loading) return <div className="loading">Loading bookings...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (bookings.length === 0) return <div>No bookings found for this event</div>;

  return (
    <div className="admin-bookings">
      <h2>Event Bookings</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Booking Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.user?.name || 'N/A'}</td>
              <td>{booking.user?.email || 'N/A'}</td>
              <td>{new Date(booking.booking_date).toLocaleString()}</td>
              <td className={`status-${booking.status.toLowerCase()}`}>
                {booking.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;