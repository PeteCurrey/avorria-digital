'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Hero" },
  { id: "before-after", label: "Before/After" },
  { id: "quiz", label: "Quiz" },
  { id: "archetypes", label: "Archetypes" },
  { id: "stats", label: "Stats" },
  { id: "checklist", label: "Checklist" },
  { id: "calculator", label: "Calculator" },
  { id: "teardown-form", label: "Get Teardown" },
  { id: "faq", label: "FAQ" },
];

const SectionProgressNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Show/hide based on scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = document.getElementById("hero")?.offsetHeight || 500;
      setIsVisible(scrollY > heroHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const progress = ((activeIndex + 1) / sections.length) * 100;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-2"
        >
          {/* Progress line */}
          <div className="absolute right-[7px] top-0 bottom-0 w-[2px] bg-muted-foreground/20 rounded-full">
            <motion.div
              className="w-full bg-accent rounded-full"
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Section dots */}
          {sections.map((section, index) => {
            const isActive = section.id === activeSection;
            const isPast = index < activeIndex;

            return (
              <div
                key={section.id}
                className="relative flex items-center"
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Label tooltip */}
                <AnimatePresence>
                  {hoveredSection === section.id && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="absolute right-6 whitespace-nowrap px-3 py-1.5 rounded-lg bg-card border border-border shadow-lg"
                    >
                      <span className="text-sm text-foreground">{section.label}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dot button */}
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "relative w-4 h-4 rounded-full transition-all duration-300 z-10",
                    "hover:scale-125 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background",
                    isActive
                      ? "bg-accent shadow-lg shadow-accent/30"
                      : isPast
                      ? "bg-accent/50"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Scroll to ${section.label}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", damping: 20 }}
                    />
                  )}
                </button>
              </div>
            );
          })}

          {/* Current section label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-8 right-0 text-xs text-muted-foreground whitespace-nowrap"
          >
            {activeIndex + 1} / {sections.length}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionProgressNav;

