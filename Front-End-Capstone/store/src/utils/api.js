import axios from "axios";

// Adjust baseURL to your Django backend URL
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// ===== Auth =====
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register/", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login/", credentials);
  // Save token if DRF returns one
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    API.defaults.headers.common["Authorization"] = `Token ${response.data.token}`;
  }
  return response.data;
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
