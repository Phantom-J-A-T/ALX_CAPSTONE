// src/pages/Cart.jsx
import React, { useEffect } from "react";
import { useCartStore } from "../store/cart";

function Cart() {
  const { cart, fetchCart, updateCartItem, removeFromCart, clearCart } = useCartStore();

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const phone = "2347066003577";

  const handleWhatsAppOrder = () => {
    if (!cart.items || cart.items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const cartMessage = cart.items
      .map((item) => `${item.product?.name || item.name} x${item.quantity} = ₦${item.subtotal || 0}`)
      .join("\n");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      `Hello, I want to order:\n${cartMessage}\n\nTotal: ₦${cart.total_price || 0}`
    )}`;

    window.open(url, "_blank");
  };

  // Show empty cart if no items
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-700 mb-4">Your cart is empty.</p>
        <a href="/products" className="text-blue-600 underline">
          Go to Products
        </a>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-blue-600 text-center">Your Cart</h2>

      {/* Backend Cart Items */}
      <ul className="space-y-3">
        {cart.items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border p-4 rounded-xl shadow-sm bg-white"
          >
            <div>
              <p className="font-semibold">{item.product?.name || item.name}</p>
              <p>
               ₦{item.product?.price || item.price || 0} × {item.quantity} = ₦
                {item.subtotal || (item.price || 0) * item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                className="border rounded-md px-2 py-1 hover:bg-gray-100 transition"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateCartItem(item.id, item.quantity + 1)}
                className="border rounded-md px-2 py-1 hover:bg-gray-100 transition"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Total */}
      <h3 className="text-xl font-bold mt-4 text-right">
        Total: ₦{cart.total_price || 0}
      </h3>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center">
        <button
          onClick={clearCart}
          className="bg-red-600 text-white px-6 py-2 rounded-xl shadow hover:bg-red-700 transition"
        >
          Clear Cart
        </button>

        <button
          onClick={handleWhatsAppOrder}
          className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 transition"
        >
          Confirm Order via WhatsApp
        </button>
      </div>

      {/* Link to Manual Order Page */}
      <div className="mt-6 text-center">
        <a
          href="/manual-order"
          className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Add Items manually
        </a>
      </div>
    </div>
  );
}

export default Cart;
