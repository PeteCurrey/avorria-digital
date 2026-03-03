import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  MousePointerClick,
  Eye,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Target,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SearchConsoleData {
  configured: boolean;
  mockData?: boolean;
  error?: string;
  totals?: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  };
  rows?: Array<{
    keys: string[];
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  siteUrl?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export default function LiveSearchConsoleWidget() {
  const [data, setData] = useState<SearchConsoleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchSearchConsole = async (showToast = false) => {
    if (showToast) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const { data: result, error } = await supabase.functions.invoke("google-search-console", {
        body: {
          dimensions: ["query"],
          rowLimit: 10,
        },
      });

      // Even if there's an error, the response may contain mockData we can use
      const responseData = result || (error as any)?.context?.json;
      if (responseData) {
        setData(responseData);
      } else if (error) {
        throw error;
      } else {
        setData(result);
      }
      setLastUpdated(new Date());

      if (showToast) {
        if (result.configured && !result.mockData) {
          toast.success("Search Console data refreshed");
        } else {
          toast.info("Using demo data - configure Search Console for real metrics");
        }
      }
    } catch (error) {
      console.error("Error fetching Search Console:", error);
      if (showToast) {
        toast.error("Failed to fetch Search Console data");
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSearchConsole();
  }, []);

  const isLiveData = data?.configured && !data?.mockData;

  const getPositionColor = (position: number) => {
    if (position <= 3) return "text-green-400";
    if (position <= 10) return "text-yellow-400";
    return "text-red-400";
  };

  const getPositionBadge = (position: number) => {
    if (position <= 3) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (position <= 10) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

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
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0,
  };

  return (
    <Card className={`border-border/50 backdrop-blur-sm ${isLiveData ? "bg-card/50" : "bg-amber-500/5 border-amber-500/20"}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isLiveData ? "bg-green-500/20" : "bg-amber-500/20"}`}>
              <Search className={`h-5 w-5 ${isLiveData ? "text-green-400" : "text-amber-400"}`} />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                Google Search Console
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
                  : "Last 28 days"}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchSearchConsole(true)}
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
              <MousePointerClick className="h-4 w-4 text-primary/70" />
              <span className="text-sm text-muted-foreground">Clicks</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {totals.clicks.toLocaleString()}
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
              <span className="text-sm text-muted-foreground">Impressions</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {totals.impressions.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-background/50 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary/70" />
              <span className="text-sm text-muted-foreground">CTR</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {(totals.ctr * 100).toFixed(2)}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-4 bg-background/50 rounded-lg border border-border/30"
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-primary/70" />
              <span className="text-sm text-muted-foreground">Avg. Position</span>
            </div>
            <p className={`text-2xl font-bold ${getPositionColor(totals.position)}`}>
              {totals.position.toFixed(1)}
            </p>
          </motion.div>
        </div>

        {/* Top Keywords */}
        {data?.rows && data.rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Search className="h-4 w-4 text-primary/70" />
              Top Ranking Keywords
            </h4>
            <div className="space-y-2">
              {data.rows.slice(0, 8).map((row, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.02 * idx }}
                  className="flex items-center justify-between p-3 bg-background/30 rounded-lg border border-border/20"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium text-foreground truncate">
                      {row.keys[0]}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MousePointerClick className="h-3 w-3" />
                        {row.clicks.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {row.impressions.toLocaleString()}
                      </span>
                      <span>{(row.ctr * 100).toFixed(1)}% CTR</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={getPositionBadge(row.position)}>
                    #{row.position.toFixed(1)}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTR Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary/70" />
            Performance Indicators
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-background/30 rounded-lg border border-border/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Click-through Rate</span>
                <span className="text-sm font-medium">{(totals.ctr * 100).toFixed(2)}%</span>
              </div>
              <Progress value={Math.min(totals.ctr * 100 * 10, 100)} className="h-1.5" />
              <p className="text-xs text-muted-foreground mt-1">
                {totals.ctr >= 0.05 ? "Good" : totals.ctr >= 0.02 ? "Average" : "Needs improvement"}
              </p>
            </div>
            <div className="p-3 bg-background/30 rounded-lg border border-border/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">Avg. Position</span>
                <span className={`text-sm font-medium ${getPositionColor(totals.position)}`}>
                  {totals.position.toFixed(1)}
                </span>
              </div>
              <Progress value={Math.max(100 - (totals.position * 5), 0)} className="h-1.5" />
              <p className="text-xs text-muted-foreground mt-1">
                {totals.position <= 3 ? "Excellent" : totals.position <= 10 ? "Page 1" : "Needs optimization"}
              </p>
            </div>
          </div>
        </motion.div>

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
