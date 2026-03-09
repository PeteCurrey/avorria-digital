import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
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
  Eye,
  MousePointerClick,
  Clock,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import KPISparkline from "@/components/admin/KPISparkline";
import PerformanceTab from "@/components/admin/PerformanceTab";
import EnhancedSitemapManager from "@/components/admin/EnhancedSitemapManager";
import AnalyticsCharts from "@/components/admin/AnalyticsCharts";
import SEODashboard from "@/components/admin/SEODashboard";
import AdminSettings from "@/components/admin/AdminSettings";
import RealTimeActivityFeed from "@/components/admin/RealTimeActivityFeed";
import SystemHealthMonitor from "@/components/admin/SystemHealthMonitor";
import ContentCalendar from "@/components/admin/ContentCalendar";
import ReportGenerator from "@/components/admin/ReportGenerator";
import ContentStudio from "@/components/admin/ContentStudio";
import NewsletterBuilder from "@/components/admin/NewsletterBuilder";
import IntegrationsPanel from "@/components/admin/IntegrationsPanel";
import LiveGoogleAnalyticsWidget from "@/components/admin/LiveGoogleAnalyticsWidget";
import LiveSearchConsoleWidget from "@/components/admin/LiveSearchConsoleWidget";
import { LandingPageManager } from "@/components/admin/LandingPageManager";
import AuditReportsTab from "@/components/admin/AuditReportsTab";
import { ProjectsTab } from "@/components/admin/ProjectsTab";
import CaseStudiesTab from "@/components/admin/CaseStudiesTab";
import { TestimonialsTab } from "@/components/admin/TestimonialsTab";
import { ClientLogosTab } from "@/components/admin/ClientLogosTab";
import ClientProjectsManager from "@/components/admin/ClientProjectsManager";
import InvoiceManager from "@/components/admin/InvoiceManager";
import AssetManager from "@/components/admin/AssetManager";
import ResourcesManager from "@/components/admin/ResourcesManager";
import TeamMembersManager from "@/components/admin/TeamMembersManager";
import AnalyticsConnectionsTab from "@/components/admin/AnalyticsConnectionsTab";
import ClientsManager from "@/components/admin/ClientsManager";
import GoogleAdsTab from "@/components/admin/tabs/GoogleAdsTab";
import MetaAdsTab from "@/components/admin/tabs/MetaAdsTab";
import ClientPortalManager from "@/components/admin/ClientPortalManager";
import LinkedInAdsTab from "@/components/admin/tabs/LinkedInAdsTab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { StaticBeamBorder, BeamBorder } from "@/components/BeamBorder";
import { useLeadsAdmin, useUpdateLead, useDeleteLead, useLeadStats } from "@/hooks/useLeads";
import { useLatestAnalyticsSnapshot, useAnalyticsSnapshots } from "@/hooks/useAnalyticsSnapshots";
import { useClients } from "@/hooks/useClients";
import { useAlerts } from "@/hooks/useAlerts";

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const [leadsSearchQuery, setLeadsSearchQuery] = useState("");

  // Real data hooks
  const { data: leads, isLoading: leadsLoading, refetch: refetchLeads } = useLeadsAdmin();
  const { data: leadStats } = useLeadStats();
  const { data: analyticsSnapshot, isLoading: analyticsLoading } = useLatestAnalyticsSnapshot();
  const { data: analyticsHistory } = useAnalyticsSnapshots();
  const { data: clients } = useClients();
  const { data: alerts } = useAlerts({ unresolved: true });
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
  const pageViews = analyticsSnapshot?.page_views || 0;
  const uniqueVisitors = analyticsSnapshot?.unique_visitors || 0;
  const bounceRate = analyticsSnapshot?.bounce_rate || 0;
  const avgSessionDuration = analyticsSnapshot?.avg_session_duration || '0m 0s';
  const topPages = (analyticsSnapshot?.top_pages as Array<{ path: string; views: number; change?: number }>) || [];
  const conversions = (analyticsSnapshot?.conversions as Record<string, number>) || {};
  const totalConversions = Object.values(conversions).reduce((sum, val) => sum + (val || 0), 0);

  const navigateToTab = (tab: string) => {
    setSearchParams({ tab });
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

  const handleExportLeads = () => {
    if (leads && leads.length > 0) {
      const csv = [
        ["Name", "Email", "Company", "Phone", "Source", "Status", "Created At"],
        ...leads.map(l => [l.name, l.email, l.company || "", l.phone || "", l.source, l.status, l.created_at])
      ].map(row => row.join(",")).join("\n");
      
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
      a.click();
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview": return "Dashboard Overview";
      case "client-portals": return "Client Portals";
      case "clients": return "Client Management";
      case "projects": return "Projects";
      case "client-projects": return "Client Projects";
      case "assets": return "Asset Manager";
      case "invoicing": return "Invoicing";
      case "leads": return "Lead Management";
      case "case-studies": return "Case Studies";
      case "testimonials": return "Testimonials";
      case "client-logos": return "Client Logos";
      case "audits": return "Audit Reports";
      case "analytics": return "Analytics";
      case "performance": return "Performance";
      case "seo": return "SEO Dashboard";
      case "sitemap": return "Sitemap Manager";
      case "content": return "Content Calendar";
      case "content-studio": return "AI Content Studio";
      case "newsletter": return "Newsletter Builder";
      case "reports": return "Reports";
      case "analytics-connections": return "Analytics Connections";
      case "integrations": return "Integrations";
      case "settings": return "Settings";
      case "landing-pages": return "SEO Landing Pages";
      case "resources": return "Resources";
      case "team-members": return "Team Members";
      case "google-ads": return "Google Ads Management";
      case "meta-ads": return "Meta Ads Management";
      case "linkedin-ads": return "LinkedIn Ads Management";
      default: return "Admin Dashboard";
    }
  };

  const getPageSubtitle = () => {
    switch (activeTab) {
      case "overview": return "Monitor your key metrics and recent activity";
      case "client-portals": return "Manage client portal integrations, automations, and configurations";
      case "clients": return "Create and manage clients, link user accounts, and test client portal";
      case "projects": return "Manage website design projects from the studio";
      case "client-projects": return "Manage client projects, URLs, and status";
      case "assets": return "Upload screenshots, wireframes, and documents";
      case "invoicing": return "Create and manage client invoices";
      case "leads": return "Track and manage your sales leads";
      case "case-studies": return "Manage and publish your client success stories";
      case "testimonials": return "Manage client testimonials displayed on the website";
      case "client-logos": return "Manage client logos displayed on the home page";
      case "audits": return "View all generated website audit reports";
      case "analytics": return "Deep dive into your website analytics";
      case "performance": return "Monitor site speed and Core Web Vitals";
      case "seo": return "Track SEO performance and rankings";
      case "sitemap": return "Manage your sitemap and indexing";
      case "content": return "Plan and schedule your content";
      case "content-studio": return "Generate AI-powered content at scale";
      case "newsletter": return "Design and send beautiful newsletters";
      case "reports": return "Generate and schedule reports";
      case "analytics-connections": return "Connect per-client analytics integrations";
      case "integrations": return "Connect third-party services";
      case "settings": return "Configure your admin preferences";
      case "landing-pages": return "Create and manage SEO landing pages";
      case "resources": return "Manage and generate resource guides";
      case "team-members": return "Manage team members on the About page";
      case "google-ads": return "Campaign performance and optimization";
      case "meta-ads": return "Instagram and Facebook advertising campaigns";
      case "linkedin-ads": return "B2B campaign performance and lead generation";
      default: return "";
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Live Google Analytics Widget */}
            <LiveGoogleAnalyticsWidget />

            {/* Live Search Console Widget */}
            <LiveSearchConsoleWidget />
            {/* System Status & Activity Row */}
            <div className="grid md:grid-cols-3 gap-6">
              <SystemHealthMonitor />
              <div className="md:col-span-2">
                <RealTimeActivityFeed />
              </div>
            </div>

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
                  <KPISparkline data={(analyticsHistory || []).slice(0, 7).reverse().map(s => s.unique_visitors || 0)} color="hsl(var(--accent))" />
                </CardContent>
              </StaticBeamBorder>

              <BeamBorder>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Eye className="h-5 w-5 text-primary/70" />
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
                  <KPISparkline data={(analyticsHistory || []).slice(0, 7).reverse().map(s => s.page_views || 0)} color="hsl(210, 100%, 55%)" />
                </CardContent>
              </BeamBorder>

              <BeamBorder>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <MousePointerClick className="h-5 w-5 text-primary/70" />
                  </div>
                  {analyticsLoading ? (
                    <Skeleton className="h-8 w-16" />
                  ) : (
                    <motion.p 
                      className="text-2xl font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {totalConversions || stats.converted}
                    </motion.p>
                  )}
                  <p className="text-sm text-muted-foreground">Conversions</p>
                  <KPISparkline data={(analyticsHistory || []).slice(0, 7).reverse().map(s => Object.values((s.conversions as Record<string, number>) || {}).reduce((a, b) => a + (b || 0), 0))} color="hsl(142, 71%, 45%)" />
                </CardContent>
              </BeamBorder>

              <BeamBorder>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="h-5 w-5 text-primary/70" />
                  </div>
                  <motion.p 
                    className="text-2xl font-bold text-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {avgSessionDuration || '0m 0s'}
                  </motion.p>
                  <p className="text-sm text-muted-foreground">Avg. Session</p>
                </CardContent>
              </BeamBorder>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Leads */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm cursor-pointer hover:border-accent/50 transition-colors" onClick={() => navigateToTab("leads")}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Recent Leads</span>
                    <Button variant="ghost" size="sm">
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
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm cursor-pointer hover:border-accent/50 transition-colors" onClick={() => navigateToTab("analytics")}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Top Pages</span>
                    <Button variant="ghost" size="sm">
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
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm cursor-pointer hover:border-accent/50 transition-colors" onClick={() => navigateToTab("leads")}>
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
          </div>
        );

      case "leads":
        return (
          <div className="space-y-6">
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
                <Button 
                  variant="outline" 
                  className="border-border/50"
                  onClick={handleExportLeads}
                >
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
          </div>
        );

      case "analytics":
        return (
          <AnalyticsCharts 
            analyticsData={{
              pageViews,
              uniqueVisitors,
              bounceRate,
              avgSessionDuration,
            }}
          />
        );

      case "audits":
        return <AuditReportsTab />;

      case "case-studies":
        return <CaseStudiesTab />;

      case "testimonials":
        return <TestimonialsTab />;

      case "client-logos":
        return <ClientLogosTab />;

      case "client-portals":
        return <ClientPortalManager />;

      case "clients":
        return <ClientsManager />;

      case "projects":
        return <ProjectsTab />;

      case "client-projects":
        return <ClientProjectsManager />;

      case "assets":
        return <AssetManager />;

      case "invoicing":
        return <InvoiceManager />;
      case "performance":
        return <PerformanceTab />;

      case "seo":
        return <SEODashboard />;

      case "sitemap":
        return <EnhancedSitemapManager />;

      case "content":
        return <ContentCalendar />;

      case "content-studio":
        return <ContentStudio />;

      case "newsletter":
        return <NewsletterBuilder />;

      case "reports":
        return <ReportGenerator />;

      case "integrations":
        return <IntegrationsPanel />;

      case "analytics-connections":
        return <AnalyticsConnectionsTab />;

      case "settings":
        return <AdminSettings />;

      case "resources":
        return <ResourcesManager />;

      case "landing-pages":
        return <LandingPageManager />;

      case "team-members":
        return <TeamMembersManager />;

      case "google-ads":
        return <GoogleAdsTab />;

      case "meta-ads":
        return <MetaAdsTab />;

      case "linkedin-ads":
        return <LinkedInAdsTab />;

      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Select a section from the sidebar</p>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()} | Avorria Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminLayout title={getPageTitle()} subtitle={getPageSubtitle()}>
        {renderContent()}
      </AdminLayout>
    </>
  );
};

export default Admin;
