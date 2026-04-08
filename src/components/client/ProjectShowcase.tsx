'use client';
import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2,
  Download,
  Move
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShowcaseImage {
  id: string;
  url: string;
  title: string;
  description?: string;
}

interface ProjectShowcaseProps {
  images: ShowcaseImage[];
  initialIndex?: number;
  onClose: () => void;
}

export const ProjectShowcase = ({ 
  images, 
  initialIndex = 0, 
  onClose 
}: ProjectShowcaseProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const currentImage = images[currentIndex];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.5, 3));
  const handleZoomOut = () => {
    setZoom((z) => Math.max(z - 0.5, 1));
    if (zoom <= 1.5) setPosition({ x: 0, y: 0 });
  };
  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          goToPrev();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Escape":
          onClose();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentImage.url;
    link.download = currentImage.title || "screenshot";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm">
            {currentIndex + 1} / {images.length}
          </span>
          <h3 className="text-white font-medium truncate max-w-md">
            {currentImage.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomOut}
              disabled={zoom <= 1}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-white/60 text-sm w-12 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoomIn}
              disabled={zoom >= 3}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleResetZoom}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <Download className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main image area */}
      <div 
        className="flex-1 relative overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              zoom > 1 ? "cursor-grab" : "cursor-zoom-in",
              isDragging && "cursor-grabbing"
            )}
            style={{
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
            }}
            onClick={() => zoom === 1 && handleZoomIn()}
          >
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="max-w-full max-h-full object-contain select-none"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Drag hint */}
        {zoom > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2 text-white/60 text-sm">
            <Move className="h-4 w-4" />
            Drag to pan
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="p-4 border-t border-white/10">
          <div className="flex justify-center gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setZoom(1);
                  setPosition({ x: 0, y: 0 });
                }}
                className={cn(
                  "w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                  index === currentIndex
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-white/20 hover:border-white/40"
                )}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {currentImage.description && (
        <div className="px-4 pb-4">
          <p className="text-white/60 text-sm text-center max-w-2xl mx-auto">
            {currentImage.description}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectShowcase;

