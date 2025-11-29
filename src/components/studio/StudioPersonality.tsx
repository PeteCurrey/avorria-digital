import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import type { StudioConfig } from "@/types/studio";

interface StudioPersonalityProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
}

export const StudioPersonality = ({ config, setConfig }: StudioPersonalityProps) => {
  return (
    <div>
      <h2 className="mb-3 text-3xl font-extralight tracking-tight text-foreground">
        Brand Personality
      </h2>
      <p className="mb-10 text-lg font-extralight text-muted-foreground">
        How should this website speak and present itself?
      </p>

      <div className="space-y-10">
        {/* Straight-talking to Polished */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-extralight text-muted-foreground">Straight-talking</span>
            <span className="text-sm font-extralight text-muted-foreground">Polished</span>
          </div>
          <Slider
            value={[config.straightTalking]}
            onValueChange={(value) => setConfig({ ...config, straightTalking: value[0] })}
            max={100}
            step={1}
            className="mb-2"
          />
        </div>

        {/* Analytical to Story-led */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-extralight text-muted-foreground">Analytical</span>
            <span className="text-sm font-extralight text-muted-foreground">Story-led</span>
          </div>
          <Slider
            value={[config.analytical]}
            onValueChange={(value) => setConfig({ ...config, analytical: value[0] })}
            max={100}
            step={1}
            className="mb-2"
          />
        </div>

        {/* Understated to Showpiece */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-extralight text-muted-foreground">Understated</span>
            <span className="text-sm font-extralight text-muted-foreground">Showpiece</span>
          </div>
          <Slider
            value={[config.understated]}
            onValueChange={(value) => setConfig({ ...config, understated: value[0] })}
            max={100}
            step={1}
            className="mb-2"
          />
        </div>

        {/* Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label
            htmlFor="notes"
            className="mb-3 block text-sm font-extralight text-muted-foreground"
          >
            Anything we should know?
          </label>
          <Textarea
            id="notes"
            placeholder="Examples you like, competitors, banned phrases, etc."
            value={config.notes}
            onChange={(e) => setConfig({ ...config, notes: e.target.value })}
            className="min-h-[120px] font-extralight"
          />
        </motion.div>
      </div>
    </div>
  );
};
