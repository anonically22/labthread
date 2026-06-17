import { motion } from 'framer-motion';

const ExperienceCard = ({ title, description }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, x: 2, transition: { duration: 0.2 } }}
      className="bg-white border border-gray-200 border-l-[3px] border-l-primary p-4 rounded-r-md flex-shrink-0 w-[280px] sm:w-auto h-full hover:shadow-md transition-shadow"
    >
      <h4 className="font-semibold text-foreground text-[14px] mb-1">{title}</h4>
      <p className="text-[12px] text-gray-600 leading-snug">{description}</p>
    </motion.div>
  );
};

export default ExperienceCard;
