import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6"
        >
          <img src="/favicon.svg" alt="Loading..." className="w-16 h-16" />
        </motion.div>
        
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">
          LabThread
        </h1>
        <p className="text-sm font-sans text-gray-500 tracking-widest uppercase">
          - by Nupur
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
