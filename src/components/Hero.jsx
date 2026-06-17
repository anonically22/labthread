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
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center md:text-left"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight tracking-tight mb-6"
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
    </section>
  );
};

export default Hero;
