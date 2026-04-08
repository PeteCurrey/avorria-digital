'use client';
import Navigate from '@/components/Navigate';
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface StudioNavProps {
  currentStep: number;
  totalSteps: number;
  onExit?: () => void;
}

export const StudioNav = ({ currentStep, totalSteps, onExit }: StudioNavProps) => {
  const router = useRouter();

  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      router.push("/web-design/studio");
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 right-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-6 py-3 backdrop-blur-xl">
          {/* Back Button */}
          <button
            onClick={handleExit}
            className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Studio</span>
          </button>

          {/* Step Progress */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-light text-white/40 uppercase tracking-wider">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "bg-accent scale-125"
                      : index < currentStep
                      ? "bg-accent/50"
                      : "bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Exit Button */}
          <button
            onClick={handleExit}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-all hover:border-white/20 hover:text-white"
          >
            <span className="hidden sm:inline">Exit</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-accent/50"
        />
      </div>
    </motion.nav>
  );
};

export default StudioNav;


