import { AlertCircle, CheckCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceCalloutProps {
  type: "tip" | "mistake" | "checklist";
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ResourceCallout = ({ type, title, children, className }: ResourceCalloutProps) => {
  const styles = {
    tip: {
      icon: Lightbulb,
      bgColor: "bg-accent/10",
      borderColor: "border-accent",
      iconColor: "text-accent",
    },
    mistake: {
      icon: AlertCircle,
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive",
      iconColor: "text-destructive",
    },
    checklist: {
      icon: CheckCircle,
      bgColor: "bg-primary/10",
      borderColor: "border-primary",
      iconColor: "text-primary",
    },
  };

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "rounded-lg border-l-4 p-6 my-8",
        style.bgColor,
        style.borderColor,
        className
      )}
    >
      <div className="flex items-start gap-4">
        <Icon className={cn("mt-1 flex-shrink-0", style.iconColor)} size={24} />
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-2">{title}</h4>
          <div className="text-muted-foreground prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCallout;
