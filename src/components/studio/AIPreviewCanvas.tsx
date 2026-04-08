'use client';
import React, { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useStudioPreview } from "@/hooks/useStudioPreview";
import { Loader2 } from "lucide-react";

// Fallback concept images for each purpose type
import leadGenFallback from "@/assets/studio-previews/lead-gen.jpg";
import authorityFallback from "@/assets/studio-previews/authority.jpg";
import saasFallback from "@/assets/studio-previews/saas.jpg";
import platformFallback from "@/assets/studio-previews/platform.jpg";

const fallbackImages: Record<string, string> = {
  lead_gen: leadGenFallback,
  authority: authorityFallback,
  saas: saasFallback,
  platform: platformFallback,
};

interface StudioState {
  purpose: string | null;
  density: string;
  energy: string;
  palette: string;
  structureSize: string;
  features: string[];
}

interface AIPreviewCanvasProps {
  state: StudioState;
  activeStep: number;
  totalSteps: number;
}

export const AIPreviewCanvas = ({ state, activeStep, totalSteps }: AIPreviewCanvasProps) => {
  const { previewUrl, isLoading, generatePreview } = useStudioPreview();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Get fallback image based on purpose
  const fallbackImage = useMemo(() => {
    return state.purpose ? fallbackImages[state.purpose] : null;
  }, [state.purpose]);

  // Generate preview when key config changes
  useEffect(() => {
    if (state.purpose) {
      setImageLoaded(false);
      generatePreview({
        purpose: state.purpose,
        palette: state.palette,
        density: state.density,
        energy: state.energy,
      });
    }
  }, [state.purpose, state.palette, state.density, state.energy, generatePreview]);

  // Dynamic background based on palette
  const previewBg = useMemo(() => {
    switch (state.palette) {
      case "light":
        return "from-slate-100 via-white to-slate-50";
      case "mono":
        return "from-slate-900 via-slate-850 to-slate-900";
      case "gradient":
        return "from-indigo-950 via-slate-900 to-emerald-950";
      default:
        return "from-slate-950 via-slate-900 to-slate-850";
    }
  }, [state.palette]);

  const purposeLabel = useMemo(() => {
    switch (state.purpose) {
      case "lead_gen":
        return "Lead Generation";
      case "authority":
        return "Authority Hub";
      case "saas":
        return "Product Marketing";
      case "platform":
        return "Service Platform";
      default:
        return "Configure to preview";
    }
  }, [state.purpose]);

  const heroHeight = useMemo(() => {
    if (state.purpose === "lead_gen") return "h-40";
    if (state.purpose === "authority") return "h-28";
    return "h-32";
  }, [state.purpose]);

  const sectionCount = useMemo(() => {
    if (state.structureSize === "lean") return 2;
    if (state.structureSize === "expanded") return 4;
    return 3;
  }, [state.structureSize]);

  return (
    <div className="w-full lg:w-[55%]">
      <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] flex flex-col">
        {/* Preview Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full shadow-lg transition-all duration-500 ${
              isLoading 
                ? "bg-amber-400 animate-pulse shadow-amber-400/50" 
                : "bg-emerald-400 shadow-emerald-400/50"
            }`} />
            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
              {isLoading ? "Generating..." : "Live Preview"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {state.features.length > 0 && (
              <span className="rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1.5 text-[10px] text-violet-300">
                {state.features.length} features
              </span>
            )}
            <span className="rounded-full bg-slate-800/60 px-3 py-1.5 text-[10px] text-slate-400 border border-slate-700/50">
              Step {activeStep + 1} of {totalSteps}
            </span>
          </div>
        </div>

        {/* Main Preview */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
          }}
          className="relative flex-1"
        >
          {/* Ambient glow */}
          <div className={`absolute -inset-8 rounded-[3rem] bg-gradient-to-br ${previewBg} opacity-30 blur-3xl transition-all duration-700`} />

          {/* Browser frame */}
          <motion.div
            layout
            className={`relative h-full min-h-[550px] w-full rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-br ${previewBg} shadow-2xl shadow-black/60 transition-all duration-700 overflow-hidden`}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04] bg-black/20">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-6 w-52 max-w-full rounded-lg bg-white/[0.04] border border-white/[0.04] flex items-center px-3">
                  <span className="text-[10px] text-slate-500 truncate">yourwebsite.com</span>
                </div>
              </div>
              <span className="rounded-full bg-sky-500/10 border border-sky-500/20 px-3 py-1 text-[10px] text-sky-300 backdrop-blur-sm">
                {purposeLabel}
              </span>
            </div>

            {/* Content area */}
            <div className="relative h-[calc(100%-52px)] overflow-hidden">
              {/* Fallback image (shows while loading) */}
              {fallbackImage && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoading || !previewUrl ? 0.5 : 0 }}
                  transition={{ duration: 0.5 }}
                  src={fallbackImage}
                  alt="Website concept preview"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {/* AI-generated preview image */}
              {previewUrl && !isLoading && (
                <motion.img
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: imageLoaded ? 0.7 : 0, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={previewUrl}
                  alt="AI-generated website concept"
                  className="absolute inset-0 h-full w-full object-cover"
                  onLoad={() => setImageLoaded(true)}
                />
              )}

              {/* Loading overlay */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm"
                >
                  <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
                  <p className="mt-4 text-xs text-slate-400">Generating AI concept...</p>
                </motion.div>
              )}

              {/* Wireframe overlay */}
              <div className="relative h-full p-6 space-y-4">
                {/* Hero section */}
                <motion.div
                  layout
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`${heroHeight} relative overflow-hidden rounded-xl border border-white/[0.06] transition-all duration-500 ${
                    state.energy === "bold"
                      ? "bg-gradient-to-br from-white/[0.08] to-white/[0.02]"
                      : "bg-black/40 backdrop-blur-sm"
                  }`}
                >
                  <div className="absolute inset-0 p-6">
                    <div className="flex h-full items-center justify-between">
                      <div className="space-y-3">
                        <motion.div
                          layout
                          className={`rounded-full ${state.palette === "light" ? "bg-slate-800/80" : "bg-white/90"}`}
                          style={{ height: 10, width: state.purpose === "lead_gen" ? 180 : 120 }}
                        />
                        <motion.div
                          layout
                          className={`h-2 rounded-full ${state.palette === "light" ? "bg-slate-800/40" : "bg-white/40"}`}
                          style={{ width: state.purpose === "authority" ? 200 : 140 }}
                        />
                        <motion.div
                          layout
                          className={`h-1.5 rounded-full ${state.palette === "light" ? "bg-slate-800/20" : "bg-white/20"}`}
                          style={{ width: 100 }}
                        />
                      </div>
                      {state.purpose === "lead_gen" && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex flex-col gap-2"
                        >
                          <div className="h-9 w-24 rounded-lg bg-sky-500/80 shadow-lg shadow-sky-500/30" />
                          <div className="h-2 w-16 rounded-full bg-white/20 mx-auto" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Content sections */}
                <div className="grid grid-cols-3 gap-3">
                  {Array.from({ length: sectionCount }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="rounded-lg border border-white/[0.04] bg-black/30 p-4 backdrop-blur-sm"
                    >
                      <div className="h-12 w-full rounded-lg bg-white/[0.03] mb-3" />
                      <div className="space-y-2">
                        <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
                        <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Features indicators */}
                {state.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-4 left-6 right-6 flex flex-wrap gap-2"
                  >
                    {state.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="rounded-full bg-violet-500/10 border border-violet-500/20 px-2 py-1 text-[8px] text-violet-300"
                      >
                        {feature}
                      </span>
                    ))}
                    {state.features.length > 3 && (
                      <span className="rounded-full bg-slate-800/50 px-2 py-1 text-[8px] text-slate-400">
                        +{state.features.length - 3} more
                      </span>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom info */}
        <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500">
          <span>Real-time visualization Â· Drag to rotate</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Auto-updating
          </span>
        </div>
      </div>
    </div>
  );
};


