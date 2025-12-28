import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProduct } from "../utils/api";
import { useCartStore } from "../store/cart"; // For adding to cart
import Loading from "../components/Loading"; // Your logo loader
import { motion } from "framer-motion";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchProduct(id);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        // Keeping the logo loader visible briefly for brand impact
        setTimeout(() => setLoading(false), 800);
      }
    };
    loadProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-serif text-royal-blue">Item Not Found</h2>
      <button onClick={() => navigate("/products")} className="mt-4 text-royal-gold underline">
        Return to Store
      </button>
    </div>
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-500 hover:text-royal-blue transition-colors group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          Back to Collection
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left: Premium Image Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 flex items-center justify-center sticky top-28 h-fit aspect-square"
        >
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="max-h-full w-auto object-contain hover:scale-105 transition-transform duration-700"
          />
        </motion.div>

        {/* Right: Product Details & Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <div className="mb-6">
            <span className="bg-royal-gold/10 text-royal-gold px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              {product.category || "Premium Selection"}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-royal-blue mt-4 mb-2">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-gray-900">
              ₦{Number(product.price).toLocaleString()}
            </p>
          </div>

          <div className="prose prose-blue text-gray-600 mb-10">
            <p className="text-lg leading-relaxed">
              {product.description || "Exquisite quality carefully selected for our royal customers. Perfect for home, gifting, or elevating your lifestyle."}
            </p>
          </div>

          {/* Cart Control Section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl p-2 sm:w-40">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:text-royal-gold text-xl font-bold transition-colors"
              >
                −
              </button>
              <span className="font-bold text-royal-blue text-lg">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                className="w-10 h-10 flex items-center justify-center hover:text-royal-gold text-xl font-bold transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={() => addToCart(product.id, quantity)}
              className="grow bg-royal-blue text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]"
            >
              Add to Royal Cart
            </button>
          </div>

          {/* Dynamic Specs Section */}
          <div className="mt-12 grid grid-cols-2 gap-6 p-6 bg-white rounded-2xl border border-gray-50 shadow-sm">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Availability</p>
              <p className="text-gray-800 font-medium">Ready for Dispatch</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Shipping</p>
              <p className="text-gray-800 font-medium">Free Royal Delivery</p>
            </div>
            {product.weight && (
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Net Weight</p>
                <p className="text-gray-800 font-medium">{product.weight}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Product ID</p>
              <p className="text-gray-800 font-mono text-sm">#{product.id.toString().padStart(5, '0')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProductDetail;