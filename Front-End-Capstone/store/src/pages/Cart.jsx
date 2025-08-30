import React from "react";
import { useCart } from "../context/CartContent";

export default function Cart() {
  const { cart, loading, updateItem, removeItem, clear } = useCart();

  if (loading) return <p>Loading cart...</p>;
  if (!cart.items.length) return <p>Your cart is empty.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <ul className="space-y-3">
        {cart.items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-semibold">{item.product.name}</p>
              <p>${item.product.price} x {item.quantity} = ${item.subtotal}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateItem(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="px-2 py-1 border rounded"
              >-</button>
              <button
                onClick={() => updateItem(item.id, item.quantity + 1)}
                className="px-2 py-1 border rounded"
              >+</button>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500"
              >Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-bold mt-4">Total: ${cart.total_price}</h3>
      <button
        onClick={clear}
        className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
}
