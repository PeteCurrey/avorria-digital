import { motion } from "framer-motion";
import { Target, BookOpen, Rocket, Layers } from "lucide-react";
import type { StudioConfig } from "@/types/studio";

// Import purpose images
const leadGenImage = "/assets/studio-previews/lead-gen.jpg";
const authorityImage = "/assets/studio-previews/authority.jpg";
const saasImage = "/assets/studio-previews/saas.jpg";
const platformImage = "/assets/studio-previews/platform.jpg";

interface PurposeStepProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
}

const purposes = [
  {
    value: "lead-generation" as const,
    label: "Lead Generation",
    description: "Convert visitors into qualified leads with compelling CTAs and optimized funnels",
    icon: Target,
    image: leadGenImage,
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    value: "content-hub" as const,
    label: "Authority Hub",
    description: "Establish thought leadership with a content-rich resource library",
    icon: BookOpen,
    image: authorityImage,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    value: "product-saas" as const,
    label: "Product / SaaS",
    description: "Showcase features and drive signups for your digital product",
    icon: Rocket,
    image: saasImage,
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    value: "service-portal" as const,
    label: "Service Platform",
    description: "Multi-area navigation for diverse professional service offerings",
    icon: Layers,
    image: platformImage,
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
];

export const PurposeStep = ({ config, setConfig }: PurposeStepProps) => {
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
          What's the <span className="text-accent">mission</span>?
        </h2>
        <p className="mx-auto max-w-lg text-lg font-extralight text-white/60">
          This defines the core structure, user journey, and focal points of your website.
        </p>
      </motion.div>

      {/* Purpose Cards Grid */}
      <div className="grid flex-1 gap-6 md:grid-cols-2">
        {purposes.map((purpose, index) => {
          const Icon = purpose.icon;
          const isSelected = config.purpose === purpose.value;

          return (
            <motion.button
              key={purpose.value}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setConfig({ ...config, purpose: purpose.value })}
              className={`group relative overflow-hidden rounded-2xl border-2 text-left transition-all duration-300 ${
                isSelected
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={purpose.image}
                  alt={purpose.label}
                  className="h-full w-full object-cover opacity-30 transition-all duration-500 group-hover:scale-110 group-hover:opacity-40"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${purpose.gradient}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-end p-6">
                {/* Icon */}
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                    isSelected ? "bg-accent text-accent-foreground" : "bg-white/10 text-white"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Text */}
                <h3 className="mb-2 text-xl font-light text-white">{purpose.label}</h3>
                <p className="text-sm font-extralight text-white/60">{purpose.description}</p>

                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="purpose-indicator"
                    className="absolute right-4 top-4 h-3 w-3 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PurposeStep;
