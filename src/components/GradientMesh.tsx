'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

interface GradientMeshProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

const GradientMesh: React.FC<GradientMeshProps> = ({
  className = '',
  colors = [
    'hsl(var(--primary))',
    'hsl(var(--primary) / 0.6)',
    'hsl(280, 80%, 50%)',
    'hsl(var(--primary) / 0.3)',
  ],
  speed = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animated values for blob positions
  const blob1X = useMotionValue(20);
  const blob1Y = useMotionValue(20);
  const blob2X = useMotionValue(80);
  const blob2Y = useMotionValue(30);
  const blob3X = useMotionValue(50);
  const blob3Y = useMotionValue(70);
  const blob4X = useMotionValue(30);
  const blob4Y = useMotionValue(80);

  // Smooth spring for mouse interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 30 });

  useEffect(() => {
    // Animate blobs in circular/organic patterns
    const animations = [
      animate(blob1X, [20, 30, 25, 15, 20], {
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob1Y, [20, 35, 25, 15, 20], {
        duration: speed * 1.1,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob2X, [80, 70, 85, 75, 80], {
        duration: speed * 0.9,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob2Y, [30, 20, 40, 35, 30], {
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob3X, [50, 60, 45, 55, 50], {
        duration: speed * 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob3Y, [70, 60, 75, 65, 70], {
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob4X, [30, 40, 25, 35, 30], {
        duration: speed * 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(blob4Y, [80, 70, 85, 75, 80], {
        duration: speed * 1.1,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
    ];

    return () => animations.forEach((anim) => anim.stop());
  }, [speed, blob1X, blob1Y, blob2X, blob2Y, blob3X, blob3Y, blob4X, blob4Y]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform blob positions with mouse influence
  const blob1XFinal = useTransform([blob1X, smoothMouseX], ([x, mx]: number[]) => `${x + mx}%`);
  const blob1YFinal = useTransform([blob1Y, smoothMouseY], ([y, my]: number[]) => `${y + my}%`);
  const blob2XFinal = useTransform([blob2X, smoothMouseX], ([x, mx]: number[]) => `${x - mx * 0.5}%`);
  const blob2YFinal = useTransform([blob2Y, smoothMouseY], ([y, my]: number[]) => `${y - my * 0.5}%`);
  const blob3XFinal = useTransform([blob3X, smoothMouseX], ([x, mx]: number[]) => `${x + mx * 0.3}%`);
  const blob3YFinal = useTransform([blob3Y, smoothMouseY], ([y, my]: number[]) => `${y + my * 0.3}%`);
  const blob4XFinal = useTransform([blob4X, smoothMouseX], ([x, mx]: number[]) => `${x - mx * 0.7}%`);
  const blob4YFinal = useTransform([blob4Y, smoothMouseY], ([y, my]: number[]) => `${y - my * 0.7}%`);

  const blobs = [
    { x: blob1XFinal, y: blob1YFinal, color: colors[0], size: '40%' },
    { x: blob2XFinal, y: blob2YFinal, color: colors[1], size: '35%' },
    { x: blob3XFinal, y: blob3YFinal, color: colors[2], size: '45%' },
    { x: blob4XFinal, y: blob4YFinal, color: colors[3], size: '30%' },
  ];

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ filter: 'blur(80px)' }}
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            transform: 'translate(-50%, -50%)',
            opacity: 0.6,
            willChange: 'left, top',
          }}
        />
      ))}
    </div>
  );
};

export default GradientMesh;

