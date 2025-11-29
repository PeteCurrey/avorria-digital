import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { StudioConfig } from "@/pages/WebDesignStudio";

interface StudioStep4FeaturesProps {
  config: StudioConfig;
  updateConfig: (updates: Partial<StudioConfig>) => void;
  onNext: () => void;
  onBack: () => void;
}

const features = [
  "Interactive tools & calculators",
  "Content library with filters",
  "Log-in / client portal",
  "Animations & micro-interactions",
  "SEO-ready foundations",
  "Deep analytics integration",
  "Email capture & automation",
  "Multi-language support",
];

export const StudioStep4Features = ({ config, updateConfig, onNext, onBack }: StudioStep4FeaturesProps) => {
  const toggleFeature = (feature: string) => {
    const current = config.features_selected;
    const updated = current.includes(feature)
      ? current.filter((f) => f !== feature)
      : [...current, feature];
    updateConfig({ features_selected: updated });
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
          Which features matter most?
        </h1>
        <p className="text-white/60 text-lg font-light">
          Select all that apply. We'll build in what's needed, not excess.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {features.map((feature) => (
          <button
            key={feature}
            onClick={() => toggleFeature(feature)}
            className={`p-5 rounded-lg border text-left transition-all ${
              config.features_selected.includes(feature)
                ? "bg-white/10 border-[hsl(320,85%,55%)]"
                : "bg-white/5 border-white/10 hover:bg-white/8"
            }`}
          >
            <div className="text-white text-sm font-light">{feature}</div>
          </button>
        ))}
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
