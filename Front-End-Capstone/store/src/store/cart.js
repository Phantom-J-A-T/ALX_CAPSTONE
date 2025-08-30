import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) => set((state) => ({ cart: [...state.cart, product] })),
  removeFromCart: (id) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== id)
  })),
  clearCart: () => set({ cart: [] }),
}));

export const getCart = () => API.get("/");
export const addToCart = (productId, quantity = 1) =>
  API.post("/items/", { product_id: productId, quantity });
export const updateCartItem = (itemId, quantity) =>
  API.patch(`/items/${itemId}/`, { quantity });
export const removeCartItem = (itemId) =>
  API.delete(`/items/${itemId}/`);
export const clearCart = () => API.delete("/clear/");