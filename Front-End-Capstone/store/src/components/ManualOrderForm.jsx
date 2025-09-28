// src/components/ManualOrderForm.jsx
import React, { useState } from "react";

function ManualOrderForm({ manualItems, setManualItems, address, setAddress }) {
  const [manualOrder, setManualOrder] = useState("");
  const phone = "2347066003577";

  // Handle adding manual orders
  const handleManualOrder = (e) => {
    e.preventDefault();
    const items = manualOrder.split(",").map((name) => name.trim());
    if (items.length === 0 || items.every((i) => !i)) {
      alert("Please enter at least one valid item.");
      return;
    }
    setManualItems((prev) => [...prev, ...items.filter(Boolean)]);
    setManualOrder("");
  };

  // Remove manual order item
  const removeManualItem = (index) => {
    setManualItems((prev) => prev.filter((_, i) => i !== index));
  };

  // WhatsApp Order
  const handleWhatsAppOrder = () => {
    if (manualItems.length === 0) {
      alert("Please add at least one item before placing an order.");
      return;
    }

    const message = `Hello, I want to order:\nManual Orders:\n${manualItems.join(
      "\n"
    )}\n\nAddress: ${address || "Pickup"}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
      <form onSubmit={handleManualOrder} className="space-y-4">
        <h3 className="text-2xl font-bold text-blue-600">Add Items Manually</h3>

        <textarea
          value={manualOrder}
          onChange={(e) => setManualOrder(e.target.value)}
          placeholder="Type product names separated by commas, e.g. Shoes, Bag, Shirt"
          className="border border-gray-300 rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter delivery address, leave blank for pickup"
          className="border border-gray-300 rounded-xl w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          Add Items
        </button>
      </form>

      {manualItems.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Manual Orders</h4>
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

          <button
            onClick={handleWhatsAppOrder}
            className="mt-4 w-full bg-green-600 text-white font-semibold px-6 py-2 rounded-xl shadow hover:bg-green-700 transition"
          >
            Confirm Order via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}

export default ManualOrderForm;
