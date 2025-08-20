import { Link } from "react-router-dom";

import { useCartStore } from "../store/cart";

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(0)

  return (
    <div className="border p-4 rounded shadow">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover"/>
      <h2 className="font-bold">{product.name}</h2>
      <p>${product.price}</p>
      <Link to={`/productdetail/${product.id}`} className="text-blue-500">View Details</Link>
      <label>Quantity</label>
      <button onClick={() => setQuantity((quantity) => quantity + 1)}
                className="border rounded-md ">{quantity}</button>
      <button
        onClick={() => addToCart(product, quantity)}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}


export default ProductCard;
