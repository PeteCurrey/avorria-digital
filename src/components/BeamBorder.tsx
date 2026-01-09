import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BeamBorderProps {
  children: ReactNode;
  className?: string;
  beamClassName?: string;
  duration?: number;
}

export function BeamBorder({ 
  children, 
  className,
  beamClassName,
  duration = 3
}: BeamBorderProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Animated beam border */}
      <div 
        className={cn(
          "absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-r from-transparent via-accent to-transparent",
          "animate-beam",
          beamClassName
        )}
        style={{
          backgroundSize: "200% 100%",
          animationDuration: `${duration}s`,
        }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute -inset-[2px] rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)",
          backgroundSize: "200% 100%",
          animation: `beam ${duration}s linear infinite`,
        }}
      />
      
      {/* Content container */}
      <div className="relative bg-card rounded-lg border border-border">
        {children}
      </div>
    </div>
  );
}

// Static beam border variant - always visible
export function StaticBeamBorder({ 
  children, 
  className,
  duration = 4
}: BeamBorderProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Always visible animated beam */}
      <div 
        className="absolute -inset-[1px] rounded-lg animate-beam"
        style={{
          background: "linear-gradient(90deg, transparent 0%, hsl(var(--accent) / 0.5) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animationDuration: `${duration}s`,
        }}
      />
      
      {/* Glow */}
      <div 
        className="absolute -inset-[2px] rounded-lg opacity-20 blur-sm"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--accent)), transparent)",
          backgroundSize: "200% 100%",
          animation: `beam ${duration}s linear infinite`,
        }}
      />
      
      {/* Content */}
      <div className="relative bg-card rounded-lg border border-border">
        {children}
      </div>
    </div>
  );
}