import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAuthorData } from '../utils/authorStore';
import ExperienceCard from './ExperienceCard';
import profileImage from '../assets/profile.png';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const AboutAuthor = () => {
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    setAuthorData(getAuthorData());
  }, []);

  if (!authorData) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-serif font-bold text-foreground mb-12 text-center md:text-left"
        >
          About the author
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          {/* LEFT — Avatar block */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center md:items-start md:w-1/3 flex-shrink-0"
          >
            <img 
              src={profileImage} 
              alt={authorData.name} 
              className="w-24 h-24 rounded-full object-cover shadow-sm mb-4"
            />
            <h3 className="text-[15px] font-medium font-sans text-foreground mb-2">
              {authorData.name}
            </h3>
            <div className="bg-primary-light text-primary text-xs font-medium px-3 py-1 rounded-full mb-4 text-center md:text-left">
              {authorData.currentStatus}
            </div>
            
            <div className="flex gap-4 text-gray-500">
              <a href={authorData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href={authorData.wordpress} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="WordPress">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </a>
              <a href={authorData.medium} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Medium">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 4h16v16H4z" rx="2" ry="2"></path><path d="M8 9h1l3 3 3-3h1"></path><path d="M8 15h2"></path><path d="M14 15h2"></path><path d="M9 9v6"></path><path d="M15 9v6"></path></svg>
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Bio text */}
          <div className="md:w-2/3">
            <motion.div variants={itemVariants} className="text-gray-600 font-sans leading-relaxed space-y-4 mb-8">
              <p>{authorData.bio1}</p>
              <p>{authorData.bio2}</p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Notable experiences
              </h4>
              
              <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 snap-x">
                {authorData.notableExperiences.map((exp) => (
                  <div key={exp.id} className="snap-start">
                    <ExperienceCard title={exp.title} description={exp.description} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutAuthor;
