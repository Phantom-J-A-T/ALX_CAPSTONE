// src/pages/ProductDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "../utils/api";

function ProductDetail() {
  const { id } = useParams(); // grab product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <img
        src={product.image || "/placeholder.png"}
        alt={product.name}
        className="w-64 h-64 object-cover"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-lg">${product.price}</p>
      <p className="mt-2">{product.description}</p>
    </div>
  );
}

export default ProductDetail;
