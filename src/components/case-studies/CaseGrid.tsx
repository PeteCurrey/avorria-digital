import { motion, AnimatePresence } from "framer-motion";
import { CaseTile } from "./CaseTile";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseGridProps {
  cases: CaseStudy[];
  onTileClick?: (slug: string) => void;
}

export const CaseGrid = ({ cases, onTileClick }: CaseGridProps) => {
  return (
    <section className="py-20 px-6 section-dark">
      <div className="container mx-auto">
        <AnimatePresence mode="wait">
          {cases.length > 0 ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {cases.map((caseStudy, index) => (
                <CaseTile
                  key={caseStudy.slug}
                  caseStudy={caseStudy}
                  index={index}
                  onClick={() => onTileClick?.(caseStudy.slug)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl text-white/80 mb-2">No projects match your filters</h3>
              <p className="text-white/50">Try adjusting your filter criteria</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
