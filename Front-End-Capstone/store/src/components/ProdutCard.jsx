import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover"/>
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <Link to={`/productdetail/${product.id}`} className="text-blue-500">View Details</Link>
    </div>
  );
}

export default ProductCard;
