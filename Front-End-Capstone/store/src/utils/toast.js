// Simple toast notification system
const toastCallbacks = new Set();

export const subscribeToToast = (callback) => {
  toastCallbacks.add(callback);
  return () => toastCallbacks.delete(callback);
};

export const showToast = (message, type = 'info', duration = 3000) => {
  const id = Date.now();
  
  toastCallbacks.forEach(callback => {
    callback({ id, message, type, duration });
  });

  if (duration > 0) {
    setTimeout(() => {
      toastCallbacks.forEach(callback => {
        callback({ id, remove: true });
      });
    }, duration);
  }
};

export const toast = {
  success: (message, duration) => showToast(message, 'success', duration),
  error: (message, duration) => showToast(message, 'error', duration),
  info: (message, duration) => showToast(message, 'info', duration),
  warning: (message, duration) => showToast(message, 'warning', duration),
};
