'use client';
import Link from "next/link";
// Module version: v16 - zero-lag cursor via direct DOM manipulation
import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

type CursorVariant = "default" | "hover" | "click" | "text" | "hidden" | "view" | "cta";

export const CustomCursor = () => {
 const [variant, setVariant] = useState<CursorVariant>("default");
 const [isVisible, setIsVisible] = useState(false);
 const [isMobile, setIsMobile] = useState(false);
 const pathname = usePathname();

 const isAdminPage = pathname && pathname.startsWith("/admin");

 // Refs for direct DOM manipulation (bypasses framer-motion for position)
 const cursorRef = useRef<HTMLDivElement>(null);
 const trailRef = useRef<HTMLDivElement>(null);

 // Track raw mouse position
 const mousePos = useRef({ x: -100, y: -100 });
 // Trail position lerps toward mouse position
 const trailPos = useRef({ x: -100, y: -100 });
 const rafId = useRef<number>(0);

 // Check if mobile device
 useEffect(() => {
 const checkMobile = () => {
  setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
 };
 checkMobile();
 window.addEventListener("resize", checkMobile);
 return () => window.removeEventListener("resize", checkMobile);
 }, []);

 // Mouse move: update position immediately via DOM, no React/framer overhead
 useEffect(() => {
 if (isMobile) return;

 const onMouseMove = (e: MouseEvent) => {
  mousePos.current.x = e.clientX;
  mousePos.current.y = e.clientY;

  // Instant cursor update -- write directly to the DOM element's transform
  if (cursorRef.current) {
  cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
  }
 };

 const onMouseEnter = () => setIsVisible(true);
 const onMouseLeave = () => setIsVisible(false);

 window.addEventListener("mousemove", onMouseMove, { passive: true });
 document.addEventListener("mouseenter", onMouseEnter);
 document.addEventListener("mouseleave", onMouseLeave);

 return () => {
  window.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseenter", onMouseEnter);
  document.removeEventListener("mouseleave", onMouseLeave);
 };
 }, [isMobile]);

 // Trail ring: animate with rAF + lerp for a smooth, intentional lag
 useEffect(() => {
 if (isMobile) return;

 const lerpFactor = 0.15; // lower = more lag, higher = tighter follow

 const tick = () => {
  trailPos.current.x += (mousePos.current.x - trailPos.current.x) * lerpFactor;
  trailPos.current.y += (mousePos.current.y - trailPos.current.y) * lerpFactor;

  if (trailRef.current) {
  trailRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%)`;
  }

  rafId.current = requestAnimationFrame(tick);
 };

 rafId.current = requestAnimationFrame(tick);
 return () => cancelAnimationFrame(rafId.current);
 }, [isMobile]);

 // Handle hover detection on interactive elements
 useEffect(() => {
 if (isMobile) return;

 const handleMouseOver = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

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

 const sizeMap = {
 default: { width: 12, height: 12 },
 hover: { width: 48, height: 48 },
 click: { width: 40, height: 40 },
 text: { width: 4, height: 32 },
 hidden: { width: 0, height: 0 },
 view: { width: 80, height: 80 },
 cta: { width: 64, height: 64 },
 };

 const styleMap: Record<CursorVariant, React.CSSProperties> = {
 default: {
  backgroundColor: "transparent",
  border: "2px solid hsl(320, 85%, 55%)",
  mixBlendMode: "difference",
 },
 hover: {
  backgroundColor: "hsla(320, 85%, 55%, 0.15)",
  border: "2px solid hsl(320, 85%, 55%)",
  mixBlendMode: "normal",
 },
 click: {
  backgroundColor: "hsla(320, 85%, 55%, 0.3)",
  border: "2px solid hsl(320, 85%, 55%)",
  mixBlendMode: "normal",
 },
 text: {
  backgroundColor: "hsl(320, 85%, 55%)",
  border: "none",
  borderRadius: 2,
  mixBlendMode: "normal",
 },
 hidden: {
  backgroundColor: "transparent",
  border: "none",
 },
 view: {
  backgroundColor: "hsl(320, 85%, 55%)",
  border: "none",
  mixBlendMode: "normal",
 },
 cta: {
  backgroundColor: "hsla(320, 85%, 55%, 0.2)",
  border: "3px solid hsl(320, 85%, 55%)",
  mixBlendMode: "normal",
 },
 };

 const trailSizeMap = {
 default: 32,
 hover: 64,
 click: 64,
 text: 0,
 hidden: 0,
 view: 96,
 cta: 80,
 };

 const currentSize = sizeMap[variant];
 const currentStyle = styleMap[variant];
 const trailSize = trailSizeMap[variant];

 return (
 <>
  {/* Main cursor — positioned via ref, size/style animated by framer-motion */}
  <motion.div
  ref={cursorRef}
  className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center will-change-transform"
  style={{
   // Initial off-screen; overridden by mousemove handler
   transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
   ...currentStyle,
  }}
  animate={currentSize}
  transition={{ duration: 0.15, ease: "easeOut" }}
  initial={false}
  >
  {/* Inner glow for hover */}
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

  {/* "View" label */}
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

  {/* CTA pulse ring */}
  {variant === "cta" && (
   <motion.div
   className="absolute inset-0 rounded-full border-2 border-accent"
   animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
   transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
   />
  )}
  </motion.div>

  {/* Trailing ring — positioned via ref + rAF lerp */}
  <motion.div
  ref={trailRef}
  className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-white/20 will-change-transform"
  style={{
   transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
  }}
  animate={{
   width: trailSize,
   height: trailSize,
   opacity: isVisible ? (variant === "text" ? 0 : 0.5) : 0,
  }}
  transition={{ duration: 0.15, ease: "easeOut" }}
  />

 </>
 );
};

export default CustomCursor;


