import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { StudioConfig } from "@/pages/WebDesignStudio";

interface StudioStep3StructureProps {
  config: StudioConfig;
  updateConfig: (updates: Partial<StudioConfig>) => void;
  onNext: () => void;
  onBack: () => void;
}

const sizes = [
  { id: "lean", label: "Lean", description: "Home + 3–5 key pages" },
  { id: "standard", label: "Standard", description: "Home + 6–10 pages" },
  { id: "expanded", label: "Expanded", description: "Multiple services, locations, resources" },
];

const modules = [
  "Services overview",
  "Individual service pages",
  "Case studies",
  "Resources / guides",
  "Pricing / process",
  "Locations",
  "Tools / calculators",
  "Client portal entry",
];

export const StudioStep3Structure = ({ config, updateConfig, onNext, onBack }: StudioStep3StructureProps) => {
  const toggleModule = (module: string) => {
    const current = config.modules_selected;
    const updated = current.includes(module)
      ? current.filter((m) => m !== module)
      : [...current, module];
    updateConfig({ modules_selected: updated });
  };

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
          How big and structured?
        </h1>
        <p className="text-white/60 text-lg font-light">
          Define the scale and key sections your site needs.
        </p>
      </div>

      <div className="space-y-8">
        {/* Site size */}
        <div className="space-y-4">
          <label className="text-white text-sm font-light">Site size</label>
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size) => (
              <button
                key={size.id}
                onClick={() => updateConfig({ site_size: size.id })}
                className={`p-4 rounded-lg border text-center transition-all ${
                  config.site_size === size.id
                    ? "bg-white/10 border-[hsl(320,85%,55%)] shadow-[0_0_20px_-5px_hsla(320,85%,55%,0.3)]"
                    : "bg-white/5 border-white/10 hover:bg-white/8"
                }`}
              >
                <div className="text-white text-sm font-light mb-1">{size.label}</div>
                <div className="text-white/50 text-xs font-light">{size.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          <label className="text-white text-sm font-light">Key modules</label>
          <div className="grid grid-cols-2 gap-3">
            {modules.map((module) => (
              <button
                key={module}
                onClick={() => toggleModule(module)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  config.modules_selected.includes(module)
                    ? "bg-white/10 border-[hsl(320,85%,55%)]"
                    : "bg-white/5 border-white/10 hover:bg-white/8"
                }`}
              >
                <div className="text-white text-sm font-light">{module}</div>
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
          disabled={!config.site_size}
          size="lg"
          className="bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(260,75%,60%)] text-white font-light hover:shadow-[0_0_30px_-5px_hsla(320,85%,55%,0.5)] disabled:opacity-40"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};
