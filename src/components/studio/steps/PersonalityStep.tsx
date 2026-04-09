import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import type { StudioConfig } from "@/types/studio";

interface PersonalityStepProps {
  config: StudioConfig;
  setConfig: (config: StudioConfig) => void;
  onSliderCommit?: () => void;
}

export const PersonalityStep = ({ config, setConfig, onSliderCommit }: PersonalityStepProps) => {
  // Generate sample headline based on personality settings
  const getSampleHeadline = () => {
    if (config.straightTalking > 70) {
      return "We build websites that make money. Period.";
    } else if (config.straightTalking > 40) {
      return "Transform your digital presence with strategic web design.";
    } else {
      return "Crafting exquisite digital experiences that elevate brands to new heights.";
    }
  };

  const getSampleCTA = () => {
    if (config.straightTalking > 70) {
      return "Get Started";
    } else if (config.straightTalking > 40) {
      return "Schedule a Consultation";
    } else {
      return "Begin Your Journey";
    }
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
          How should it <span className="text-accent">speak</span>?
        </h2>
        <p className="mx-auto max-w-lg text-lg font-extralight text-white/60">
          Define the voice and personality of your brand's communication.
        </p>
      </motion.div>

      <div className="mx-auto w-full max-w-3xl space-y-12">
        {/* Live Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8"
        >
          <p className="mb-2 text-xs font-light text-white/40 uppercase tracking-wider">
            Live Preview
          </p>
          <motion.h3
            key={getSampleHeadline()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 text-2xl font-light text-white"
          >
            {getSampleHeadline()}
          </motion.h3>
          <motion.button
            key={getSampleCTA()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-full bg-accent px-6 py-2 text-sm font-medium text-accent-foreground"
          >
            {getSampleCTA()}
          </motion.button>
        </motion.div>

        {/* Personality Sliders */}
        <div className="space-y-10">
          {/* Straight-talking †” Polished */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-light text-white">Straight-talking</p>
                <p className="text-xs text-white/40">Direct, no-nonsense language</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-light text-white">Polished</p>
                <p className="text-xs text-white/40">Refined, sophisticated prose</p>
              </div>
            </div>
            <Slider
              value={[config.straightTalking]}
              onValueChange={(value) => setConfig({ ...config, straightTalking: value[0] })}
              onValueCommit={onSliderCommit}
              max={100}
              step={1}
              className="w-full"
            />
          </motion.div>

          {/* Analytical †” Story-led */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-light text-white">Analytical</p>
                <p className="text-xs text-white/40">Data-driven, logical</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-light text-white">Story-led</p>
                <p className="text-xs text-white/40">Narrative, emotional</p>
              </div>
            </div>
            <Slider
              value={[config.analytical]}
              onValueChange={(value) => setConfig({ ...config, analytical: value[0] })}
              onValueCommit={onSliderCommit}
              max={100}
              step={1}
              className="w-full"
            />
          </motion.div>

          {/* Understated †” Showpiece */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-sm font-light text-white">Understated</p>
                <p className="text-xs text-white/40">Let the work speak</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-light text-white">Showpiece</p>
                <p className="text-xs text-white/40">Bold, attention-grabbing</p>
              </div>
            </div>
            <Slider
              value={[config.understated]}
              onValueChange={(value) => setConfig({ ...config, understated: value[0] })}
              onValueCommit={onSliderCommit}
              max={100}
              step={1}
              className="w-full"
            />
          </motion.div>
        </div>

        {/* Additional Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <label className="block text-sm font-light text-white/60">
            Additional Notes
          </label>
          <Textarea
            value={config.notes}
            onChange={(e) => setConfig({ ...config, notes: e.target.value })}
            placeholder="Any specific requirements, inspirations, or brand guidelines we should know about..."
            className="min-h-[120px] resize-none border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-accent"
          />
          <p className="text-xs text-white/40">
            Share examples of websites you admire, specific functionality needs, or brand voice guidelines.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalityStep;
