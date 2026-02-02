import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  Eye,
  Clock,
  MousePointerClick,
  ArrowUpRight,
  RefreshCw
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

// Mock analytics data - in production this would come from the client_analytics_connections
const mockTrafficData = [
  { date: "Jan", visitors: 1200, pageViews: 3400 },
  { date: "Feb", visitors: 1400, pageViews: 3800 },
  { date: "Mar", visitors: 1800, pageViews: 4200 },
  { date: "Apr", visitors: 2100, pageViews: 5100 },
  { date: "May", visitors: 2400, pageViews: 5800 },
  { date: "Jun", visitors: 2200, pageViews: 5400 },
];

const mockTopPages = [
  { path: "/", views: 4520, change: 12 },
  { path: "/services", views: 2340, change: 8 },
  { path: "/contact", views: 1890, change: -3 },
  { path: "/about", views: 1450, change: 15 },
  { path: "/case-studies", views: 980, change: 22 },
];

const mockConversions = [
  { name: "Contact Form", count: 45, change: 18 },
  { name: "Phone Calls", count: 32, change: 5 },
  { name: "Email Signups", count: 128, change: 24 },
  { name: "Downloads", count: 67, change: -2 },
];

const ClientAnalytics = () => {
  const { impersonatedClient } = useAuth();
  const clientName = impersonatedClient || "Your Company";

  const stats = [
    { 
      label: "Total Visitors", 
      value: "12,450", 
      change: 15, 
      icon: Users,
      color: "text-blue-500"
    },
    { 
      label: "Page Views", 
      value: "34,200", 
      change: 12, 
      icon: Eye,
      color: "text-purple-500"
    },
    { 
      label: "Avg. Session", 
      value: "3m 24s", 
      change: 8, 
      icon: Clock,
      color: "text-green-500"
    },
    { 
      label: "Conversions", 
      value: "272", 
      change: 22, 
      icon: MousePointerClick,
      color: "text-accent"
    },
  ];

  return (
    <>
      <Helmet>
        <title>Analytics - Client Portal</title>
      </Helmet>

      <AppShell
        type="client"
        userName="Sarah Mitchell"
        userRole="Marketing Director"
        clientName={clientName}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-foreground mb-2">Analytics</h1>
              <p className="text-muted-foreground">
                Real-time website performance and visitor insights.
              </p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const isPositive = stat.change > 0;
              return (
                <Card key={stat.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-light text-foreground mb-1">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      {isPositive ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"}`}>
                        {isPositive ? "+" : ""}{stat.change}% vs last month
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Traffic Chart */}
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
                  <AreaChart data={mockTrafficData}>
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
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorVisitors)"
                      name="Visitors"
                    />
                    <Area
                      type="monotone"
                      dataKey="pageViews"
                      stroke="hsl(var(--accent))"
                      fillOpacity={1}
                      fill="url(#colorPageViews)"
                      name="Page Views"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTopPages.map((page, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">{page.path}</p>
                        <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                      </div>
                      <Badge className={page.change >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        {page.change >= 0 ? "+" : ""}{page.change}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversions */}
            <Card>
              <CardHeader>
                <CardTitle>Conversions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockConversions.map((conv, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-foreground">{conv.name}</p>
                        <p className="text-sm text-muted-foreground">{conv.count} this month</p>
                      </div>
                      <Badge className={conv.change >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}>
                        {conv.change >= 0 ? "+" : ""}{conv.change}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Want Deeper Insights?</h3>
                  <p className="text-sm text-muted-foreground">
                    Request a detailed analytics report from your account manager.
                  </p>
                </div>
                <Button variant="default">
                  Request Report
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

export default ClientAnalytics;
