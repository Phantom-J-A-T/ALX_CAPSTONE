import React, { useEffect } from "react";
import { useCartStore } from "../store/cart";
import { toast } from "../utils/toast";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
  const { cart, loading, error, fetchCart, updateCartItem, removeFromCart, clearCart, clearError } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const phone = "2347066003577";

  const handleWhatsAppOrder = () => {
    if (!cart.items || cart.items.length === 0) return;

    const cartMessage = cart.items
      .map((item) => `• ${item.product?.name || item.name} (x${item.quantity}) - ₦${(item.subtotal || 0).toLocaleString()}`)
      .join("\n");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(
      `👑 *New Royal Order Request*\n\nHello Prince and Princess Store, I would like to order:\n\n${cartMessage}\n\n*Total Amount: ₦${(cart.total_price || 0).toLocaleString()}*\n\nPlease confirm availability and payment details.`
    )}`;

    window.open(url, "_blank");
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-serif text-royal-blue mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">It seems you haven't selected any royal treasures yet.</p>
        <Link to="/products" className="bg-royal-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-900 transition-all">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-royal-blue mb-10 text-center">Your Shopping Bag</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* List of Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
                >
                  {/* Small Product Thumbnail */}
                  <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img 
                      src={item.product?.image || "/placeholder.png"} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  <div className="grow text-center sm:text-left">
                    <h3 className="font-bold text-gray-800 text-lg">{item.product?.name || item.name}</h3>
                    <p className="text-royal-gold font-medium">₦{(item.product?.price || item.price || 0).toLocaleString()}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 bg-gray-50 px-3 py-2 rounded-xl">
                    <button
                      onClick={async () => {
                        const result = await updateCartItem(item.id, Math.max(1, item.quantity - 1));
                        if (!result.success) {
                          toast.error(result.error);
                        }
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-royal-blue hover:text-royal-gold transition-colors"
                      disabled={loading}
                    >
                      −
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={async () => {
                        const result = await updateCartItem(item.id, item.quantity + 1);
                        if (!result.success) {
                          toast.error(result.error);
                        }
                      }}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-royal-blue hover:text-royal-gold transition-colors"
                      disabled={loading}
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <p className="font-bold text-gray-900 text-lg">₦{(item.subtotal || (item.price || 0) * item.quantity).toLocaleString()}</p>
                    <button
                      onClick={async () => {
                        const result = await removeFromCart(item.id);
                        if (result.success) {
                          toast.success("Item removed from cart");
                        } else {
                          toast.error(result.error);
                        }
                      }}
                      className="text-xs text-red-400 hover:text-red-600 uppercase tracking-widest mt-1 font-bold"
                      disabled={loading}
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={clearCart}
              className="text-gray-400 text-sm hover:text-red-500 transition-colors flex items-center gap-2 ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              Clear entire cart
            </button>
          </div>

          {/* Sticky Summary Sidebar */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-serif text-royal-blue mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 border-b border-gray-50 pb-6 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>₦{(cart.total_price || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-royal-blue">₦{(cart.total_price || 0).toLocaleString()}</span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#1ebd57] transition-all shadow-xl shadow-green-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Confirm on WhatsApp
                </button>

                <Link
                  to="/manual-order"
                  className="w-full bg-royal-blue text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-900 transition-all shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Custom Manual Order
                </Link>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="text-center p-4">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter italic">
                Secure Royal Checkout • Fast Palace Delivery
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;