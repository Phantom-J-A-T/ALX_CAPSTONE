import { create } from "zustand";
import api from "../utils/api";

export const useCartStore = create((set) => ({
  cart: { items: [], total_price: 0 },
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/cart/");
      set({ cart: res.data, loading: false });
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to fetch cart";
      set({ error: errorMsg, loading: false });
      console.error("Fetch cart failed:", err);
    }
  },

  addToCart: async (productId, quantity = 1) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/cart/items/", { product_id: productId, quantity });
      set({ cart: res.data, loading: false });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to add item to cart";
      set({ error: errorMsg, loading: false });
      console.error("Add to cart failed:", err);
      return { success: false, error: errorMsg };
    }
  },

  updateCartItem: async (itemId, quantity) => {
    set({ loading: true, error: null });
    try {
      const res = await api.patch(`/cart/items/${itemId}/`, { quantity });
      set({ cart: res.data, loading: false });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to update cart item";
      set({ error: errorMsg, loading: false });
      console.error("Update cart item failed:", err);
      return { success: false, error: errorMsg };
    }
  },

  removeFromCart: async (itemId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete(`/cart/items/${itemId}/`);
      set({ cart: res.data, loading: false });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to remove item from cart";
      set({ error: errorMsg, loading: false });
      console.error("Remove from cart failed:", err);
      return { success: false, error: errorMsg };
    }
  },

  clearCart: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete("/cart/items/clear/");
      set({ cart: res.data.cart || { items: [], total_price: 0 }, loading: false });
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Failed to clear cart";
      set({ error: errorMsg, loading: false });
      console.error("Clear cart failed:", err);
      return { success: false, error: errorMsg };
    }
  },

  clearError: () => set({ error: null }),
}));
