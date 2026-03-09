import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaLabel?: string;
  format?: "number" | "currency" | "percent";
}

const KPICard = ({ label, value, delta, deltaLabel, format = "number" }: KPICardProps) => {
  const isPositive = delta !== undefined && delta >= 0;
  const showDelta = delta !== undefined;

  const formatValue = (val: string | number) => {
    if (typeof val === "string") return val;
    
    if (format === "currency") {
      return `£${val.toLocaleString()}`;
    } else if (format === "percent") {
      return `${val}%`;
    }
    return val.toLocaleString();
  };

  return (
    <Card className="admin-stat-card border-0 shadow-none">
      <CardContent className="p-6">
        <p className="text-sm text-white/50 mb-2">{label}</p>
        <p className="text-3xl font-light text-white mb-2">
          {formatValue(value)}
        </p>
        {showDelta && (
          <div className="flex items-center gap-1">
            {isPositive ? (
              <ArrowUp className="text-green-500" size={16} />
            ) : (
              <ArrowDown className="text-red-500" size={16} />
            )}
            <span className={`text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {Math.abs(delta)}%
            </span>
            {deltaLabel && (
              <span className="text-xs text-muted-foreground ml-1">{deltaLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;
