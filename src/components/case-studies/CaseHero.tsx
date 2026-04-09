'use client';
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";
import type { CaseMetric } from "@/data/caseStudies";
import Image from "next/image";

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
  sector
}: CaseHeroProps) => {
  // For lobby pages, keep the original full background media hero
  if (isLobby) {
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
            <div className="relative w-full h-full">
              <Image
                src={backgroundMedia.src}
                alt={headline}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ) : null}
          
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/50 z-10" />
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(220,25%,8%)] via-[hsl(220,25%,8%)/0.85] to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(220,25%,8%)] via-transparent to-[hsl(220,25%,8%)/0.3] z-10" />
          
          {/* Subtle mesh overlay */}
          <div className="absolute inset-0 opacity-40 z-10" style={{ background: 'var(--gradient-mesh)' }} />
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 py-32">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-[1.05]"
            >
              {headline}
            </motion.h1>

            {subheadline && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-white/75 mb-10 max-w-2xl leading-relaxed font-light"
              >
                {subheadline}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button variant="accent" size="lg" asChild className="group">
                <Link href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-white/50 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // For detail pages, use half-page hero with solid background
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30" />
        <div className="absolute -top-1/2 left-1/4 h-96 w-96 rounded-full bg-sky-900/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-emerald-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {(client || sector) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              {sector && (
                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/80">
                  {sector}
                </span>
              )}
              {client && client !== "Confidential" && (
                <span className="text-white/60 text-sm">{client}</span>
              )}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-[1.05]"
          >
            {headline}
          </motion.h1>

          {subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/75 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {subheadline}
            </motion.p>
          )}

          {kpiBadges && kpiBadges.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {kpiBadges.map((badge, index) => (
                <div
                  key={index}
                  className={`px-6 py-4 rounded-xl backdrop-blur-md border ${
                    badge.highlight ? 'bg-sky-500/10 border-sky-500/30' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className={`text-2xl md:text-3xl font-light ${badge.highlight ? 'text-sky-400' : 'text-white'}`}>
                    {badge.value}
                  </div>
                  <h4 className="text-sm text-white/60 mt-1 font-normal">{badge.label}</h4>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button variant="accent" size="lg" asChild className="group">
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

interface CaseHeroImageProps {
  src: string;
  alt?: string;
}

export const CaseHeroImage = ({ src, alt = "Project screenshot" }: CaseHeroImageProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.5, 1]);

  return (
    <section ref={ref} className="relative h-screen w-full snap-start snap-always overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 h-[130%] -top-[15%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30" />
      </motion.div>
    </section>
  );
};
