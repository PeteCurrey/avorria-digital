import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseTileProps {
  caseStudy: CaseStudy;
  index?: number;
  onClick?: () => void;
}

export const CaseTile = ({ caseStudy, index = 0, onClick }: CaseTileProps) => {
  const primaryKPI = caseStudy.kpiBadges.find((b) => b.highlight) || caseStudy.kpiBadges[0];
  const primaryService = caseStudy.services[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: "easeOut",
      }}
    >
      <Link
        to={`/case-studies/${caseStudy.slug}`}
        onClick={onClick}
        className="group block overflow-hidden rounded-2xl"
      >
        <div className="relative h-56 md:h-72 lg:h-80">
          <img
            src={caseStudy.heroMedia.src}
            alt={caseStudy.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,8%)/0.7] to-[hsl(220,25%,8%)/0.1]" />
          <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">{caseStudy.headline}</h3>
              <p className="mt-1 text-sm text-white/80">{primaryService}</p>
            </div>
            <div className="rounded-full bg-[hsl(220,25%,8%)/0.5] backdrop-blur-sm px-3 py-1 text-xs font-semibold text-accent">
              {primaryKPI.value}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
