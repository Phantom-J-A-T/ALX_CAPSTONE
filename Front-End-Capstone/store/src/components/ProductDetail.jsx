import { Link } from "react-router-dom";
import Products from "../pages/Products";

function ProductDetail({ product }) {
    return (
        <div className="max-w-2xl mx-auto p-6">
        <Link to="/products" className="text-blue-500 mb-4 inline-block">Back to Products</Link>
        <div className="border rounded-lg shadow p-4">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4"/>
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">${product.price}</p>
            <p className="text-gray-800">{product.description}</p>
        </div>
        </div>
    );
    }

export default ProductDetail;