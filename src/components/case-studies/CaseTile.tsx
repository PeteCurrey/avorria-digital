import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseTileProps {
  caseStudy: CaseStudy;
  index: number;
  onClick?: () => void;
}

export const CaseTile = ({ caseStudy, index, onClick }: CaseTileProps) => {
  const primaryKPI = caseStudy.kpiBadges.find((b) => b.highlight) || caseStudy.kpiBadges[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <Link
        to={`/case-studies/${caseStudy.slug}`}
        onClick={onClick}
        className="group block relative overflow-hidden rounded-2xl bg-[hsl(220,25%,10%)] border border-white/5 hover:border-accent/30 transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={caseStudy.heroMedia.src}
            alt={caseStudy.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,8%)] via-[hsl(220,25%,8%)/0.3] to-transparent" />
          
          {/* KPI Badge */}
          <div className="absolute top-4 right-4 px-4 py-2 bg-accent/90 backdrop-blur-sm rounded-lg">
            <span className="text-white font-semibold">{primaryKPI.value}</span>
          </div>
          
          {/* Hover arrow */}
          <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="text-white" size={20} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60">
              {caseStudy.sector}
            </span>
            {caseStudy.services.slice(0, 2).map((service) => (
              <span
                key={service}
                className="px-3 py-1 bg-accent/10 rounded-full text-xs text-accent"
              >
                {service}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-xl font-medium text-white group-hover:text-accent transition-colors line-clamp-2">
            {caseStudy.headline}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-white/50 line-clamp-2">
            {caseStudy.subheadline}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-xs text-white/40">{caseStudy.timeframe}</span>
            <span className="text-xs text-white/40">{caseStudy.year}</span>
          </div>
        </div>
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>
      </Link>
    </motion.div>
  );
};
