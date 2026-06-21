import React from 'react';

export const LogoMark = ({ className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
  >
    {/* Flask outline, slightly hand-drawn feel */}
    <path 
      d="M9 3H15M10.5 3V9.5L5.5 18C4.8 19.2 5.5 21 7 21H17C18.5 21 19.2 19.2 18.5 18L13.5 9.5V3" 
      stroke="currentColor" 
    />
    {/* Thread looping around the neck */}
    <path 
      d="M8.5 7C8.5 7 10 5.5 12 5.5C14 5.5 15.5 7 15.5 7C15.5 7 14 8.5 12 8.5C10 8.5 8.5 7 8.5 7Z" 
      stroke="var(--color-thread)" 
    />
    <path 
      d="M15 7.5C16.5 8.5 19 8 21 6" 
      stroke="var(--color-thread)" 
      strokeDasharray="2 3"
    />
  </svg>
);

export const LogoWordmark = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <LogoMark className="w-7 h-7 text-ink" />
    <div className="relative font-display font-[560] text-ink leading-none mt-1">
      LabThread
      {/* Running-stitch underline beneath "Thread" */}
      <svg 
        className="absolute -bottom-1.5 right-0 w-[60%] h-1" 
        viewBox="0 0 100 10" 
        preserveAspectRatio="none"
      >
        <line 
          x1="0" y1="5" x2="100" y2="5" 
          stroke="var(--color-thread)" 
          strokeWidth="3" 
          strokeDasharray="8 8" 
          strokeLinecap="round" 
        />
      </svg>
    </div>
  </div>
);
