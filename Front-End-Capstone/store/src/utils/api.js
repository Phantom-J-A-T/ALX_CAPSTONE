// src/api.js
import axios from "axios";

// Base URL of your Django backend
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", //Can be adjusted depending on the host used
});

// Signup API call
export const signup = async (userData) => {
  try {
    const response = await API.post("/users/signup/", userData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
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
