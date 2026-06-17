import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-gray-200 mt-auto text-foreground font-sans">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 mb-20">
          
          {/* Logo & Description */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-3 text-2xl font-serif font-bold text-primary mb-8">
              <motion.img 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                src="/favicon.svg" alt="LabThread Logo" className="w-8 h-8" 
              />
              <span>LabThread</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Mapping the architecture of biotechnology. We explore biological systems to reveal insights, techniques, and scientific integrity.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex gap-16 md:gap-24 text-sm">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-foreground font-semibold">Quick Links</h3>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link to="/blog" className="text-gray-500 hover:text-primary transition-colors">Blog Archive</Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link to="/tips" className="text-gray-500 hover:text-primary transition-colors">Lab Tips</Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link to="/ask" className="text-gray-500 hover:text-primary transition-colors">Ask Nupur</Link>
              </motion.div>
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-foreground font-semibold">Others</h3>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link to="/admin" className="text-gray-500 hover:text-primary transition-colors">Admin Panel</Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link to="/privacy" className="text-gray-500 hover:text-primary transition-colors">Privacy Policy</Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Link to="/terms" className="text-gray-500 hover:text-primary transition-colors">Terms of Service</Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-gray-200 gap-6">
          
          {/* Left: Copyright */}
          <div className="flex flex-col gap-4 text-sm text-gray-500">
            <div className="flex items-center flex-wrap gap-2">
              &copy; {new Date().getFullYear()}  LabThread              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                Crafted with 
                <motion.svg 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-4 h-4 text-red-500 mx-1" fill="currentColor" viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </motion.svg>
                by Anonical22(aka Anirbaan)
              </span>
            </div>
          </div>

          {/* Right: Status Pill and Socials */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-gray-400">
              <motion.a whileHover={{ scale: 1.1, color: "#1DA1F2" }} href="#" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, color: "#0A66C2" }} href="#" aria-label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, color: "#333333" }} href="#" aria-label="GitHub">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </motion.a>
            </div>
            
            <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm text-xs text-gray-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Build : V0.2</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
