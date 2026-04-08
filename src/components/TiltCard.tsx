'use client';
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareOpacity?: number;
  perspective?: number;
  disabled?: boolean;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltAmount = 10,
  glareOpacity = 0.15,
  perspective = 1000,
  disabled = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);
  
  // Glare position
  const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
        
        {/* Glare overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
          style={{
            opacity: isHovered ? glareOpacity : 0,
            background: useTransform(
              [glareX, glareY],
              ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`
            ),
            transition: 'opacity 0.3s ease',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;


