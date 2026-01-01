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

  const categories = ["All", ...new Set(products.map(p => {
    if (typeof p.category === 'object' && p.category !== null) {
      return p.category.name;
    }
    return p.category || "General";
  }))].filter(Boolean);

  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.name || "").toLowerCase().includes((searchTerm || "").toLowerCase());
    const categoryName = typeof product.category === 'object' ? product.category?.name : product.category;
    const matchesCategory = selectedCategory === "All" || categoryName === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          [...Array(8)].map((_, i) => <SkeletonCard key={i} />)
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>

      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20 flex flex-col items-center">
          <span className="text-5xl mb-4">👑</span>
          <p className="text-xl text-gray-400 font-serif">Nothing matches your royal request.</p>
          <button 
            onClick={() => {
              setSelectedCategory("All");
              // Note: To clear search from here, you'd need to pass setSearchTerm down as a prop too
            }}
            className="mt-4 text-royal-gold underline hover:text-royal-blue transition-colors"
          >
            Reset categories
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;