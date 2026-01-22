import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Activity, Gauge, Clock, Layers, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

interface WebVital {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  unit: string;
  threshold: { good: number; poor: number };
}

interface PerformanceMetrics {
  lcp: WebVital;
  fid: WebVital;
  cls: WebVital;
  inp: WebVital;
  ttfb: WebVital;
  fcp: WebVital;
}

// Simulated historical data
const generateHistoricalData = () => {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString("en-GB", { month: "short", day: "numeric" }),
      lcp: 1200 + Math.random() * 800 - 200,
      fid: 40 + Math.random() * 60 - 20,
      cls: 0.04 + Math.random() * 0.06 - 0.02,
      pageLoad: 1800 + Math.random() * 1000 - 300,
    });
  }
  return data;
};

const pagePerformance = [
  { page: "/", loadTime: 1.2, lcp: 1.1, cls: 0.02, score: 94 },
  { page: "/services", loadTime: 1.4, lcp: 1.3, cls: 0.03, score: 91 },
  { page: "/case-studies", loadTime: 1.8, lcp: 1.6, cls: 0.05, score: 85 },
  { page: "/contact", loadTime: 1.1, lcp: 1.0, cls: 0.01, score: 96 },
  { page: "/about", loadTime: 1.3, lcp: 1.2, cls: 0.02, score: 92 },
];

const PerformanceTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: { name: "Largest Contentful Paint", value: 1247, rating: "good", unit: "ms", threshold: { good: 2500, poor: 4000 } },
    fid: { name: "First Input Delay", value: 42, rating: "good", unit: "ms", threshold: { good: 100, poor: 300 } },
    cls: { name: "Cumulative Layout Shift", value: 0.05, rating: "good", unit: "", threshold: { good: 0.1, poor: 0.25 } },
    inp: { name: "Interaction to Next Paint", value: 156, rating: "good", unit: "ms", threshold: { good: 200, poor: 500 } },
    ttfb: { name: "Time to First Byte", value: 287, rating: "good", unit: "ms", threshold: { good: 800, poor: 1800 } },
    fcp: { name: "First Contentful Paint", value: 892, rating: "good", unit: "ms", threshold: { good: 1800, poor: 3000 } },
  });
  const [historicalData] = useState(generateHistoricalData);

  const refreshMetrics = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMetrics(prev => ({
        ...prev,
        lcp: { ...prev.lcp, value: 1200 + Math.random() * 300 },
        fid: { ...prev.fid, value: 35 + Math.random() * 30 },
        cls: { ...prev.cls, value: 0.03 + Math.random() * 0.04 },
      }));
      setIsLoading(false);
    }, 1500);
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "good":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="h-3 w-3 mr-1" />Good</Badge>;
      case "needs-improvement":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><AlertTriangle className="h-3 w-3 mr-1" />Needs Work</Badge>;
      case "poor":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><AlertTriangle className="h-3 w-3 mr-1" />Poor</Badge>;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const calculateOverallScore = () => {
    const scores = [
      metrics.lcp.value <= metrics.lcp.threshold.good ? 100 : metrics.lcp.value <= metrics.lcp.threshold.poor ? 50 : 0,
      metrics.fid.value <= metrics.fid.threshold.good ? 100 : metrics.fid.value <= metrics.fid.threshold.poor ? 50 : 0,
      metrics.cls.value <= metrics.cls.threshold.good ? 100 : metrics.cls.value <= metrics.cls.threshold.poor ? 50 : 0,
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  };

  const overallScore = calculateOverallScore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Performance Monitoring</h2>
          <p className="text-sm text-muted-foreground">Real-time Core Web Vitals and page load metrics</p>
        </div>
        <Button variant="outline" onClick={refreshMetrics} disabled={isLoading} className="border-border/50">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Metrics
        </Button>
      </div>

      {/* Overall Score */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-1">Performance Score</h3>
              <p className="text-sm text-muted-foreground">Based on Core Web Vitals assessment</p>
            </div>
            <div className="text-right">
              <p className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}</p>
              <p className="text-sm text-muted-foreground mt-1">out of 100</p>
            </div>
          </div>
          <Progress value={overallScore} className="mt-4 h-2" />
        </CardContent>
      </Card>

      {/* Core Web Vitals */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* LCP */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">LCP</CardTitle>
              {getRatingBadge(metrics.lcp.rating)}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{(metrics.lcp.value / 1000).toFixed(2)}s</p>
            <p className="text-xs text-muted-foreground mt-1">Largest Contentful Paint</p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-400">≤2.5s good</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-yellow-400">≤4s needs work</span>
            </div>
          </CardContent>
        </Card>

        {/* FID */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">FID</CardTitle>
              {getRatingBadge(metrics.fid.rating)}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{Math.round(metrics.fid.value)}ms</p>
            <p className="text-xs text-muted-foreground mt-1">First Input Delay</p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-400">≤100ms good</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-yellow-400">≤300ms needs work</span>
            </div>
          </CardContent>
        </Card>

        {/* CLS */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">CLS</CardTitle>
              {getRatingBadge(metrics.cls.rating)}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">{metrics.cls.value.toFixed(3)}</p>
            <p className="text-xs text-muted-foreground mt-1">Cumulative Layout Shift</p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-400">≤0.1 good</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-yellow-400">≤0.25 needs work</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">TTFB</p>
                <p className="text-xl font-bold text-foreground">{metrics.ttfb.value}ms</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">FCP</p>
                <p className="text-xl font-bold text-foreground">{metrics.fcp.value}ms</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">INP</p>
                <p className="text-xl font-bold text-foreground">{metrics.inp.value}ms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Historical Chart */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Performance Trend (30 Days)</CardTitle>
          <CardDescription>LCP and page load time over the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="lcpGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="loadGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area
                  type="monotone"
                  dataKey="lcp"
                  stroke="hsl(var(--primary))"
                  fill="url(#lcpGradient)"
                  strokeWidth={2}
                  name="LCP (ms)"
                />
                <Area
                  type="monotone"
                  dataKey="pageLoad"
                  stroke="hsl(var(--chart-2))"
                  fill="url(#loadGradient)"
                  strokeWidth={2}
                  name="Page Load (ms)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Page-by-Page Performance */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Page Performance Breakdown</CardTitle>
          <CardDescription>Individual page metrics and scores</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Page</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Load Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">LCP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">CLS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody>
                {pagePerformance.map((page, idx) => (
                  <tr key={idx} className="border-b border-border/30 hover:bg-background/50">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{page.page}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{page.loadTime}s</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{page.lcp}s</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{page.cls}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${getScoreColor(page.score)}`}>{page.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Images optimized with WebP</p>
              <p className="text-sm text-muted-foreground">All images are served in next-gen formats with lazy loading</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Service worker caching active</p>
              <p className="text-sm text-muted-foreground">Repeat visits load instantly from cache</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Consider preloading key resources</p>
              <p className="text-sm text-muted-foreground">Add preload hints for critical fonts and above-fold images</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTab;
