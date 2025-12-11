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
  FileText,
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Settings,
  Shield
} from "lucide-react";
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
import { useLeadsAdmin, useUpdateLead, useDeleteLead } from "@/hooks/useLeads";

// Mock analytics data for this website
const websiteAnalytics = {
  pageViews: 12847,
  uniqueVisitors: 4532,
  bounceRate: 42.3,
  avgSessionDuration: "2m 34s",
  topPages: [
    { path: "/", views: 3421, change: +12 },
    { path: "/services/seo", views: 2134, change: +8 },
    { path: "/case-studies", views: 1876, change: +23 },
    { path: "/web-design", views: 1654, change: -3 },
    { path: "/contact", views: 987, change: +5 },
  ],
  conversions: {
    total: 156,
    freeAudit: 67,
    contactForm: 45,
    projectEstimator: 28,
    webDesignStudio: 16,
  }
};

// Mock SEO/Technical data
const seoData = {
  indexedPages: 47,
  sitemapStatus: "healthy",
  lastCrawl: "2024-01-15T10:30:00",
  coreWebVitals: {
    lcp: { value: "1.2s", status: "good" },
    fid: { value: "45ms", status: "good" },
    cls: { value: "0.05", status: "good" },
  },
  issues: [
    { type: "warning", message: "3 pages have missing meta descriptions", count: 3 },
    { type: "info", message: "12 images without alt text", count: 12 },
  ]
};

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [leadsSearchQuery, setLeadsSearchQuery] = useState("");

  const { data: leads, isLoading: leadsLoading, refetch: refetchLeads } = useLeadsAdmin();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();

  const filteredLeads = leads?.filter(lead =>
    lead.name.toLowerCase().includes(leadsSearchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(leadsSearchQuery.toLowerCase()) ||
    (lead.company?.toLowerCase().includes(leadsSearchQuery.toLowerCase()))
  );

  const leadStats = {
    new: leads?.filter(l => l.status === 'new').length || 0,
    contacted: leads?.filter(l => l.status === 'contacted').length || 0,
    qualified: leads?.filter(l => l.status === 'qualified').length || 0,
    converted: leads?.filter(l => l.status === 'converted').length || 0,
  };

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

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                    <p className="text-2xl font-bold text-foreground">{leads?.length || 0}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary/50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Page Views</p>
                    <p className="text-2xl font-bold text-foreground">{websiteAnalytics.pageViews.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-foreground">{websiteAnalytics.conversions.total}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary/50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Indexed Pages</p>
                    <p className="text-2xl font-bold text-foreground">{seoData.indexedPages}</p>
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
              <TabsTrigger value="seo" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Globe className="h-4 w-4 mr-2" />
                SEO & Health
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
                        <p className="text-muted-foreground text-center py-4">Loading...</p>
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
                      {websiteAnalytics.topPages.slice(0, 4).map((page, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{page.path}</p>
                            <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                          </div>
                          <span className={`text-sm font-medium ${page.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {page.change >= 0 ? '+' : ''}{page.change}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Conversion Funnel */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>Lead capture performance by source</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{websiteAnalytics.conversions.freeAudit}</p>
                      <p className="text-sm text-muted-foreground">Free Audit</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{websiteAnalytics.conversions.contactForm}</p>
                      <p className="text-sm text-muted-foreground">Contact Form</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{websiteAnalytics.conversions.projectEstimator}</p>
                      <p className="text-sm text-muted-foreground">Project Estimator</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{websiteAnalytics.conversions.webDesignStudio}</p>
                      <p className="text-sm text-muted-foreground">Web Design Studio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SEO Health Overview */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Website Health</span>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("seo")}>
                      View Details <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{seoData.coreWebVitals.lcp.value}</p>
                      <p className="text-sm text-muted-foreground">LCP</p>
                      {getVitalStatus(seoData.coreWebVitals.lcp.status)}
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{seoData.coreWebVitals.fid.value}</p>
                      <p className="text-sm text-muted-foreground">FID</p>
                      {getVitalStatus(seoData.coreWebVitals.fid.status)}
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{seoData.coreWebVitals.cls.value}</p>
                      <p className="text-sm text-muted-foreground">CLS</p>
                      {getVitalStatus(seoData.coreWebVitals.cls.status)}
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
                    <p className="text-2xl font-bold text-blue-400">{leadStats.new}</p>
                    <p className="text-sm text-muted-foreground">New</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-400">{leadStats.contacted}</p>
                    <p className="text-sm text-muted-foreground">Contacted</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-400">{leadStats.qualified}</p>
                    <p className="text-sm text-muted-foreground">Qualified</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-400">{leadStats.converted}</p>
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
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Page Views</p>
                    <p className="text-2xl font-bold text-foreground">{websiteAnalytics.pageViews.toLocaleString()}</p>
                    <p className="text-xs text-green-400">+12% vs last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Unique Visitors</p>
                    <p className="text-2xl font-bold text-foreground">{websiteAnalytics.uniqueVisitors.toLocaleString()}</p>
                    <p className="text-xs text-green-400">+8% vs last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Bounce Rate</p>
                    <p className="text-2xl font-bold text-foreground">{websiteAnalytics.bounceRate}%</p>
                    <p className="text-xs text-red-400">+2% vs last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Avg. Session</p>
                    <p className="text-2xl font-bold text-foreground">{websiteAnalytics.avgSessionDuration}</p>
                    <p className="text-xs text-green-400">+15s vs last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Top Pages */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Top Pages</CardTitle>
                  <CardDescription>Most visited pages this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead>Page</TableHead>
                        <TableHead className="text-right">Views</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {websiteAnalytics.topPages.map((page, idx) => (
                        <TableRow key={idx} className="border-border/50">
                          <TableCell className="font-medium">{page.path}</TableCell>
                          <TableCell className="text-right">{page.views.toLocaleString()}</TableCell>
                          <TableCell className={`text-right ${page.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {page.change >= 0 ? '+' : ''}{page.change}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Conversion Sources */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Conversion Sources</CardTitle>
                  <CardDescription>Where your leads are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(websiteAnalytics.conversions).filter(([key]) => key !== 'total').map(([source, count]) => (
                      <div key={source} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium capitalize">{source.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-sm text-muted-foreground">{count}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(count / websiteAnalytics.conversions.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO & Health Tab */}
            <TabsContent value="seo" className="space-y-6">
              {/* Core Web Vitals */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Core Web Vitals</CardTitle>
                  <CardDescription>Performance metrics from Google</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Largest Contentful Paint</span>
                        {getVitalStatus(seoData.coreWebVitals.lcp.status)}
                      </div>
                      <p className="text-3xl font-bold text-foreground">{seoData.coreWebVitals.lcp.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">Target: &lt; 2.5s</p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">First Input Delay</span>
                        {getVitalStatus(seoData.coreWebVitals.fid.status)}
                      </div>
                      <p className="text-3xl font-bold text-foreground">{seoData.coreWebVitals.fid.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">Target: &lt; 100ms</p>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Cumulative Layout Shift</span>
                        {getVitalStatus(seoData.coreWebVitals.cls.status)}
                      </div>
                      <p className="text-3xl font-bold text-foreground">{seoData.coreWebVitals.cls.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">Target: &lt; 0.1</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Indexing Status */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>Indexing Status</CardTitle>
                    <CardDescription>Google Search Console data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span>Indexed Pages</span>
                      </div>
                      <span className="font-bold">{seoData.indexedPages}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <span>Sitemap Status</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 capitalize">{seoData.sitemapStatus}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span>Last Crawl</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{format(new Date(seoData.lastCrawl), 'MMM d, yyyy HH:mm')}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle>SEO Issues</CardTitle>
                    <CardDescription>Items that need attention</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {seoData.issues.map((issue, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                        {issue.type === 'warning' ? (
                          <AlertCircle className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{issue.message}</p>
                        </div>
                        <Badge variant="outline">{issue.count}</Badge>
                      </div>
                    ))}
                    {seoData.issues.length === 0 && (
                      <div className="text-center py-4 text-muted-foreground">
                        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                        <p>No issues found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common SEO tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <LinkIcon className="h-5 w-5" />
                      <span>View Sitemap</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <ExternalLink className="h-5 w-5" />
                      <span>Request Indexing</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <Shield className="h-5 w-5" />
                      <span>Check robots.txt</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                      <Settings className="h-5 w-5" />
                      <span>Meta Tags Audit</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default Admin;
