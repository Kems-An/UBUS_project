import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck } from 'lucide-react'; 

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
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Bus Icon - Moves UP */}
        <motion.div
          initial={{ y: 0, opacity: 0, scale: 0.5 }}
          animate={{ y: -50, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-lime-600"
        >
          <Truck size={140} strokeWidth={1.5} />
        </motion.div>

        {/* Text - Moves DOWN */}
        <motion.h1
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: 50, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-7xl font-black tracking-tighter text-slate-900 italic"
        >
          UBUS
        </motion.h1>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 h-1.5 bg-lime-500"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 3, ease: "linear" }}
      />
    </motion.div>
  );
};

export default IntroLoader;