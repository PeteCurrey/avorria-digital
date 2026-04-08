'use client';
import React, { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type AnimationVariant = "fade-up" | "fade-left" | "fade-right" | "scale" | "blur" | "slide-up";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: AnimationVariant;
  duration?: number;
}

const getVariantStyles = (variant: AnimationVariant, isVisible: boolean): CSSProperties => {
  const baseTransition = {
    transitionProperty: "opacity, transform, filter",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  };

  switch (variant) {
    case "fade-up":
      return {
        ...baseTransition,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
      };
    case "fade-left":
      return {
        ...baseTransition,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-32px)",
      };
    case "fade-right":
      return {
        ...baseTransition,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(32px)",
      };
    case "scale":
      return {
        ...baseTransition,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.9)",
      };
    case "blur":
      return {
        ...baseTransition,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        filter: isVisible ? "blur(0)" : "blur(8px)",
      };
    case "slide-up":
    default:
      return {
        ...baseTransition,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
      };
  }
};

export const ScrollReveal = ({
  children,
  delay = 0,
  className = "",
  variant = "slide-up",
  duration = 600,
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const variantStyles = getVariantStyles(variant, isVisible);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...variantStyles,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

interface ScrollRevealGridProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  variant?: AnimationVariant;
}

export const ScrollRevealGrid = ({
  children,
  stagger = 80,
  className = "",
  variant = "fade-up",
}: ScrollRevealGridProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getChildStyle = (index: number): CSSProperties => {
    const baseStyles = getVariantStyles(variant, isVisible);
    return {
      ...baseStyles,
      transitionDuration: "600ms",
      transitionDelay: isVisible ? `${index * stagger}ms` : "0ms",
    };
  };

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index} style={getChildStyle(index)}>
              {child}
            </div>
          ))
        : children}
    </div>
  );
};

// Parallax scroll effect hook
interface UseParallaxOptions {
  speed?: number; // 0.1 = slow, 1 = normal, 2 = fast
  direction?: "up" | "down";
}

export const useParallax = ({ speed = 0.5, direction = "up" }: UseParallaxOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - windowHeight / 2;
      const normalizedDistance = distanceFromCenter / windowHeight;
      const parallaxOffset = normalizedDistance * speed * 100 * (direction === "up" ? 1 : -1);
      setOffset(parallaxOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return { ref, offset };
};

// Parallax wrapper component
interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
}

export const Parallax = ({ children, speed = 0.3, direction = "up", className = "" }: ParallaxProps) => {
  const { ref, offset } = useParallax({ speed, direction });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
};

// Scroll progress indicator hook
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      // Calculate how much of the element has scrolled through the viewport
      const scrolledPast = windowHeight - rect.top;
      const totalScrollable = windowHeight + elementHeight;
      const progressValue = Math.min(Math.max(scrolledPast / totalScrollable, 0), 1);
      
      setProgress(progressValue);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, progress };
};

// Magnetic hover effect component
interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const Magnetic = ({ children, className = "", strength = 0.3 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
};

// Stagger text reveal component
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export const TextReveal = ({ text, className = "", delay = 0, stagger = 30 }: TextRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <span ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 400ms ease, transform 400ms ease`,
            transitionDelay: isVisible ? `${index * stagger}ms` : "0ms",
          }}
        >
          {word}
          {index < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  );
};

// Counter animation component
interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const CountUp = ({ end, duration = 2000, suffix = "", prefix = "", className = "" }: CountUpProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
};


