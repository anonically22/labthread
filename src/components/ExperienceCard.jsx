import { motion } from 'framer-motion';

const ExperienceCard = ({ title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className="bg-beige p-4 rounded-lg flex-shrink-0 w-[280px] sm:w-auto h-full transition-transform"
    >
      <h4 className="font-body font-medium text-ink text-[14px] mb-1">{title}</h4>
      <p className="text-[12px] text-steel leading-snug">{description}</p>
    </motion.div>
  );
};

export default ExperienceCard;
