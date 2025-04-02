import api from "./api";

const eventService = {
  createEvent: async (eventData) => {
    try {
      const response = await api.post("/events", eventData);
      return response.data;
    } catch (error) {
      console.error("Error creating event:", error);
      throw new Error(error.response?.data?.message || "Failed to create event");
    }
  },
  
  getAllEvents: async () => {
    try {
      const response = await api.get("/events");
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch events");
    }
  },
  
  bookEvent: async (eventId) => {
    try {
      const response = await api.post("/bookings", { eventId }); // Changed endpoint to /bookings
      return response.data;
    } catch (error) {
      console.error("Error booking event:", error);
      throw new Error(error.response?.data?.message || "Failed to book event");
    }
  },
  
  getEventBookings: async (eventId) => {
    try {
      const response = await api.get(`/events/${eventId}/bookings`);
      return response.data;
    } catch (error) {
      console.error("Error fetching event bookings:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch event bookings");
    }
  },

 
  getUserBookings: async (userId) => {
    try {
      const response = await api.get(`/bookings/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch your bookings");
    }
  },
  
  cancelBooking: async (bookingId) => {
    try {
      const response = await api.delete(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error("Error cancelling booking:", error);
      throw new Error(error.response?.data?.message || "Failed to cancel booking");
    }
  },
  
  getBookingDetails: async (bookingId) => {
    try {
      const response = await api.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching booking details:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch booking details");
    }
  }
};

export default eventService;