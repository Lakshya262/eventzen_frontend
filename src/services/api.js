const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import authService from './authService';

const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader()
      },
      credentials: 'include' 
    });
    return handleResponse(response);
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader()
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    return handleResponse(response);
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader()
      },
      body: JSON.stringify(data),
      credentials: 'include'
    });
    return handleResponse(response);
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader()
      },
      credentials: 'include'
    });
    return handleResponse(response);
  }
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type');
  const data = contentType?.includes('application/json') 
    ? await response.json() 
    : await response.text();

  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.response = response;
    error.data = data;
    throw error;
  }

  return data;
};

export default api;