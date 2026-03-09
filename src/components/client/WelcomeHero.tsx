import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Eye, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeaturedProject {
  id: string;
  name: string;
  status: string;
  description?: string;
  featuredImage?: string;
}

interface WelcomeHeroProps {
  userName: string;
  clientName: string;
  featuredProject?: FeaturedProject | null;
  hasWebsiteProject?: boolean;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  discovery: { label: "Discovery Phase", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  in_progress: { label: "Design in Progress", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  review: { label: "Ready for Review", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  launched: { label: "Live", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  maintenance: { label: "Active Maintenance", color: "bg-slate-500/20 text-slate-300 border-slate-500/30" },
};

// Animated particle orbs for cinematic depth
const FloatingOrb = ({ delay = 0, size = 300, x = 0, y = 0, color = "accent" }: {
  delay?: number; size?: number; x?: number; y?: number; color?: string;
}) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: color === "accent"
        ? "radial-gradient(circle, hsl(320 85% 55% / 0.12) 0%, transparent 70%)"
        : "radial-gradient(circle, hsl(260 75% 60% / 0.10) 0%, transparent 70%)",
    }}
    animate={{
      scale: [1, 1.15, 1],
      opacity: [0.6, 1, 0.6],
    }}
    transition={{
      duration: 6 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

// Animated grid lines
const GridLines = () => (
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: `
        linear-gradient(hsl(0 0% 100%) 1px, transparent 1px),
        linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}
  />
);

export const WelcomeHero = ({
  userName,
  clientName,
  featuredProject,
  hasWebsiteProject = false,
}: WelcomeHeroProps) => {
  const status = featuredProject?.status ? statusLabels[featuredProject.status] : null;
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.08]"
      style={{
        background: "linear-gradient(135deg, hsl(220 30% 10%) 0%, hsl(240 25% 12%) 50%, hsl(260 20% 10%) 100%)",
        minHeight: 220,
      }}
    >
      {/* Background layers */}
      <GridLines />
      <FloatingOrb delay={0} size={400} x={-10} y={-30} color="accent" />
      <FloatingOrb delay={2} size={300} x={60} y={20} color="purple" />
      <FloatingOrb delay={4} size={200} x={85} y={-20} color="accent" />

      {/* Top shimmer line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="relative z-10 p-8 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
          {/* Left: Greeting */}
          <div className="flex-1">
            {/* Live indicator */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-xs text-white/40 tracking-widest uppercase">
                {clientName} · Client Portal
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-light text-white mb-2 leading-tight"
            >
              {greeting},{" "}
              <span className="font-semibold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                {userName}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-base mb-6"
            >
              {featuredProject && hasWebsiteProject
                ? <>Your <span className="text-white/70 font-medium">{featuredProject.name}</span> project is {status?.label?.toLowerCase() || "in progress"}.</>
                : "Here's what we're working on and how your numbers are tracking."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              {status && (
                <Badge className={`${status.color} border text-xs px-3 py-1`}>
                  {status.label}
                </Badge>
              )}

              {featuredProject && hasWebsiteProject ? (
                <Link to={`/client/projects/${featuredProject.id}`}>
                  <Button
                    size="sm"
                    className="group bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 hover:border-accent/50 transition-all"
                  >
                    <Eye className="mr-2 h-3.5 w-3.5" />
                    View Design Progress
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              ) : (
                <Link to="/client/analytics">
                  <Button
                    size="sm"
                    className="group bg-white/[0.05] hover:bg-white/[0.08] text-white/60 hover:text-white border border-white/[0.08] transition-all"
                  >
                    <TrendingUp className="mr-2 h-3.5 w-3.5" />
                    View Analytics
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right: Stats strip */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-row lg:flex-col gap-3 lg:min-w-[180px]"
          >
            {[
              { label: "Account Status", value: "Active", sub: "All services running" },
              { label: "This Month", value: "On Track", sub: "KPIs within target" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex-1 lg:flex-none rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
              >
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">{item.label}</p>
                <p className="text-white/90 text-sm font-semibold">{item.value}</p>
                <p className="text-white/30 text-[10px] mt-0.5">{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </motion.div>
  );
};

export default WelcomeHero;
