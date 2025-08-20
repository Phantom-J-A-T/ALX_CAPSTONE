import { useState } from "react";

export default function CheckOutForm() {
  const [form, setForm] = useState({ name: "", address: "", card: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="card"
        placeholder="Card Number"
        value={form.card}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Place Order
      </button>
    </form>
  );
}
