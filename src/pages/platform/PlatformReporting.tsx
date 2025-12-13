import { Helmet } from "react-helmet-async";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertCircle, Plus, CheckCircle } from "lucide-react";
import { useClients } from "@/hooks/useClients";
import { useAlerts } from "@/hooks/useAlerts";
import { Skeleton } from "@/components/ui/skeleton";

const PlatformReporting = () => {
  const { data: clients, isLoading: clientsLoading } = useClients();
  const { data: alerts, isLoading: alertsLoading } = useAlerts({ unresolved: true });

  const isLoading = clientsLoading || alertsLoading;

  // Calculate portfolio metrics from real data
  const portfolioMetrics = [
    { 
      label: "Active Clients", 
      value: clients?.filter(c => c.status === 'live').length.toString() || "0", 
      change: 0, 
      period: "Current" 
    },
    { 
      label: "At Risk", 
      value: clients?.filter(c => c.status === 'at-risk').length.toString() || "0", 
      change: 0, 
      period: "Needs attention" 
    },
    { 
      label: "Onboarding", 
      value: clients?.filter(c => c.status === 'onboarding').length.toString() || "0", 
      change: 0, 
      period: "In progress" 
    },
    { 
      label: "Open Alerts", 
      value: alerts?.length.toString() || "0", 
      change: 0, 
      period: "Unresolved" 
    },
  ];

  // Client performance derived from actual data
  const clientPerformance = clients?.slice(0, 5).map(client => ({
    client: client.name,
    status: client.status,
    services: client.services,
    monthlyValue: client.monthly_value,
  })) || [];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "onboarding":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "at-risk":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "paused":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

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
        <title>Reporting & Alerts - Avorria Growth Platform</title>
      </Helmet>

      <AppShell type="platform" userName="Alex Morgan" userRole="Account Lead">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Reporting & Alerts</h1>
            <p className="text-muted-foreground">Portfolio-wide performance snapshot</p>
          </div>

          {/* Top Metrics */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-16" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {portfolioMetrics.map((metric) => (
                <Card key={metric.label}>
                  <CardContent className="p-6">
                    <p className="text-xs text-muted-foreground mb-2">{metric.label}</p>
                    <p className="text-2xl font-light text-foreground mb-1">{metric.value}</p>
                    <span className="text-xs text-muted-foreground">{metric.period}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Client Performance Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : clientPerformance.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No clients to display yet.</p>
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="bg-muted/50">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Client
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Services
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Monthly Value
                        </th>
                        <th className="text-center p-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientPerformance.map((client) => (
                        <tr key={client.client} className="border-b border-border hover:bg-muted/50">
                          <td className="p-4 font-medium text-foreground">{client.client}</td>
                          <td className="p-4">
                            <div className="flex gap-1 flex-wrap">
                              {client.services?.slice(0, 3).map(s => (
                                <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-sm text-foreground">{client.monthlyValue || '-'}</td>
                          <td className="p-4 text-center">
                            <Badge variant="outline" className={getStatusColor(client.status)}>
                              {client.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Alerts Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {alertsLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : alerts && alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <AlertCircle className="h-5 w-5 text-orange-600 mt-1 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground">{alert.client_name || 'System'}</h3>
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">{alert.type}</p>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                  <p className="text-muted-foreground">No unresolved alerts. Everything looks good!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

export default PlatformReporting;
