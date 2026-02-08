import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import type { StudioConfig } from "@/types/studio";

interface AestheticStepProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
  onSliderCommit?: () => void;
}

const palettes = [
  { value: "light" as const, label: "Light", colors: ["#ffffff", "#f8fafc", "#e2e8f0", "#94a3b8"] },
  { value: "dark" as const, label: "Dark", colors: ["#0f172a", "#1e293b", "#334155", "#64748b"] },
  { value: "monochrome" as const, label: "Mono", colors: ["#000000", "#262626", "#525252", "#a3a3a3"] },
  { value: "gradient" as const, label: "Gradient", colors: ["#6366f1", "#8b5cf6", "#d946ef", "#f43f5e"] },
];

export const AestheticStep = ({ config, setConfig, onSliderCommit }: AestheticStepProps) => {
  return (
    <div className="flex min-h-full flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 text-center"
      >
        <h2 className="mb-4 text-4xl font-extralight tracking-tight text-white md:text-5xl">
          How should it <span className="text-accent">feel</span>?
        </h2>
        <p className="mx-auto max-w-lg text-lg font-extralight text-white/60">
          Define the visual energy and palette that represents your brand.
        </p>
      </motion.div>

      <div className="mx-auto w-full max-w-2xl space-y-12">
        {/* Minimal ↔ Bold Spectrum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-white/60">Minimal</span>
            <span className="text-xs text-white/40">Visual Density</span>
            <span className="text-sm font-light text-white/60">Bold</span>
          </div>
          
          <div className="relative">
            <Slider
              value={[config.minimal]}
              onValueChange={(value) => setConfig({ ...config, minimal: value[0] })}
              onValueCommit={onSliderCommit}
              max={100}
              step={1}
              className="w-full"
            />
            {/* Visual Indicator */}
            <div className="mt-4 flex justify-between">
              <motion.div
                animate={{ opacity: config.minimal < 30 ? 1 : 0.3 }}
                className="text-center"
              >
                <div className="mx-auto mb-2 h-12 w-20 rounded border border-white/10 bg-white/5" />
                <span className="text-xs text-white/40">Clean</span>
              </motion.div>
              <motion.div
                animate={{ opacity: config.minimal > 30 && config.minimal < 70 ? 1 : 0.3 }}
                className="text-center"
              >
                <div className="mx-auto mb-2 grid h-12 w-20 grid-cols-2 gap-1 rounded border border-white/10 bg-white/5 p-1">
                  <div className="rounded bg-white/10" />
                  <div className="rounded bg-white/20" />
                </div>
                <span className="text-xs text-white/40">Balanced</span>
              </motion.div>
              <motion.div
                animate={{ opacity: config.minimal > 70 ? 1 : 0.3 }}
                className="text-center"
              >
                <div className="mx-auto mb-2 grid h-12 w-20 grid-cols-3 gap-0.5 rounded border border-white/10 bg-white/5 p-1">
                  <div className="rounded bg-white/10" />
                  <div className="rounded bg-white/20" />
                  <div className="rounded bg-white/30" />
                  <div className="rounded bg-white/20" />
                  <div className="rounded bg-white/10" />
                  <div className="rounded bg-white/30" />
                </div>
                <span className="text-xs text-white/40">Dense</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Calm ↔ Energetic Spectrum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-white/60">Calm</span>
            <span className="text-xs text-white/40">Energy Level</span>
            <span className="text-sm font-light text-white/60">Energetic</span>
          </div>
          
          <Slider
            value={[config.bold]}
            onValueChange={(value) => setConfig({ ...config, bold: value[0] })}
            onValueCommit={onSliderCommit}
            max={100}
            step={1}
            className="w-full"
          />

          {/* Energy Preview */}
          <div className="flex items-center justify-center gap-4">
            <motion.div
              animate={{ 
                scale: [1, 1 + (config.bold / 500), 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2 - (config.bold / 100),
                ease: "easeInOut"
              }}
              className="h-3 w-3 rounded-full bg-accent"
            />
            <span className="text-sm text-white/40">
              {config.bold < 30 ? "Serene & Composed" : config.bold < 70 ? "Dynamic & Engaging" : "Bold & Vibrant"}
            </span>
          </div>
        </motion.div>

        {/* Color Palette Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="text-center">
            <span className="text-sm font-light text-white/60">Color Palette</span>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {palettes.map((palette) => (
              <motion.button
                key={palette.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setConfig({ ...config, palette: palette.value })}
                className={`group relative overflow-hidden rounded-xl border-2 p-4 transition-all ${
                  config.palette === palette.value
                    ? "border-accent bg-accent/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {/* Color Swatches */}
                <div className="mb-3 flex gap-1">
                  {palette.colors.map((color, i) => (
                    <div
                      key={i}
                      className="h-8 flex-1 rounded transition-transform first:rounded-l-lg last:rounded-r-lg group-hover:scale-y-110"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <span className="text-sm font-light text-white/80">{palette.label}</span>

                {config.palette === palette.value && (
                  <motion.div
                    layoutId="palette-indicator"
                    className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AestheticStep;
