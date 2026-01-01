import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "../store/cart";

export default function NavBar({ searchTerm, setSearchTerm }) {
  const { cart } = useCartStore();
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const totalItems = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // New handler for search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If user starts typing and isn't on the products page, redirect them
    if (value.trim() !== "" && location.pathname !== "/products") {
      navigate("/products");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center gap-2">
        
        {/* Logo */}
        <Link to="/home" className="shrink-0">
          <img src="/Logo.png" alt="Logo" className="h-10 md:h-12 w-auto rounded-md" />
        </Link>

        {/* Search Bar - Desktop View */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            type="text"
            placeholder="Search the collection..."
            value={searchTerm || ""}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full outline-none text-sm"
          />
        </div>

        {/* Links & Cart */}
        <div className="flex items-center gap-4 text-gray-600 font-medium text-sm md:text-base">
          <button onClick={() => setShowSearch(!showSearch)} className="md:hidden p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          
          <Link to="/home" className="hover:text-blue-700">Home</Link>
          <Link to="/products" className="hover:text-blue-700">Products</Link>
          
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-blue-700 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {showSearch && (
        <div className="md:hidden px-4 pb-4 animate-in slide-in-from-top duration-300">
          <input 
            type="text"
            autoFocus
            placeholder="Search for items..."
            value={searchTerm || ""}
            onChange={handleSearchChange}
            className="w-full p-3 bg-gray-100 rounded-xl outline-none text-sm border focus:border-blue-300"
          />
        </div>
      )}
    </nav>
  );
}