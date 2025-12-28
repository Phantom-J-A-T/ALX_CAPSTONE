import { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

function Products({ searchTerm = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetchProducts();
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // 1. Dynamic Categories from API data
  const categories = ["All", ...new Set(products.map(p => p.category))];

  // 2. Multi-stage Filtering (Search + Category)
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loading />;

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
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No Results found */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-gray-400 font-serif">Nothing matches your royal request.</p>
        </div>
      )}
    </div>
  );
}

export default Products;