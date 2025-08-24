import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../utils/api";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default Products;