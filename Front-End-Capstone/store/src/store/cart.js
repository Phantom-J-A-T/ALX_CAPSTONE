import { create } from "zustand";
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../utils/api";

export const useCartStore = create((set, get) => ({
  cart: { items: [], total_price: 0 },
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data } = await fetchCart();
      set({ cart: data });
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (product, quantity = 1) => {
    try {
      await addToCart(product.id, quantity);
      await get().fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      await updateCartItem(itemId, quantity);
      await get().fetchCart();
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  },

  removeFromCart: async (itemId) => {
    try {
      await removeCartItem(itemId);
      await get().fetchCart();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  },

  clearCart: async () => {
    try {
      await clearCart();
      await get().fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  },
}));
