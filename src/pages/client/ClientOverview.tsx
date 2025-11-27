import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, FileCheck, Activity, BarChart3, ArrowRight } from "lucide-react";

const ClientOverview = () => {
  const { impersonatedClient } = useAuth();
  const clientName = impersonatedClient || "TechCorp Industries";
  
  const currentFocus = [
    "Scale Google Ads spend while maintaining £45 CPL",
    "Improve organic rankings for 3 priority product pages",
    "Fix conversion tracking on demo request flow",
  ];

  const stats = [
    { label: "Monthly leads", value: "84", change: -8, icon: TrendingDown, color: "text-red-600" },
    { label: "Qualified leads", value: "52", change: 12, icon: TrendingUp, color: "text-green-600" },
    { label: "Pipeline value", value: "£240k", change: 22, icon: TrendingUp, color: "text-green-600" },
  ];

  return (
    <>
      <Helmet>
        <title>Overview - Client Portal</title>
      </Helmet>

      <AppShell
        type="client"
        userName="Sarah Mitchell"
        userRole="Marketing Director"
        clientName={clientName}
      >
        <div className="space-y-6">
          {/* Welcome */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">
              Here's what we're working on and how your numbers are tracking.
            </p>
          </div>

          {/* Current Focus */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {currentFocus.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Snapshot Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const isPositive = stat.change > 0;
              return (
                <Card key={stat.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-light text-foreground mb-1">{stat.value}</p>
                    <p className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
                      {isPositive ? "+" : ""}{stat.change}% vs last month
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileCheck className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">Latest Audit</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  View your most recent SEO & website audit with priority actions.
                </p>
                <Link to="/client/audits">
                  <Button variant="outline" className="w-full">
                    View audits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">Latest Report</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  See your latest performance report with all key metrics.
                </p>
                <Link to="/client/reporting">
                  <Button variant="outline" className="w-full">
                    View reporting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">Website Health</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Track your website health score over time.
                </p>
                <Link to="/client/website-health">
                  <Button variant="outline" className="w-full">
                    View health
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppShell>
    </>
  );
};

export default ClientOverview;
