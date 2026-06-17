import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllTips } from '../utils/tipsStore';
import TipCard from '../components/TipCard';

const Tips = () => {
  const [tips, setTips] = useState([]);
  const [openCardsByCategory, setOpenCardsByCategory] = useState({});

  useEffect(() => {
    setTips(getAllTips());
  }, []);

  // Group tips by category
  const groupedTips = tips.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category].push(tip);
    return acc;
  }, {});

  const categories = Object.keys(groupedTips);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleToggle = (category, tipId) => {
    setOpenCardsByCategory(prev => ({
      ...prev,
      [category]: prev[category] === tipId ? null : tipId
    }));
  };

  return (
    <div className="min-h-screen pb-20 pt-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center md:text-left mb-8">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-3">
            Email tips
          </h1>
          <p className="text-muted font-sans text-base">
            Practical guidance on the emails that matter most in a research career.
          </p>
        </div>

        <div className="bg-[#F0FBF7] border-l-[3px] border-[#0F6E56] rounded-lg py-3.5 px-4 mb-10">
          <p className="font-sans text-[13px] text-[#1A3D30]">
            These tips come from real experience navigating internship applications, PI outreach, and research programs. They are not templates — they are principles.
          </p>
        </div>

        {tips.length === 0 ? (
          <div className="text-center text-muted font-sans mt-20">
            No tips yet. Check back soon.
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {categories.map((category) => (
              <div key={category} className="mb-8">
                <h2 className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#0F6E56] mb-3 mt-8">
                  {category}
                </h2>
                <div className="flex flex-col gap-3">
                  {groupedTips[category].map((tip) => (
                    <motion.div key={tip.id} variants={itemVariants}>
                      <TipCard 
                        tip={tip} 
                        isOpen={openCardsByCategory[category] === tip.id}
                        onToggle={() => handleToggle(category, tip.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Tips;
