const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const authService = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include"
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({
          id: data.userId,
          name: data.name,
          email: data.email,
          role: data.role
        }));
      }
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include"
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({
        id: data.userId,
        name: data.name,
        email: data.email,
        role: data.role
      }));
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        credentials: "include"
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch profile");
      return data;
    } catch (error) {
      console.error("Profile fetch error:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};

export default authService;