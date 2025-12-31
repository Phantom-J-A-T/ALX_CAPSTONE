// src/pages/ManualOrderFormPage.jsx
import ManualOrderForm from "../components/ManualOrderForm.jsx";
import { useState } from "react";

function ManualOrderFormPage() {
  const [manualItems, setManualItems] = useState([]);
  const [address, setAddress] = useState("");

  const phone = "2347066003577"; // your WhatsApp number

  // Build WhatsApp message for manual items
  const buildWhatsAppMessage = () => {
    if (manualItems.length === 0) return "";
    return `Hello, I want to order:\nManual Orders:\n${manualItems.join(
      "\n"
    )}\n\nAddress: ${address || "Pickup"}`;
  };

  const handleWhatsAppOrder = () => {
    if (manualItems.length === 0) {
      alert("Please add at least one item before placing an order.");
      return;
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      buildWhatsAppMessage()
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Place a Manual Order or Request a special Product
        </h1>
        <p className="text-gray-600 mb-4 text-center">
          Add products manually and specify your delivery address.
        </p>

        <ManualOrderForm
          manualItems={manualItems}
          setManualItems={setManualItems}
          address={address}
          setAddress={setAddress}
        />

        {manualItems.length > 0 && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <button
              onClick={handleWhatsAppOrder}
              className="bg-green-600 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-700 transition"
            >
              Confirm Order via WhatsApp
            </button>

            
          </div>
        )}
      </div>
    </div>
  );
}

export default ManualOrderFormPage;
