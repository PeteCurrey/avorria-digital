import { Helmet } from "react-helmet-async";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const PlatformDashboard = () => {
  // Demo data
  const kpis = [
    { label: "Active Clients", value: "24", icon: Users, color: "text-blue-600" },
    { label: "Monthly Recurring Revenue", value: "£85k-120k", icon: DollarSign, color: "text-green-600" },
    { label: "Open Opportunities", value: "7", icon: TrendingUp, color: "text-purple-600" },
    { label: "At-Risk Accounts", value: "2", icon: AlertTriangle, color: "text-red-600" },
  ];

  const pipeline = [
    { stage: "Discovery", count: 4 },
    { stage: "Proposal", count: 3 },
    { stage: "Live", count: 24 },
    { stage: "At Risk", count: 2 },
  ];

  const channelMix = [
    { service: "SEO", count: 22 },
    { service: "Paid Media", count: 15 },
    { service: "Web Design", count: 18 },
    { service: "Analytics", count: 20 },
  ];

  const alerts = [
    {
      client: "TechCorp Industries",
      issue: "Organic leads down 23% vs last 30 days",
      severity: "high",
      time: "2 hours ago",
    },
    {
      client: "GreenLeaf Solutions",
      issue: "Tracking broken on /contact page",
      severity: "critical",
      time: "4 hours ago",
    },
    {
      client: "BlueSky Consulting",
      issue: "Retainer term ending next month",
      severity: "medium",
      time: "1 day ago",
    },
    {
      client: "Urban Dynamics",
      issue: "Paid media CPL increased 35%",
      severity: "high",
      time: "1 day ago",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "high":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              High-level overview of your book of business
            </p>
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

          {/* Pipeline & Channel Mix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pipeline Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pipeline Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pipeline.map((item) => (
                    <div key={item.stage} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{item.stage}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(item.count / 24) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground w-8 text-right">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Channel Mix */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Channel Mix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {channelMix.map((item) => (
                    <div key={item.service} className="flex items-center justify-between">
                      <span className="text-sm text-foreground">{item.service}</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(item.count / 24) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-foreground w-8 text-right">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Attention Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Attention Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <Badge
                      variant="outline"
                      className={cn("mt-1", getSeverityColor(alert.severity))}
                    >
                      {alert.severity}
                    </Badge>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground mb-1">{alert.client}</p>
                      <p className="text-sm text-muted-foreground mb-2">{alert.issue}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        View client
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Create task
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export default PlatformDashboard;
