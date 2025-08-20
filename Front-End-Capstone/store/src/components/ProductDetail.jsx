import { Link } from "react-router-dom";
import Products from "../pages/Products";
import { useState } from "react";

function ProductDetail({ product }) {
    const [quantity, setQuantity] = useState(0)
  return (
    <div className="p-6">
    <Link to="/products" className="text-blue-500 mb-4 inline-block">Back to Products</Link>
      <img src={product.image} alt={product.name} className="w-full h-60 object-cover"/>
      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-4">${product.price}</p>
      <label>Click on the button below to increade product quantity</label>
      <button onClick={() => setQuantity((quantity) => quantity + 1)}
                className="border rounded-md ">{quantity}</button>
    </div>
  );
}

export default ProductDetail;