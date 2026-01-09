import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { format } from "date-fns";
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
  Map
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
import { StaticBeamBorder } from "@/components/BeamBorder";
import { useLeadsAdmin, useUpdateLead, useDeleteLead, useLeadStats } from "@/hooks/useLeads";
import { useLatestAnalyticsSnapshot } from "@/hooks/useAnalyticsSnapshots";

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

  const getVitalStatus = (status: string) => {
    switch (status) {
      case "good":
        return <Badge className="bg-green-500/20 text-green-400">Good</Badge>;
      case "needs-improvement":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Needs Work</Badge>;
      case "poor":
        return <Badge className="bg-red-500/20 text-red-400">Poor</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Website Admin | Avorria</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Website Admin</h1>
            <p className="text-muted-foreground">Manage leads, analytics, and SEO for avorria.com</p>
          </motion.div>

          {/* Quick Stats with Beam Borders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StaticBeamBorder duration={4}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                    <motion.p 
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {leads?.length || 0}
                    </motion.p>
                  </div>
                  <Users className="h-8 w-8 text-primary/50" />
                </div>
              </CardContent>
            </StaticBeamBorder>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Page Views</p>
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
                  </div>
                  <BarChart3 className="h-8 w-8 text-primary/50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversions</p>
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
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary/50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Qualified Leads</p>
                    <motion.p 
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {stats.qualified}
                    </motion.p>
                  </div>
                  <Globe className="h-8 w-8 text-primary/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card/50 border border-border/50">
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
              <div className="grid md:grid-cols-2 gap-6">
                {/* Recent Leads */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Leads</span>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("leads")}>
                        View All <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leadsLoading ? (
                        <div className="space-y-4">
                          {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                          ))}
                        </div>
                      ) : leads?.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No leads yet</p>
                      ) : (
                        leads?.slice(0, 3).map(lead => (
                          <div key={lead.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                            <div>
                              <p className="font-medium text-foreground">{lead.name}</p>
                              <p className="text-sm text-muted-foreground">{lead.source}</p>
                            </div>
                            {getStatusBadge(lead.status)}
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Pages */}
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Top Pages</span>
                      <Button variant="ghost" size="sm" onClick={() => setActiveTab("analytics")}>
                        View All <ArrowUpRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsLoading ? (
                        <div className="space-y-4">
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
                          <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                            <div>
                              <p className="font-medium text-foreground">{page.path}</p>
                              <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                            </div>
                            {page.change !== undefined && (
                              <span className={`text-sm font-medium ${page.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {page.change >= 0 ? '+' : ''}{page.change}%
                              </span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Conversion Funnel */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Lead Status Overview</CardTitle>
                  <CardDescription>Current lead distribution by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-blue-400">{stats.new}</p>
                      <p className="text-sm text-muted-foreground">New</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-yellow-400">{stats.contacted}</p>
                      <p className="text-sm text-muted-foreground">Contacted</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-purple-400">{stats.qualified}</p>
                      <p className="text-sm text-muted-foreground">Qualified</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-green-400">{stats.converted}</p>
                      <p className="text-sm text-muted-foreground">Converted</p>
                    </div>
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
              <Card className="bg-card/50 border-border/50">
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
