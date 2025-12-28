import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard"; // Import your new skeleton

function Products({ searchTerm = "" }) { // ✅ Accept searchTerm as a prop
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res.data);          
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        // We keep the loading state for a split second longer 
        // to let the beautiful skeleton animation be seen
        setTimeout(() => setLoading(false), 600);
      }
    };

    loadProducts();
  }, []);

  // ✅ Use the filtered list for rendering
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return (
    <div className="flex justify-center p-10">
      <p className="text-red-500 bg-red-50 px-4 py-2 rounded-lg border border-red-100">{error}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          // ✅ Show Skeletons while loading
          [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
        ) : filteredProducts.length > 0 ? (
          // ✅ Map through filteredProducts, not all products
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          // Empty State
          <div className="col-span-full text-center py-20">
            <p className="text-gray-400 text-lg font-serif">No royal items found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;