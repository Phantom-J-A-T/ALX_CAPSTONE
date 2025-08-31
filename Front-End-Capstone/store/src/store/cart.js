import { create } from "zustand";
import {
  getCart,
  addToCartAPI,
  updateCartItem,
  removeCartItem,
  clearCartAPI,
} from "../utils/cart";

export const useCartStore = create((set, get) => ({
  cart: { items: [], total_price: 0 },
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data } = await getCart();
      set({ cart: data });
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (product, quantity = 1) => {
    try {
      await addToCartAPI(product.id, quantity); // ✅ call API util
      await get().fetchCart(); // ✅ refresh cart state
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
      await clearCartAPI();
      await get().fetchCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  },
}));
