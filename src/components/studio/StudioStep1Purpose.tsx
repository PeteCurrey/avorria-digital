import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { StudioConfig } from "@/pages/WebDesignStudio";

interface StudioStep1PurposeProps {
  config: StudioConfig;
  updateConfig: (updates: Partial<StudioConfig>) => void;
  onNext: () => void;
}

const purposes = [
  {
    id: "lead_generation",
    title: "Lead generation & enquiries",
    description: "Capture quality leads with clear CTAs and conversion flows",
  },
  {
    id: "authority_hub",
    title: "Authority / content hub",
    description: "Build trust through valuable content and thought leadership",
  },
  {
    id: "product_saas",
    title: "Product / SaaS marketing",
    description: "Showcase features and drive sign-ups or demos",
  },
  {
    id: "service_platform",
    title: "Service platform / portal",
    description: "Enable client access, bookings, and service delivery",
  },
  {
    id: "ecommerce",
    title: "E-commerce / booking",
    description: "Sell products or services with transactional experiences",
  },
];

export const StudioStep1Purpose = ({ config, updateConfig, onNext }: StudioStep1PurposeProps) => {
  const handleSelect = (purposeId: string) => {
    updateConfig({ purpose: purposeId });
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
          First: what job does your website need to do?
        </h1>
        <p className="text-white/60 text-lg font-light">
          Every design decision flows from this. Choose one primary goal.
        </p>
      </div>

      <div className="space-y-4">
        {purposes.map((purpose) => (
          <motion.button
            key={purpose.id}
            onClick={() => handleSelect(purpose.id)}
            className={`w-full text-left p-6 rounded-xl border transition-all ${
              config.purpose === purpose.id
                ? "bg-white/10 border-[hsl(320,85%,55%)] shadow-[0_0_30px_-5px_hsla(320,85%,55%,0.3)]"
                : "bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-xl font-light text-white mb-2">{purpose.title}</h3>
            <p className="text-white/60 text-sm font-light">{purpose.description}</p>
          </motion.button>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={!config.purpose}
          size="lg"
          className="bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(260,75%,60%)] text-white font-light hover:shadow-[0_0_30px_-5px_hsla(320,85%,55%,0.5)] disabled:opacity-40"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
};
