'use client';
import React, { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyImageSectionProps {
  backgroundImage: string;
  children: ReactNode;
  className?: string;
  overlay?: "dark" | "gradient" | "heavy" | "light" | "clean";
  minHeight?: string;
}

export const StickyImageSection = ({
  backgroundImage,
  children,
  className,
  overlay = "gradient",
  minHeight = "100vh",
}: StickyImageSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  const overlayClasses = {
    dark: "bg-black/70",
    gradient: "bg-gradient-to-b from-black/50 via-black/60 to-[hsl(220,25%,8%)]",
    heavy: "bg-black/80",
    light: "bg-black/40",
    clean: "bg-gradient-to-b from-black/40 to-[hsl(220,25%,8%)]",
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight }}
    >
      {/* Fixed/Sticky Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Overlay - no blur, clean gradient */}
      <div className={cn("absolute inset-0", overlayClasses[overlay])} />

      {/* Scrolling Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Variant with multiple content sections that scroll over a single background
interface MultiSectionStickyProps {
  backgroundImage: string;
  sections: ReactNode[];
  className?: string;
  overlay?: "dark" | "gradient" | "heavy" | "light" | "clean";
}

export const MultiSectionSticky = ({
  backgroundImage,
  sections,
  className,
  overlay = "gradient",
}: MultiSectionStickyProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const overlayClasses = {
    dark: "bg-black/70",
    gradient: "bg-gradient-to-b from-black/40 via-black/50 to-black/70",
    heavy: "bg-black/80",
    light: "bg-black/40",
    clean: "bg-gradient-to-b from-black/30 to-black/60",
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Sticky Background */}
      <div className="sticky top-0 h-screen w-full -z-10 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>
        <div className={cn("absolute inset-0", overlayClasses[overlay])} />
      </div>

      {/* Content sections that scroll over the sticky background */}
      <div className="relative -mt-screen">
        {sections.map((section, index) => (
          <div key={index} className="min-h-screen flex items-center">
            {section}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyImageSection;


