import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSettings } from '../utils/settingsStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const underlineVariants = {
  hidden: { width: 0 },
  visible: { 
    width: "100%",
    transition: { duration: 0.8, delay: 0.5, ease: "easeInOut" }
  }
};

const Hero = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  if (!settings) return null;

  return (
    <section className="relative pt-8 pb-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto min-h-[calc(100vh-120px)] flex items-center">
      {/* Playful background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-12 left-8 md:left-20 text-primary/10"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15 9h8l-6 5 2 8-7-5-7 5 2-8-6-5h8z"/></svg>
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-12 md:right-32 text-blue-400/10"
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
        </motion.div>

        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-24 left-1/3 text-green-500/10"
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 3h18v18H3zM12 8v8m-4-4h8"/></svg>
        </motion.div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left flex-1"
        >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight tracking-tight mb-6"
        >
          {settings.siteTagline.split('science').map((part, index, array) => (
            <span key={index}>
              {part}
              {index < array.length - 1 && (
                <span className="relative inline-block text-primary whitespace-nowrap">
                  science
                  <motion.span
                    variants={underlineVariants}
                    className="absolute -bottom-1 left-0 h-1 bg-primary/20 rounded-full"
                  />
                </span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 font-sans max-w-2xl mb-10 leading-relaxed mx-auto md:mx-0"
        >
          {settings.heroSubtext}
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
            {settings.heroStat1}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
            {settings.heroStat2}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
            {settings.heroStat3}
          </div>
        </motion.div>
        </motion.div>

        {/* Right side image */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto"
        >
          <motion.img 
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/doodle.png" 
            alt="Hero Doodle" 
            className="w-full h-auto object-contain drop-shadow-sm grayscale hover:grayscale-0 transition-all duration-500"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
