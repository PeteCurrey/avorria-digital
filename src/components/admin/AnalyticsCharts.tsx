import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  Clock,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaticBeamBorder, BeamBorder } from "@/components/BeamBorder";
import { useAnalyticsSnapshots } from "@/hooks/useAnalyticsSnapshots";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface AnalyticsChartsProps {
  analyticsData?: {
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: string;
  };
}

export default function AnalyticsCharts({ analyticsData }: AnalyticsChartsProps) {
  const { data: snapshots, isLoading } = useAnalyticsSnapshots();

  const hasData = analyticsData || (snapshots && snapshots.length > 0);

  // Build chart data from real snapshots
  const trafficData = (snapshots || []).slice(0, 8).reverse().map(s => ({
    date: new Date(s.snapshot_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    pageViews: s.page_views || 0,
    sessions: s.unique_visitors || 0,
  }));

  // Get top pages from latest snapshot
  const latestSnapshot = snapshots?.[0];
  const topPages = (latestSnapshot?.top_pages as Array<{ path: string; views: number; change?: number }>) || [];

  if (!hasData && !isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="py-16">
            <div className="flex flex-col items-center justify-center text-center">
              <BarChart3 className="h-16 w-16 text-muted-foreground/30 mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No analytics data yet</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Connect Google Analytics or add data manually to see real traffic metrics, top pages, and conversion data here.
              </p>
              <Badge variant="outline" className="text-xs">
                Go to Integrations tab to connect analytics
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaticBeamBorder duration={4}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-5 w-5 text-primary/70" />
            </div>
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {(analyticsData?.pageViews || latestSnapshot?.page_views || 0).toLocaleString()}
            </motion.p>
            <p className="text-sm text-muted-foreground">Page Views</p>
          </CardContent>
        </StaticBeamBorder>

        <BeamBorder>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-primary/70" />
            </div>
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {(analyticsData?.uniqueVisitors || latestSnapshot?.unique_visitors || 0).toLocaleString()}
            </motion.p>
            <p className="text-sm text-muted-foreground">Unique Visitors</p>
          </CardContent>
        </BeamBorder>

        <BeamBorder>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MousePointerClick className="h-5 w-5 text-primary/70" />
            </div>
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {analyticsData?.bounceRate || latestSnapshot?.bounce_rate || 0}%
            </motion.p>
            <p className="text-sm text-muted-foreground">Bounce Rate</p>
          </CardContent>
        </BeamBorder>

        <BeamBorder>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-primary/70" />
            </div>
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {analyticsData?.avgSessionDuration || latestSnapshot?.avg_session_duration || "0m 0s"}
            </motion.p>
            <p className="text-sm text-muted-foreground">Avg. Session</p>
          </CardContent>
        </BeamBorder>
      </div>

      {/* Traffic Overview Chart */}
      {trafficData.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription>Page views and visitors over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="pageViewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(320, 85%, 55%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(320, 85%, 55%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(260, 70%, 55%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(260, 70%, 55%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 20%)" />
                    <XAxis dataKey="date" stroke="hsl(220, 10%, 45%)" fontSize={12} />
                    <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="pageViews"
                      stroke="hsl(320, 85%, 55%)"
                      fill="url(#pageViewsGradient)"
                      strokeWidth={2}
                      name="Page Views"
                    />
                    <Area
                      type="monotone"
                      dataKey="sessions"
                      stroke="hsl(260, 70%, 55%)"
                      fill="url(#sessionsGradient)"
                      strokeWidth={2}
                      name="Visitors"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Card className="bg-card/50 border-border/50">
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>Add more snapshots to see traffic trends over time</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Pages */}
      {topPages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPages.slice(0, 6).map((page, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground w-6">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{page.path}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">
                        {page.views.toLocaleString()}
                      </span>
                      {page.change !== undefined && (
                        <Badge
                          className={`text-xs ${
                            page.change >= 0
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {page.change >= 0 ? "+" : ""}{page.change}%
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
