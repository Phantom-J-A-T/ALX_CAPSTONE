// src/api.js
import axios from "axios";

// Base URL of your Django backend
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Signup
export const signup = (userData) => API.post("/users/signup/", userData);

// Login (JWT)
export const login = (credentials) => API.post("/token/", credentials);

// Refresh Token
export const refreshToken = (refresh) =>
  API.post("/token/refresh/", { refresh });


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
