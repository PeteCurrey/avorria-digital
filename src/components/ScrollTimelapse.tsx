'use client';
// Scroll-controlled day-to-night timelapse effect v9
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// Import timelapse images
const heroPenthouseDay = "/assets/hero-penthouse.png";
const heroPenthouseSunset = "/assets/hero-penthouse-sunset.jpg";
const heroPenthouseDusk = "/assets/hero-penthouse-dusk.jpg";
const heroPenthouseNight = "/assets/hero-penthouse-night.jpg";

interface ScrollTimelapseProps {
  className?: string;
  /** Speed of parallax effect (0.1 = subtle, 0.5 = dramatic) */
  speed?: number;
}

export const ScrollTimelapse = ({ 
  className, 
  speed = 0.3 
}: ScrollTimelapseProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax offset
  const yOffset = 150 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);

  // Map scroll progress to image opacities for smooth crossfade
  // 0-25%: Day fully visible
  // 25-50%: Day fades out, Sunset fades in
  // 50-75%: Sunset fades out, Dusk fades in
  // 75-100%: Dusk fades out, Night fades in
  
  const dayOpacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 1, 0]);
  const sunsetOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.65], [0, 1, 1, 0]);
  const duskOpacity = useTransform(scrollYProgress, [0.45, 0.6, 0.8, 0.9], [0, 1, 1, 0]);
  const nightOpacity = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  const extendedHeight = `calc(100% + ${yOffset * 2}px)`;

  const images = [
    { src: heroPenthouseDay, opacity: dayOpacity, alt: "Day view" },
    { src: heroPenthouseSunset, opacity: sunsetOpacity, alt: "Sunset view" },
    { src: heroPenthouseDusk, opacity: duskOpacity, alt: "Dusk view" },
    { src: heroPenthouseNight, opacity: nightOpacity, alt: "Night view" },
  ];

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {/* Parallax wrapper for all images */}
      <motion.div
        className="absolute inset-x-0 will-change-transform"
        style={{
          y,
          top: -yOffset,
          height: extendedHeight,
          width: '100%',
        }}
      >
        {/* Stack all images with individual opacity controls */}
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: image.opacity }}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollTimelapse;


