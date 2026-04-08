import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import type { StudioConfig } from "@/types/studio";

interface StudioStructureProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
}

export const StudioStructure = ({ config, setConfig }: StudioStructureProps) => {
  const sizes = [
    {
      value: "lean" as const,
      label: "Lean",
      description: "Home + 3â€“5 key pages",
    },
    {
      value: "standard" as const,
      label: "Standard",
      description: "6â€“10 pages",
    },
    {
      value: "expanded" as const,
      label: "Expanded",
      description: "Multi-service, multi-location, resources, tools",
    },
  ];

  const modules = [
    "Case studies",
    "Resources / guides",
    "Pricing",
    "Locations",
    "Tools & calculators",
    "Client login / portal",
  ];

  const toggleModule = (module: string) => {
    const newModules = config.modules.includes(module)
      ? config.modules.filter((m) => m !== module)
      : [...config.modules, module];
    setConfig({ ...config, modules: newModules });
  };

  return (
    <div>
      <h2 className="mb-3 text-3xl font-extralight tracking-tight text-foreground">
        Structure
      </h2>
      <p className="mb-10 text-lg font-extralight text-muted-foreground">
        Define the scope and modules your site will include.
      </p>

      <div className="space-y-10">
        {/* Site Size */}
        <div>
          <label className="mb-4 block text-sm font-extralight text-muted-foreground">
            Site Size
          </label>
          <div className="grid gap-3">
            {sizes.map((size, index) => (
              <motion.button
                key={size.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setConfig({ ...config, siteSize: size.value })}
                className={`rounded-lg border-2 p-4 text-left transition-all ${
                  config.siteSize === size.value
                    ? "border-accent bg-accent/5"
                    : "border-border bg-background hover:border-accent/30 hover:bg-secondary"
                }`}
              >
                <div className="mb-1 font-extralight text-foreground">{size.label}</div>
                <div className="text-sm font-extralight text-muted-foreground">
                  {size.description}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div>
          <label className="mb-4 block text-sm font-extralight text-muted-foreground">
            Additional Modules
          </label>
          <div className="space-y-3">
            {modules.map((module, index) => (
              <motion.div
                key={module}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-3 rounded-lg border p-4 transition-colors hover:bg-secondary"
              >
                <Checkbox
                  id={module}
                  checked={config.modules.includes(module)}
                  onCheckedChange={() => toggleModule(module)}
                />
                <label
                  htmlFor={module}
                  className="flex-1 cursor-pointer font-extralight text-foreground"
                >
                  {module}
                </label>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
