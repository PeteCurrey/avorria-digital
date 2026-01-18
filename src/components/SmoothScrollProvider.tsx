import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

interface SmoothScrollContextType {
  scrollY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  scrollVelocity: number;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScroll must be used within SmoothScrollProvider');
  }
  return context;
};

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  
  // Smooth spring for scroll position
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // IMPORTANT: All hooks must be called unconditionally at top level
  // This transform is used for the smooth scroll effect on desktop
  const contentY = useTransform(smoothScrollY, (value) => -value);

  useEffect(() => {
    // Check for mobile and reduced motion preference
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || 'ontouchstart' in window);
    };
    
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', handleMotionChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    
    const updateHeight = () => {
      if (scrollRef.current) {
        setPageHeight(scrollRef.current.scrollHeight);
      }
    };
    
    updateHeight();
    
    // Use ResizeObserver for dynamic content
    const resizeObserver = new ResizeObserver(updateHeight);
    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, [isMobile, prefersReducedMotion]);

  useEffect(() => {
    let lastScrollY = 0;
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrollVelocity(latest - lastScrollY);
      lastScrollY = latest;
    });
    return unsubscribe;
  }, [scrollY]);

  // Conditional rendering instead of early return (hooks already called above)
  const shouldUseSmoothScroll = !isMobile && !prefersReducedMotion;

  return (
    <SmoothScrollContext.Provider value={{ 
      scrollY: shouldUseSmoothScroll ? smoothScrollY : scrollY, 
      scrollYProgress, 
      scrollVelocity 
    }}>
      {shouldUseSmoothScroll ? (
        <>
          <div 
            ref={containerRef}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <motion.div
              ref={scrollRef}
              style={{ 
                y: contentY,
                willChange: 'transform',
              }}
            >
              {children}
            </motion.div>
          </div>
          {/* Spacer to maintain scroll height */}
          <div style={{ height: pageHeight }} />
        </>
      ) : (
        children
      )}
    </SmoothScrollContext.Provider>
  );
};

export default SmoothScrollProvider;
