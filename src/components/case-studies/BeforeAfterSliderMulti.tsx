import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface BeforeAfterPair {
  id: string;
  label: string;
  beforeImage: string;
  afterImage: string;
}

interface BeforeAfterSliderMultiProps {
  pairs: BeforeAfterPair[];
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSliderMulti = ({
  pairs,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterSliderMultiProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentPair = pairs[currentIndex];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? pairs.length - 1 : prev - 1));
    setSliderPosition(50);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === pairs.length - 1 ? 0 : prev + 1));
    setSliderPosition(50);
  };

  if (!pairs.length || !currentPair) return null;

  return (
    <div className="space-y-4">
      {/* Page Navigation */}
      {pairs.length > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {pairs.map((pair, index) => (
              <button
                key={pair.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setSliderPosition(50);
                }}
                className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-accent text-accent-foreground"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {pair.label || `Page ${index + 1}`}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="text-white hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-white/60 text-sm">
              {currentIndex + 1} / {pairs.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="text-white hover:bg-white/10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPair.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          ref={containerRef}
          className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After image (background) */}
          <img
            src={currentPair.afterImage}
            alt={`${afterLabel} - ${currentPair.label}`}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={currentPair.beforeImage}
              alt={`${beforeLabel} - ${currentPair.label}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ 
                width: containerRef.current ? containerRef.current.offsetWidth : '100%',
                maxWidth: 'none'
              }}
              draggable={false}
            />
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Handle grip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
              <div className="flex gap-0.5">
                <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
                <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-[hsl(220,25%,8%)/0.8] backdrop-blur-sm rounded-full text-sm text-white">
            {beforeLabel}
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-accent/90 backdrop-blur-sm rounded-full text-sm text-white">
            {afterLabel}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Current page label */}
      {currentPair.label && pairs.length > 1 && (
        <p className="text-center text-white/60 text-sm">
          {currentPair.label}
        </p>
      )}
    </div>
  );
};
