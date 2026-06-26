import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_AUTHOR_DATA } from '../data/authorData';
import ExperienceCard from './ExperienceCard';
import profileImage from '../assets/profile.png';

import profileImage2 from '../assets/profile2.jpg';

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
    setAuthorData(DEFAULT_AUTHOR_DATA);
  }, []);

  if (!authorData) return null;

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="py-20 bg-paper border-t border-steel/20"
    >
      <div className="max-w-[1120px] mx-auto px-4 md:px-8">
        <div className="relative">
          <motion.h2 
            variants={itemVariants}
            className="text-[28px] md:text-[36px] font-display font-[500] text-ink mb-12 text-center md:text-left"
          >
            About the author
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          {/* LEFT — Avatar block */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center md:items-start md:w-1/3 flex-shrink-0"
          >
            <motion.img 
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={profileImage} 
              alt={authorData.name} 
              className="w-40 h-40 rounded-full object-cover shadow-sm mb-4"
            />
            <div className="font-mono text-[12.5px] uppercase tracking-wider text-steel mb-2 text-center md:text-left">
              {authorData.currentStatus}
            </div>
            <h3 className="text-[28px] md:text-[36px] font-display font-[500] text-ink mb-4">
              {authorData.name}
            </h3>
            
            <div className="flex gap-4 text-gray-500">
              <motion.a whileHover={{ scale: 1.2, color: "#0077b5" }} href={authorData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#21759b" }} href={authorData.wordpress} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="WordPress">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#000000" }} href={authorData.medium} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Medium">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4 4h16v16H4z" rx="2" ry="2"></path><path d="M8 9h1l3 3 3-3h1"></path><path d="M8 15h2"></path><path d="M14 15h2"></path><path d="M9 9v6"></path><path d="M15 9v6"></path></svg>
              </motion.a>
            </div>
          </motion.div>

          {/* RIGHT — Bio text */}
          <div className="md:w-2/3">
            <motion.div variants={itemVariants} className="text-gray-600 font-sans leading-relaxed space-y-4 mb-8">
              {authorData.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="font-mono text-[12.5px] uppercase tracking-wider text-steel mb-4">
                Notable experiences
              </h4>
              
              <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 snap-x items-stretch">
                {authorData.notableExperiences.map((exp) => (
                  <div key={exp.id} className="snap-start h-full">
                    <ExperienceCard title={exp.title} description={exp.description} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Technical Partner / subtle addition */}
        {authorData.techPartner && (
          <motion.div variants={itemVariants} className="mt-20 pt-16 border-t border-steel/20 flex flex-col md:flex-row gap-10 lg:gap-16">
            {/* LEFT — Avatar block */}
            <div className="flex flex-col items-center md:items-start md:w-1/3 flex-shrink-0">
              <motion.img 
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={profileImage2} 
                alt={authorData.techPartner.name} 
                className="w-32 h-32 rounded-full object-cover shadow-sm mb-4"
              />
              <div className="font-mono text-[12.5px] uppercase tracking-wider text-steel mb-2 text-center md:text-left">
                {authorData.techPartner.role}
              </div>
              <h3 className="text-[28px] md:text-[36px] font-display font-[500] text-ink mb-4">
                {authorData.techPartner.name}
              </h3>
              
              <div className="flex gap-4 text-gray-500">
                <motion.a whileHover={{ scale: 1.2, color: "#0077b5" }} href={authorData.techPartner.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </motion.a>
                <motion.a whileHover={{ scale: 1.2, color: "var(--color-ink)" }} href={authorData.techPartner.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Portfolio">
                  <svg className="w-5 h-5" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M107.101 168.687C118.082 157.255 256.31 151.969 252.14 172.866C247.027 198.491 102.166 182.447 94.407 182.447C88.2106 182.447 94.5232 334.148 107.101 346.756C108.588 348.246 231.876 348.881 234.261 344.101C242.574 327.431 248.45 210.513 251.48 180.169" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M246.675 214.238C323.958 159.188 331.525 306.533 249.335 279.018" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M147.065 193.468C143.152 199.487 143.999 208.288 147.87 214.329" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M122.05 256.052C125.808 289.977 109.681 283.586 144.591 290.259C148.148 290.937 166.808 295.215 169.826 292.945C170.953 292.095 176.903 247.905 173.376 244.366C167.956 238.926 157.262 221.545 150.327 218.501C144.749 220.708 119.628 234.184 122.05 256.052Z" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
                    <path opacity="0.503384" d="M117.473 65.5171C80.9016 86.5138 135.878 103.103 129.295 122.941C126.601 131.065 117.091 135.623 114.191 143.4" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
                    <path opacity="0.503384" d="M170.14 53C137.983 74.1413 196.968 94.2542 187.142 118.268C181.505 132.044 146.471 131.308 168.832 147.572" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
                    <path opacity="0.503384" d="M236.939 64.126C201.197 77.3039 248.425 102.89 225.265 125.32" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
                {authorData.techPartner.github && (
                  <motion.a whileHover={{ scale: 1.2, color: "var(--color-ink)" }} href={authorData.techPartner.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </motion.a>
                )}
              </div>
            </div>
            
            {/* RIGHT - Bio */}
            <div className="md:w-2/3">
              <div className="text-gray-600 font-sans leading-relaxed space-y-4 mb-8">
                {authorData.techPartner.bio.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {authorData.techPartner.notableExperiences && authorData.techPartner.notableExperiences.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-mono text-[12.5px] uppercase tracking-wider text-steel mb-4">
                    Notable experiences
                  </h4>
                  
                  <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 snap-x items-stretch">
                    {authorData.techPartner.notableExperiences.map((exp) => (
                      <div key={exp.id} className="snap-start h-full">
                        <ExperienceCard title={exp.title} description={exp.description} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default AboutAuthor;
