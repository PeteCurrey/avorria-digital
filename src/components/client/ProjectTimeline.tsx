import React from "react";
import { format } from "date-fns";
import { 
  Search, 
  Palette, 
  Code, 
  CheckCircle2, 
  Rocket,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStage {
  id: string;
  label: string;
  icon: React.ElementType;
  date?: string;
}

interface ProjectTimelineProps {
  status: string;
  startDate?: string;
  targetLaunchDate?: string;
  launchedAt?: string;
}

const stages: TimelineStage[] = [
  { id: "discovery", label: "Discovery", icon: Search },
  { id: "in_progress", label: "Design & Build", icon: Palette },
  { id: "review", label: "Review", icon: CheckCircle2 },
  { id: "launched", label: "Launched", icon: Rocket },
  { id: "maintenance", label: "Maintenance", icon: Settings },
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
}: ProjectTimelineProps) => {
  const currentIndex = getStageIndex(status);

  return (
    <div className="w-full py-4">
      {/* Mobile view */}
      <div className="flex flex-col gap-2 md:hidden">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isPending = index > currentIndex;

          return (
            <div
              key={stage.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg transition-all",
                isCurrent && "bg-primary/10 border border-primary/30",
                isComplete && "opacity-60",
                isPending && "opacity-40"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  isComplete && "bg-accent/20 text-accent",
                  isCurrent && "bg-primary text-primary-foreground",
                  isPending && "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
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
                  <p className="text-xs text-muted-foreground">
                    Launched {format(new Date(launchedAt), "MMM d, yyyy")}
                  </p>
                )}
              </div>
              {isComplete && (
                <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-500"
              style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
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
                <div
                  key={stage.id}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / stages.length}%` }}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all",
                      isComplete && "bg-accent/20 text-accent border-2 border-accent/30",
                      isCurrent && "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110",
                      isPending && "bg-card text-muted-foreground border-2 border-border"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p
                    className={cn(
                      "mt-3 text-sm font-medium text-center",
                      isCurrent && "text-primary",
                      isPending && "text-muted-foreground"
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
                    <p className="text-xs text-accent mt-1">
                      {format(new Date(launchedAt), "MMM d")}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
