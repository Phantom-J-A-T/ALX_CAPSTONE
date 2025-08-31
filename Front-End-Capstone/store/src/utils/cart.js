import axios from "axios";

export const getCart = () => axios.get("/api/cart/");
export const addToCartAPI = (productId, quantity) =>
  axios.post("/api/cart/items/", { product: productId, quantity });
export const updateCartItem = (itemId, quantity) =>
  axios.patch(`/api/cart/items/${itemId}/`, { quantity });
export const removeCartItem = (itemId) =>
  axios.delete(`/api/cart/items/${itemId}/`);
export const clearCartAPI = () => axios.delete("/api/cart/clear/");
