'use client';
import React, { useState, useEffect } from "react";

interface Section {
  id: string;
  label: string;
}

export const useScrollSpy = (sections: Section[], offset = 100) => {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the section that's currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveId(sections[i].id);
          return;
        }
      }

      // Default to first section if at top
      if (scrollPosition < offset) {
        setActiveId(sections[0]?.id || "");
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, offset]);

  return activeId;
};


