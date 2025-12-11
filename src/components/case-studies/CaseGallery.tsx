import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

interface CaseGalleryProps {
  media: GalleryMedia[];
}

export const CaseGallery = ({ media }: CaseGalleryProps) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const goToNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % media.length);
  };
  
  const goToPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + media.length) % media.length);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
          >
            {item.type === "video" ? (
              <video
                src={item.src}
                className="w-full h-full object-cover"
                muted
                playsInline
              />
            ) : (
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[hsl(220,25%,8%)/0.5] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <ZoomIn className="text-white" size={24} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[hsl(220,25%,4%)/0.95] backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation */}
            {media.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Content */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              {media[lightboxIndex].type === "video" ? (
                <video
                  src={media[lightboxIndex].src}
                  controls
                  autoPlay
                  className="max-w-full max-h-[80vh] rounded-xl"
                />
              ) : (
                <img
                  src={media[lightboxIndex].src}
                  alt={media[lightboxIndex].alt}
                  className="max-w-full max-h-[80vh] rounded-xl object-contain"
                />
              )}
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {media.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
