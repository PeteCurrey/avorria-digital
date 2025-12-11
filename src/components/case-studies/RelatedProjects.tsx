import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

interface RelatedProjectsProps {
  projects: CaseStudy[];
  onProjectClick?: (slug: string) => void;
}

export const RelatedProjects = ({ projects, onProjectClick }: RelatedProjectsProps) => {
  if (projects.length === 0) return null;

  return (
    <section className="py-20 px-6 section-dark border-t border-white/5">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">
            More Work
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white">
            Related Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/case-studies/${project.slug}`}
                onClick={() => onProjectClick?.(project.slug)}
                className="group block"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                  <img
                    src={project.heroMedia.src}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,8%)/0.6] to-transparent" />
                  
                  {/* KPI badge */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-accent/90 backdrop-blur-sm rounded-lg">
                    <span className="text-white text-sm font-medium">
                      {project.kpiBadges[0]?.value}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {project.services.slice(0, 2).map((service) => (
                      <span
                        key={service}
                        className="text-xs text-white/50"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-medium text-white group-hover:text-accent transition-colors">
                    {project.headline}
                  </h3>
                  <div className="inline-flex items-center text-accent text-sm font-medium group-hover:gap-2 gap-1 transition-all">
                    View project
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
