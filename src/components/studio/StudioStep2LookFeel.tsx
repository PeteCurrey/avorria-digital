import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import type { StudioConfig } from "@/pages/WebDesignStudio";

interface StudioStep2LookFeelProps {
  config: StudioConfig;
  updateConfig: (updates: Partial<StudioConfig>) => void;
  onNext: () => void;
  onBack: () => void;
}

const palettes = [
  { id: "light", label: "Light", description: "Clean, open backgrounds" },
  { id: "dark", label: "Dark", description: "Bold, immersive feel" },
  { id: "monochrome", label: "Monochrome", description: "Minimal contrast" },
  { id: "gradient", label: "Gradient", description: "Dynamic accents" },
];

export const StudioStep2LookFeel = ({ config, updateConfig, onNext, onBack }: StudioStep2LookFeelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-5xl font-extralight text-white mb-4 leading-tight">
          How should it look and feel?
        </h1>
        <p className="text-white/60 text-lg font-light">
          Set the visual mood. This shapes layout density, energy and tone.
        </p>
      </div>

      <div className="space-y-8">
        {/* Layout density slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-white text-sm font-light">Layout density</label>
            <div className="flex gap-8 text-white/40 text-xs font-light">
              <span>Minimal</span>
              <span>Content-rich</span>
            </div>
          </div>
          <Slider
            value={[config.visual_layout_density]}
            onValueChange={([value]) => updateConfig({ visual_layout_density: value })}
            min={0}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white/20"
          />
        </div>

        {/* Energy slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-white text-sm font-light">Visual energy</label>
            <div className="flex gap-8 text-white/40 text-xs font-light">
              <span>Calm</span>
              <span>Bold</span>
            </div>
          </div>
          <Slider
            value={[config.visual_energy]}
            onValueChange={([value]) => updateConfig({ visual_energy: value })}
            min={0}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white/20"
          />
        </div>

        {/* Palette selection */}
        <div className="space-y-4">
          <label className="text-white text-sm font-light">Color approach</label>
          <div className="grid grid-cols-2 gap-3">
            {palettes.map((palette) => (
              <button
                key={palette.id}
                onClick={() => updateConfig({ palette: palette.id })}
                className={`p-4 rounded-lg border text-left transition-all ${
                  config.palette === palette.id
                    ? "bg-white/10 border-[hsl(320,85%,55%)] shadow-[0_0_20px_-5px_hsla(320,85%,55%,0.3)]"
                    : "bg-white/5 border-white/10 hover:bg-white/8"
                }`}
              >
                <div className="text-white text-sm font-light mb-1">{palette.label}</div>
                <div className="text-white/50 text-xs font-light">{palette.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="lg"
          className="text-white/60 hover:text-white hover:bg-white/10 font-light"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          className="bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(260,75%,60%)] text-white font-light hover:shadow-[0_0_30px_-5px_hsla(320,85%,55%,0.5)]"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};
