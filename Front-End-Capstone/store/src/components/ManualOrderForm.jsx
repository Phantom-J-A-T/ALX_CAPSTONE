import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ManualOrderForm({ manualItems, setManualItems, address, setAddress }) {
  const [manualOrder, setManualOrder] = useState("");
  const phone = "2347066003577";

  const handleManualOrder = (e) => {
    e.preventDefault();
    const items = manualOrder.split(",").map((name) => name.trim());
    if (items.length === 0 || items.every((i) => !i)) {
      return; // Could add a subtle toast here
    }
    setManualItems((prev) => [...prev, ...items.filter(Boolean)]);
    setManualOrder("");
  };

  const removeManualItem = (index) => {
    setManualItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleWhatsAppOrder = () => {
    if (manualItems.length === 0) return;

    const itemsList = manualItems.map((item) => `• ${item}`).join("\n");
    const message = `👑 *Special Royal Request*\n\nHello, I would like to manually request the following items:\n\n${itemsList}\n\n📍 *Delivery Address:* ${address || "Store Pickup"}\n\nPlease let me know the total cost and availability.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow-xl shadow-blue-900/5 rounded-4xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-royal-blue p-8 text-center">
          <h3 className="text-2xl font-serif text-white mb-2">Special Concierge Request</h3>
          <p className="text-blue-100 text-sm italic">Can't find what you need in the palace? Tell us here.</p>
        </div>

        <div className="p-8 space-y-8">
          <form onSubmit={handleManualOrder} className="space-y-6">
            
            {/* Item Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Items Needed</label>
              <textarea
                value={manualOrder}
                onChange={(e) => setManualOrder(e.target.value)}
                placeholder="Ex: 2 crates of eggs, 1 bottle of Hennessy VSOP..."
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-royal-gold/20 focus:border-royal-gold outline-none transition-all min-h-[100px] resize-none"
              />
              <p className="text-[10px] text-gray-400 italic px-1">Separate items with commas to add them to your list.</p>
            </div>

            {/* Address Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Delivery Destination</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter full address or leave blank for pickup..."
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-royal-gold/20 focus:border-royal-gold outline-none transition-all min-h-20 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white border-2 border-royal-blue text-royal-blue font-bold py-3 rounded-xl hover:bg-royal-blue hover:text-white transition-all duration-300 shadow-sm"
            >
              + Add to Request List
            </button>
          </form>

          {/* Dynamic Item List */}
          <AnimatePresence>
            {manualItems.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-6 border-t border-gray-100"
              >
                <h4 className="text-sm font-bold text-royal-blue mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-royal-gold text-white rounded-full flex items-center justify-center text-[10px]">{manualItems.length}</span>
                  Current Request List
                </h4>
                
                <ul className="space-y-2 mb-8">
                  {manualItems.map((item, index) => (
                    <motion.li 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      key={index} 
                      className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 group"
                    >
                      <span className="text-gray-700 font-medium">{item}</span>
                      <button
                        onClick={() => removeManualItem(index)}
                        className="text-gray-300 hover:text-red-500 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </motion.li>
                  ))}
                </ul>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center gap-3 hover:bg-[#1ebd57] transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Send Request to Store
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ManualOrderForm;