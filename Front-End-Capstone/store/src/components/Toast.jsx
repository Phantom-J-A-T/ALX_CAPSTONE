import React, { useState, useEffect } from 'react';
import { subscribeToToast } from '../utils/toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToToast((notification) => {
      if (notification.remove) {
        setToasts(prev => prev.filter(t => t.id !== notification.id));
      } else {
        setToasts(prev => [...prev, notification]);
      }
    });

    return unsubscribe;
  }, []);

  const getStyles = (type) => {
    const styles = {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
      warning: 'bg-yellow-500 text-gray-900',
    };
    return styles[type] || styles.info;
  };

  return (
    <div className="fixed bottom-6 right-6 z-9999 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`mb-3 px-4 py-3 rounded-lg shadow-lg ${getStyles(toast.type)} pointer-events-auto max-w-sm`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
