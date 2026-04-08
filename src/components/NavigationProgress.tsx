'use client';
import { motion, useScroll, useSpring } from "framer-motion";

const NavigationProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent via-[hsl(260,75%,60%)] to-accent origin-left z-[60]"
      style={{ scaleX }}
    />
  );
};

export default NavigationProgress;