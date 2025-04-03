import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import './EventCard.css';

const EventCard = ({ event, onBookingSuccess }) => {
  const { user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const formattedDate = new Date(event.date_time).toLocaleString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleBookEvent = async () => {
    if (!user) {
      setBookingError('Please login to book events');
      return;
    }

    setIsBooking(true);
    setBookingError(null);

    try {
      await eventService.bookEvent(event.id);
      setIsBooked(true);
      onBookingSuccess?.(); 
      
      event.available_seats -= 1;
    } catch (error) {
      console.error('Booking failed:', error);
      setBookingError(error.response?.data?.message || 'Failed to book event');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <h3 className="event-title">{event.name || 'Untitled Event'}</h3>
        <span className={`event-seats ${event.available_seats <= 0 ? 'no-seats' : ''}`}>
          {event.available_seats <= 0 ? 'Sold Out' : `${event.available_seats} seats left`}
        </span>
      </div>
      
      <div className="event-details">
        <p className="event-venue">
          <strong>Venue:</strong> {event.venue || 'Not specified'}
        </p>
        <p className="event-date">
          <strong>Date:</strong> {formattedDate}
        </p>
        {event.vendor && (
          <p className="event-vendor">
            <strong>Vendor:</strong> {event.vendor}
          </p>
        )}
        {event.description && (
          <p className="event-description">
            <strong>Description:</strong> {event.description}
          </p>
        )}
      </div>
      
      <div className="event-actions">
        <Link to={`/events/${event.id}`} className="btn-details">
          View Details
        </Link>
        
        {user?.role === 'CUSTOMER' && event.available_seats > 0 && (
          <button
            onClick={handleBookEvent}
            disabled={isBooking || isBooked}
            className={`btn-book ${isBooked ? 'booked' : ''}`}
          >
            {isBooking ? 'Booking...' : isBooked ? 'Registered!' : 'Register Now'}
          </button>
        )}
      </div>
      
      {bookingError && <div className="booking-error">{bookingError}</div>}
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    venue: PropTypes.string,
    date_time: PropTypes.string.isRequired,
    vendor: PropTypes.string,
    description: PropTypes.string,
    available_seats: PropTypes.number.isRequired,
    createdAt: PropTypes.string
  }).isRequired,
  onBookingSuccess: PropTypes.func
};

export default EventCard;