import React, { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

type CursorVariant = "default" | "hover" | "click" | "text" | "hidden" | "view" | "cta";

export const CustomCursor = () => {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  
  // Hide cursor on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // High stiffness for near-instant cursor tracking (feels like real cursor)
  const mainSpringConfig = { damping: 30, stiffness: 1000, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, mainSpringConfig);
  const cursorYSpring = useSpring(cursorY, mainSpringConfig);

  // Trailing cursor springs (slightly lagging for visual effect)
  const trailSpringConfig = { damping: 25, stiffness: 400, mass: 0.2 };
  const trailXSpring = useSpring(cursorX, trailSpringConfig);
  const trailYSpring = useSpring(cursorY, trailSpringConfig);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const moveCursor = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  const handleMouseEnter = useCallback(() => setIsVisible(true), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile, moveCursor, handleMouseEnter, handleMouseLeave]);

  // Handle hover detection on interactive elements
  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for interactive elements - order matters (more specific first)
      const isViewCard = target.closest("[data-cursor='view']");
      const isCTA = target.closest("[data-cursor='cta']");
      const isInput = target.closest("input, textarea, select");
      const isText = target.closest("[data-cursor='text']");
      const isLink = target.closest("a");
      const isButton = target.closest("button");
      const isCard = target.closest("[data-cursor='hover']");
      
      if (isViewCard) {
        setVariant("view");
      } else if (isCTA) {
        setVariant("cta");
      } else if (isInput || isText) {
        setVariant("text");
      } else if (isLink || isButton || isCard) {
        setVariant("hover");
      } else {
        setVariant("default");
      }
    };

    const handleMouseDown = () => setVariant(prev => prev === "hover" || prev === "view" || prev === "cta" ? "click" : prev);
    const handleMouseUp = () => setVariant(prev => prev === "click" ? "hover" : prev);

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile]);

  // Don't render on mobile or admin pages
  if (isMobile || isAdminPage) return null;

  const variants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: "transparent",
      border: "2px solid hsl(320, 85%, 55%)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: "hsla(320, 85%, 55%, 0.15)",
      border: "2px solid hsl(320, 85%, 55%)",
      mixBlendMode: "normal" as const,
    },
    click: {
      width: 40,
      height: 40,
      backgroundColor: "hsla(320, 85%, 55%, 0.3)",
      border: "2px solid hsl(320, 85%, 55%)",
      mixBlendMode: "normal" as const,
    },
    text: {
      width: 4,
      height: 32,
      backgroundColor: "hsl(320, 85%, 55%)",
      border: "none",
      borderRadius: 2,
      mixBlendMode: "normal" as const,
    },
    hidden: {
      width: 0,
      height: 0,
      backgroundColor: "transparent",
      border: "none",
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "hsl(320, 85%, 55%)",
      border: "none",
      mixBlendMode: "normal" as const,
    },
    cta: {
      width: 64,
      height: 64,
      backgroundColor: "hsla(320, 85%, 55%, 0.2)",
      border: "3px solid hsl(320, 85%, 55%)",
      mixBlendMode: "normal" as const,
    },
  };

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={variant}
        variants={variants}
        transition={{ duration: 0.15, ease: "easeOut" }}
        initial={false}
      >
        {/* Inner glow effect for hover state */}
        {variant === "hover" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, hsla(320, 85%, 55%, 0.4) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        
        {/* "View" text for case study cards */}
        <AnimatePresence>
          {variant === "view" && (
            <motion.span
              className="text-white text-xs font-semibold uppercase tracking-wider"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              View
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulsing ring for CTA variant */}
        {variant === "cta" && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </motion.div>

      {/* Trailing cursor ring - slightly lagging for visual effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/20"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: variant === "view" ? 96 : variant === "cta" ? 80 : variant === "hover" ? 64 : variant === "text" ? 0 : 32,
          height: variant === "view" ? 96 : variant === "cta" ? 80 : variant === "hover" ? 64 : variant === "text" ? 0 : 32,
          opacity: isVisible ? (variant === "text" ? 0 : 0.5) : 0,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />

      {/* Global style to hide default cursor */}
      <style>{`
        html, body, * {
          cursor: none !important;
        }
        
        a, button, input, textarea, select, [role="button"], [data-cursor] {
          cursor: none !important;
        }
        
        @media (pointer: coarse), (max-width: 767px) {
          html, body, * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
