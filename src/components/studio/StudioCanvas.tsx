import { motion } from "framer-motion";
import type { StudioConfig } from "@/pages/WebDesignStudio";

interface StudioCanvasProps {
  config: StudioConfig;
  currentStep: number;
}

export const StudioCanvas = ({ config, currentStep }: StudioCanvasProps) => {
  const getBackgroundStyle = () => {
    const opacity = config.visual_layout_density / 100;
    const isDark = config.palette === "dark";
    const baseColor = isDark ? "hsl(220, 25%, 12%)" : "hsl(0, 0%, 100%)";
    
    return {
      backgroundColor: baseColor,
      opacity: 0.05 + (opacity * 0.15),
    };
  };

  const getAccentStyle = () => {
    if (config.palette === "gradient") {
      return { background: "linear-gradient(135deg, hsl(320, 85%, 55%) 0%, hsl(260, 75%, 60%) 100%)" };
    }
    return { backgroundColor: "hsl(320, 85%, 55%)" };
  };

  const getBlockCount = () => {
    return Math.floor((config.visual_layout_density / 100) * 5) + 3;
  };

  return (
    <motion.div
      className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10"
      style={{
        background: config.palette === "dark" 
          ? "linear-gradient(180deg, hsl(220, 25%, 12%) 0%, hsl(220, 20%, 8%) 100%)"
          : "linear-gradient(180deg, hsl(0, 0%, 100%) 0%, hsl(220, 15%, 98%) 100%)",
        boxShadow: "0 20px 60px -10px hsla(0, 0%, 0%, 0.5), 0 0 0 1px hsla(255, 255%, 255%, 0.1)",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Abstract website frame */}
      <div className="absolute inset-8 flex flex-col gap-4">
        {/* Hero section representation */}
        <motion.div
          className="relative h-32 rounded-lg overflow-hidden"
          style={getBackgroundStyle()}
          animate={{ height: config.purpose === "lead_generation" ? "40%" : "32%" }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute bottom-4 left-4 right-4 h-8 rounded"
            style={getAccentStyle()}
            animate={{ 
              opacity: config.purpose === "lead_generation" ? 1 : 0.6,
              scale: config.visual_energy > 60 ? 1 : 0.95,
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Content blocks */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {Array.from({ length: getBlockCount() }).map((_, i) => (
            <motion.div
              key={i}
              className="rounded-md"
              style={getBackgroundStyle()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            />
          ))}
        </div>

        {/* Feature badges (when features are selected) */}
        {config.features_selected.length > 0 && (
          <motion.div
            className="absolute top-36 right-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {config.features_selected.slice(0, 3).map((feature, i) => (
              <div
                key={feature}
                className="w-2 h-2 rounded-full"
                style={getAccentStyle()}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 0%, hsla(320, 85%, 55%, 0.15) 0%, transparent 50%)",
        }}
        animate={{
          opacity: config.visual_energy > 60 ? 0.8 : 0.3,
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
};
