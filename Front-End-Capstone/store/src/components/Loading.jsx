import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const messages = [
  "Selecting the freshest harvest...",
  "Inspecting the vintage wines...",
  "Testing the appliance circuits...",
  "Chilling the beverages to perfection...",
  "Curating your royal pantry..."
];

function Loading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-[#FAF9F6]">
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="mb-8"
      >
        <img 
          src="/Logo.png" 
          alt="Loading" 
          className="h-32 w-auto drop-shadow-xl"
        />
      </motion.div>

      {/* Rotating Message Logic */}
      <div className="h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messages[index]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-royal-blue font-serif italic text-lg tracking-wide"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden">
        <motion.div 
          className="h-full bg-royal-gold"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

export default Loading;