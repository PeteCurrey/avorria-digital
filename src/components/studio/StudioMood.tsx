import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import type { StudioConfig } from "@/types/studio";

interface StudioMoodProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
}

export const StudioMood = ({ config, setConfig }: StudioMoodProps) => {
  const palettes = [
    { value: "light" as const, label: "Light" },
    { value: "dark" as const, label: "Dark" },
    { value: "monochrome" as const, label: "Monochrome" },
    { value: "gradient" as const, label: "Gradient-forward" },
  ];

  return (
    <div>
      <h2 className="mb-3 text-3xl font-extralight tracking-tight text-foreground">
        Look & Mood
      </h2>
      <p className="mb-10 text-lg font-extralight text-muted-foreground">
        Define the visual personality and tone of the design.
      </p>

      <div className="space-y-10">
        {/* Minimal to Content-rich */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-extralight text-muted-foreground">Minimal</span>
            <span className="text-sm font-extralight text-muted-foreground">Content-rich</span>
          </div>
          <Slider
            value={[config.minimal]}
            onValueChange={(value) => setConfig({ ...config, minimal: value[0] })}
            max={100}
            step={1}
            className="mb-2"
          />
        </div>

        {/* Calm to Bold */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-extralight text-muted-foreground">Calm</span>
            <span className="text-sm font-extralight text-muted-foreground">Bold</span>
          </div>
          <Slider
            value={[config.bold]}
            onValueChange={(value) => setConfig({ ...config, bold: value[0] })}
            max={100}
            step={1}
            className="mb-2"
          />
        </div>

        {/* Palette */}
        <div>
          <label className="mb-4 block text-sm font-extralight text-muted-foreground">
            Color Palette
          </label>
          <div className="grid grid-cols-2 gap-3">
            {palettes.map((palette, index) => (
              <motion.button
                key={palette.value}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setConfig({ ...config, palette: palette.value })}
                className={`rounded-lg border-2 p-4 text-center font-extralight transition-all ${
                  config.palette === palette.value
                    ? "border-accent bg-accent/5"
                    : "border-border bg-background hover:border-accent/30 hover:bg-secondary"
                }`}
              >
                {palette.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
