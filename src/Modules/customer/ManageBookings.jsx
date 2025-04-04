import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEventBookings, cancelBooking } from "../../services/eventServices";
import "./styles/ManageBookings.css";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User not authenticated");
        }
        
        const data = await getEventBookings(userId);
        setBookings(data);
      } catch (err) {
        setError(err.message || "Failed to load bookings");
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      if (window.confirm("Are you sure you want to cancel this booking?")) {
        await cancelBooking(bookingId);
        
        const userId = localStorage.getItem("userId");
        const updatedBookings = await getEventBookings(userId);
        setBookings(updatedBookings);
      }
    } catch (err) {
      setError("Failed to cancel booking");
      console.error("Cancellation error:", err);
    }
  };

  if (loading) return <div className="loading">Loading your bookings...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="manage-bookings-container">
      <h1>Your Booked Events</h1>
      
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't booked any events yet.</p>
          <button 
            className="explore-events-btn"
            onClick={() => navigate("/customer-dashboard")}
          >
            Explore Events
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <div className="booking-info">
                <h3>{booking.event.name}</h3>
                <p><strong>Venue:</strong> {booking.event.venue}</p>
                <p><strong>Date:</strong> {new Date(booking.event.date_time).toLocaleString()}</p>
                <p><strong>Booking ID:</strong> {booking.id}</p>
                <p><strong>Status:</strong> 
                  <span className={`status-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </p>
              </div>
              <div className="booking-actions">
                {booking.status === "CONFIRMED" && (
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}
                <button
                  className="details-btn"
                  onClick={() => navigate(`/event/${booking.event.id}`)}
                >
                  View Event
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBookings;