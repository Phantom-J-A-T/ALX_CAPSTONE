import axios from "axios";

const API = axios.create({
  baseURL: "https://phantom.pythonanywhere.com/api",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- AUTH ----------------
export const signup = (userData) => API.post("/users/signup/", userData);

export const login = async (credentials) => {
  const response = await API.post("/token/", credentials);
  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  return response.data;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  try {
    const response = await API.post("/token/refresh/", { refresh });
    localStorage.setItem("access", response.data.access);
    return response.data.access;
  } catch {
    return null;
  }
};

export const getProfile = async () => {
  try {
    const response = await API.get("/users/user-detail/"); // Make sure backend URL exists
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      const newAccess = await refreshToken();
      if (newAccess) return getProfile();
    }
    throw error;
  }
};

// ---------------- PRODUCTS ----------------
export const fetchProducts = () => API.get("/products/");
export const fetchProduct = (id) => API.get(`/products/${id}/`);
export const fetchCategories = () => API.get("/products/categories/");

// ---------------- CART ----------------
export const fetchCart = () => API.get("/cart/");
export const addToCart = (productId, quantity = 1) =>
  API.post("/cart/items/", { product_id: productId, quantity }); // fixed product_id
export const updateCartItem = (itemId, quantity) =>
  API.patch(`/cart/items/${itemId}/`, { quantity }); // use PATCH
export const removeCartItem = (itemId) => API.delete(`/cart/items/${itemId}/`);
export const clearCart = () => API.delete("/cart/items/clear/"); // fixed URL

export default API;
