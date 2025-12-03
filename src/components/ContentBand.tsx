import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentBandProps {
  headline: string;
  subheadline?: string;
  body?: string;
  image?: string;
  imageAlt?: string;
  cta?: {
    text: string;
    href: string;
    variant?: "accent" | "outline" | "default";
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  reverse?: boolean;
  background?: "dark" | "gradient" | "subtle" | "mesh" | "image";
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
}

export const ContentBand = ({
  headline,
  subheadline,
  body,
  image,
  imageAlt = "",
  cta,
  secondaryCta,
  reverse = false,
  background = "dark",
  backgroundImage,
  className,
  children,
}: ContentBandProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  const bgClasses = {
    dark: "bg-[hsl(220,25%,8%)] text-white",
    gradient: "bg-gradient-to-br from-[hsl(220,25%,8%)] via-[hsl(220,25%,12%)] to-[hsl(250,30%,15%)] text-white",
    subtle: "bg-gradient-to-b from-secondary/50 to-background",
    mesh: "bg-[hsl(220,25%,8%)] text-white relative overflow-hidden",
    image: "relative text-white",
  };

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full py-24 md:py-32 lg:py-40 overflow-hidden",
        bgClasses[background],
        className
      )}
    >
      {/* Background treatments */}
      {background === "mesh" && (
        <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-60" />
      )}
      
      {background === "image" && backgroundImage && (
        <>
          <motion.div
            style={{ y }}
            className="absolute inset-0 scale-110"
          >
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </>
      )}

      {/* Subtle noise texture overlay for dark backgrounds */}
      {(background === "dark" || background === "gradient" || background === "mesh") && (
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-4 sm:px-6 relative z-10"
      >
        <div
          className={cn(
            "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-7xl mx-auto",
            reverse && "lg:[&>*:first-child]:order-2"
          )}
        >
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            {subheadline && (
              <p className="text-sm md:text-base font-semibold uppercase tracking-widest text-accent">
                {subheadline}
              </p>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
              {headline}
            </h2>
            {body && (
              <p className="text-lg md:text-xl leading-relaxed text-white/80 max-w-xl">
                {body}
              </p>
            )}
            {children}
            {(cta || secondaryCta) && (
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {cta && (
                  <Button
                    variant={cta.variant || "accent"}
                    size="lg"
                    asChild
                    className="w-full sm:w-auto"
                  >
                    <Link to={cta.href}>
                      {cta.text}
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
                  >
                    <Link to={secondaryCta.href}>{secondaryCta.text}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Image/Visual */}
          {image && (
            <motion.div
              style={{ y }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={image}
                  alt={imageAlt}
                  className="w-full h-auto object-cover"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-accent/10 blur-3xl -z-10 opacity-50" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

// Full-width hero variant for page headers
export const HeroBand = ({
  headline,
  subheadline,
  body,
  cta,
  secondaryCta,
  backgroundImage,
  minHeight = "70vh",
  className,
  children,
}: ContentBandProps & { minHeight?: string }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative w-full flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ minHeight }}
    >
      {/* Parallax background */}
      {backgroundImage && (
        <motion.div
          style={{ y }}
          className="absolute inset-0 scale-110"
        >
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[hsl(220,25%,8%)]" />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container mx-auto px-4 sm:px-6 relative z-10 text-center py-24 md:py-32"
      >
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {subheadline && (
            <p className="text-sm md:text-base font-semibold uppercase tracking-widest text-accent animate-fade-in">
              {subheadline}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight text-white animate-fade-in">
            {headline}
          </h1>
          {body && (
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-white/85 max-w-3xl mx-auto animate-fade-in-up">
              {body}
            </p>
          )}
          {children}
          {(cta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up">
              {cta && (
                <Button
                  variant={cta.variant || "accent"}
                  size="lg"
                  asChild
                  className="w-full sm:w-auto"
                >
                  <Link to={cta.href}>
                    {cta.text}
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Link to={secondaryCta.href}>{secondaryCta.text}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

// Simple section wrapper for consistent full-width backgrounds
export const SectionBand = ({
  children,
  background = "dark",
  className,
  padding = "default",
}: {
  children: React.ReactNode;
  background?: "dark" | "gradient" | "subtle" | "mesh" | "light";
  className?: string;
  padding?: "default" | "large" | "hero";
}) => {
  const bgClasses = {
    dark: "bg-[hsl(220,25%,8%)] text-white",
    gradient: "bg-gradient-to-br from-[hsl(220,25%,8%)] via-[hsl(220,25%,12%)] to-[hsl(250,30%,15%)] text-white",
    subtle: "bg-gradient-to-b from-secondary/30 to-background text-foreground",
    mesh: "bg-[hsl(220,25%,8%)] text-white relative",
    light: "bg-background text-foreground",
  };

  const paddingClasses = {
    default: "py-24 md:py-32",
    large: "py-32 md:py-40 lg:py-48",
    hero: "py-40 md:py-48 lg:py-56",
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden",
        bgClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      {background === "mesh" && (
        <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-60" />
      )}
      {(background === "dark" || background === "gradient" || background === "mesh") && (
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {children}
      </div>
    </section>
  );
};

export default ContentBand;
