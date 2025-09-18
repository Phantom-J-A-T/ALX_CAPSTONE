import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "../store/cart";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product.id, quantity); // Pass product.id & quantity
      setQuantity(1);
    } else {
      alert("Please select a quantity before adding to cart.");
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name || "Unnamed product"}
        className="w-full h-40 object-cover"
      />
      <h2 className="font-bold mt-2">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>

      <Link to={`/productdetail/${product.id}`} className="text-blue-500 block mt-1">
        View Details
      </Link>

      {/* Quantity selector */}
      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="border rounded-md px-2"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="border rounded-md px-2"
        >
          +
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-4 py-2 mt-3 rounded w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
