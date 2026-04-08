'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageLoaderProps {
  onComplete: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    // Check if already shown this session
    const hasShown = sessionStorage.getItem('avorria-loader-shown');
    if (hasShown) {
      setShouldShow(false);
      onComplete();
      return;
    }

    // Simulate loading progress - slower for premium feel
    const duration = 3500; // 3.5 seconds for premium pacing
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      // Ease-out progress curve for premium feel
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - linearProgress, 2);
      const newProgress = easedProgress * 100;
      setProgress(newProgress);
      
      if (linearProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% briefly before fade out
        setTimeout(() => {
          setIsComplete(true);
          sessionStorage.setItem('avorria-loader-shown', 'true');
          // Longer fade out duration
          setTimeout(() => {
            onComplete();
          }, 1000);
        }, 400);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [onComplete]);

  if (!shouldShow) return null;

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const letters = 'AVORRIA'.split('');

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
          }}
        >

          {/* Logo text - matching AnimatedLogo style with sliding dot */}
          <div className="relative mb-12">
            <span className="text-4xl md:text-5xl font-extralight tracking-wider text-white flex items-baseline">
              {/* Initial "A" - always visible */}
              <span className="inline-block align-baseline">A</span>
              
              {/* Rest of the letters fade in with clip-path for clean reveal */}
              <motion.span
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                transition={{ 
                  delay: 0.4,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="inline-block align-baseline"
              >
                vorria
              </motion.span>
              
              {/* Animated pink dot - slides from left position to final position */}
              <motion.span
                initial={{ marginLeft: "-4.2ch" }}
                animate={{ marginLeft: "0ch" }}
                whileHover={{ 
                  scale: [1, 1.3, 1],
                  transition: { duration: 0.4, ease: "easeInOut" }
                }}
                transition={{ 
                  delay: 0.3,
                  duration: 0.7,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="text-pink-500 font-bold inline-block align-baseline"
              >
                .
              </motion.span>
            </span>
          </div>

          {/* Progress bar - pink themed */}
          <div className="relative w-48 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-pink-500 to-pink-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </div>

          {/* Progress percentage */}
          <motion.span
            className="mt-4 text-sm font-mono text-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {Math.round(progress)}%
          </motion.span>

          {/* Tagline */}
          <motion.p
            className="absolute bottom-12 text-sm text-white/30 tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            Digital Excellence
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;

