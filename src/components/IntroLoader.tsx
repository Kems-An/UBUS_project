import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
// Import your custom logo image file here
import myLogo from "../assets/images/logo.png"; 

interface IntroLoaderProps {
  onComplete: () => void;
}

const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 overflow-hidden select-none"
    >
      {/* Soft Ambient Dynamic Mesh Background - Optimized size for Mobile Viewports */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 15, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[100vw] h-[100vw] sm:w-[80vw] sm:h-[80vw] bg-lime-500/10 rounded-full blur-[80px] sm:blur-[120px]"
        />
        <motion.div 
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/4 -right-1/4 w-[90vw] h-[90vw] sm:w-[70vw] sm:h-[70vw] bg-emerald-500/10 rounded-full blur-[90px] sm:blur-[140px]"
        />
      </div>

      {/* Main Workspace */}
      <div className="relative flex flex-col items-center justify-center z-10 px-4">
        
        {/* Kinetic Energy Rings - Styled with responsive width/height */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ 
              opacity: [0, 0.3, 0], 
              scale: [0.5, 1.5],
            }}
            transition={{ 
              duration: 2, 
              ease: "easeOut", 
              repeat: Infinity,
              delay: i * 0.8 
            }}
            className="absolute w-36 h-36 sm:w-52 sm:h-52 border border-lime-500/20 rounded-full pointer-events-none"
          />
        ))}

        {/* Mask Reveal Logo Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="relative"
        >
          {/* Smooth Continuous Floating Container - Perfectly proportioned for Mobile */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
            className="w-28 h-28 sm:w-40 sm:h-40 flex items-center justify-center backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
          >
            <img 
              src={myLogo} 
              alt="App System Logo" 
              className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_12px_rgba(163,230,53,0.15)]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Velvet Subtle Micro Progress Indicator - Clean placement on mobile web viewports */}
      <div className="absolute bottom-16 sm:bottom-12 flex flex-col items-center gap-2 z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] sm:text-xs font-medium tracking-[0.25em] sm:tracking-[0.3em] text-slate-400 uppercase"
        >
          Loading Platform
        </motion.span>
        <div className="w-24 sm:w-32 h-[2px] bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-lime-500 to-emerald-400 rounded-full"
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
          />
        </div>
      </div>

    </motion.div>
  );
};

export default IntroLoader;