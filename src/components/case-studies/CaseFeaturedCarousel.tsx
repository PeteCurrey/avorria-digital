'use client';
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseFeaturedCarouselProps {
  cases: CaseStudy[];
  autoScrollInterval?: number;
  onCaseClick?: (slug: string) => void;
}

export const CaseFeaturedCarousel = ({
  cases,
  autoScrollInterval = 6000,
  onCaseClick
}: CaseFeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  }, [cases.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  }, [cases.length]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, autoScrollInterval);
    return () => clearInterval(interval);
  }, [isPaused, goToNext, autoScrollInterval]);

  const currentCase = cases[currentIndex];

  return (
    <section className="relative py-24 px-6 overflow-hidden section-dark">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(250,30%,10%)/0.3] to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">

          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
            Featured Work
          </span>
          <h2 className="text-4xl text-white font-extralight md:text-4xl">
            Spotlight Projects
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentCase.slug}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Image */}
              <Link
                to={`/case-studies/${currentCase.slug}`}
                onClick={() => onCaseClick?.(currentCase.slug)}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group">

                <img
                  src={currentCase.heroMedia.src}
                  alt={currentCase.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,8%)/0.6] to-transparent" />
                
                {/* Overlay badge */}
                <div className="absolute top-4 left-4 px-4 py-2 bg-accent/90 backdrop-blur-sm rounded-full">
                  <span className="text-white text-sm font-medium">{currentCase.sector}</span>
                </div>
              </Link>

              {/* Content */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {currentCase.services.map((service) =>
                  <span
                    key={service}
                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70">

                      {service}
                    </span>
                  )}
                </div>

                <h3 className="text-3xl md:text-4xl font-light text-white">
                  {currentCase.headline}
                </h3>

                <p className="text-white/70 text-lg leading-relaxed">
                  {currentCase.subheadline}
                </p>

                {/* KPI Highlights */}
                <div className="flex gap-8 py-4">
                  {currentCase.kpiBadges.slice(0, 2).map((badge, i) =>
                  <div key={i}>
                      <div className={`text-3xl font-light ${badge.highlight ? 'text-accent' : 'text-white'}`}>
                        {badge.value}
                      </div>
                      <div className="text-sm text-white/50">{badge.label}</div>
                    </div>
                  )}
                </div>

                <Button variant="accent" asChild className="group">
                  <Link
                    to={`/case-studies/${currentCase.slug}`}
                    onClick={() => onCaseClick?.(currentCase.slug)}>

                    View Case Study
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              aria-label="Previous case study">

              <ChevronLeft size={24} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {cases.map((_, index) =>
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ?
                'w-8 bg-accent' :
                'w-2 bg-white/30 hover:bg-white/50'}`
                }
                aria-label={`Go to slide ${index + 1}`} />

              )}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
              aria-label="Next case study">

              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>);

};
