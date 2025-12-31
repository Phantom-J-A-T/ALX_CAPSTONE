import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "../store/cart";
import { toast } from "../utils/toast";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  // SAFE CATEGORY CHECK: Prevents Minified React Error #31
  const displayCategory = typeof product.category === 'object' 
    ? product.category?.name 
    : product.category;

  const handleAddToCart = async () => {
    if (quantity > 0) {
      const result = await addToCart(product.id, quantity);
      if (result.success) {
        toast.success(`${product.name} added to cart!`);
        setQuantity(1);
      } else {
        toast.error(result.error || "Failed to add to cart");
      }
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-4"
        />
        {displayCategory && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full text-royal-blue shadow-sm uppercase tracking-wider">
            {displayCategory}
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col grow">
        <h2 className="font-semibold text-gray-800 text-lg line-clamp-1">{product.name}</h2>
        <p className="text-royal-gold font-bold text-xl mt-1">
          ₦{Number(product.price || 0).toLocaleString()}
        </p>

        <Link 
          to={`/productdetail/${product.id}`} 
          className="text-xs text-gray-400 hover:text-royal-blue mt-2 transition-colors inline-block"
        >
          View Full Specifications →
        </Link>

        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-4 bg-gray-50 rounded-lg p-1">
            <span className="text-xs font-medium text-gray-500 ml-2">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:border-royal-gold"
              >
                −
              </button>
              <span className="font-semibold text-gray-700 w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:border-royal-gold"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-royal-blue text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;