import axios from "axios";

// Base URL of your Django backend
const API = axios.create({
  baseURL: "https://phantom.pythonanywhere.com/api",
});

// Attach token to every request (if available)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- AUTH ----------------

// Signup
export const signup = (userData) => API.post("/users/signup/", userData);

// Login -> gets JWT token
export const login = async (credentials) => {
  const response = await API.post("/token/", credentials);

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);

  return response.data;
};

// Refresh token
export const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) return null;

  const response = await API.post("/token/refresh/", { refresh });
  localStorage.setItem("access", response.data.access);
  return response.data.access;
};

// Profile (Protected)
export const getProfile = async () => {
  try {
    const response = await API.get("/users/user-detail/");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const newAccess = await refreshToken();
      if (newAccess) {
        return getProfile(); // retry
      }
    }
    throw error;
  }
};

// ---------------- PRODUCTS ----------------

// Fetch all products
export const fetchProducts = () => API.get("/products/");

// Fetch single product
export const fetchProduct = (id) => API.get(`/products/${id}/`);

// Create product (admin only)
export const createProduct = (data) => API.post("/products/", data);

// Update product
export const updateProduct = (id, data) => API.put(`/products/${id}/`, data);

// Delete product
export const deleteProduct = (id) => API.delete(`/products/${id}/`);

// ---------------- CATEGORIES ----------------

export const fetchCategories = () => API.get("/products/categories/");
export const createCategory = (data) => API.post("/products/categories/", data);

// ---------------- PRODUCT DETAILS ----------------

export const fetchProductDetails = () => API.get("/products/details/");
export const createProductDetail = (data) => API.post("/products/details/", data);


// ---------------- CART ----------------

// Fetch the current cart
export const fetchCart = () => API.get("/cart/");

// Fetch all cart items
export const fetchCartItems = () => API.get("/cart/items/");

// Add product to cart
export const addToCart = (productId, quantity = 1) =>
  API.post("/cart/items/", { product: productId, quantity });

// Update a cart item
export const updateCartItem = (itemId, quantity) =>
  API.put(`/cart/items/${itemId}/`, { quantity });

// Remove a single cart item
export const removeCartItem = (itemId) => API.delete(`/cart/items/${itemId}/`);

// Clear the whole cart
export const clearCart = () => API.delete("/cart/clear/");
