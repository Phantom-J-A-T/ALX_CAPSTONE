import axios from "axios";

export const getCart = () => axios.get("/api/cart/");
export const addToCartAPI = (productId, quantity) =>
  axios.post("/api/cart/add/", { product_id: productId, quantity });
export const updateCartItem = (itemId, quantity) =>
  axios.put(`/api/cart/update/${itemId}/`, { quantity });
export const removeCartItem = (itemId) =>
  axios.delete(`/api/cart/remove/${itemId}/`);
export const clearCart = () => axios.post("/api/cart/clear/");
