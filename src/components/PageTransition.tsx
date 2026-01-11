import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  variant?: "fade" | "slide" | "scale" | "slideUp";
}

// Premium page transition variants
const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  },
};

// Smooth easing curve for premium feel
const pageTransition = {
  duration: 0.4,
  ease: [0.25, 0.46, 0.45, 0.94] as const, // Custom cubic-bezier for smooth motion
};

const PageTransition = ({ children, variant = "slideUp" }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
      transition={pageTransition}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

// Overlay transition for dramatic page changes
export const PageTransitionOverlay = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[hsl(220,25%,8%)] pointer-events-none"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 0 }}
      exit={{ scaleY: 1 }}
      transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
      style={{ transformOrigin: "bottom" }}
    />
  );
};

// Staggered content reveal for child elements
export const StaggeredReveal = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Individual item for staggered reveal
export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;