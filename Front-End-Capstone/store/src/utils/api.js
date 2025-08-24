// src/api.js
import axios from "axios";

// Base URL of your Django backend
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Signup
export const signup = (userData) => api.post("/users/signup/", userData);

// Login -> gets JWT token
export const login = async (credentials) => {
  const response = await api.post("/users/token/", credentials);

  // Save tokens to localStorage
  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);

  return response.data;
};

// Refresh token if expired
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  const response = await api.post("/users/token/refresh/", { refresh });
  localStorage.setItem("access", response.data.access);
  return response.data.access;
};

// Protected endpoint -> Profile
export const getProfile = async () => {
  try {
    const response = await api.get("/users/profile/");
    return response.data;
  } catch (error) {
    // If token expired -> try refresh
    if (error.response && error.response.status === 401) {
      const newAccess = await refreshToken();
      if (newAccess) {
        return getProfile(); // retry request
      }
    }
    throw error;
  }
};



// ===== Products =====
export const fetchProducts = async () => {
  const response = await API.get("/products/");
  return response.data;
};

// ===== Orders =====
export const createOrder = async (orderData) => {
  const response = await API.post("/orders/", orderData);
  return response.data;
};
