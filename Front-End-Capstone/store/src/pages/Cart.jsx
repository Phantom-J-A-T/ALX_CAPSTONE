import React, { useEffect } from "react";
import { useCartStore } from "../store/cart";
import { toast } from "../utils/toast";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
  const { cart, loading, error, fetchCart, updateCartItem, removeFromCart, clearCart, clearError } = useCartStore();
  const phone = "2347066003577";

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleWhatsAppOrder = () => {
    if (!cart.items || cart.items.length === 0) return;

    // Formatting the items list for the message
    const cartMessage = cart.items
      .map((item) => {
        const name = item.product?.name || item.name || "Royal Item";
        const qty = item.quantity;
        const subtotal = item.subtotal || (Number(item.product?.price || 0) * qty);
        return `• *${name}* (x${qty}) - ₦${Number(subtotal).toLocaleString()}`;
      })
      .join("\n");

    const total = Number(cart.total_price || 0).toLocaleString();

    const text = `👑 *NEW ROYAL ORDER REQUEST*\n\n` +
                 `Hello Prince and Princess Store, I would like to order:\n\n` +
                 `${cartMessage}\n\n` +
                 `💰 *Total Amount: ₦${total}*\n\n` +
                 `_Please confirm availability and send payment details._`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-serif text-royal-blue mb-2">Your Cart is Empty</h2>
        <Link to="/products" className="bg-royal-blue text-white px-8 py-3 rounded-full font-bold">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-royal-blue mb-10 text-center">Your Shopping Bag</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border">
                <img src={item.product?.image || "/placeholder.png"} className="w-20 h-20 object-contain" alt={item.name} />
                <div className="grow">
                  <h3 className="font-bold">{item.product?.name || item.name}</h3>
                  <p className="text-royal-gold">₦{Number(item.product?.price || 0).toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))} className="p-2 border rounded">-</button>
                  <span className="font-bold">{item.quantity}</span>
                  <button onClick={() => updateCartItem(item.id, item.quantity + 1)} className="p-2 border rounded">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs border rounded-sm bg-red-300 drop-shadow-sm">Remove</button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg border h-fit">
            <h3 className="text-xl font-serif mb-6">Order Summary</h3>
            <div className="flex justify-between text-2xl font-bold text-royal-blue mb-8">
              <span>Total</span>
              <span>₦{Number(cart.total_price || 0).toLocaleString()}</span>
            </div>
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3"
            >
              Confirm Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;