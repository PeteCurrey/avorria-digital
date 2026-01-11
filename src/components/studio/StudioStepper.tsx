import { motion } from "framer-motion";

interface Step {
  id: string;
  label: string;
  number: string;
}

interface StudioStepperProps {
  steps: Step[];
  activeStep: number;
  onStepClick: (index: number) => void;
  isVisible: boolean;
}

export const StudioStepper = ({ steps, activeStep, onStepClick, isVisible }: StudioStepperProps) => {
  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -20,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-20 z-30 -mx-4 px-4 py-6"
    >
      {/* Glass background */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.06] bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-black/40" />

      <div className="relative">
        {/* Step indicators */}
        <div className="flex items-center justify-between px-2">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isComplete = index < activeStep;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                {/* Step button */}
                <button
                  onClick={() => onStepClick(index)}
                  className="group relative flex flex-col items-center gap-3"
                >
                  {/* Step number circle */}
                  <motion.div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                      isActive
                        ? "border-sky-400 bg-sky-400/10 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                        : isComplete
                        ? "border-sky-500/50 bg-sky-500/20"
                        : "border-slate-700/50 bg-slate-900/50 group-hover:border-slate-600"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isComplete ? (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-4 w-4 text-sky-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    ) : (
                      <span
                        className={`text-xs font-medium tracking-wide transition-colors ${
                          isActive ? "text-sky-300" : "text-slate-500"
                        }`}
                      >
                        {step.number}
                      </span>
                    )}

                    {/* Active pulse ring */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full border border-sky-400/50"
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Step label */}
                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.15em] transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : isComplete
                        ? "text-slate-400"
                        : "text-slate-600 group-hover:text-slate-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>

                {/* Connector line */}
                {!isLast && (
                  <div className="relative mx-3 h-px flex-1 bg-slate-800/50">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-sky-500/70 to-emerald-500/50"
                      initial={{ width: "0%" }}
                      animate={{ width: isComplete ? "100%" : isActive ? "50%" : "0%" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Overall progress bar */}
        <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-800/50">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Progress text */}
        <div className="mt-3 flex items-center justify-between text-[10px]">
          <span className="text-slate-500">Configuration Progress</span>
          <span className="font-medium text-sky-400">{Math.round(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
};
