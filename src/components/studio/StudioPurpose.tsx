import { motion } from "framer-motion";
import type { StudioConfig } from "@/types/studio";

interface StudioPurposeProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
}

export const StudioPurpose = ({ config, setConfig }: StudioPurposeProps) => {
  const purposes = [
    {
      value: "lead-generation" as const,
      label: "Lead-generation site",
      description: "Focused on capturing and converting visitors into leads",
    },
    {
      value: "content-hub" as const,
      label: "Authority / content hub",
      description: "Resource library, guides, and thought leadership",
    },
    {
      value: "product-saas" as const,
      label: "Product / SaaS marketing site",
      description: "Feature showcase and conversion-optimised for products",
    },
    {
      value: "service-portal" as const,
      label: "Service platform / portal",
      description: "Multi-area navigation for diverse service offerings",
    },
  ];

  return (
    <div>
      <h2 className="mb-3 text-3xl font-extralight tracking-tight text-foreground">
        What job does this website need to do?
      </h2>
      <p className="mb-10 text-lg font-extralight text-muted-foreground">
        This defines the core structure and focal points.
      </p>

      <div className="grid gap-4">
        {purposes.map((purpose, index) => (
          <motion.button
            key={purpose.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setConfig({ ...config, purpose: purpose.value })}
            className={`group relative overflow-hidden rounded-lg border-2 p-6 text-left transition-all ${
              config.purpose === purpose.value
                ? "border-accent bg-accent/5"
                : "border-border bg-background hover:border-accent/30 hover:bg-secondary"
            }`}
          >
            <h3 className="mb-2 text-lg font-extralight text-foreground">
              {purpose.label}
            </h3>
            <p className="text-sm font-extralight text-muted-foreground">
              {purpose.description}
            </p>
            {config.purpose === purpose.value && (
              <motion.div
                layoutId="purpose-selected"
                className="absolute right-4 top-4 h-2 w-2 rounded-full bg-accent"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
