import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const TipCard = ({ tip, isOpen, onToggle }) => {
  return (
    <motion.div
      layout
      className="bg-white border border-[#E2E2DF] rounded-xl overflow-hidden"
    >
      <motion.div 
        className="px-5 py-4 flex justify-between items-center cursor-pointer"
        whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.5)" }}
        transition={{ duration: 0.2 }}
        onClick={onToggle}
      >
        <h3 className="font-sans font-medium text-[15px] text-foreground">
          {tip.title}
        </h3>
        <motion.i
          className="ti ti-chevron-down text-[#0F6E56] text-[18px]"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4">
              <div className="pt-3 border-t border-[#E2E2DF]">
                <div className="font-sans text-[14px] leading-[1.7] text-[#3D3D3A] prose prose-sm max-w-none">
                  <ReactMarkdown>{tip.body}</ReactMarkdown>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TipCard;
