'use client';
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Activity, Gauge, Clock, Layers, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";

const PerformanceTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<{
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    inp: number | null;
    ttfb: number | null;
    fcp: number | null;
  }>({
    lcp: null,
    fid: null,
    cls: null,
    inp: null,
    ttfb: null,
    fcp: null,
  });

  const measurePerformance = () => {
    setIsLoading(true);
    
    try {
      // Use real Performance API to measure current page
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      const paintEntries = performance.getEntriesByType("paint");
      
      const fcp = paintEntries.find(e => e.name === "first-contentful-paint");
      
      setMetrics({
        lcp: navigation ? Math.round(navigation.loadEventEnd - navigation.startTime) : null,
        fid: null, // FID requires user interaction, can't measure on demand
        cls: null, // CLS requires PerformanceObserver over time
        inp: null,
        ttfb: navigation ? Math.round(navigation.responseStart - navigation.requestStart) : null,
        fcp: fcp ? Math.round(fcp.startTime) : null,
      });
    } catch (error) {
      console.error("Error measuring performance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Wait for page load to complete before measuring
    if (document.readyState === "complete") {
      measurePerformance();
    } else {
      window.addEventListener("load", measurePerformance);
      return () => window.removeEventListener("load", measurePerformance);
    }
  }, []);

  const hasAnyData = Object.values(metrics).some(v => v !== null);

  const getRating = (metric: string, value: number | null) => {
    if (value === null) return "unknown";
    const thresholds: Record<string, { good: number; poor: number }> = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      inp: { good: 200, poor: 500 },
      ttfb: { good: 800, poor: 1800 },
      fcp: { good: 1800, poor: 3000 },
    };
    const t = thresholds[metric];
    if (!t) return "unknown";
    if (value <= t.good) return "good";
    if (value <= t.poor) return "needs-improvement";
    return "poor";
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
        return <Badge variant="outline" className="text-muted-foreground">No data</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  if (!hasAnyData && !isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Performance Monitoring</h2>
            <p className="text-sm text-muted-foreground">Core Web Vitals and page load metrics</p>
          </div>
          <Button variant="outline" onClick={measurePerformance} disabled={isLoading} className="border-border/50">
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Measure
          </Button>
        </div>
        <Card className="bg-card/50 border-border/50">
          <CardContent className="py-16">
            <div className="flex flex-col items-center justify-center text-center">
              <Gauge className="h-16 w-16 text-muted-foreground/30 mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No performance data yet</h3>
              <p className="text-muted-foreground max-w-md mb-4">
                Click "Measure" to capture real Core Web Vitals from the current page, or connect Google PageSpeed Insights API for historical data.
              </p>
              <Badge variant="outline" className="text-xs">
                Configure PageSpeed API in Settings ? Integrations for automated monitoring
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Performance Monitoring</h2>
          <p className="text-sm text-muted-foreground">Real Core Web Vitals from the current page</p>
        </div>
        <Button variant="outline" onClick={measurePerformance} disabled={isLoading} className="border-border/50">
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh Metrics
        </Button>
      </div>

      {/* Core Web Vitals */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* TTFB */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">TTFB</CardTitle>
              {getRatingBadge(getRating("ttfb", metrics.ttfb))}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {metrics.ttfb !== null ? `${metrics.ttfb}ms` : "â€”"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Time to First Byte</p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-400">=800ms good</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-yellow-400">=1800ms needs work</span>
            </div>
          </CardContent>
        </Card>

        {/* FCP */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">FCP</CardTitle>
              {getRatingBadge(getRating("fcp", metrics.fcp))}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {metrics.fcp !== null ? `${(metrics.fcp / 1000).toFixed(2)}s` : "â€”"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">First Contentful Paint</p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-400">=1.8s good</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-yellow-400">=3s needs work</span>
            </div>
          </CardContent>
        </Card>

        {/* Page Load */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">Page Load</CardTitle>
              {getRatingBadge(getRating("lcp", metrics.lcp))}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-foreground">
              {metrics.lcp !== null ? `${(metrics.lcp / 1000).toFixed(2)}s` : "â€”"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Full Page Load Time</p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="text-green-400">=2.5s good</span>
              <span className="text-muted-foreground">|</span>
              <span className="text-yellow-400">=4s needs work</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info notice */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="py-8">
          <div className="flex flex-col items-center justify-center text-center">
            <BarChart3 className="h-10 w-10 text-muted-foreground/30 mb-4" />
            <h3 className="text-base font-semibold text-foreground mb-2">Historical trends & page-by-page breakdown</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Connect the Google PageSpeed Insights API in Settings ? Integrations to enable automated performance monitoring, historical trend charts, and per-page breakdowns.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTab;


