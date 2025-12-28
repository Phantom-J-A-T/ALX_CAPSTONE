import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../utils/api";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { motion } from "framer-motion";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await fetchProducts();
        // We only want to show the first 4 premium items on the home page
        setFeaturedProducts(res.data.slice(0, 4));
      } catch (err) {
        console.error("Error loading featured products", err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 space-y-8 z-10"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-royal-gold/10 text-royal-gold text-xs font-bold tracking-widest uppercase">
              Est. 2024 • Premium Quality
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif text-royal-blue leading-tight">
              A Taste of <span className="italic">Royalty</span> in Every Order.
            </h1>
            <p className="text-gray-600 text-lg max-w-lg leading-relaxed">
              From the finest wines and fresh harvests to premium home appliances. 
              Experience convenience designed for the Prince and Princess in you.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/products"
                className="bg-royal-blue text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-900/20 hover:bg-blue-900 transition-all active:scale-95"
              >
                Shop the Collection
              </Link>
              <Link
                to="/order"
                className="bg-white text-royal-blue border border-gray-200 px-10 py-4 rounded-2xl font-bold hover:border-royal-gold transition-all"
              >
                Special Requests
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute -inset-4 bg-royal-gold/20 rounded-[3rem] blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070"
              alt="Luxury Shopping"
              className="relative rounded-[2.5rem] shadow-2xl border-4 border-white object-cover h-[500px] w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-serif text-royal-blue">Featured Selection</h2>
            <div className="h-1 w-20 bg-royal-gold mt-2" />
          </div>
          <Link to="/products" className="text-royal-gold font-bold hover:underline">
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
          ) : (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </section>

      {/* Service Experience (The Pickup/Delivery Section) */}
      <section className="bg-royal-blue py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 relative z-10">
          
          <div className="p-10 bg-white/5 backdrop-blur-md rounded-4xl border border-white/10 hover:border-royal-gold/50 transition-all group">
            <div className="w-14 h-14 bg-royal-gold rounded-2xl flex items-center justify-center mb-6 text-2xl">🚗</div>
            <h2 className="text-3xl font-serif text-white mb-4">Royal Pickup</h2>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Order your groceries and essentials now, and have them ready for a swift, 
              contactless pickup at our palace gates.
            </p>
            <Link to="/products" className="text-royal-gold font-bold group-hover:translate-x-2 flex items-center gap-2 transition-transform">
              Start Pickup Order <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="p-10 bg-white/5 backdrop-blur-md rounded-4xl border border-white/10 hover:border-royal-gold/50 transition-all group">
            <div className="w-14 h-14 bg-royal-gold rounded-2xl flex items-center justify-center mb-6 text-2xl">📦</div>
            <h2 className="text-3xl font-serif text-white mb-4">Palace Delivery</h2>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Relax in your comfort. Our royal couriers will bring your selection 
              straight to your doorstep with priority speed.
            </p>
            <Link to="/products" className="text-royal-gold font-bold group-hover:translate-x-2 flex items-center gap-2 transition-transform">
              Start Delivery Order <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </Link>
          </div>
          {/* Concierge Call-to-Action */}
          <section className="max-w-7xl mx-auto px-6 py-20">
           <div className="bg-white rounded-[3rem] p-12 border border-royal-gold/20 shadow-xl shadow-royal-gold/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
             <h2 className="text-3xl font-serif text-royal-blue mb-2">Can't find a specific item?</h2>
              <p className="text-gray-500 italic">Our Royal Concierge is ready to source special requests just for you.</p>
            </div>
    <Link 
      to="/manual-order" // Make sure this matches your route name exactly
      className="whitespace-nowrap bg-royal-gold text-white px-8 py-4 rounded-2xl font-bold hover:bg-yellow-600 transition-all shadow-lg"
    >
      Make a Special Request
    </Link>
  </div>
</section>

        </div>
        {/* Subtle decorative crown icon in background */}
        <div className="absolute -bottom-10 -right-10 opacity-5 text-[300px] pointer-events-none font-serif">👑</div>
      </section>
    </div>
  );
}