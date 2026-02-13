import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Target, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight, 
  Minus,
  Loader2
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { useAnalyticsSnapshots, type AnalyticsSnapshot } from "@/hooks/useAnalyticsSnapshots";
import { format, parseISO } from "date-fns";

// Animated counter component
function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
}

interface ClientSEODashboardProps {
  websiteId?: string;
}

export const ClientSEODashboard = ({ websiteId }: ClientSEODashboardProps) => {
  const { data: snapshots, isLoading } = useAnalyticsSnapshots(websiteId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!snapshots || snapshots.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            SEO Performance Dashboard
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your analytics dashboard will activate once your account manager connects your analytics data. Check back soon.
          </p>
        </CardContent>
      </Card>
    );
  }

  const latest = snapshots[0];
  const previous = snapshots.length > 1 ? snapshots[1] : null;

  const pageViewsChange = previous?.page_views && latest.page_views 
    ? Math.round(((latest.page_views - previous.page_views) / previous.page_views) * 100) 
    : 0;
  const visitorsChange = previous?.unique_visitors && latest.unique_visitors 
    ? Math.round(((latest.unique_visitors - previous.unique_visitors) / previous.unique_visitors) * 100) 
    : 0;
  const bounceChange = previous?.bounce_rate && latest.bounce_rate 
    ? Math.round(((latest.bounce_rate - previous.bounce_rate) / previous.bounce_rate) * 100) 
    : 0;

  const kpis = [
    {
      label: "Page Views",
      value: latest.page_views || 0,
      change: pageViewsChange,
      icon: Globe,
      color: "text-primary",
    },
    {
      label: "Unique Visitors",
      value: latest.unique_visitors || 0,
      change: visitorsChange,
      icon: Target,
      color: "text-accent",
    },
    {
      label: "Bounce Rate",
      value: latest.bounce_rate || 0,
      change: bounceChange,
      icon: BarChart3,
      color: "text-orange-500",
      suffix: "%",
      invertChange: true,
    },
  ];

  // Prepare chart data from snapshots (reverse to show oldest first)
  const chartData = [...snapshots].reverse().slice(-12).map((s) => ({
    date: format(parseISO(s.snapshot_date), "MMM d"),
    pageViews: s.page_views || 0,
    visitors: s.unique_visitors || 0,
  }));

  // Top pages from latest snapshot
  const topPages = (latest.top_pages as Array<{ path: string; views: number; change?: number }>) || [];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          const isPositive = kpi.invertChange ? kpi.change < 0 : kpi.change > 0;
          const isNeutral = kpi.change === 0;
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-8 translate-x-8" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`h-5 w-5 ${kpi.color}`} />
                    <span className="text-sm text-muted-foreground">{kpi.label}</span>
                  </div>
                  <p className="text-3xl font-light text-foreground mb-2">
                    <AnimatedCounter value={kpi.value} suffix={kpi.suffix} />
                  </p>
                  <div className="flex items-center gap-1">
                    {isNeutral ? (
                      <Minus className="h-3 w-3 text-muted-foreground" />
                    ) : isPositive ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={`text-xs ${isNeutral ? "text-muted-foreground" : isPositive ? "text-green-500" : "text-red-500"}`}>
                      {kpi.change > 0 ? "+" : ""}{kpi.change}% vs previous
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Traffic Chart */}
      {chartData.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
                Traffic Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="seoVisitors" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="seoPageViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="date" className="text-muted-foreground" tick={{ fontSize: 12 }} />
                    <YAxis className="text-muted-foreground" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#seoVisitors)" name="Visitors" />
                    <Area type="monotone" dataKey="pageViews" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#seoPageViews)" name="Page Views" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Top Pages */}
      {topPages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPages.slice(0, 8).map((page, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-6">{idx + 1}.</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{page.path}</p>
                        <p className="text-xs text-muted-foreground">{page.views.toLocaleString()} views</p>
                      </div>
                    </div>
                    {page.change !== undefined && (
                      <Badge className={page.change >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        <span className="flex items-center gap-1">
                          {page.change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {page.change >= 0 ? "+" : ""}{page.change}%
                        </span>
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ClientSEODashboard;
