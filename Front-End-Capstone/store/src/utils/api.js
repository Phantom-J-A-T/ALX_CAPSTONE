import axios from "axios";

// Create a reusable axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api", // 👈 change this to your backend URL
});

// ===== Auth =====
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

// ===== Products =====
export const fetchProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};

// ===== Orders =====
export const createOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);
  return response.data;
};

export default API;
