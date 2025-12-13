import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLeadStats, useLeadsAdmin } from "@/hooks/useLeads";
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
  UserPlus,
  Loader2,
} from "lucide-react";

const PlatformDashboard = () => {
  const { data: leadStats, isLoading: loadingStats } = useLeadStats();
  const { data: leads, isLoading: loadingLeads } = useLeadsAdmin();

  // Calculate pipeline from real data
  const pipelineData = [
    { stage: "New", count: leadStats?.byStatus?.new || 0 },
    { stage: "Contacted", count: leadStats?.byStatus?.contacted || 0 },
    { stage: "Qualified", count: leadStats?.byStatus?.qualified || 0 },
    { stage: "Proposal", count: leadStats?.byStatus?.proposal || 0 },
    { stage: "Won", count: leadStats?.byStatus?.won || 0 },
  ];

  // Source mix from real data
  const sourceMix = Object.entries(leadStats?.bySource || {}).map(([source, count]) => ({
    source: source.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    count: count as number,
  })).sort((a, b) => b.count - a.count).slice(0, 5);

  // Recent leads for attention feed
  const recentLeads = (leads || []).slice(0, 4).map(lead => ({
    name: lead.name,
    company: lead.company,
    source: lead.source.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    status: lead.status,
    time: getRelativeTime(new Date(lead.created_at)),
  }));

  const maxPipelineCount = Math.max(...pipelineData.map(p => p.count), 1);
  const maxSourceCount = Math.max(...sourceMix.map(s => s.count), 1);

  const getSeverityColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "qualified":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "contacted":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "proposal":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  // KPIs based on real lead data
  const kpis = [
    { label: "Total Leads", value: loadingStats ? "..." : String(leadStats?.total || 0), icon: UserPlus, color: "text-blue-600" },
    { label: "New Leads", value: loadingStats ? "..." : String(leadStats?.byStatus?.new || 0), icon: Users, color: "text-purple-600" },
    { label: "Qualified", value: loadingStats ? "..." : String(leadStats?.byStatus?.qualified || 0), icon: TrendingUp, color: "text-green-600" },
    { label: "Won Deals", value: loadingStats ? "..." : String(leadStats?.byStatus?.won || 0), icon: DollarSign, color: "text-amber-600" },
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-foreground mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                High-level overview of your leads and pipeline
              </p>
            </div>
            <Link to="/platform/leads">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                View All Leads
              </Button>
            </Link>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi) => {
              const Icon = kpi.icon;
              return (
                <Card key={kpi.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Icon className={cn("h-5 w-5", kpi.color)} />
                    </div>
                    <p className="text-2xl font-light text-foreground mb-1">{kpi.value}</p>
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pipeline & Source Mix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pipeline Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lead Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pipelineData.map((item) => (
                      <div key={item.stage} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{item.stage}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${(item.count / maxPipelineCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground w-8 text-right">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Source Mix */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingStats ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : sourceMix.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No leads yet</p>
                ) : (
                  <div className="space-y-3">
                    {sourceMix.map((item) => (
                      <div key={item.source} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{item.source}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${(item.count / maxSourceCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground w-8 text-right">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Leads */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Leads</CardTitle>
              <Link to="/platform/leads">
                <Button variant="outline" size="sm">
                  View all
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {loadingLeads ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : recentLeads.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No leads yet</p>
              ) : (
                <div className="space-y-4">
                  {recentLeads.map((lead, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Badge
                        variant="outline"
                        className={cn("mt-1", getSeverityColor(lead.status))}
                      >
                        {lead.status}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground mb-1">{lead.name}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {lead.company || lead.source}
                        </p>
                        <p className="text-xs text-muted-foreground">{lead.time}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link to="/platform/leads">
                          <Button variant="ghost" size="sm">
                            View lead
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

function cn(...inputs: (string | undefined | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return date.toLocaleDateString();
}

export default PlatformDashboard;
