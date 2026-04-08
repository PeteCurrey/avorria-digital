'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import confetti from "canvas-confetti";
import { 
  Search, 
  Palette, 
  Code, 
  CheckCircle2, 
  Rocket,
  Settings,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStage {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  date?: string;
}

interface ProjectTimelineProps {
  status: string;
  startDate?: string;
  targetLaunchDate?: string;
  launchedAt?: string;
  onStageClick?: (stageId: string) => void;
}

const stages: TimelineStage[] = [
  { 
    id: "discovery", 
    label: "Discovery", 
    icon: Search,
    description: "Understanding your goals, audience, and requirements"
  },
  { 
    id: "in_progress", 
    label: "Design & Build", 
    icon: Palette,
    description: "Creating wireframes, mockups, and developing your site"
  },
  { 
    id: "review", 
    label: "Review", 
    icon: CheckCircle2,
    description: "Your feedback on the design before going live"
  },
  { 
    id: "launched", 
    label: "Launched", 
    icon: Rocket,
    description: "Your new website is live and performing"
  },
  { 
    id: "maintenance", 
    label: "Maintenance", 
    icon: Settings,
    description: "Ongoing updates, support, and optimization"
  },
];

const getStageIndex = (status: string): number => {
  const index = stages.findIndex(s => s.id === status);
  return index >= 0 ? index : 0;
};

export const ProjectTimeline = ({
  status,
  startDate,
  targetLaunchDate,
  launchedAt,
  onStageClick,
}: ProjectTimelineProps) => {
  const currentIndex = getStageIndex(status);
  const [expandedStage, setExpandedStage] = useState<string | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Calculate progress percentage
  const progressPercentage = Math.round((currentIndex / (stages.length - 1)) * 100);

  // Trigger confetti on launched status
  React.useEffect(() => {
    if (status === 'launched' && !hasAnimated) {
      setHasAnimated(true);
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b']
        });
      }, 500);
    }
  }, [status, hasAnimated]);

  const toggleStage = (stageId: string) => {
    setExpandedStage(prev => prev === stageId ? null : stageId);
    onStageClick?.(stageId);
  };

  return (
    <div className="w-full py-4">
      {/* Progress indicator */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">Project Progress</div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            {progressPercentage}%
          </motion.div>
        </div>
        {status === 'launched' && (
          <div className="flex items-center gap-2 text-green-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Congratulations!</span>
          </div>
        )}
      </div>

      {/* Mobile view */}
      <div className="flex flex-col gap-2 md:hidden">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;
          const isExpanded = expandedStage === stage.id;

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleStage(stage.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                  isCurrent && "bg-primary/10 border border-primary/30",
                  isComplete && "opacity-80",
                  isPending && "opacity-50"
                )}
              >
                <motion.div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    isComplete && "bg-green-500/20 text-green-500",
                    isCurrent && "bg-primary text-primary-foreground",
                    isPending && "bg-muted text-muted-foreground"
                  )}
                  animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm font-medium",
                    isCurrent && "text-primary"
                  )}>
                    {stage.label}
                  </p>
                  {isCurrent && stage.id === "discovery" && startDate && (
                    <p className="text-xs text-muted-foreground">
                      Started {format(new Date(startDate), "MMM d, yyyy")}
                    </p>
                  )}
                  {isCurrent && stage.id === "launched" && launchedAt && (
                    <p className="text-xs text-green-600">
                      Launched {format(new Date(launchedAt), "MMM d, yyyy")} ??
                    </p>
                  )}
                </div>
                {isComplete && (
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                )}
                {(isCurrent || isComplete) && (
                  isExpanded ? 
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> :
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 py-3 ml-11 text-sm text-muted-foreground border-l-2 border-border">
                      {stage.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress line background */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-border rounded-full">
            {/* Animated progress line */}
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-primary to-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Stages */}
          <div className="relative flex justify-between">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isComplete = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isPending = index > currentIndex;

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex flex-col items-center cursor-pointer group"
                  style={{ width: `${100 / stages.length}%` }}
                  onClick={() => toggleStage(stage.id)}
                >
                  <motion.div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all",
                      isComplete && "bg-green-500/20 text-green-500 border-2 border-green-500/30",
                      isCurrent && "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
                      isPending && "bg-card text-muted-foreground border-2 border-border"
                    )}
                    animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <Icon className="h-5 w-5" />
                    
                    {/* Completion checkmark overlay */}
                    {isComplete && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <p
                    className={cn(
                      "mt-3 text-sm font-medium text-center transition-colors",
                      isCurrent && "text-primary",
                      isPending && "text-muted-foreground",
                      "group-hover:text-foreground"
                    )}
                  >
                    {stage.label}
                  </p>
                  
                  {stage.id === "discovery" && startDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(startDate), "MMM d")}
                    </p>
                  )}
                  {stage.id === "launched" && targetLaunchDate && !launchedAt && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: {format(new Date(targetLaunchDate), "MMM d")}
                    </p>
                  )}
                  {stage.id === "launched" && launchedAt && (
                    <motion.p 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs text-green-500 mt-1 font-medium"
                    >
                      {format(new Date(launchedAt), "MMM d")} ??
                    </motion.p>
                  )}

                  {/* Hover tooltip */}
                  <div className="hidden group-hover:block absolute mt-16 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg border border-border max-w-[150px] text-center z-20">
                    {stage.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* What's next callout */}
        {currentIndex < stages.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 p-4 rounded-xl bg-muted/50 border border-border"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                {React.createElement(stages[currentIndex + 1].icon, { className: "h-4 w-4 text-primary" })}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Coming Up: {stages[currentIndex + 1].label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stages[currentIndex + 1].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectTimeline;


