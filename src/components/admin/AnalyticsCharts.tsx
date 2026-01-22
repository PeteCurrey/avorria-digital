import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointerClick,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StaticBeamBorder, BeamBorder } from "@/components/BeamBorder";

// Mock data for demonstration - in production, this would come from analytics
const trafficData = [
  { date: "Jan 1", pageViews: 1200, sessions: 890, users: 720 },
  { date: "Jan 8", pageViews: 1450, sessions: 1020, users: 850 },
  { date: "Jan 15", pageViews: 1380, sessions: 980, users: 810 },
  { date: "Jan 22", pageViews: 1680, sessions: 1180, users: 920 },
  { date: "Jan 29", pageViews: 1890, sessions: 1340, users: 1050 },
  { date: "Feb 5", pageViews: 2100, sessions: 1520, users: 1180 },
  { date: "Feb 12", pageViews: 1950, sessions: 1420, users: 1100 },
  { date: "Feb 19", pageViews: 2340, sessions: 1680, users: 1290 },
];

const funnelData = [
  { stage: "Visitors", value: 10000, fill: "hsl(220, 70%, 50%)" },
  { stage: "Engaged", value: 4500, fill: "hsl(260, 70%, 55%)" },
  { stage: "Leads", value: 850, fill: "hsl(320, 85%, 55%)" },
  { stage: "Qualified", value: 340, fill: "hsl(160, 70%, 45%)" },
  { stage: "Converted", value: 85, fill: "hsl(140, 70%, 45%)" },
];

const sourceData = [
  { name: "Organic Search", value: 4200, color: "hsl(320, 85%, 55%)" },
  { name: "Direct", value: 2100, color: "hsl(260, 70%, 55%)" },
  { name: "Referral", value: 1400, color: "hsl(220, 70%, 50%)" },
  { name: "Social", value: 980, color: "hsl(180, 70%, 45%)" },
  { name: "Paid", value: 620, color: "hsl(45, 90%, 50%)" },
];

const deviceData = [
  { name: "Desktop", value: 5200, color: "hsl(220, 70%, 50%)", icon: Monitor },
  { name: "Mobile", value: 3800, color: "hsl(320, 85%, 55%)", icon: Smartphone },
  { name: "Tablet", value: 800, color: "hsl(260, 70%, 55%)", icon: Tablet },
];

const topPagesData = [
  { page: "/", name: "Homepage", views: 4520, change: 12 },
  { page: "/services/seo", name: "SEO Services", views: 2340, change: 28 },
  { page: "/case-studies", name: "Case Studies", views: 1890, change: -5 },
  { page: "/contact", name: "Contact", views: 1450, change: 18 },
  { page: "/pricing", name: "Pricing", views: 1280, change: 8 },
  { page: "/resources", name: "Resources", views: 980, change: 32 },
];

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
  const totalSources = useMemo(
    () => sourceData.reduce((sum, s) => sum + s.value, 0),
    []
  );

  const totalDevices = useMemo(
    () => deviceData.reduce((sum, d) => sum + d.value, 0),
    []
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StaticBeamBorder duration={4}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-5 w-5 text-primary/70" />
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                +12%
              </Badge>
            </div>
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {analyticsData?.pageViews?.toLocaleString() || "24,380"}
            </motion.p>
            <p className="text-sm text-muted-foreground">Page Views</p>
          </CardContent>
        </StaticBeamBorder>

        <BeamBorder>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-primary/70" />
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                +8%
              </Badge>
            </div>
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {analyticsData?.uniqueVisitors?.toLocaleString() || "9,840"}
            </motion.p>
            <p className="text-sm text-muted-foreground">Unique Visitors</p>
          </CardContent>
        </BeamBorder>

        <BeamBorder>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <MousePointerClick className="h-5 w-5 text-primary/70" />
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 gap-1 text-xs">
                <TrendingDown className="h-3 w-3" />
                -2%
              </Badge>
            </div>
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {analyticsData?.bounceRate || 42}%
            </motion.p>
            <p className="text-sm text-muted-foreground">Bounce Rate</p>
          </CardContent>
        </BeamBorder>

        <BeamBorder>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-5 w-5 text-primary/70" />
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1 text-xs">
                <TrendingUp className="h-3 w-3" />
                +15%
              </Badge>
            </div>
            <motion.p
              className="text-2xl font-bold text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {analyticsData?.avgSessionDuration || "3m 24s"}
            </motion.p>
            <p className="text-sm text-muted-foreground">Avg. Session</p>
          </CardContent>
        </BeamBorder>
      </div>

      {/* Traffic Overview Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Page views, sessions, and users over time</CardDescription>
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
                  <XAxis
                    dataKey="date"
                    stroke="hsl(220, 10%, 45%)"
                    fontSize={12}
                  />
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
                    name="Sessions"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Two Column Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card/50 border-border/50 h-full">
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Visitor journey from landing to conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {funnelData.map((item, index) => {
                  const percentage = (item.value / funnelData[0].value) * 100;
                  const prevPercentage = index > 0
                    ? ((funnelData[index - 1].value - item.value) / funnelData[index - 1].value) * 100
                    : 0;

                  return (
                    <motion.div
                      key={item.stage}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{item.stage}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {item.value.toLocaleString()}
                          </span>
                          {index > 0 && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                              -{prevPercentage.toFixed(0)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="h-8 bg-muted/30 rounded-lg overflow-hidden">
                        <motion.div
                          className="h-full rounded-lg"
                          style={{ backgroundColor: item.fill }}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: 0.1 * index }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card/50 border-border/50 h-full">
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {sourceData.map((source, index) => (
                  <motion.div
                    key={source.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-sm">{source.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {source.value.toLocaleString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({((source.value / totalSources) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Pages */}
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
                {topPagesData.map((page, index) => (
                  <motion.div
                    key={page.page}
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
                        <p className="font-medium text-sm">{page.name}</p>
                        <p className="text-xs text-muted-foreground">{page.page}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">
                        {page.views.toLocaleString()}
                      </span>
                      <Badge
                        className={`text-xs ${
                          page.change >= 0
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        {page.change >= 0 ? "+" : ""}
                        {page.change}%
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Traffic by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[180px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {deviceData.map((device, index) => {
                  const Icon = device.icon;
                  const percentage = ((device.value / totalDevices) * 100).toFixed(1);
                  
                  return (
                    <motion.div
                      key={device.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="text-center p-3 bg-background/50 rounded-lg"
                    >
                      <Icon
                        className="h-6 w-6 mx-auto mb-2"
                        style={{ color: device.color }}
                      />
                      <p className="text-sm font-medium">{device.name}</p>
                      <p className="text-lg font-bold" style={{ color: device.color }}>
                        {percentage}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {device.value.toLocaleString()}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
