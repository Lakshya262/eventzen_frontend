import "./styles/EventCard.css";

const EventCard = ({ event }) => {
  if (!event) return null;

  return (
    <div className="event-card" data-testid="event-card">
      <div className="event-image-container">
        {event.image ? (
          <img 
            src={event.image} 
            alt={event.name} 
            className="event-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-event.jpg';
            }}
          />
        ) : (
          <div className="event-image-placeholder">
            <span>No Image Available</span>
          </div>
        )}
      </div>
      
      <div className="event-details">
        <h3 className="event-title">{event.name || 'Untitled Event'}</h3>
        <p className="event-info">
          <strong>Venue:</strong> {event.venue || 'Not specified'}
        </p>
        <p className="event-info">
          <strong>Date:</strong> {event.date_time ? new Date(event.date_time).toLocaleString() : 'TBD'}
        </p>
        <p className="event-info">
          <strong>Seats:</strong> {event.available_seats || 0} available
        </p>
        <div className="event-actions">
          <button className="book-button">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;