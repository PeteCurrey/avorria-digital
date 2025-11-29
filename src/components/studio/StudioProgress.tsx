import { motion } from "framer-motion";

interface StudioProgressProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Purpose",
  "Look & Feel",
  "Structure",
  "Features",
  "Personality",
  "Blueprint"
];

export const StudioProgress = ({ currentStep, totalSteps }: StudioProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[hsl(220,25%,8%)]/80 backdrop-blur-lg border-b border-white/5">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-white/40 text-sm font-light">Step {currentStep} of {totalSteps}</span>
            <span className="text-white text-sm font-extralight">·</span>
            <span className="text-white text-sm font-light">{stepLabels[currentStep - 1]}</span>
          </div>
          <span className="text-white/60 text-xs font-light tracking-wider uppercase">Web Studio</span>
        </div>
        <div className="relative h-0.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[hsl(320,85%,55%)] to-[hsl(260,75%,60%)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>
    </div>
  );
};
