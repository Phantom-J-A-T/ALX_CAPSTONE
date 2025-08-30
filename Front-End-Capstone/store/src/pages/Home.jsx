import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto p-6">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Shop Smarter with <span className="text-indigo-600">Prince & Princess Store</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Order products online and pick them up on your way home, or have them delivered right to your doorstep. 
            Your convenience, your choice.
          </p>
          <div className="flex gap-4">
            <Link
              to="/products"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
            >
              Shop Now
            </Link>
            <Link
              to="/cart"
              className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg shadow hover:bg-gray-300 transition"
            >
              View Cart
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img
            src="https://th.bing.com/th/id/R.282d2750dc90e08e6b0b339064038acd?rik=UZOyE5Q7dOMyYA&riu=http%3a%2f%2fin-beverage.org%2fwp-content%2fuploads%2f2023%2f09%2fCollage2.webp&ehk=UETkUMmBMRhBybHgNT36SeMeRKiAzJvO4oSHvAlVIVs%3d&risl=&pid=ImgRaw&r=0"
            alt="Shopping"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </section>

      {/* Options Section */}
      <section className="bg-white py-12 mt-10 shadow-inner">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-6">
          {/* Pickup Option */}
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3 text-indigo-600">🚗 Pickup</h2>
            <p className="text-gray-600 mb-4">
              Place your order online and conveniently pick it up on your way home. No waiting, no stress.
            </p>
            <Link
              to="/products"
              className="text-indigo-600 font-medium hover:underline"
            >
              Start an Order →
            </Link>
          </div>

          {/* Delivery Option */}
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3 text-green-600">📦 Delivery</h2>
            <p className="text-gray-600 mb-4">
              Get your products delivered straight to your doorstep with ease and speed.
            </p>
            <Link
              to="/products"
              className="text-green-600 font-medium hover:underline"
            >
              Shop for Delivery →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
