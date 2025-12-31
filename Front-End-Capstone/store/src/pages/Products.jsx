import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";

function Products({ searchTerm = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        // Safety Check: Ensure data is an array
        if (res && Array.isArray(res.data)) {
          setProducts(res.data);
        } else if (Array.isArray(res)) {
          setProducts(res);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    loadProducts();
  }, []);

  // SAFE CATEGORY EXTRACTION: Handles both string and object categories
  const categories = ["All", ...new Set(products.map(p => {
    if (typeof p.category === 'object' && p.category !== null) {
      return p.category.name; // Use the name if it's an object
    }
    return p.category || "General"; // Fallback for null/undefined
  }))].filter(Boolean); // Remove any null values

  const filteredProducts = products.filter(product => {
    // Safety check for product name
    const matchesSearch = (product.name || "").toLowerCase().includes((searchTerm || "").toLowerCase());
    
    // Safety check for category matching
    const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;
    const matchesCategory = selectedCategory === "All" || categoryName === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full border text-sm font-medium transition-all
              ${selectedCategory === cat 
                ? "bg-royal-blue text-white border-royal-blue shadow-lg scale-105" 
                : "bg-white text-gray-600 border-gray-200 hover:border-royal-gold"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {/* No Results found */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20 flex flex-col items-center">
          <span className="text-5xl mb-4">👑</span>
          <p className="text-xl text-gray-400 font-serif">Nothing matches your royal request.</p>
          <button 
            onClick={() => setSelectedCategory("All")}
            className="mt-4 text-royal-gold underline hover:text-royal-blue transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;