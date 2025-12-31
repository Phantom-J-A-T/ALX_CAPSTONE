import { useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart";

export default function NavBar({ searchTerm, setSearchTerm }) {
  const { cart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;


  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center gap-4">
        
        {/* Logo */}
        <Link to="/home" className="shrink-0">
          <img src="./assets/Prince and Princess Logo.png" alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* Search Bar (Native SVG Icon) */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text"
            placeholder="Search the collection..."
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-blue-600/20 transition-all outline-none text-sm text-gray-700"
          />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 items-center font-medium text-gray-600">
          <li><Link to="/home" className="hover:text-blue-700 transition-colors">Home</Link></li>
          <li><Link to="/products" className="hover:text-blue-700 transition-colors">Products</Link></li>
          <li className="relative">
            <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-700 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}