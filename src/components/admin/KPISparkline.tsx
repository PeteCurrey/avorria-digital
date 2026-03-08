import React from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

interface KPISparklineProps {
  data: number[];
  color?: string;
  height?: number;
}

const KPISparkline = ({ data, color = "hsl(var(--accent))", height = 32 }: KPISparklineProps) => {
  if (!data || data.length < 2) return null;

  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`sparkGrad-${color.replace(/[^a-z0-9]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#sparkGrad-${color.replace(/[^a-z0-9]/gi, "")})`}
            dot={false}
            isAnimationActive={true}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KPISparkline;
