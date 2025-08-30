import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const { cart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  // calculate total items in cart
  const totalItems =
    cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="bg-blue-700 text-white p-4 border rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">Prince and Princess Store</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          <li>
            <Link to="/" className="hover:font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Products" className="hover:font-bold">
              Products
            </Link>
          </li>
          <li className="relative">
            <Link to="/Cart" className="hover:font-bold">
              🛒 Cart
            </Link>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {totalItems}
              </span>
            )}
          </li>
          <li>
            <Link to="/Login" className="hover:font-bold">
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl font-bold"
          onClick={() => setIsOpen(!isOpen)}
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
            className="flex flex-col gap-4 mt-4 md:hidden bg-blue-600 p-4 rounded-lg shadow-lg"
          >
            <li>
              <Link
                to="/"
                className="hover:font-bold"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Products"
                className="hover:font-bold"
                onClick={() => setIsOpen(false)}
              >
                Products
              </Link>
            </li>
            <li className="relative">
              <Link
                to="/Cart"
                className="hover:font-bold"
                onClick={() => setIsOpen(false)}
              >
                🛒 Cart
              </Link>
              {totalItems > 0 && (
                <span className="absolute -top-2 left-12 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </li>
            <li>
              <Link
                to="/Login"
                className="hover:font-bold"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
