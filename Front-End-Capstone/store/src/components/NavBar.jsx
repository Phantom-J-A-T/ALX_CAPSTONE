import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const { cart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  // Calculate total items in cart
  const totalItems =
    cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="bg-blue-700 text-white p-4 border rounded-md shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Prince and Princess Store</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <Link to="/home" className="hover:font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:font-bold">
              Products
            </Link>
          </li>
          <li className="relative">
            <Link to="/cart" className="hover:font-bold">
              🛒 Cart
            </Link>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl font-bold focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4 mt-4 md:hidden bg-blue-600/95 backdrop-blur p-4 rounded-lg shadow-lg"
          >
            <li>
              <Link
                to="/home"
                className="hover:bg-blue-500 px-2 py-1 rounded"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:bg-blue-500 px-2 py-1 rounded"
                onClick={toggleMenu}
              >
                Products
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/cart"
                className="hover:bg-blue-500 px-2 py-1 rounded"
                onClick={toggleMenu}
              >
                🛒 Cart
              </Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
