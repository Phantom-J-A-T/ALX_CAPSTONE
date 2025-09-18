import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cart";

function Cart() {
  const { cart, fetchCart, updateCartItem, removeFromCart, clearCart, addToCart } = useCartStore();

  const [manualOrder, setManualOrder] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Handle manual text-based order
  const handleManualOrder = (e) => {
    e.preventDefault();
    const items = manualOrder.split(",").map((name) => name.trim());
    items.forEach((name) => {
      if (name) {
        addToCart(name, 1); // Backend should accept product name or ID
      }
    });
    setManualOrder("");
  };

  const handleWhatsAppOrder = () => {
    if (!cart.items || cart.items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const phone = "2348109289239";
    const message = cart.items
      .map((item) => `${item.product?.name || item.name} x${item.quantity} = $${item.subtotal || 0}`)
      .join("\n");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      `Hello, I want to order:\n${message}\n\nTotal: $${cart.total_price}\nAddress: ${address || "Pickup"}`
    )}`;

    window.open(url, "_blank");
  };

  if (!cart.items || cart.items.length === 0) {
    return <p className="p-4">Your cart is empty.</p>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      <ul className="space-y-3">
        {cart.items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-semibold">{item.product?.name || item.name}</p>
              <p>
                ${item.product?.price || item.price || 0} × {item.quantity} = $
                {item.subtotal || (item.price || 0) * item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
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
              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="text-lg font-bold mt-4">Total: ${cart.total_price}</h3>

      <button
        onClick={handleWhatsAppOrder}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirm Order via WhatsApp
      </button>

      <button onClick={clearCart} className="mt-3 ml-3 bg-red-600 text-white px-4 py-2 rounded">
        Clear Cart
      </button>

      <form onSubmit={handleManualOrder} className="mt-6 space-y-2">
        <textarea
          value={manualOrder}
          onChange={(e) => setManualOrder(e.target.value)}
          placeholder="Type product names separated by commas, e.g. Shoes, Bag, Shirt"
          className="border w-full p-2 rounded"
        />
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter delivery address, leave blank for pickup"
          className="border w-full p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Items to Cart
        </button>
      </form>
    </div>
  );
}

export default Cart;
