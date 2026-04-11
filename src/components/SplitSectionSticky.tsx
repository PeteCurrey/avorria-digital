'use client';
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitSectionStickyProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  stickySide?: "left" | "right";
  className?: string;
}

/**
 * A component where one side sticks to the viewport while the other side scrolls past.
 * Ideal for "Half Section Scroll" features with pinned context.
 */
export const SplitSectionSticky = ({
  leftContent,
  rightContent,
  stickySide = "left",
  className,
}: SplitSectionStickyProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate subtle opacity/scale shifts for the sticky content based on scroll progress
  const contentOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
  const contentScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative w-full", className)}
    >
      <div className="flex flex-col lg:flex-row gap-0">
        {/* Left Side */}
        <div className={cn(
          "w-full lg:w-1/2",
          stickySide === "left" ? "lg:sticky lg:top-0 lg:h-screen" : "relative"
        )}>
          <motion.div 
            style={{ 
              opacity: stickySide === "left" ? contentOpacity : 1,
              scale: stickySide === "left" ? contentScale : 1
            }}
            className="h-full w-full flex items-center justify-center overflow-hidden"
          >
            {leftContent}
          </motion.div>
        </div>

        {/* Right Side */}
        <div className={cn(
          "w-full lg:w-1/2",
          stickySide === "right" ? "lg:sticky lg:top-0 lg:h-screen" : "relative"
        )}>
           <motion.div 
            style={{ 
              opacity: stickySide === "right" ? contentOpacity : 1,
              scale: stickySide === "right" ? contentScale : 1
            }}
            className="h-full w-full flex items-center justify-center overflow-hidden"
          >
            {rightContent}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SplitSectionSticky;
