import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import type { StudioConfig } from "@/pages/WebDesignStudio";

interface StudioStep5PersonalityProps {
  config: StudioConfig;
  updateConfig: (updates: Partial<StudioConfig>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StudioStep5Personality = ({ config, updateConfig, onNext, onBack }: StudioStep5PersonalityProps) => {
  const getPersonalitySummary = () => {
    const formality = config.brand_formality > 60 ? "Polished" : config.brand_formality < 40 ? "Straight-talking" : "Balanced";
    const voice = config.brand_voice > 60 ? "Story-driven" : config.brand_voice < 40 ? "Analytical" : "Mixed";
    const feel = config.brand_feel > 60 ? "Showpiece" : config.brand_feel < 40 ? "Understated" : "Refined";
    
    return `${formality}, ${voice}, ${feel}`;
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
          How should your brand come across?
        </h1>
        <p className="text-white/60 text-lg font-light">
          This shapes copy tone, visual treatment and overall attitude.
        </p>
      </div>

      <div className="space-y-8">
        {/* Formality slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-white text-sm font-light">Tone formality</label>
            <div className="flex gap-8 text-white/40 text-xs font-light">
              <span>Straight-talking</span>
              <span>Polished</span>
            </div>
          </div>
          <Slider
            value={[config.brand_formality]}
            onValueChange={([value]) => updateConfig({ brand_formality: value })}
            min={0}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white/20"
          />
        </div>

        {/* Voice slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-white text-sm font-light">Content voice</label>
            <div className="flex gap-8 text-white/40 text-xs font-light">
              <span>Analytical</span>
              <span>Story-driven</span>
            </div>
          </div>
          <Slider
            value={[config.brand_voice]}
            onValueChange={([value]) => updateConfig({ brand_voice: value })}
            min={0}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white/20"
          />
        </div>

        {/* Feel slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <label className="text-white text-sm font-light">Visual presence</label>
            <div className="flex gap-8 text-white/40 text-xs font-light">
              <span>Understated</span>
              <span>Showpiece</span>
            </div>
          </div>
          <Slider
            value={[config.brand_feel]}
            onValueChange={([value]) => updateConfig({ brand_feel: value })}
            min={0}
            max={100}
            step={1}
            className="[&_[role=slider]]:bg-white [&_[role=slider]]:border-white/20"
          />
        </div>

        {/* Personality summary */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-white/60 text-sm font-light mb-2">Brand personality summary:</p>
          <p className="text-white text-lg font-light">{getPersonalitySummary()}</p>
        </div>

        {/* Notes */}
        <div className="space-y-3">
          <label className="text-white text-sm font-light">
            Any notes, examples or competitors we should know about?
          </label>
          <Textarea
            value={config.brand_notes}
            onChange={(e) => updateConfig({ brand_notes: e.target.value })}
            placeholder="Optional: share inspiration, competitors, or specific preferences..."
            className="bg-white/5 border-white/10 text-white placeholder:text-white/30 min-h-32 font-light focus:border-[hsl(320,85%,55%)] focus:ring-[hsl(320,85%,55%)]"
          />
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
          size="lg"
          className="bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(260,75%,60%)] text-white font-light hover:shadow-[0_0_30px_-5px_hsla(320,85%,55%,0.5)]"
        >
          Review Blueprint
        </Button>
      </div>
    </motion.div>
  );
};
