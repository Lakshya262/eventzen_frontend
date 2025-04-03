import React from 'react';
import { useParams } from 'react-router-dom';
import eventService from '../../../services/eventServices';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams();
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventData = await eventService.getEventById(eventId);
        setEvent(eventData);
      } catch (err) {
        setError('Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="event-details">
      <h2>{event.name}</h2>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Date:</strong> {new Date(event.date_time).toLocaleString()}</p>
      <p><strong>Description:</strong> {event.description}</p>
      {/* Add more event details as needed */}
    </div>
  );
};

export default EventDetails;
