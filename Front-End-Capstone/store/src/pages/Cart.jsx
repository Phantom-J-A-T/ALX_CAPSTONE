import React, { useEffect } from "react";
import { useCartStore } from "../store/cart";

function Cart() {
  const { cart, fetchCart, updateCartItem, removeFromCart, clearCart } =
    useCartStore();

  // Fetch cart from backend when component mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (!cart.items || cart.items.length === 0) {
    return <p className="p-4">Your cart is empty.</p>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      <ul className="space-y-3">
        {cart.items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-semibold">{item.product.name}</p>
              <p>
                ${item.product.price} × {item.quantity} = ${item.subtotal}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateCartItem(item.id, Math.max(1, item.quantity - 1))
                }
                className="border rounded-md px-2"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateCartItem(item.id, item.quantity + 1)}
                className="border rounded-md px-2"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Cart Total */}
      <h3 className="text-lg font-bold mt-4">
        Total: ${cart.total_price}
      </h3>

      {/* Clear Cart */}
      <button
        onClick={clearCart}
        className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
}

export default Cart;
