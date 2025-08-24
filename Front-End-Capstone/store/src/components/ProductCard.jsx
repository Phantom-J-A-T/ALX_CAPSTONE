import { Link } from "react-router-dom";
import { useState } from "react";   // <-- missing import
import { useCartStore } from "../store/cart";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(0);

  // Prevent adding with 0 quantity
  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
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
      <h2 className="font-bold">{product.name}</h2>
      <p>${product.price}</p>

      <Link
        to={`/productdetail/${product.id}`}
        className="text-blue-500"
      >
        View Details
      </Link>

      <div className="mt-2 flex items-center gap-2">
        <label>Quantity</label>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="border rounded-md px-2"
        >
          {quantity}
        </button>
      </div>

      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
