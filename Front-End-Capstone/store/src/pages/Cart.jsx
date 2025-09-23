import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cart";

function Cart() {
  const { cart, fetchCart, updateCartItem, removeFromCart, clearCart } = useCartStore();

  const [manualOrder, setManualOrder] = useState("");
  const [manualItems, setManualItems] = useState([]); // local manual orders
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle adding manual orders
  const handleManualOrder = (e) => {
    e.preventDefault();
    const items = manualOrder.split(",").map((name) => name.trim());
    setManualItems((prev) => [...prev, ...items.filter((name) => name)]);
    setManualOrder("");
  };

  // Remove manual order item
  const removeManualItem = (index) => {
    setManualItems((prev) => prev.filter((_, i) => i !== index));
  };

  // WhatsApp Order
  const handleWhatsAppOrder = () => {
    if ((!cart.items || cart.items.length === 0) && manualItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const phone = "2347066003577";

    // Build backend cart message
    const cartMessage =
      cart.items && cart.items.length > 0
        ? cart.items
            .map((item) => `${item.product?.name || item.name} x${item.quantity} = $${item.subtotal || 0}`)
            .join("\n")
        : "";

    // Build manual orders message
    const manualMessage =
      manualItems.length > 0 ? `Manual Orders:\n${manualItems.join("\n")}` : "";

    // Combine messages
    const fullMessage = [cartMessage, manualMessage]
      .filter((msg) => msg)
      .join("\n\n");

    // WhatsApp link
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      `Hello, I want to order:\n${fullMessage}\n\nTotal: $${cart.total_price || 0}\nAddress: ${address || "Pickup"}`
    )}`;

    window.open(url, "_blank");
  };

  // Show empty cart if no items anywhere
  if ((!cart.items || cart.items.length === 0) && manualItems.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>Your cart is empty.</p>
        <a href="/products" className="text-blue-600 underline">
          Go to Products
        </a>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>

      {/* Backend Cart Items */}
      {cart.items && cart.items.length > 0 && (
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
      )}

      {/* Manual Orders Section */}
      {manualItems.length > 0 && (
        <div className="mt-6 bg-gray-100 p-3 rounded-lg shadow-md border">
          <h3 className="font-semibold mb-2">Manual Orders:</h3>
          <ul className="list-disc pl-6 space-y-1">
            {manualItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{item}</span>
                <button
                  onClick={() => removeManualItem(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Total */}
      <h3 className="text-lg font-bold mt-4">Total: ${cart.total_price || 0}</h3>

      <button onClick={clearCart} className="mt-3 ml-3 bg-red-600 text-white px-4 py-2 rounded">
        Clear Cart
      </button>

      {/* Manual Order Form */}
      <form onSubmit={handleManualOrder} className="mt-6 space-y-2">
        <p className="font-semibold">Add Items Manually:</p>
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
          Add Manual Items
        </button>
      </form>

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppOrder}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirm Order via WhatsApp
      </button>
    </div>
  );
}

export default Cart;
