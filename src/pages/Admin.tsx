import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Search,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  ArrowUpRight,
  Download,
  RefreshCw,
  Trash2,
  Globe,
  Gauge,
  Map,
  Activity,
  Bell,
  Settings,
  FileText,
  Zap,
  Shield,
  Clock,
  Eye,
  MousePointerClick,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Cpu,
  Wifi,
  ChevronRight
} from "lucide-react";
import PerformanceTab from "@/components/admin/PerformanceTab";
import EnhancedSitemapManager from "@/components/admin/EnhancedSitemapManager";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";
import SEODashboard from "@/components/admin/SEODashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { StaticBeamBorder, BeamBorder } from "@/components/BeamBorder";
import { useLeadsAdmin, useUpdateLead, useDeleteLead, useLeadStats } from "@/hooks/useLeads";
import { useLatestAnalyticsSnapshot } from "@/hooks/useAnalyticsSnapshots";
import heroPenthouse from "@/assets/hero-penthouse.png";

// Quick actions data
const quickActions = [
  { label: "Export Leads", icon: Download, action: "export-leads" },
  { label: "Run SEO Audit", icon: Search, action: "seo-audit" },
  { label: "View Reports", icon: FileText, action: "view-reports" },
  { label: "System Settings", icon: Settings, action: "settings" },
];

// System status mock data
const systemStatus = [
  { name: "API Server", status: "operational", icon: Server, latency: "24ms" },
  { name: "Database", status: "operational", icon: Database, latency: "8ms" },
  { name: "CDN", status: "operational", icon: Globe, latency: "12ms" },
  { name: "Edge Functions", status: "operational", icon: Cpu, latency: "45ms" },
];

// Activity feed mock data
const recentActivity = [
  { type: "lead", message: "New lead from SEO Audit", time: new Date(Date.now() - 1000 * 60 * 5), icon: Users },
  { type: "alert", message: "Page speed improved by 12%", time: new Date(Date.now() - 1000 * 60 * 30), icon: Zap },
  { type: "seo", message: "3 keywords moved to page 1", time: new Date(Date.now() - 1000 * 60 * 60 * 2), icon: TrendingUp },
  { type: "security", message: "SSL certificate renewed", time: new Date(Date.now() - 1000 * 60 * 60 * 6), icon: Shield },
  { type: "content", message: "Blog post published", time: new Date(Date.now() - 1000 * 60 * 60 * 12), icon: FileText },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [leadsSearchQuery, setLeadsSearchQuery] = useState("");

  const { data: leads, isLoading: leadsLoading, refetch: refetchLeads } = useLeadsAdmin();
  const { data: leadStats } = useLeadStats();
  const { data: analyticsSnapshot, isLoading: analyticsLoading } = useLatestAnalyticsSnapshot();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();

  const filteredLeads = leads?.filter(lead =>
    lead.name.toLowerCase().includes(leadsSearchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(leadsSearchQuery.toLowerCase()) ||
    (lead.company?.toLowerCase().includes(leadsSearchQuery.toLowerCase()))
  );

  const stats = {
    new: leadStats?.byStatus?.new || 0,
    contacted: leadStats?.byStatus?.contacted || 0,
    qualified: leadStats?.byStatus?.qualified || 0,
    converted: leadStats?.byStatus?.converted || 0,
  };

  // Analytics data from database or show empty state
  const hasAnalytics = !!analyticsSnapshot;
  const pageViews = analyticsSnapshot?.page_views || 0;
  const uniqueVisitors = analyticsSnapshot?.unique_visitors || 0;
  const bounceRate = analyticsSnapshot?.bounce_rate || 0;
  const avgSessionDuration = analyticsSnapshot?.avg_session_duration || '0m 0s';
  const topPages = (analyticsSnapshot?.top_pages as Array<{ path: string; views: number; change?: number }>) || [];
  const conversions = (analyticsSnapshot?.conversions as Record<string, number>) || {};
  const totalConversions = Object.values(conversions).reduce((sum, val) => sum + (val || 0), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">New</Badge>;
      case "contacted":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Contacted</Badge>;
      case "qualified":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Qualified</Badge>;
      case "converted":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Converted</Badge>;
      case "lost":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Lost</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    const activityItem = recentActivity.find(a => a.type === type);
    if (!activityItem) return Activity;
    return activityItem.icon;
  };

  return (
    <>
      <Helmet>
        <title>Website Admin | Avorria</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Hero Header with Background Image */}
        <section 
          className="relative pt-24 pb-12 overflow-hidden"
          style={{
            backgroundImage: `url(${heroPenthouse})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background" />
          
          {/* Animated grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px), 
                                  linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/20 rounded-lg backdrop-blur-sm border border-primary/30">
                    <LayoutDashboard className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                    System Online
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  Admin Dashboard
                </h1>
                <p className="text-white/70 max-w-lg">
                  Manage leads, analytics, SEO performance, and site health for avorria.com
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, idx) => (
                  <motion.div
                    key={action.action}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <Button 
                      variant="outline" 
                      className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                    >
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hero Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { label: "Total Leads", value: leads?.length || 0, icon: Users, color: "text-primary" },
                { label: "Page Views", value: pageViews.toLocaleString(), icon: Eye, color: "text-blue-400" },
                { label: "Conversions", value: totalConversions, icon: MousePointerClick, color: "text-green-400" },
                { label: "SEO Score", value: "84/100", icon: TrendingUp, color: "text-purple-400" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 * idx }}
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12%
                      </Badge>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* System Status & Activity Row */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* System Status */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Server className="h-5 w-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemStatus.map((system, idx) => (
                  <motion.div
                    key={system.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                    className="flex items-center justify-between p-2 bg-background/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <system.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{system.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{system.latency}</span>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm md:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Recent Activity
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx }}
                      className="flex items-center gap-4 p-3 bg-background/50 rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'lead' ? 'bg-blue-500/20' :
                        activity.type === 'alert' ? 'bg-green-500/20' :
                        activity.type === 'seo' ? 'bg-purple-500/20' :
                        activity.type === 'security' ? 'bg-yellow-500/20' :
                        'bg-primary/20'
                      }`}>
                        <activity.icon className={`h-4 w-4 ${
                          activity.type === 'lead' ? 'text-blue-400' :
                          activity.type === 'alert' ? 'text-green-400' :
                          activity.type === 'seo' ? 'text-purple-400' :
                          activity.type === 'security' ? 'text-yellow-400' :
                          'text-primary'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(activity.time, { addSuffix: true })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card/50 border border-border/50 p-1 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="leads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users className="h-4 w-4 mr-2" />
                Leads
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="performance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Gauge className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="seo" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Globe className="h-4 w-4 mr-2" />
                SEO & Health
              </TabsTrigger>
              <TabsTrigger value="sitemap" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Map className="h-4 w-4 mr-2" />
                Sitemap
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* KPI Cards with Beam Borders */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StaticBeamBorder duration={4}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="h-5 w-5 text-primary/70" />
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                        +{stats.new} new
                      </Badge>
                    </div>
                    <motion.p 
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {leads?.length || 0}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                  </CardContent>
                </StaticBeamBorder>

                <BeamBorder>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Eye className="h-5 w-5 text-primary/70" />
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +15%
                      </Badge>
                    </div>
                    {analyticsLoading ? (
                      <Skeleton className="h-8 w-16" />
                    ) : (
                      <motion.p 
                        className="text-2xl font-bold text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {pageViews.toLocaleString()}
                      </motion.p>
                    )}
                    <p className="text-sm text-muted-foreground">Page Views</p>
                  </CardContent>
                </BeamBorder>

                <BeamBorder>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <MousePointerClick className="h-5 w-5 text-primary/70" />
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                        2.4% rate
                      </Badge>
                    </div>
                    {analyticsLoading ? (
                      <Skeleton className="h-8 w-16" />
                    ) : (
                      <motion.p 
                        className="text-2xl font-bold text-foreground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {totalConversions}
                      </motion.p>
                    )}
                    <p className="text-sm text-muted-foreground">Conversions</p>
                  </CardContent>
                </BeamBorder>

                <BeamBorder>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Clock className="h-5 w-5 text-primary/70" />
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8%
                      </Badge>
                    </div>
                    <motion.p 
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {avgSessionDuration || '3m 24s'}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">Avg. Session</p>
                  </CardContent>
                </BeamBorder>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Leads</span>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("leads")}>
                        View All <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {leadsLoading ? (
                        <div className="space-y-3">
                          {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                          ))}
                        </div>
                      ) : leads?.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No leads yet</p>
                      ) : (
                        leads?.slice(0, 4).map((lead, idx) => (
                          <motion.div 
                            key={lead.id} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-muted/30 transition-colors"
                          >
                            <div>
                              <p className="font-medium text-foreground">{lead.name}</p>
                              <p className="text-sm text-muted-foreground">{lead.source}</p>
                            </div>
                            {getStatusBadge(lead.status)}
                          </motion.div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Pages */}
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Top Pages</span>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("analytics")}>
                        View All <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyticsLoading ? (
                        <div className="space-y-3">
                          {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                          ))}
                        </div>
                      ) : topPages.length === 0 ? (
                        <div className="text-center py-8">
                          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-2">No analytics data yet</p>
                          <p className="text-sm text-muted-foreground">Connect Google Analytics or add data manually</p>
                        </div>
                      ) : (
                        topPages.slice(0, 4).map((page, idx) => (
                          <motion.div 
                            key={idx} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.05 * idx }}
                            className="flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-muted/30 transition-colors"
                          >
                            <div>
                              <p className="font-medium text-foreground">{page.path}</p>
                              <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                            </div>
                            {page.change !== undefined && (
                              <Badge className={`${page.change >= 0 ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                                {page.change >= 0 ? '+' : ''}{page.change}%
                              </Badge>
                            )}
                          </motion.div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Lead Funnel Visualization */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Lead Pipeline</CardTitle>
                  <CardDescription>Current lead distribution by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: "New", value: stats.new, color: "bg-blue-500", maxWidth: Math.max(stats.new, stats.contacted, stats.qualified, stats.converted) || 10 },
                      { label: "Contacted", value: stats.contacted, color: "bg-yellow-500", maxWidth: Math.max(stats.new, stats.contacted, stats.qualified, stats.converted) || 10 },
                      { label: "Qualified", value: stats.qualified, color: "bg-purple-500", maxWidth: Math.max(stats.new, stats.contacted, stats.qualified, stats.converted) || 10 },
                      { label: "Converted", value: stats.converted, color: "bg-green-500", maxWidth: Math.max(stats.new, stats.contacted, stats.qualified, stats.converted) || 10 },
                    ].map((stage, idx) => (
                      <motion.div
                        key={stage.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{stage.label}</span>
                          <span className="text-sm text-muted-foreground">{stage.value}</span>
                        </div>
                        <div className="h-8 bg-muted/30 rounded-lg overflow-hidden">
                          <motion.div
                            className={`h-full ${stage.color} rounded-lg flex items-center justify-end pr-3`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(stage.value / stage.maxWidth) * 100}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * idx }}
                          >
                            {stage.value > 0 && (
                              <span className="text-xs font-bold text-white">{stage.value}</span>
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Leads Tab */}
            <TabsContent value="leads" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads..."
                    value={leadsSearchQuery}
                    onChange={(e) => setLeadsSearchQuery(e.target.value)}
                    className="pl-10 bg-card/50 border-border/50"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-border/50">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" className="border-border/50" onClick={() => refetchLeads()}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Lead Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-400">{stats.new}</p>
                    <p className="text-sm text-muted-foreground">New</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-400">{stats.contacted}</p>
                    <p className="text-sm text-muted-foreground">Contacted</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-400">{stats.qualified}</p>
                    <p className="text-sm text-muted-foreground">Qualified</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-400">{stats.converted}</p>
                    <p className="text-sm text-muted-foreground">Converted</p>
                  </CardContent>
                </Card>
              </div>

              {/* Leads Table */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardContent className="p-0">
                  {leadsLoading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading leads...</div>
                  ) : filteredLeads?.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">No leads found</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/50">
                          <TableHead>Name</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Source</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLeads?.map((lead) => (
                          <TableRow key={lead.id} className="border-border/50">
                            <TableCell>
                              <div>
                                <p className="font-medium">{lead.name}</p>
                                {lead.company && <p className="text-sm text-muted-foreground">{lead.company}</p>}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-3 w-3 text-muted-foreground" />
                                  {lead.email}
                                </div>
                                {lead.phone && (
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-3 w-3" />
                                    {lead.phone}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">{lead.source}</Badge>
                            </TableCell>
                            <TableCell>
                              <Select
                                value={lead.status}
                                onValueChange={(value) => updateLead.mutate({ id: lead.id, updates: { status: value } })}
                              >
                                <SelectTrigger className="w-32 h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="new">New</SelectItem>
                                  <SelectItem value="contacted">Contacted</SelectItem>
                                  <SelectItem value="qualified">Qualified</SelectItem>
                                  <SelectItem value="converted">Converted</SelectItem>
                                  <SelectItem value="lost">Lost</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(lead.created_at), 'MMM d, yyyy')}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => {
                                  if (confirm("Delete this lead?")) {
                                    deleteLead.mutate(lead.id);
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <AnalyticsCharts 
                analyticsData={{
                  pageViews,
                  uniqueVisitors,
                  bounceRate,
                  avgSessionDuration,
                }}
              />
            </TabsContent>

            {/* SEO & Health Tab */}
            <TabsContent value="seo" className="space-y-6">
              <SEODashboard />
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance">
              <PerformanceTab />
            </TabsContent>

            {/* Sitemap Tab */}
            <TabsContent value="sitemap">
              <EnhancedSitemapManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default Admin;
