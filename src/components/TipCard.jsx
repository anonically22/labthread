import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const TipCard = ({ tip, isOpen, onToggle }) => {
  return (
    <motion.div
      className={`bg-paper border transition-colors duration-200 overflow-hidden rounded-lg ${isOpen ? 'border-thread' : 'border-steel/20 hover:border-thread'}`}
    >
      <motion.div 
        className="px-5 py-4 flex justify-between items-start cursor-pointer"
        onClick={onToggle}
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-steel mb-1">PRINCIPLE</div>
          <h3 className="font-body font-medium text-[15px] text-ink">
            {tip.title}
          </h3>
        </div>
        <motion.div
          className="text-thread mt-2 flex-shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
        </motion.div>
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
            <div className="px-5 pb-4 pt-1">
              <div className="font-body text-[14px] leading-[1.65] text-ink">
                <ReactMarkdown>{tip.body}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TipCard;
