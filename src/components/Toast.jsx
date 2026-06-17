import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Container is rendered wherever ToastProvider is placed, but absolutely positioned inside its relative parent */}
      <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center justify-between w-full max-w-[300px] p-3 rounded-lg shadow-lg border ${
                toast.type === 'success' ? 'bg-[#E1F5EE] border-[#0F6E56] text-[#0F6E56]' :
                toast.type === 'error' ? 'bg-[#FDF3F3] border-[#A32D2D] text-[#A32D2D]' :
                'bg-white border-[#E2E2DF] text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <i className={`ti ${
                  toast.type === 'success' ? 'ti-circle-check' :
                  toast.type === 'error' ? 'ti-circle-x' :
                  'ti-info-circle'
                } text-[18px]`}></i>
                <span className="font-sans text-[13px] font-medium leading-tight">
                  {toast.message}
                </span>
              </div>
              <button 
                onClick={() => removeToast(toast.id)}
                className="ml-4 opacity-60 hover:opacity-100 transition-opacity"
              >
                <i className="ti ti-x text-[16px]"></i>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
