import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoWordmark } from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tips', path: '/tips' },
    { name: 'Ask', path: '/ask' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-steel/20">
      <div className="max-w-[1120px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20 border-b border-steel/10">
          <div className="flex items-center">
            <motion.div className="flex-shrink-0" whileHover={{ scale: 1.02 }}>
              <Link to="/">
                <LogoWordmark className="text-2xl" />
              </Link>
            </motion.div>
          </div>
          <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
            {navLinks.map((link) => (
              <motion.div key={link.name} whileHover={{ y: -1 }} whileTap={{ y: 0 }}>
                <Link
                  to={link.path}
                  className="inline-flex items-center text-[12.5px] font-mono tracking-wider uppercase text-steel hover:text-ink transition-colors h-full py-2"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded text-steel hover:text-ink focus:outline-none focus:ring-2 focus:ring-inset focus:ring-thread"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close icon */}
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="sm:hidden overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block pl-3 pr-4 py-3 border-l-2 border-transparent text-sm font-mono tracking-wider uppercase text-steel hover:bg-beige/50 hover:border-thread transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
