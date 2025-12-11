import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { CaseMetric } from "@/data/caseStudies";

interface CaseHeroProps {
  // Lobby hero
  isLobby?: boolean;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  backgroundMedia?: {
    type: 'image' | 'video';
    src: string;
    poster?: string;
  };
  
  // Detail hero
  kpiBadges?: CaseMetric[];
  client?: string;
  sector?: string;
}

export const CaseHero = ({
  isLobby = false,
  headline = "Our Work",
  subheadline,
  ctaText = "Book a strategy call",
  ctaHref = "/contact",
  backgroundMedia,
  kpiBadges,
  client,
  sector,
}: CaseHeroProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {backgroundMedia?.type === 'video' ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundMedia.poster}
            className="w-full h-full object-cover"
          >
            <source src={backgroundMedia.src} type="video/mp4" />
          </video>
        ) : backgroundMedia?.src ? (
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            src={backgroundMedia.src}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : null}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,25%,8%)] via-[hsl(220,25%,8%)/0.85] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,8%)] via-transparent to-[hsl(220,25%,8%)/0.3]" />
        
        {/* Subtle mesh overlay */}
        <div className="absolute inset-0 opacity-40" style={{ background: 'var(--gradient-mesh)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-4xl">
          {/* Breadcrumb/Meta for detail pages */}
          {!isLobby && (client || sector) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              {sector && (
                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/80">
                  {sector}
                </span>
              )}
              {client && client !== "Confidential" && (
                <span className="text-white/60 text-sm">
                  {client}
                </span>
              )}
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.05]"
          >
            {headline}
          </motion.h1>

          {/* Subheadline */}
          {subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/75 mb-10 max-w-2xl leading-relaxed"
            >
              {subheadline}
            </motion.p>
          )}

          {/* KPI Badges for detail pages */}
          {!isLobby && kpiBadges && kpiBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {kpiBadges.map((badge, index) => (
                <div
                  key={index}
                  className={`px-6 py-4 rounded-xl backdrop-blur-md border ${
                    badge.highlight 
                      ? 'bg-accent/20 border-accent/30' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className={`text-3xl md:text-4xl font-light ${badge.highlight ? 'text-accent' : 'text-white'}`}>
                    {badge.value}
                  </div>
                  <div className="text-sm text-white/60 mt-1">{badge.label}</div>
                </div>
              ))}
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="accent" size="lg" asChild className="group">
              <Link to={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
