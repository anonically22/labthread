import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getSettings } from '../utils/settingsStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
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
  hidden: { width: 0, opacity: 0 },
  visible: { 
    width: "100%",
    opacity: 1,
    transition: { duration: 0.6, delay: 0.4, ease: "easeInOut" }
  }
};

const Hero = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  if (!settings) return null;

  return (
    <section className="relative w-full pt-16 pb-12 overflow-hidden bg-paper">

      <div className="max-w-[1120px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between z-10 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left flex-1"
        >
        <motion.h1 
          variants={itemVariants}
          className="text-[38px] md:text-[64px] font-display font-[520] text-ink leading-[1.05] tracking-tight mb-8"
        >
          {settings.siteTagline.split('science').map((part, index, array) => (
            <span key={index}>
              {part}
              {index < array.length - 1 && (
                <span className="relative inline-block text-thread whitespace-nowrap px-1">
                  science
                  <motion.svg
                    variants={underlineVariants}
                    className="absolute -bottom-2 left-0 h-1.5"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 10"
                  >
                    <line 
                      x1="0" y1="5" x2="100" y2="5" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeDasharray="6 6" 
                      strokeLinecap="round" 
                    />
                  </motion.svg>
                </span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-base md:text-[17px] text-steel font-body max-w-2xl mb-12 leading-[1.65] mx-auto md:mx-0"
        >
          {settings.heroSubtext}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col gap-3 font-mono text-[14px] text-steel">
          <div className="flex items-center gap-3">
            <span className="w-[12px] h-[2px] bg-thread"></span>
            <span>GATE BT & XL '25 Qualified</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-[12px] h-[2px] bg-thread"></span>
            <span>Former Summer Research Intern @ IISER</span>
          </div>
        </motion.div>
        </motion.div>

        {/* Right side image */}
        <motion.div
          variants={itemVariants}
          className="flex-1 w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto relative z-10"
        >
          <motion.img 
            src="/doodle.png" 
            alt="Hero Doodle" 
            className="w-full h-auto object-contain drop-shadow-sm grayscale"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
