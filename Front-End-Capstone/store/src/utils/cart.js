import axios from "axios";

export const getCart = () => axios.get("/api/cart/");

// Add to cart (uses POST /items/)
export const addToCartAPI = (productId, quantity) =>
  axios.post("/api/cart/items/", { product: productId, quantity });

// Update cart item (PATCH /items/:id/)
export const updateCartItem = (itemId, quantity) =>
  axios.patch(`/api/cart/items/${itemId}/`, { quantity });

// Remove cart item (DELETE /items/:id/)
export const removeCartItem = (itemId) =>
  axios.delete(`/api/cart/items/${itemId}/`);

// Clear cart (DELETE /clear/)
export const clearCartAPI = () => axios.delete("/api/cart/clear/");
