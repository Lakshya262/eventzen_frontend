import { useEffect, useState } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import EventCard from "../../Components/EventCard/EventCard";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Demo data 
  const demoEvents = [
    {
      id: 1,
      name: "Tech Conference 2023",
      venue: "Convention Center",
      date_time: "2023-12-15T03:30:00",
      available_seats: 150,
      image: "https://source.unsplash.com/random/300x200/?conference"
    },
    {
      id: 2,
      name: "Music Festival",
      venue: "Central Park",
      date_time: "2024-06-20T18:00:00",
      available_seats: 500,
      image: "https://source.unsplash.com/random/300x200/?concert"
    },
    {
      id: 3,
      name: "Art Exhibition",
      venue: "City Art Gallery",
      date_time: "2024-03-10T10:00:00",
      available_seats: 80,
      image: "https://source.unsplash.com/random/300x200/?art"
    }
  ];

  useEffect(() => {
    // Simulate API fetch with timeout
    const fetchData = async () => {
      try {
        // In a real app, you would call your eventService here
        // const data = await eventService.getAllEvents();
        // setEvents(data.length > 0 ? data : demoEvents);
        
        // For now, use demo data after a short delay
        setTimeout(() => {
          setEvents(demoEvents);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents(demoEvents);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="customer-dashboard">
        <Navigation />
        <div className="loading">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="customer-dashboard">
      <Navigation />
      <div className="dashboard-content">
        <h1>Customer Dashboard</h1>
        <div className="events-container">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;