'use client';
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  description: string;
}

interface BeforeAfterSliderWithHotspotsProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  hotspots?: Hotspot[];
}

const defaultHotspots: Hotspot[] = [
  {
    id: "slider",
    x: 50,
    y: 15,
    title: "Rotating Carousel",
    description: "Multiple conflicting messages fighting for attention. Visitors leave before seeing all slides.",
  },
  {
    id: "headline",
    x: 25,
    y: 30,
    title: "Vague Headline",
    description: "'Welcome to our company' says nothing. No clear value proposition or offer.",
  },
  {
    id: "stock",
    x: 80,
    y: 40,
    title: "Generic Stock Photo",
    description: "No brand differentiation. Looks exactly like every competitor.",
  },
  {
    id: "cta",
    x: 30,
    y: 70,
    title: "Buried CTA",
    description: "Primary action hidden below fold. High-intent visitors can't find how to convert.",
  },
  {
    id: "text",
    x: 70,
    y: 80,
    title: "Wall of Text",
    description: "Dense paragraphs nobody reads. No scannable content or visual hierarchy.",
  },
];

const BeforeAfterSliderWithHotspots: React.FC<BeforeAfterSliderWithHotspotsProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  hotspots = defaultHotspots,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  // Hide hotspots when slider is past 50%
  const showHotspots = sliderPosition < 50;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-xl cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setIsHovering(false);
      }}
      onMouseEnter={() => setIsHovering(true)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* Hotspots on Before Image */}
        <AnimatePresence>
          {showHotspots && hotspots.map((hotspot) => (
            <motion.div
              key={hotspot.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute z-20"
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            >
              {/* Pulsing Dot */}
              <button
                onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
                className="relative w-6 h-6 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="absolute inset-0 rounded-full bg-destructive/50 animate-ping" />
                <span className="absolute inset-1 rounded-full bg-destructive shadow-lg" />
              </button>

              {/* Tooltip */}
              <AnimatePresence>
                {activeHotspot === hotspot.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute z-30 w-64 p-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-xl"
                    style={{
                      left: hotspot.x > 50 ? "auto" : "100%",
                      right: hotspot.x > 50 ? "100%" : "auto",
                      top: "50%",
                      transform: "translateY(-50%)",
                      marginLeft: hotspot.x > 50 ? 0 : "12px",
                      marginRight: hotspot.x > 50 ? "12px" : 0,
                    }}
                  >
                    <button
                      onClick={() => setActiveHotspot(null)}
                      className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <h4 className="font-medium text-destructive mb-1">{hotspot.title}</h4>
                    <p className="text-sm text-muted-foreground">{hotspot.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Slider Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        animate={isHovering && !isDragging ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {/* Handle Grip */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
            <div className="w-0.5 h-4 bg-gray-400 rounded-full" />
          </div>
        </motion.div>
      </motion.div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-destructive/90 text-white text-sm font-medium rounded-full z-10">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1.5 bg-accent/90 text-white text-sm font-medium rounded-full z-10">
        {afterLabel}
      </div>

      {/* Hotspot Hint */}
      <AnimatePresence>
        {showHotspots && !activeHotspot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 text-white text-xs rounded-full z-10"
          >
            ?? Click the red dots to see issues
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeforeAfterSliderWithHotspots;


