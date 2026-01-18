import React, { useRef } from 'react';
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate the horizontal scroll distance
  const [scrollWidth, setScrollWidth] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);

  React.useEffect(() => {
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

  const maxScroll = Math.max(0, scrollWidth - containerWidth);
  
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -maxScroll * speed]),
    { stiffness: 100, damping: 30 }
  );

  // Progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Check for mobile
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // On mobile, render as regular scrollable content
  if (isMobile) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex gap-6" ref={scrollRef}>
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
        height: `${Math.max(100, (scrollWidth / containerWidth) * 100)}vh`,
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="flex items-center h-full gap-8 px-8"
          style={{ x }}
        >
          {children}
        </motion.div>
        
        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-muted/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            style={{ width: progressWidth }}
          />
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
