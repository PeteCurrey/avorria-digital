import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useClientStats, useClientFocus } from "@/hooks/useClientStats";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, FileCheck, Activity, BarChart3, ArrowRight, Search, Target, Loader2 } from "lucide-react";

const ClientOverview = () => {
  const { impersonatedClient, user } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || "there";
  
  const { data: stats, isLoading: statsLoading } = useClientStats(null);
  const { data: currentFocus, isLoading: focusLoading } = useClientFocus(null);

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(0)}k`;
    }
    return `£${value}`;
  };

  const statItems = stats ? [
    { 
      label: "Monthly leads", 
      value: stats.totalLeads.toString(), 
      change: stats.leadChange, 
      icon: stats.leadChange >= 0 ? TrendingUp : TrendingDown, 
      color: stats.leadChange >= 0 ? "text-green-600" : "text-red-600" 
    },
    { 
      label: "Qualified leads", 
      value: stats.qualifiedLeads.toString(), 
      change: stats.qualifiedChange, 
      icon: stats.qualifiedChange >= 0 ? TrendingUp : TrendingDown, 
      color: stats.qualifiedChange >= 0 ? "text-green-600" : "text-red-600" 
    },
    { 
      label: "Pipeline value", 
      value: formatCurrency(stats.pipelineValue), 
      change: stats.pipelineChange, 
      icon: stats.pipelineChange >= 0 ? TrendingUp : TrendingDown, 
      color: stats.pipelineChange >= 0 ? "text-green-600" : "text-red-600" 
    },
  ] : [];

  return (
    <>
      <Helmet>
        <title>Overview - Client Portal</title>
      </Helmet>

      <AppShell
        type="client"
        userName={userName}
        userRole="Marketing Director"
        clientName={clientName}
      >
        <div className="space-y-6">
          {/* Welcome */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Welcome back, {userName}</h1>
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
              {focusLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <ul className="space-y-3">
                  {(currentFocus || []).map((item, index) => (
                    <li key={item.id || index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-sm text-foreground">{item.description}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Snapshot Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statsLoading ? (
              <div className="col-span-3 flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              statItems.map((stat) => {
                const Icon = stat.icon;
                const isPositive = stat.change >= 0;
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
              })
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">SEO Intelligence</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered website analysis, competitor insights & keyword research.
                </p>
                <Link to="/client/seo-intelligence">
                  <Button variant="outline" className="w-full">
                    Open tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

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
