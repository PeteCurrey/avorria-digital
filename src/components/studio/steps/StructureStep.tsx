import { motion } from "framer-motion";
import { FileText, Layout, Layers } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { StudioConfig } from "@/types/studio";

interface StructureStepProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
}

const siteSizes = [
  {
    value: "lean" as const,
    label: "Lean",
    pages: "5-7 pages",
    description: "Essential pages for a focused online presence",
    icon: FileText,
    structure: ["Home", "About", "Services", "Contact"],
  },
  {
    value: "standard" as const,
    label: "Standard",
    pages: "10-15 pages",
    description: "Comprehensive site with room to grow",
    icon: Layout,
    structure: ["Home", "About", "Services (3-5)", "Case Studies", "Blog", "Contact"],
  },
  {
    value: "expanded" as const,
    label: "Expanded",
    pages: "20+ pages",
    description: "Full-featured platform with multiple sections",
    icon: Layers,
    structure: ["Home", "About", "Services Hub", "Industry Pages", "Resources", "Case Studies", "Team", "Careers", "Contact"],
  },
];

const modules = [
  { id: "case-studies", label: "Case Studies", description: "Showcase your work and results" },
  { id: "resources", label: "Resources / Blog", description: "Content hub for SEO and authority" },
  { id: "team", label: "Team Profiles", description: "Put faces to your brand" },
  { id: "pricing", label: "Pricing Tables", description: "Transparent pricing display" },
  { id: "faqs", label: "FAQ Section", description: "Answer common questions" },
  { id: "testimonials", label: "Testimonials", description: "Social proof and reviews" },
  { id: "integrations", label: "Integrations Hub", description: "Show tech partnerships" },
  { id: "careers", label: "Careers Page", description: "Attract top talent" },
];

export const StructureStep = ({ config, setConfig }: StructureStepProps) => {
  const toggleModule = (moduleId: string) => {
    const newModules = config.modules.includes(moduleId)
      ? config.modules.filter((m) => m !== moduleId)
      : [...config.modules, moduleId];
    setConfig({ ...config, modules: newModules });
  };

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
          How <span className="text-accent">expansive</span>?
        </h2>
        <p className="mx-auto max-w-lg text-lg font-extralight text-white/60">
          Define the scope and structure of your new website.
        </p>
      </motion.div>

      <div className="mx-auto w-full max-w-4xl space-y-12">
        {/* Site Size Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="mb-6 text-center text-sm font-light text-white/60 uppercase tracking-wider">
            Site Size
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {siteSizes.map((size, index) => {
              const Icon = size.icon;
              const isSelected = config.siteSize === size.value;

              return (
                <motion.button
                  key={size.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setConfig({ ...config, siteSize: size.value })}
                  className={`relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all ${
                    isSelected
                      ? "border-accent bg-accent/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                      isSelected ? "bg-accent text-accent-foreground" : "bg-white/10 text-white"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h4 className="mb-1 text-lg font-light text-white">{size.label}</h4>
                    <p className="text-sm font-medium text-accent">{size.pages}</p>
                  </div>
                  <p className="mb-4 text-sm font-extralight text-white/60">{size.description}</p>

                  {/* Structure Preview */}
                  <div className="space-y-1">
                    {size.structure.slice(0, 4).map((page) => (
                      <div key={page} className="flex items-center gap-2 text-xs text-white/40">
                        <div className="h-1 w-1 rounded-full bg-white/40" />
                        {page}
                      </div>
                    ))}
                    {size.structure.length > 4 && (
                      <div className="text-xs text-white/40">
                        +{size.structure.length - 4} more
                      </div>
                    )}
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="size-indicator"
                      className="absolute right-4 top-4 h-3 w-3 rounded-full bg-accent"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Additional Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="mb-6 text-center text-sm font-light text-white/60 uppercase tracking-wider">
            Additional Modules
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((module, index) => {
              const isSelected = config.modules.includes(module.id);

              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? "border-accent/50 bg-accent/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleModule(module.id)}
                      className="mt-0.5 border-white/30 data-[state=checked]:border-accent data-[state=checked]:bg-accent"
                    />
                    <div>
                      <p className="text-sm font-light text-white">{module.label}</p>
                      <p className="text-xs text-white/40">{module.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Selected Count */}
          {config.modules.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center text-sm text-accent"
            >
              {config.modules.length} module{config.modules.length !== 1 ? "s" : ""} selected
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StructureStep;
