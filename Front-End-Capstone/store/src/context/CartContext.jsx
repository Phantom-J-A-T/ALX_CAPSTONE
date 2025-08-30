import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../store/cart";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total_price: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const { data } = await getCart();
      setCart(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    await addToCart(productId, quantity);
    fetchCart();
  };

  const updateItem = async (itemId, quantity) => {
    await updateCartItem(itemId, quantity);
    fetchCart();
  };

  const removeItem = async (itemId) => {
    await removeCartItem(itemId);
    fetchCart();
  };

  const clear = async () => {
    await clearCart();
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);
  const addItemByName = async (name, quantity = 1) => {
    try {
      // call backend with a name-based API (or a modified addToCart)
      await addToCart({ name, quantity });  
      fetchCart();
    } catch (err) {
      console.error("Failed to add item by name:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, loading, fetchCart, addItem, addItemByName, updateItem, removeItem, clear }}
    >
      {children}
    </CartContext.Provider>
  );
};
