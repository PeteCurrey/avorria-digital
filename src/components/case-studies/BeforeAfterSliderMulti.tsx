'use client';
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, Download, Hand } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  className?: string;
}

export const BeforeAfterSliderMulti = ({
  pairs,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterSliderMultiProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDragHint, setShowDragHint] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const currentPair = pairs[currentIndex];

  // Hide drag hint after first interaction
  useEffect(() => {
    if (hasInteracted) {
      const timer = setTimeout(() => setShowDragHint(false), 500);
      return () => clearTimeout(timer);
    }
  }, [hasInteracted]);

  // Auto-hide drag hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowDragHint(false), 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
    
    if (!hasInteracted) setHasInteracted(true);
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
    if (!hasInteracted) setHasInteracted(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? pairs.length - 1 : prev - 1));
    setSliderPosition(50);
    setShowDragHint(true);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === pairs.length - 1 ? 0 : prev + 1));
    setSliderPosition(50);
    setShowDragHint(true);
  };

  const handleDownload = async (type: 'before' | 'after') => {
    const url = type === 'before' ? currentPair.beforeImage : currentPair.afterImage;
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentPair.label}-${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Escape":
          setIsFullscreen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, pairs.length]);

  // Prevent body scroll in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  if (!pairs.length || !currentPair) return null;

  const SliderContent = ({ fullscreen = false }: { fullscreen?: boolean }) => (
    <div className={cn("space-y-4", fullscreen && "h-full flex flex-col")}>
      {/* Page Navigation */}
      {pairs.length > 1 && (
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {pairs.map((pair, index) => (
              <button
                key={pair.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setSliderPosition(50);
                  setShowDragHint(true);
                }}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-full transition-all whitespace-nowrap",
                  index === currentIndex
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {pair.label || `Page ${index + 1}`}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrevious}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-muted-foreground text-sm tabular-nums">
              {currentIndex + 1} / {pairs.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
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
          className={cn(
            "relative rounded-2xl overflow-hidden cursor-ew-resize select-none",
            fullscreen ? "flex-1" : "aspect-[16/10]"
          )}
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
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Handle grip */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex gap-1">
                <div className="w-0.5 h-5 bg-muted-foreground/40 rounded-full" />
                <div className="w-0.5 h-5 bg-muted-foreground/40 rounded-full" />
              </div>
            </motion.div>
          </motion.div>

          {/* Labels */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-sm text-foreground font-medium">
            {beforeLabel}
          </div>
          <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-accent/90 backdrop-blur-sm rounded-full text-sm text-accent-foreground font-medium">
            {afterLabel}
          </div>

          {/* Drag hint */}
          <AnimatePresence>
            {showDragHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/80 backdrop-blur-sm rounded-full text-sm text-foreground flex items-center gap-2"
              >
                <Hand className="h-4 w-4" />
                Drag to reveal
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fullscreen button (inline view only) */}
          {!fullscreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 h-9 w-9 bg-background/80 hover:bg-background/90 backdrop-blur-sm"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer actions */}
      {fullscreen && (
        <div className="flex items-center justify-center gap-4 shrink-0 pb-4">
          <Button variant="outline" size="sm" onClick={() => handleDownload('before')}>
            <Download className="h-4 w-4 mr-2" />
            Download Before
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleDownload('after')}>
            <Download className="h-4 w-4 mr-2" />
            Download After
          </Button>
        </div>
      )}

      {/* Current page label */}
      {currentPair.label && pairs.length > 1 && !fullscreen && (
        <p className="text-center text-muted-foreground text-sm">
          {currentPair.label}
        </p>
      )}
    </div>
  );

  // Fullscreen modal
  if (isFullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background flex flex-col"
      >
        {/* Fullscreen header */}
        <div className="flex items-center justify-between p-4 border-b border-border shrink-0">
          <div>
            <h3 className="text-lg font-medium text-foreground">{currentPair.label}</h3>
            <p className="text-sm text-muted-foreground">
              Drag the slider to compare before & after
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsFullscreen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Fullscreen content */}
        <div className="flex-1 p-4 overflow-hidden">
          <SliderContent fullscreen />
        </div>
      </motion.div>
    );
  }

  return (
    <div className={className}>
      <SliderContent />
    </div>
  );
};

export default BeforeAfterSliderMulti;

