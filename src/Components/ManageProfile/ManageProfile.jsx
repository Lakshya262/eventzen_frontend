import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManageProfile.css';

function ManageProfile() {
  const [user, setUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
       
        if (!token) {
          setError("No authentication token found. Please log in.");
          setLoading(false);
          return;
        }
        
        try {
          const response = await axios.get("http://localhost:3000/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
          setUser(response.data);
        } catch (err) {
          console.error("Profile fetch error:", err);
          setError(err.response?.data?.error || "Failed to load profile");
          
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login");
          }
        } finally {
          setLoading(false);
        }
        
        setUser(response.data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        setError(err.response?.data?.message || 'Failed to load profile');
        
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
}

export default ManageProfile;