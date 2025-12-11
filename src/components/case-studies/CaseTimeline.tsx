import { motion } from "framer-motion";
import type { CaseTimelineStep } from "@/data/caseStudies";

interface CaseTimelineProps {
  steps: CaseTimelineStep[];
}

export const CaseTimeline = ({ steps }: CaseTimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-accent/50 to-transparent hidden md:block" />

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="relative pl-0 md:pl-20"
          >
            {/* Timeline dot */}
            <div className="absolute left-6 top-2 hidden md:flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-accent/20 border-2 border-accent" />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.3 }}
                className="absolute w-8 h-8 rounded-full bg-accent/10"
              />
            </div>

            {/* Content card */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-accent/30 transition-colors">
              {/* Phase badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                  {step.phase}
                </span>
                {step.duration && (
                  <span className="text-xs text-white/40">{step.duration}</span>
                )}
              </div>

              {/* Title */}
              <h4 className="text-xl font-medium text-white mb-3">{step.title}</h4>

              {/* Description */}
              <p className="text-white/60 leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
