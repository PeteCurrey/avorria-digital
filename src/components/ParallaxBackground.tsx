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
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to Y position for parallax
  // Speed controls how much the background moves relative to scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 + speed * 0.2]);

  const overlayClasses = {
    none: "",
    light: "bg-black/30",
    medium: "bg-black/50",
    dark: "bg-black/70",
    gradient: "bg-gradient-to-b from-black/40 via-black/50 to-black/70",
    "gradient-left": "bg-gradient-to-r from-black/50 via-black/30 to-transparent",
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight }}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y, scale }}
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
          />
        ) : null}
      </motion.div>

      {/* Overlay */}
      {overlay !== "none" && (
        <div className={cn("absolute inset-0", overlayClasses[overlay])} />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxBackground;
