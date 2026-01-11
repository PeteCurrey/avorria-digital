import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyImageSectionProps {
  backgroundImage: string;
  children: ReactNode;
  className?: string;
  overlay?: "dark" | "gradient" | "heavy" | "light";
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const overlayClasses = {
    dark: "bg-black/70",
    gradient: "bg-gradient-to-b from-black/60 via-black/70 to-[hsl(220,25%,8%)]",
    heavy: "bg-black/85",
    light: "bg-black/40",
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
          loading="lazy"
        />
      </motion.div>

      {/* Overlay */}
      <div className={cn("absolute inset-0", overlayClasses[overlay])} />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

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
  overlay?: "dark" | "gradient" | "heavy" | "light";
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const overlayClasses = {
    dark: "bg-black/70",
    gradient: "bg-gradient-to-b from-black/50 via-black/60 to-black/80",
    heavy: "bg-black/85",
    light: "bg-black/40",
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Sticky Background */}
      <div className="sticky top-0 h-screen w-full -z-10 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover scale-110"
            loading="lazy"
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
