import { create } from "zustand";
import axios from "axios";

// API setup
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/cart/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Backend API calls
const getCartAPI = () => API.get("/");
const addToCartAPI = (productId, quantity = 1) =>
  API.post("/items/", { product_id: productId, quantity });
const updateCartItemAPI = (itemId, quantity) =>
  API.patch(`/items/${itemId}/`, { quantity });
const removeCartItemAPI = (itemId) => API.delete(`/items/${itemId}/`);
const clearCartAPI = () => API.delete("/clear/");

// Zustand store
export const useCartStore = create((set, get) => ({
  cart: { items: [], total_price: 0 },

  // Fetch cart from backend
  fetchCart: async () => {
    try {
      const { data } = await getCartAPI();
      set({ cart: data });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  },

  // Add product to cart
  addToCart: async (product, quantity = 1) => {
    try {
      await addToCartAPI(product.id, quantity);
      await get().fetchCart(); // refresh local state
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },

  // Update item quantity
  updateCartItem: async (itemId, quantity) => {
    try {
      await updateCartItemAPI(itemId, quantity);
      await get().fetchCart();
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  },

  // Remove item
  removeFromCart: async (itemId) => {
    try {
      await removeCartItemAPI(itemId);
      await get().fetchCart();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      await clearCartAPI();
      await get().fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  },
}));
