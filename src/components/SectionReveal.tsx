'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

type RevealType = 'circle' | 'diagonal' | 'fade-blur' | 'wipe-up' | 'wipe-right';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  type?: RevealType;
}

const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  type = 'fade-blur',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start center'],
  });

  // ALL transforms defined unconditionally at top level (Rules of Hooks)
  
  // Circle reveal transforms
  const circleProgress = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const circleClipPath = useTransform(circleProgress, (v) => `circle(${v}% at 50% 50%)`);
  
  // Diagonal reveal transforms
  const diagonalProgress = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const diagonalClipPath = useTransform(
    diagonalProgress,
    (v) => `polygon(0 ${100 + v}%, 100% ${v}%, 100% 100%, 0% 100%)`
  );
  
  // Fade-blur transforms
  const fadeOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const fadeBlur = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const fadeFilter = useTransform(fadeBlur, (v) => `blur(${v}px)`);
  const fadeY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  
  // Wipe-up transforms
  const wipeUpProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const wipeUpClipPath = useTransform(wipeUpProgress, (v) => `inset(${v}% 0 0 0)`);
  
  // Wipe-right transforms
  const wipeRightProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const wipeRightClipPath = useTransform(wipeRightProgress, (v) => `inset(0 ${v}% 0 0)`);

  // Select the appropriate style based on type (no hooks here, just object selection)
  const getRevealStyles = (): Record<string, MotionValue<string | number>> => {
    switch (type) {
      case 'circle':
        return { clipPath: circleClipPath };
      case 'diagonal':
        return { clipPath: diagonalClipPath };
      case 'fade-blur':
        return { opacity: fadeOpacity, filter: fadeFilter, y: fadeY };
      case 'wipe-up':
        return { clipPath: wipeUpClipPath };
      case 'wipe-right':
        return { clipPath: wipeRightClipPath };
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

