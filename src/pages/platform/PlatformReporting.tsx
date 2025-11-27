import { Helmet } from "react-helmet-async";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

const PlatformReporting = () => {
  const portfolioMetrics = [
    { label: "Total Organic Sessions", value: "124.5k", change: 12, period: "Last 30 days" },
    { label: "Total Leads", value: "1,240", change: -5, period: "Last 30 days" },
    { label: "Organic Pipeline", value: "£1.2M-1.8M", change: 18, period: "Last 90 days" },
    { label: "Paid Media Spend", value: "£85k", change: 8, period: "Last 30 days" },
  ];

  const clientPerformance = [
    {
      client: "TechCorp Industries",
      organic: "up",
      paid: "down",
      conversion: "up",
      status: "healthy",
    },
    { client: "GreenLeaf Solutions", organic: "up", paid: "up", conversion: "up", status: "healthy" },
    {
      client: "BlueSky Consulting",
      organic: "down",
      paid: "up",
      conversion: "down",
      status: "watch",
    },
    { client: "Urban Dynamics", organic: "up", paid: "down", conversion: "up", status: "healthy" },
  ];

  const alerts = [
    {
      client: "BlueSky Consulting",
      type: "Organic traffic drop",
      severity: "high",
      description: "15% decline in organic sessions MoM",
    },
    {
      client: "TechCorp Industries",
      type: "Tracking issue",
      severity: "critical",
      description: "Demo form tracking broken since Mar 15",
    },
    {
      client: "Urban Dynamics",
      type: "CPL increase",
      severity: "medium",
      description: "Google Ads CPL up 25%",
    },
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "watch":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "at-risk":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "";
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioMetrics.map((metric) => {
              const isPositive = metric.change >= 0;
              return (
                <Card key={metric.label}>
                  <CardContent className="p-6">
                    <p className="text-xs text-muted-foreground mb-2">{metric.label}</p>
                    <p className="text-2xl font-light text-foreground mb-1">{metric.value}</p>
                    <div className="flex items-center gap-1">
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3 text-green-600" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-600" />
                      )}
                      <span
                        className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}
                      >
                        {isPositive ? "+" : ""}
                        {metric.change}%
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">{metric.period}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Client Performance Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Performance Grid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr className="bg-muted/50">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                        Client
                      </th>
                      <th className="text-center p-4 text-sm font-medium text-muted-foreground">
                        Organic
                      </th>
                      <th className="text-center p-4 text-sm font-medium text-muted-foreground">
                        Paid
                      </th>
                      <th className="text-center p-4 text-sm font-medium text-muted-foreground">
                        Conversion
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
                        <td className="p-4 text-center">{getTrendIcon(client.organic)}</td>
                        <td className="p-4 text-center">{getTrendIcon(client.paid)}</td>
                        <td className="p-4 text-center">{getTrendIcon(client.conversion)}</td>
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
            </CardContent>
          </Card>

          {/* Alerts Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-1 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{alert.client}</h3>
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
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

export default PlatformReporting;
