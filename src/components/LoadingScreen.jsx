import { motion } from 'framer-motion';
import { LogoMark } from './Logo';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 bg-paper flex flex-col items-center justify-center z-50 font-body"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <LogoMark className="w-16 h-16 text-ink" />
        </motion.div>
        
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-display font-[500] text-ink tracking-tight">
            LabThread
          </h1>
          <div className="flex items-center gap-2">
            <motion.div 
              className="h-1 bg-thread rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
