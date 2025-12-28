import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "../store/cart";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product.id, quantity);
      setQuantity(1);
    } else {
      alert("Please select a quantity before adding to cart.");
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      
      {/* Product Image & Category Badge */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
        />
        {product.category && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full text-royal-blue shadow-sm uppercase tracking-wider">
            {product.category}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col grow">
        {/* Title & Price */}
        <h2 className="font-semibold text-gray-800 text-lg line-clamp-1">{product.name}</h2>
        <p className="text-royal-gold font-bold text-xl mt-1">₦{Number(product.price).toLocaleString()}</p>

        <Link 
          to={`/productdetail/${product.id}`} 
          className="text-xs text-gray-400 hover:text-royal-blue mt-2 transition-colors inline-block"
        >
          View Full Specifications →
        </Link>

        <div className="mt-auto pt-4">
          {/* Quantity selector - Modern Minimalist */}
          <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg p-1">
            <span className="text-xs font-medium text-gray-500 ml-2">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:border-royal-gold transition-colors"
              >
                −
              </button>
              <span className="font-semibold text-gray-700 w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:border-royal-gold transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart - Premium Action */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-royal-blue text-white font-bold py-3 rounded-xl 
                       hover:bg-blue-800 active:scale-95 transition-all duration-150
                       flex items-center justify-center gap-2 shadow-md shadow-blue-900/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;