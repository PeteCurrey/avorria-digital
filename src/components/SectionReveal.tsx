import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type RevealType = 'circle' | 'diagonal' | 'fade-blur' | 'wipe-up' | 'wipe-right';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  type?: RevealType;
  threshold?: number;
}

const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  type = 'fade-blur',
  threshold = 0.2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start center'],
  });

  // Different reveal styles based on type
  const getRevealStyles = () => {
    switch (type) {
      case 'circle':
        const circleProgress = useTransform(scrollYProgress, [0, 1], [0, 150]);
        return {
          clipPath: useTransform(circleProgress, (v) => `circle(${v}% at 50% 50%)`),
        };
      
      case 'diagonal':
        const diagonalProgress = useTransform(scrollYProgress, [0, 1], [-100, 0]);
        return {
          clipPath: useTransform(
            diagonalProgress,
            (v) => `polygon(0 ${100 + v}%, 100% ${v}%, 100% 100%, 0% 100%)`
          ),
        };
      
      case 'fade-blur':
        const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
        const blur = useTransform(scrollYProgress, [0, 1], [20, 0]);
        const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
        return {
          opacity,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
          y,
        };
      
      case 'wipe-up':
        const wipeUpProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
        return {
          clipPath: useTransform(
            wipeUpProgress,
            (v) => `inset(${v}% 0 0 0)`
          ),
        };
      
      case 'wipe-right':
        const wipeRightProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
        return {
          clipPath: useTransform(
            wipeRightProgress,
            (v) => `inset(0 ${v}% 0 0)`
          ),
        };
      
      default:
        return {};
    }
  };

  const revealStyles = getRevealStyles();

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        style={{
          ...revealStyles,
          willChange: 'clip-path, opacity, filter, transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SectionReveal;
