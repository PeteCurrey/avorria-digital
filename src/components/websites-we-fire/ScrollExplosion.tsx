'use client';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import confetti from 'canvas-confetti';

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
}

interface ScrollExplosionProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  duration?: number;
  colors?: string[];
  triggerOnce?: boolean;
  useConfetti?: boolean;
  explosionScale?: number;
}

const ScrollExplosion: React.FC<ScrollExplosionProps> = ({
  children,
  className = '',
  particleCount = 20,
  duration = 800,
  colors = ['#e879f9', '#a855f7', '#6366f1', '#f472b6', '#c084fc'],
  triggerOnce = true,
  useConfetti = false,
  explosionScale = 1.15,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: triggerOnce, amount: 0.5 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Spring animation for the "pop" effect
  const springConfig = { stiffness: 300, damping: 20, mass: 0.8 };
  const scale = useSpring(1, springConfig);
  const rotate = useSpring(0, springConfig);

  // Generate particles
  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: 50 + (Math.random() - 0.5) * 20,
        y: 50 + (Math.random() - 0.5) * 20,
        angle: Math.random() * 360,
        speed: 50 + Math.random() * 100,
        size: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.8 + Math.random() * 0.2,
      });
    }
    return newParticles;
  }, [particleCount, colors]);

  // Trigger explosion
  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
      
      // Generate particles
      setParticles(generateParticles());
      
      // Animate scale with overshoot
      scale.set(explosionScale);
      rotate.set(-2 + Math.random() * 4);
      
      setTimeout(() => {
        scale.set(1);
        rotate.set(0);
      }, 150);

      // Optional confetti burst
      if (useConfetti && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { x, y },
          colors: colors,
          disableForReducedMotion: true,
          scalar: 0.8,
          gravity: 1.2,
          ticks: 150,
        });
      }

      // Clear particles after animation
      setTimeout(() => {
        setParticles([]);
      }, duration);
    }
  }, [isInView, hasTriggered, generateParticles, scale, rotate, useConfetti, colors, duration, explosionScale]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Particles layer */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
            initial={{ 
              scale: 0, 
              opacity: particle.opacity,
              x: 0,
              y: 0,
            }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [particle.opacity, particle.opacity * 0.5, 0],
              x: Math.cos(particle.angle * Math.PI / 180) * particle.speed,
              y: Math.sin(particle.angle * Math.PI / 180) * particle.speed,
            }}
            transition={{ 
              duration: duration / 1000,
              ease: [0.4, 0, 0.2, 1],
            }}
          />
        ))}
      </div>

      {/* Glow effect */}
      {hasTriggered && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${colors[0]}40 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.3, 1.5],
          }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Main content with spring animation */}
      <motion.div
        style={{ 
          scale,
          rotate,
          transformOrigin: 'center',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Wrapper for number-specific explosion with text shadow glow
interface ExplosiveCountUpProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  glowColor?: string;
}

export const ExplosiveCountUp: React.FC<ExplosiveCountUpProps> = ({
  end,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
  glowColor = 'hsl(320, 85%, 55%)',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  const [hasExploded, setHasExploded] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth count
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        setHasExploded(true);
        
        // Trigger confetti at the element position
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;
          
          confetti({
            particleCount: 25,
            spread: 50,
            origin: { x, y },
            colors: ['#e879f9', '#a855f7', '#6366f1', '#f472b6'],
            disableForReducedMotion: true,
            scalar: 0.6,
            gravity: 1.5,
            ticks: 100,
          });
        }
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ scale: 1 }}
      animate={hasExploded ? {
        scale: [1, 1.2, 1],
        textShadow: [
          `0 0 0px ${glowColor}`,
          `0 0 30px ${glowColor}, 0 0 60px ${glowColor}`,
          `0 0 10px ${glowColor}`,
        ],
      } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        display: 'inline-block',
        textShadow: hasExploded ? `0 0 10px ${glowColor}` : 'none',
      }}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};

export default ScrollExplosion;

