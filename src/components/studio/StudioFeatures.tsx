import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import type { StudioConfig } from "@/types/studio";

interface StudioFeaturesProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
}

export const StudioFeatures = ({ config, setConfig }: StudioFeaturesProps) => {
  const features = [
    "Interactive tools & calculators",
    "Content library with filters",
    "Client portal / log-in journeys",
    "Animations & micro-interactions",
    "SEO & migration foundations",
    "Deep analytics & reporting",
  ];

  const toggleFeature = (feature: string) => {
    const newFeatures = config.features.includes(feature)
      ? config.features.filter((f) => f !== feature)
      : [...config.features, feature];
    setConfig({ ...config, features: newFeatures });
  };

  return (
    <div>
      <h2 className="mb-3 text-3xl font-extralight tracking-tight text-foreground">
        Features
      </h2>
      <p className="mb-10 text-lg font-extralight text-muted-foreground">
        Select the advanced capabilities you need.
      </p>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center space-x-3 rounded-lg border p-5 transition-all hover:border-accent/30 hover:bg-secondary"
          >
            <Checkbox
              id={feature}
              checked={config.features.includes(feature)}
              onCheckedChange={() => toggleFeature(feature)}
            />
            <label
              htmlFor={feature}
              className="flex-1 cursor-pointer font-extralight text-foreground"
            >
              {feature}
            </label>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
