import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../../EventCard/EventCard';
import './EventsList.css';
import { getEvents } from '../../../services/eventServices';
import useAuth from '../../../hooks/useAuth';
import FilterBox from '../../FilterBox/FilterBox';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    searchQuery: '',
    dateRange: null
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
       
        const activeEvents = data.filter(event => !event.deletedAt);
        setEvents(activeEvents);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredEvents = events.filter(event => {
    // Search by name or venue
    const matchesSearch = 
      event.name?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      event.venue?.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    
    const matchesDate = !filters.dateRange || (
      new Date(event.date_time) >= new Date(filters.dateRange.startDate) &&
      new Date(event.date_time) <= new Date(filters.dateRange.endDate)
    );
    
    return matchesSearch && matchesDate;
  });

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="event-list-container">
      <h1>Upcoming Events</h1>
      
      {user?.role === 'ADMIN' && (
        <Link to="/admin/create-event" className="btn-create">
          Create New Event
        </Link>
      )}
      
      <FilterBox onFilterChange={handleFilterChange} />
      
      {filteredEvents.length === 0 ? (
        <div className="no-events">
          {filters.searchQuery || filters.dateRange 
            ? 'No events match your filters.' 
            : 'No upcoming events found.'}
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;