'use client';
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAnalyticsSnapshots } from "@/hooks/useAnalyticsSnapshots";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, useInView, animate } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Eye,
  Clock,
  MousePointerClick,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Loader2,
  Wifi,
  WifiOff
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { format, parseISO } from "date-fns";

// Animated counter
function AnimatedKPI({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
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

interface AnalyticsConnection {
  id: string;
  ga4_property_id: string | null;
  gsc_property: string | null;
  is_active: boolean;
  last_synced_at: string | null;
}

const ClientAnalytics = () => {
  const { impersonatedClient, user } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const [connection, setConnection] = useState<AnalyticsConnection | null>(null);
  const [connectionLoading, setConnectionLoading] = useState(true);

  // Fetch client's analytics connection
  useEffect(() => {
    const fetchConnection = async () => {
      if (!user?.id) return;
      // Get the client record linked to this user
      const { data: clientData } = await supabase
        .from("clients")
        .select("id")
        .eq("owner_id", user.id)
        .maybeSingle();

      if (clientData) {
        const { data } = await supabase
          .from("client_analytics_connections")
          .select("id, ga4_property_id, gsc_property, is_active, last_synced_at")
          .eq("client_id", clientData.id)
          .eq("is_active", true)
          .maybeSingle();
        setConnection(data);
      }
      setConnectionLoading(false);
    };
    fetchConnection();
  }, [user?.id]);

  // Fetch snapshots - websiteId from connection if available
  const { data: snapshots, isLoading: snapshotsLoading, refetch } = useAnalyticsSnapshots();

  const isLoading = connectionLoading || snapshotsLoading;

  // No connection empty state
  if (!isLoading && !connection) {
    return (
      <>
        <title>Analytics - Client Portal</title>
        <AppShell type="client" userName="Sarah Mitchell" userRole="Marketing Director" clientName={clientName}>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-light text-foreground mb-2">Analytics</h1>
              <p className="text-muted-foreground">Real-time website performance and visitor insights.</p>
            </div>
            <Card className="border-dashed">
              <CardContent className="p-16 text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <WifiOff className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">Analytics Not Connected</h3>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  Your analytics dashboard will activate once your account manager connects your Google Analytics. 
                  We'll notify you when your data starts flowing in.
                </p>
              </CardContent>
            </Card>
          </div>
        </AppShell>
      </>
    );
  }

  const hasData = snapshots && snapshots.length > 0;
  const latest = hasData ? snapshots[0] : null;
  const previous = hasData && snapshots.length > 1 ? snapshots[1] : null;

  const calcChange = (curr: number | null, prev: number | null) => {
    if (!curr || !prev) return 0;
    return Math.round(((curr - prev) / prev) * 100);
  };

  const pvChange = calcChange(latest?.page_views ?? null, previous?.page_views ?? null);
  const uvChange = calcChange(latest?.unique_visitors ?? null, previous?.unique_visitors ?? null);
  const brChange = calcChange(latest?.bounce_rate ?? null, previous?.bounce_rate ?? null);

  const stats = [
    { label: "Page Views", value: latest?.page_views || 0, change: pvChange, icon: Eye, color: "text-purple-500" },
    { label: "Unique Visitors", value: latest?.unique_visitors || 0, change: uvChange, icon: Users, color: "text-blue-500" },
    { label: "Avg. Session", value: latest?.avg_session_duration || "—", change: 0, icon: Clock, color: "text-green-500", isText: true },
    { label: "Bounce Rate", value: latest?.bounce_rate || 0, change: brChange, icon: MousePointerClick, color: "text-accent", suffix: "%", invertChange: true },
  ];

  // Chart data from snapshots
  const chartData = hasData 
    ? [...snapshots].reverse().slice(-12).map((s) => ({
        date: format(parseISO(s.snapshot_date), "MMM"),
        visitors: s.unique_visitors || 0,
        pageViews: s.page_views || 0,
      }))
    : [];

  const topPages = (latest?.top_pages as Array<{ path: string; views: number; change?: number }>) || [];
  const conversions = latest?.conversions as Record<string, number> | null;
  const conversionEntries = conversions ? Object.entries(conversions) : [];

  return (
    <>
      <title>Analytics - Client Portal</title>
      <AppShell type="client" userName="Sarah Mitchell" userRole="Marketing Director" clientName={clientName}>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-foreground mb-2">Analytics</h1>
              <p className="text-muted-foreground">
                Real-time website performance and visitor insights.
              </p>
              {connection?.last_synced_at && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Wifi className="h-3 w-3 text-green-500" />
                  Last updated: {format(parseISO(connection.last_synced_at), "MMM d, yyyy 'at' h:mm a")}
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !hasData ? (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Awaiting Data</h3>
                <p className="text-muted-foreground">Your analytics connection is active. Data will appear after the first sync.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  const isPositive = (stat as any).invertChange ? stat.change < 0 : stat.change > 0;
                  return (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`h-5 w-5 ${stat.color}`} />
                            <span className="text-xs text-muted-foreground">{stat.label}</span>
                          </div>
                          <p className="text-2xl font-light text-foreground mb-1">
                            {(stat as any).isText ? String(stat.value) : <AnimatedKPI value={stat.value as number} suffix={(stat as any).suffix} />}
                          </p>
                          {stat.change !== 0 && (
                            <div className="flex items-center gap-1">
                              {isPositive ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-red-500" />}
                              <span className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
                                {stat.change > 0 ? "+" : ""}{stat.change}% vs previous
                              </span>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Traffic Chart */}
              {chartData.length > 1 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Website Traffic
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis dataKey="date" className="text-muted-foreground" />
                            <YAxis className="text-muted-foreground" />
                            <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                            <Area type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorVisitors)" name="Visitors" />
                            <Area type="monotone" dataKey="pageViews" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorPageViews)" name="Page Views" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Top Pages */}
                {topPages.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <Card>
                      <CardHeader><CardTitle>Top Pages</CardTitle></CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {topPages.map((page, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <p className="font-medium text-foreground">{page.path}</p>
                                <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                              </div>
                              {page.change !== undefined && (
                                <Badge className={page.change >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                                  {page.change >= 0 ? "+" : ""}{page.change}%
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Conversions */}
                {conversionEntries.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <Card>
                      <CardHeader><CardTitle>Conversions</CardTitle></CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {conversionEntries.map(([name, count], idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                              <div>
                                <p className="font-medium text-foreground">{name}</p>
                                <p className="text-sm text-muted-foreground">{count} this period</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>

              {/* CTA */}
              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-1">Want Deeper Insights?</h3>
                      <p className="text-sm text-muted-foreground">Request a detailed analytics report from your account manager.</p>
                    </div>
                    <Button variant="default">
                      Request Report
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </AppShell>
    </>
  );
};

export default ClientAnalytics;


