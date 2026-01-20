// Module version: v4 - Fixed positioning for visible parallax
import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxBackgroundProps {
  children: ReactNode;
  className?: string;
  /** Speed of parallax effect (0.1 = subtle, 0.5 = dramatic) */
  speed?: number;
  /** Background image URL */
  backgroundImage?: string;
  /** Background video URL */
  backgroundVideo?: string;
  /** Overlay style */
  overlay?: "none" | "light" | "medium" | "dark" | "gradient" | "gradient-left";
  /** Minimum height */
  minHeight?: string;
  /** Video poster image */
  videoPoster?: string;
}

export const ParallaxBackground = ({
  children,
  className,
  speed = 0.3,
  backgroundImage,
  backgroundVideo,
  overlay = "medium",
  minHeight = "100vh",
  videoPoster,
}: ParallaxBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Pixel-based offset for smooth parallax
  const yOffset = 150 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset]);

  const overlayClasses = {
    none: "",
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70",
    gradient: "bg-gradient-to-b from-black/40 via-black/50 to-black/70",
    "gradient-left": "bg-gradient-to-r from-black/70 via-black/40 to-black/20",
  };

  // Calculate extended height for parallax buffer
  const extendedHeight = `calc(100% + ${yOffset * 2}px)`;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight, position: "relative" }}
    >
      {/* Parallax Background - Properly positioned */}
      <motion.div
        className="absolute left-0 right-0 will-change-transform"
        style={{ 
          y,
          top: -yOffset,
          height: extendedHeight,
        }}
      >
        {backgroundVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={videoPoster}
            className="w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : null}
      </motion.div>

      {/* Overlay */}
      {overlay !== "none" && (
        <div className={cn("absolute inset-0 z-[1]", overlayClasses[overlay])} />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxBackground;
