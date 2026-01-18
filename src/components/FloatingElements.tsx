import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  type: 'circle' | 'ring' | 'line' | 'dot';
  delay: number;
  duration: number;
  parallaxFactor: number;
}

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 50, damping: 30 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Generate random floating elements
    const types: FloatingElement['type'][] = ['circle', 'ring', 'line', 'dot'];
    const newElements: FloatingElement[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 10,
      type: types[Math.floor(Math.random() * types.length)],
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      parallaxFactor: Math.random() * 30 + 10,
    }));
    setElements(newElements);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  const renderElement = (element: FloatingElement) => {
    const offsetX = useTransform(smoothMouseX, (x) => x * element.parallaxFactor);
    const offsetY = useTransform(smoothMouseY, (y) => y * element.parallaxFactor);
    
    const baseStyles = {
      position: 'absolute' as const,
      left: `${element.x}%`,
      top: `${element.y}%`,
      width: element.size,
      height: element.size,
      x: offsetX,
      y: offsetY,
    };

    switch (element.type) {
      case 'circle':
        return (
          <motion.div
            key={element.id}
            style={baseStyles}
            className="rounded-full bg-primary/5 mix-blend-screen"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      
      case 'ring':
        return (
          <motion.div
            key={element.id}
            style={baseStyles}
            className="rounded-full border border-primary/10 mix-blend-screen"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );
      
      case 'line':
        return (
          <motion.div
            key={element.id}
            style={{
              ...baseStyles,
              width: element.size * 2,
              height: 1,
            }}
            className="bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            animate={{
              rotate: [0, 180],
              opacity: [0.1, 0.3, 0.1],
              scaleX: [1, 1.5, 1],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
      
      case 'dot':
        return (
          <motion.div
            key={element.id}
            style={{
              ...baseStyles,
              width: 4,
              height: 4,
            }}
            className="rounded-full bg-primary/30"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: element.duration / 2,
              delay: element.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        );
    }
  };

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      {elements.map(renderElement)}
    </div>
  );
};

export default FloatingElements;
