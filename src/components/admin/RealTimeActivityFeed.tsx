import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Users,
  Zap,
  TrendingUp,
  Shield,
  FileText,
  AlertTriangle,
  CheckCircle,
  Bell,
  Activity,
  Search,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAlerts, useResolveAlert } from "@/hooks/useAlerts";

interface ActivityItem {
  id: string;
  type: "lead" | "alert" | "seo" | "security" | "content" | "audit";
  message: string;
  time: Date;
  severity?: string;
  isResolved?: boolean;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case "lead":
      return Users;
    case "alert":
      return AlertTriangle;
    case "seo":
      return TrendingUp;
    case "security":
      return Shield;
    case "content":
      return FileText;
    case "audit":
      return Search;
    default:
      return Activity;
  }
};

const getActivityColor = (type: string, severity?: string) => {
  if (severity === "high" || severity === "critical") {
    return { bg: "bg-red-500/20", text: "text-red-400" };
  }
  if (severity === "warning") {
    return { bg: "bg-yellow-500/20", text: "text-yellow-400" };
  }
  
  switch (type) {
    case "lead":
      return { bg: "bg-blue-500/20", text: "text-blue-400" };
    case "alert":
      return { bg: "bg-yellow-500/20", text: "text-yellow-400" };
    case "seo":
      return { bg: "bg-purple-500/20", text: "text-purple-400" };
    case "security":
      return { bg: "bg-green-500/20", text: "text-green-400" };
    case "content":
      return { bg: "bg-primary/20", text: "text-primary" };
    case "audit":
      return { bg: "bg-cyan-500/20", text: "text-cyan-400" };
    default:
      return { bg: "bg-muted", text: "text-muted-foreground" };
  }
};

export default function RealTimeActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const { data: alerts } = useAlerts({ unresolved: false });
  const resolveAlert = useResolveAlert();

  // Convert alerts to activity items
  useEffect(() => {
    if (alerts) {
      const alertActivities: ActivityItem[] = alerts.slice(0, 10).map((alert) => ({
        id: alert.id,
        type: alert.type as ActivityItem["type"],
        message: alert.description || `${alert.type} alert`,
        time: new Date(alert.created_at),
        severity: alert.severity,
        isResolved: alert.is_resolved,
      }));
      setActivities(alertActivities);
    }
  }, [alerts]);

  // Listen for real-time updates on leads
  useEffect(() => {
    const channel = supabase
      .channel("admin-activity")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "leads",
        },
        (payload) => {
          const newActivity: ActivityItem = {
            id: payload.new.id,
            type: "lead",
            message: `New lead: ${payload.new.name} from ${payload.new.source || "website"}`,
            time: new Date(),
          };
          setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alerts",
        },
        (payload) => {
          const newActivity: ActivityItem = {
            id: payload.new.id,
            type: payload.new.type as ActivityItem["type"],
            message: payload.new.description || `New ${payload.new.type} alert`,
            time: new Date(),
            severity: payload.new.severity,
            isResolved: payload.new.is_resolved,
          };
          setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "website_audits",
        },
        (payload) => {
          const newActivity: ActivityItem = {
            id: payload.new.id,
            type: "audit",
            message: `Audit completed for ${payload.new.url || "website"}`,
            time: new Date(),
          };
          setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleResolveAlert = async (id: string) => {
    try {
      await resolveAlert.mutateAsync(id);
      setActivities((prev) =>
        prev.map((a) => (a.id === id ? { ...a, isResolved: true } : a))
      );
    } catch (error) {
      console.error("Failed to resolve alert:", error);
    }
  };

  // If no real data, show placeholder activities
  const displayActivities = activities.length > 0 ? activities : [
    { id: "1", type: "lead" as const, message: "New lead from SEO Audit", time: new Date(Date.now() - 1000 * 60 * 5) },
    { id: "2", type: "seo" as const, message: "3 keywords moved to page 1", time: new Date(Date.now() - 1000 * 60 * 30) },
    { id: "3", type: "security" as const, message: "SSL certificate verified", time: new Date(Date.now() - 1000 * 60 * 60 * 2) },
    { id: "4", type: "content" as const, message: "Blog post indexed", time: new Date(Date.now() - 1000 * 60 * 60 * 6) },
  ];

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Live Activity Feed
            <Badge variant="outline" className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Real-time
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {displayActivities.map((activity, idx) => {
              const Icon = getActivityIcon(activity.type);
              const colors = getActivityColor(activity.type, activity.severity);
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  transition={{ duration: 0.3, delay: 0.03 * idx }}
                  layout
                  className="flex items-center gap-4 p-3 bg-background/50 rounded-lg hover:bg-muted/30 transition-colors group"
                >
                  <div className={`p-2 rounded-lg ${colors.bg}`}>
                    <Icon className={`h-4 w-4 ${colors.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(activity.time, { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {activity.isResolved ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolved
                      </Badge>
                    ) : activity.severity && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleResolveAlert(activity.id)}
                        className="h-7 text-xs"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {displayActivities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No recent activity</p>
              <p className="text-sm">Activity will appear here in real-time</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
