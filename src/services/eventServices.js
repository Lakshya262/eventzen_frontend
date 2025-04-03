import API from './api';

export const getEvents = async () => {
  try {
    const response = await API.get('/events');
    return response.data || response; 
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await API.get(`/events/${eventId}`);
    return response.data || response;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await API.post('/events', eventData);
    return response.data || response;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await API.put(`/events/${eventId}`, eventData);
    return response.data || response;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await API.delete(`/events/${eventId}`);
    return response.data || response;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const bookEvent = async (eventId) => {
  try {
    const response = await API.post('/events/book', { eventId });
    return response.data || response;
  } catch (error) {
    console.error('Error booking event:', error);
    throw error;
  }
};

export const getEventBookings = async (eventId) => {
  try {
    const response = await API.get(`/events/${eventId}/bookings`);
    return response.data || response;
  } catch (error) {
    console.error('Error fetching event bookings:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    const response = await API.put(`/bookings/${bookingId}/cancel`);
    return response.data || response;
  } catch (error) {
    console.error('Error canceling booking:', error);
    throw error;
  }
};