import { create } from "zustand";
import api from "../utils/api";

export const useCartStore = create((set) => ({
  cart: { items: [], total_price: 0 },

  fetchCart: async () => {
    try {
      const res = await api.get("/cart/");
      set({ cart: res.data });
    } catch (err) {
      console.error("Fetch cart failed:", err);
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const res = await api.post("/cart/items/", { product_id: productId, quantity });
      set({ cart: res.data }); // backend returns full cart snapshot
    } catch (err) {
      console.error("Add to cart failed:", err);
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      const res = await api.patch(`/cart/items/${itemId}/`, { quantity });
      set({ cart: res.data });
    } catch (err) {
      console.error("Update cart item failed:", err);
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const res = await api.delete(`/cart/items/${itemId}/`);
      set({ cart: res.data });
    } catch (err) {
      console.error("Remove from cart failed:", err);
    }
  },

  clearCart: async () => {
    try {
      const res = await api.delete("/cart/items/clear/");
      set({ cart: res.data.cart });
    } catch (err) {
      console.error("Clear cart failed:", err);
    }
  },
}));
