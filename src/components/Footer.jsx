import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-paper border-t border-steel/20 mt-auto text-ink font-mono relative overflow-hidden flex flex-col">
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-16 pb-48 md:pb-64 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 h-full">
          
          {/* Col 1 */}
          <div className="flex flex-col justify-between h-full gap-24">
            <div className="flex flex-col gap-6 max-w-sm">
              <h2 className="text-[28px] md:text-[32px] font-mono font-medium text-ink leading-tight uppercase">
                Mapping the architecture of biotechnology. Let's talk
              </h2>
              <Link to="/ask" className="text-[13px] uppercase tracking-wider text-ink font-medium hover:text-thread transition-colors inline-block pb-1 border-b border-ink hover:border-thread self-start">
                Ask a question &rarr;
              </Link>
            </div>

            <div className="flex flex-col gap-3 text-[13px] text-ink uppercase tracking-wider font-medium">
              <Link to="/blog" className="hover:text-thread transition-colors">Blog</Link>
              <Link to="/tips" className="hover:text-thread transition-colors">Tips</Link>
              <Link to="/ask" className="hover:text-thread transition-colors">Ask</Link>
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col justify-between h-full gap-24 md:items-center">
            <div className="text-[12px] uppercase tracking-wider text-ink flex items-center gap-2 self-start md:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-ink"></span>
              NUPUR PAL
            </div>

            <div className="flex flex-col gap-3 text-[13px] text-ink uppercase tracking-wider font-medium self-start md:self-auto">
              <a href="https://www.linkedin.com/in/nupurpal" target="_blank" rel="noopener noreferrer" className="hover:text-thread transition-colors">LinkedIn</a>
              <a href="https://hyompora.wordpress.com" target="_blank" rel="noopener noreferrer" className="hover:text-thread transition-colors">WordPress</a>
              <a href="https://medium.com/@nupurpal1705/list/my-external-work-c05fe99c4132" target="_blank" rel="noopener noreferrer" className="hover:text-thread transition-colors">Medium</a>
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col justify-between h-full gap-24 md:items-end">
            <div className="text-[12px] uppercase tracking-wider text-ink flex items-center gap-2 self-start md:self-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-ink"></span>
              ANIRBAAN SARKAR
            </div>

            <div className="flex flex-col gap-3 text-[13px] text-ink uppercase tracking-wider font-medium self-start md:self-auto">
              <a href="https://www.linkedin.com/in/anirbaan-sarkar" target="_blank" rel="noopener noreferrer" className="hover:text-thread transition-colors">LinkedIn</a>
              <a href="https://anirbaansarkar.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-thread transition-colors">Portfolio</a>
              <a href="https://github.com/anonically22" target="_blank" rel="noopener noreferrer" className="hover:text-thread transition-colors">GitHub</a>
            </div>
          </div>

        </div>
      </div>

      {/* Huge Typography */}
      <div className="absolute bottom-6 left-0 w-full overflow-hidden pointer-events-none flex justify-center">
        <div className="text-[14vw] font-display font-[500] text-ink leading-[0.75] tracking-tighter translate-y-[15%] text-center whitespace-nowrap">
          LABTHREAD
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-ink text-paper py-4 px-4 md:px-8 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider relative z-20 flex flex-col md:flex-row justify-between items-center w-full gap-4">
        <div className="flex gap-4">
          <span>&copy; {new Date().getFullYear()} . ALL RIGHTS RESERVED.</span>
          <Link to="/privacy" className="hidden lg:block hover:text-thread transition-colors">PRIVACY POLICY</Link>
          <Link to="/terms" className="hidden lg:block hover:text-thread transition-colors">TERMS OF SERVICE</Link>
        </div>
        <div className="flex items-center gap-1">
          Crafted with 
          <svg className="w-3 h-3 text-thread mx-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          by 
          <a href="https://anirbaansarkar.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-thread transition-colors ml-1 flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M107.101 168.687C118.082 157.255 256.31 151.969 252.14 172.866C247.027 198.491 102.166 182.447 94.407 182.447C88.2106 182.447 94.5232 334.148 107.101 346.756C108.588 348.246 231.876 348.881 234.261 344.101C242.574 327.431 248.45 210.513 251.48 180.169" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M246.675 214.238C323.958 159.188 331.525 306.533 249.335 279.018" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M147.065 193.468C143.152 199.487 143.999 208.288 147.87 214.329" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M122.05 256.052C125.808 289.977 109.681 283.586 144.591 290.259C148.148 290.937 166.808 295.215 169.826 292.945C170.953 292.095 176.903 247.905 173.376 244.366C167.956 238.926 157.262 221.545 150.327 218.501C144.749 220.708 119.628 234.184 122.05 256.052Z" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round"/>
              <path opacity="0.503384" d="M117.473 65.5171C80.9016 86.5138 135.878 103.103 129.295 122.941C126.601 131.065 117.091 135.623 114.191 143.4" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
              <path opacity="0.503384" d="M170.14 53C137.983 74.1413 196.968 94.2542 187.142 118.268C181.505 132.044 146.471 131.308 168.832 147.572" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
              <path opacity="0.503384" d="M236.939 64.126C201.197 77.3039 248.425 102.89 225.265 125.32" stroke="currentColor" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Anonical22
          </a>
        </div>
        <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-thread transition-colors">
          BACK TO TOP
        </button>
      </div>
    </footer>
  );
};

export default Footer;
