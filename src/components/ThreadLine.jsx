import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';

const ThreadLine = () => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => setPageHeight(document.documentElement.scrollHeight);
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Use a spring to smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate dynamic path based on height
  const pathD = `M 50 0 C 40 ${pageHeight * 0.2}, 60 ${pageHeight * 0.4}, 50 ${pageHeight * 0.6} S 60 ${pageHeight * 0.8}, 50 ${pageHeight}`;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden hidden md:block">
      <div className="absolute top-0 bottom-0 left-[8%] md:left-[15%] lg:left-[20%] w-px h-full">
        <svg 
          className="absolute top-0 left-[-50px] w-[100px] h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <motion.path
            d={pathD}
            fill="none"
            stroke="var(--color-thread)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{
              pathLength: shouldReduceMotion ? 1 : smoothProgress,
            }}
            initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          />
        </svg>
      </div>
    </div>
  );
};

export default ThreadLine;
