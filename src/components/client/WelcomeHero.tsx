import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Eye } from "lucide-react";
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
  discovery: { label: "Discovery Phase", color: "bg-blue-500/20 text-blue-400" },
  in_progress: { label: "Design in Progress", color: "bg-yellow-500/20 text-yellow-400" },
  review: { label: "Ready for Review", color: "bg-purple-500/20 text-purple-400" },
  launched: { label: "Live", color: "bg-green-500/20 text-green-400" },
  maintenance: { label: "Active Maintenance", color: "bg-gray-500/20 text-gray-400" },
};

export const WelcomeHero = ({ 
  userName, 
  clientName, 
  featuredProject,
  hasWebsiteProject = false 
}: WelcomeHeroProps) => {
  const status = featuredProject?.status ? statusLabels[featuredProject.status] : null;

  // If there's a featured web design project, show the visual hero
  if (featuredProject && hasWebsiteProject) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card border border-border"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative p-8 md:p-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Text content */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-4"
              >
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm text-primary font-medium">Your Website Project</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-4xl font-light text-foreground mb-3"
              >
                Welcome back, {userName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-muted-foreground mb-6"
              >
                Your <span className="text-foreground font-medium">{featuredProject.name}</span> project 
                is {status?.label.toLowerCase() || 'in progress'}.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center gap-3"
              >
                {status && (
                  <Badge className={`${status.color} px-3 py-1`}>
                    {status.label}
                  </Badge>
                )}
                <Link to={`/client/projects/${featuredProject.id}`}>
                  <Button className="group">
                    <Eye className="mr-2 h-4 w-4" />
                    View Design Progress
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Featured image placeholder */}
            {featuredProject.featuredImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative"
              >
                <div className="w-full lg:w-80 h-48 lg:h-52 rounded-xl overflow-hidden border border-border shadow-2xl">
                  <img 
                    src={featuredProject.featuredImage} 
                    alt={featuredProject.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-full h-full rounded-xl bg-primary/10 -z-10" />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Default welcome message without featured project
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-light text-foreground mb-2">
        Welcome back, {userName}
      </h1>
      <p className="text-muted-foreground">
        Here's what we're working on and how your numbers are tracking.
      </p>
    </motion.div>
  );
};

export default WelcomeHero;
