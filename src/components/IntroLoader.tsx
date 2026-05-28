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
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.05,
        filter: "blur(10px)",
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden select-none"
    >
      {/* Centered Logo Workspace */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Subtle modern background glow accent that scales up behind the logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute w-64 h-64 bg-lime-400 rounded-full blur-3xl pointer-events-none"
        />

        {/* Logo Container with 360° Rotation & Ambient Float Animations */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -360 }} // Starts rotated at -360 degrees
          animate={{ 
            opacity: 1, 
            scale: [0.3, 1.05, 1], // Clean spring pop effect
            rotate: 0,              // Unwinds perfectly to 0 (a full 360° spin)
            y: [0, -10, 0]          // Seamless ambient floating effect
          }}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },
            // Snappy spring curves for both scale and the 360 rotation
            scale: { type: "spring", damping: 15, stiffness: 90, delay: 0.1 },
            rotate: { type: "spring", damping: 14, stiffness: 70, delay: 0.1 },
            // Seamless infinite floating loop begins after the spin finishes
            y: {
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
              delay: 1.2 // Delayed slightly so the spin completes first
            }
          }}
          className="w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center relative z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.05)]"
        >
          <img 
            src={myLogo} 
            alt="App System Logo" 
            className="w-full h-full object-contain pointer-events-none"
          />
        </motion.div>
      </div>

      {/* Ultra-Minimalist Bottom Progress Loading Microbar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100 overflow-hidden">
        <motion.div 
          className="h-full bg-lime-500 rounded-r-full"
          initial={{ width: "0%", x: "-100%" }}
          animate={{ width: "100%", x: "0%" }}
          transition={{ duration: 3, ease: [0.65, 0, 0.35, 1] }}
        />
      </div>

    </motion.div>
  );
};

export default IntroLoader;