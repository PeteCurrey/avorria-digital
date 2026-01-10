import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Users,
  Eye,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AnalyticsData {
  configured: boolean;
  mockData?: boolean;
  error?: string;
  totals?: {
    sessions: number;
    users: number;
    pageViews: number;
    bounceRate: number;
    avgSessionDuration: string;
  };
  topPages?: Array<{
    page: string;
    views: number;
    change?: number;
  }>;
  trafficSources?: Array<{
    source: string;
    sessions: number;
    percentage: number;
  }>;
  devices?: Array<{
    device: string;
    sessions: number;
    percentage: number;
  }>;
  dateRange?: {
    start: string;
    end: string;
  };
}

export default function LiveGoogleAnalyticsWidget() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchAnalytics = async (showToast = false) => {
    if (showToast) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const { data: result, error } = await supabase.functions.invoke("google-analytics", {
        body: {},
      });

      if (error) throw error;

      setData(result);
      setLastUpdated(new Date());

      if (showToast) {
        if (result.configured && !result.mockData) {
          toast.success("Analytics data refreshed");
        } else {
          toast.info("Using demo data - configure Google Analytics for real metrics");
        }
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      if (showToast) {
        toast.error("Failed to fetch analytics data");
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return Smartphone;
      case "tablet":
        return Tablet;
      default:
        return Monitor;
    }
  };

  const isLiveData = data?.configured && !data?.mockData;

  if (isLoading) {
    return (
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  const totals = data?.totals || {
    sessions: 0,
    users: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: "0m 0s",
  };

  return (
    <Card className={`border-border/50 backdrop-blur-sm ${isLiveData ? "bg-card/50" : "bg-amber-500/5 border-amber-500/20"}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLiveData ? "bg-green-500/20" : "bg-amber-500/20"}`}>
              <BarChart3 className={`h-5 w-5 ${isLiveData ? "text-green-400" : "text-amber-400"}`} />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                Google Analytics
                <Badge
                  variant="outline"
                  className={isLiveData
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  }
                >
                  {isLiveData ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Live Data
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Demo Data
                    </>
                  )}
                </Badge>
              </CardTitle>
              <CardDescription>
                {data?.dateRange
                  ? `${data.dateRange.start} to ${data.dateRange.end}`
                  : "Last 30 days"}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchAnalytics(true)}
            disabled={isRefreshing}
            className="border-border/50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-background/50 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary/70" />
              <span className="text-sm text-muted-foreground">Sessions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {totals.sessions.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="p-4 bg-background/50 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-primary/70" />
              <span className="text-sm text-muted-foreground">Users</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {totals.users.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-background/50 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-primary/70" />
              <span className="text-sm text-muted-foreground">Page Views</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {totals.pageViews.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-4 bg-background/50 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-primary/70" />
              <span className="text-sm text-muted-foreground">Avg. Duration</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {totals.avgSessionDuration}
            </p>
          </motion.div>
        </div>

        {/* Top Pages & Traffic Sources */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top Pages */}
          {data?.topPages && data.topPages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary/70" />
                Top Pages
              </h4>
              <div className="space-y-2">
                {data.topPages.slice(0, 5).map((page, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-background/30 rounded border border-border/20"
                  >
                    <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {page.page}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{page.views.toLocaleString()}</span>
                      {page.change !== undefined && (
                        <Badge
                          variant="outline"
                          className={
                            page.change >= 0
                              ? "bg-green-500/20 text-green-400 border-green-500/30 text-xs"
                              : "bg-red-500/20 text-red-400 border-red-500/30 text-xs"
                          }
                        >
                          {page.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {Math.abs(page.change)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Traffic Sources */}
          {data?.trafficSources && data.trafficSources.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="space-y-3"
            >
              <h4 className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary/70" />
                Traffic Sources
              </h4>
              <div className="space-y-3">
                {data.trafficSources.slice(0, 5).map((source, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{source.source}</span>
                      <span className="font-medium">{source.percentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={source.percentage} className="h-1.5" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Device Breakdown */}
        {data?.devices && data.devices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Monitor className="h-4 w-4 text-primary/70" />
              Device Breakdown
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {data.devices.map((device, idx) => {
                const DeviceIcon = getDeviceIcon(device.device);
                return (
                  <div
                    key={idx}
                    className="p-3 bg-background/30 rounded-lg border border-border/20 text-center"
                  >
                    <DeviceIcon className="h-5 w-5 text-primary/70 mx-auto mb-2" />
                    <p className="text-lg font-bold">{device.percentage.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground capitalize">{device.device}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            {lastUpdated && `Updated ${lastUpdated.toLocaleTimeString()}`}
          </p>
          {!isLiveData && (
            <Button variant="link" size="sm" className="text-xs p-0 h-auto" asChild>
              <a href="/admin?tab=settings" className="flex items-center gap-1">
                Configure in Settings
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
