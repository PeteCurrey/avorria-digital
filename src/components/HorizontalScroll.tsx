'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className = '',
  speed = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // State for dimensions and mobile detection
  const [scrollWidth, setScrollWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ALL hooks must be called unconditionally at top level
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate max scroll (guard against division by zero)
  const maxScroll = Math.max(0, scrollWidth - containerWidth);
  
  // Create the transform and spring unconditionally
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxScroll * speed]);
  const x = useSpring(rawX, { stiffness: 100, damping: 30 });

  // Progress indicator width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Check for mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Update dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (scrollRef.current && containerRef.current) {
        setScrollWidth(scrollRef.current.scrollWidth);
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Re-check after images load
    const timer = setTimeout(updateDimensions, 500);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, [children]);

  // Calculate container height based on scroll distance + viewport
  // This ensures the "pinned" section lasts long enough to feel natural
  const calculatedHeight = containerWidth > 0 
    ? Math.max(100, (scrollWidth / containerWidth) * 120 + 50) 
    : 100;

  // Conditional rendering
  if (isMobile) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex gap-6 pb-4" ref={scrollRef}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        height: `${calculatedHeight}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          ref={scrollRef}
          className="flex items-center h-full gap-12 px-[10vw]"
          style={{ x }}
        >
          {React.Children.map(children, (child, index) => (
            <motion.div
              style={{
                // Subtle staggered entry/exit opacity for cards
                opacity: useTransform(
                  scrollYProgress,
                  [
                    index / (React.Children.count(children)), 
                    (index + 0.5) / (React.Children.count(children)), 
                    (index + 1) / (React.Children.count(children))
                  ],
                  [0.4, 1, 0.4]
                ),
                scale: useTransform(
                  scrollYProgress,
                  [
                    index / (React.Children.count(children)), 
                    (index + 0.5) / (React.Children.count(children)), 
                    (index + 1) / (React.Children.count(children))
                  ],
                  [0.9, 1, 0.9]
                ),
              }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
