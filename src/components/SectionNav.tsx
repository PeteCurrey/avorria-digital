'use client';
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

interface SectionNavProps {
  sections: Section[];
  activeId: string;
  variant?: "dots" | "labels";
}

const SectionNav: React.FC<SectionNavProps> = ({ 
  sections, 
  activeId, 
  variant = "dots" 
}) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex"
      aria-label="Page sections"
    >
      <div className="bg-slate-900/60 backdrop-blur-sm rounded-full p-3 border border-white/10 shadow-xl">
        <ul className="flex flex-col gap-3">
          {sections.map((section) => {
            const isActive = activeId === section.id;
            
            return (
              <li key={section.id} className="relative group">
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "relative flex items-center justify-center transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded-full",
                    variant === "dots" ? "w-3 h-3" : "px-3 py-1.5"
                  )}
                  aria-label={`Scroll to ${section.label}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {variant === "dots" ? (
                    <>
                      {/* Background dot */}
                      <span 
                        className={cn(
                          "absolute inset-0 rounded-full transition-all duration-300",
                          isActive 
                            ? "bg-accent scale-125 shadow-[0_0_12px_rgba(236,72,153,0.6)]" 
                            : "bg-white/30 group-hover:bg-white/60"
                        )}
                      />
                      {/* Active ring animation */}
                      {isActive && (
                        <motion.span
                          layoutId="activeSection"
                          className="absolute inset-[-4px] rounded-full border-2 border-accent/50"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  ) : (
                    <span 
                      className={cn(
                        "text-xs font-medium transition-colors duration-300",
                        isActive ? "text-accent" : "text-white/60 group-hover:text-white"
                      )}
                    >
                      {section.label}
                    </span>
                  )}
                </button>

                {/* Tooltip */}
                {variant === "dots" && (
                  <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap border border-white/10 shadow-lg">
                      {section.label}
                      {/* Arrow */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-slate-900/90 border-r border-t border-white/10" />
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};

export default SectionNav;


