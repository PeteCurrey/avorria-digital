import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Star,
  StarOff,
  Globe,
  GlobeLock,
  Search,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  Download,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCaseStudiesAdmin, useToggleFeatured, useTogglePublished, useDeleteCaseStudy, CaseStudyDB } from "@/hooks/useCaseStudies";
import CaseStudyEditor from "@/components/admin/CaseStudyEditor";

// Mock data for leads
const mockLeads = [
  { id: 1, name: "John Smith", email: "john@company.com", phone: "07700 900123", source: "Free Audit", status: "new", date: "2024-01-15" },
  { id: 2, name: "Sarah Johnson", email: "sarah@agency.co.uk", phone: "07700 900456", source: "Contact Form", status: "contacted", date: "2024-01-14" },
  { id: 3, name: "Mike Wilson", email: "mike@startup.io", phone: "07700 900789", source: "Project Estimator", status: "qualified", date: "2024-01-13" },
  { id: 4, name: "Emma Brown", email: "emma@retail.com", phone: "07700 900012", source: "Web Design Studio", status: "new", date: "2024-01-12" },
  { id: 5, name: "David Lee", email: "david@tech.co", phone: "07700 900345", source: "Agency Teardown", status: "converted", date: "2024-01-10" },
];

// Mock analytics data
const mockAnalytics = {
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

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCaseStudy, setEditingCaseStudy] = useState<CaseStudyDB | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: caseStudies, isLoading: caseStudiesLoading } = useCaseStudiesAdmin();
  const toggleFeatured = useToggleFeatured();
  const togglePublished = useTogglePublished();
  const deleteCaseStudy = useDeleteCaseStudy();

  const filteredCaseStudies = caseStudies?.filter(cs => 
    cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cs.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cs.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalCaseStudies: caseStudies?.length || 0,
    published: caseStudies?.filter(cs => cs.is_published).length || 0,
    featured: caseStudies?.filter(cs => cs.is_featured).length || 0,
    drafts: caseStudies?.filter(cs => !cs.is_published).length || 0,
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
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Avorria</title>
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your content, leads, and analytics</p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Case Studies</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalCaseStudies}</p>
                  </div>
                  <FileText className="h-8 w-8 text-primary/50" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                    <p className="text-2xl font-bold text-foreground">{mockLeads.length}</p>
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
                    <p className="text-2xl font-bold text-foreground">{mockAnalytics.pageViews.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-foreground">{mockAnalytics.conversions.total}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-primary/50" />
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
              <TabsTrigger value="case-studies" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <FileText className="h-4 w-4 mr-2" />
                Case Studies
              </TabsTrigger>
              <TabsTrigger value="leads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users className="h-4 w-4 mr-2" />
                Leads
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
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
                      {mockLeads.slice(0, 3).map(lead => (
                        <div key={lead.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{lead.name}</p>
                            <p className="text-sm text-muted-foreground">{lead.source}</p>
                          </div>
                          {getStatusBadge(lead.status)}
                        </div>
                      ))}
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
                      {mockAnalytics.topPages.slice(0, 4).map((page, idx) => (
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
                      <p className="text-3xl font-bold text-primary">{mockAnalytics.conversions.freeAudit}</p>
                      <p className="text-sm text-muted-foreground">Free Audit</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{mockAnalytics.conversions.contactForm}</p>
                      <p className="text-sm text-muted-foreground">Contact Form</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{mockAnalytics.conversions.projectEstimator}</p>
                      <p className="text-sm text-muted-foreground">Project Estimator</p>
                    </div>
                    <div className="text-center p-4 bg-background/50 rounded-lg">
                      <p className="text-3xl font-bold text-primary">{mockAnalytics.conversions.webDesignStudio}</p>
                      <p className="text-sm text-muted-foreground">Web Design Studio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Case Studies Tab */}
            <TabsContent value="case-studies" className="space-y-6">
              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search case studies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-card/50 border-border/50"
                  />
                </div>
                <Dialog open={isCreating} onOpenChange={setIsCreating}>
                  <DialogTrigger asChild>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      New Case Study
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Case Study</DialogTitle>
                      <DialogDescription>
                        Add a new case study to showcase your work
                      </DialogDescription>
                    </DialogHeader>
                    <CaseStudyEditor caseStudy={null} onClose={() => setIsCreating(false)} />
                  </DialogContent>
                </Dialog>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-foreground">{stats.totalCaseStudies}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-400">{stats.published}</p>
                    <p className="text-sm text-muted-foreground">Published</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-400">{stats.featured}</p>
                    <p className="text-sm text-muted-foreground">Featured</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-muted-foreground">{stats.drafts}</p>
                    <p className="text-sm text-muted-foreground">Drafts</p>
                  </CardContent>
                </Card>
              </div>

              {/* Case Studies Table */}
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-0">
                  {caseStudiesLoading ? (
                    <div className="p-8 text-center text-muted-foreground">Loading case studies...</div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/50">
                          <TableHead>Title</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Sector</TableHead>
                          <TableHead className="text-center">Featured</TableHead>
                          <TableHead className="text-center">Published</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCaseStudies?.map((cs) => (
                          <TableRow key={cs.id} className="border-border/50">
                            <TableCell className="font-medium">{cs.title}</TableCell>
                            <TableCell>{cs.client}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="capitalize">{cs.sector}</Badge>
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch
                                checked={cs.is_featured}
                                onCheckedChange={() => toggleFeatured.mutate({ id: cs.id, isFeatured: !cs.is_featured })}
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch
                                checked={cs.is_published}
                                onCheckedChange={() => togglePublished.mutate({ id: cs.id, isPublished: !cs.is_published })}
                              />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" asChild>
                                  <Link to={`/case-studies/${cs.slug}`} target="_blank">
                                    <Eye className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Dialog open={editingCaseStudy?.id === cs.id} onOpenChange={(open) => setEditingCaseStudy(open ? cs : null)}>
                                  <DialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                    <DialogHeader>
                                      <DialogTitle>Edit Case Study</DialogTitle>
                                      <DialogDescription>
                                        Update the case study details
                                      </DialogDescription>
                                    </DialogHeader>
                                    <CaseStudyEditor 
                                      caseStudy={editingCaseStudy} 
                                      onClose={() => setEditingCaseStudy(null)} 
                                    />
                                  </DialogContent>
                                </Dialog>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => {
                                    if (confirm("Are you sure you want to delete this case study?")) {
                                      deleteCaseStudy.mutate(cs.id);
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
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
                    className="pl-10 bg-card/50 border-border/50"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-border/50">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" className="border-border/50">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Lead Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-400">{mockLeads.filter(l => l.status === 'new').length}</p>
                    <p className="text-sm text-muted-foreground">New</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-400">{mockLeads.filter(l => l.status === 'contacted').length}</p>
                    <p className="text-sm text-muted-foreground">Contacted</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-400">{mockLeads.filter(l => l.status === 'qualified').length}</p>
                    <p className="text-sm text-muted-foreground">Qualified</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-400">{mockLeads.filter(l => l.status === 'converted').length}</p>
                    <p className="text-sm text-muted-foreground">Converted</p>
                  </CardContent>
                </Card>
              </div>

              {/* Leads Table */}
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-0">
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
                      {mockLeads.map((lead) => (
                        <TableRow key={lead.id} className="border-border/50">
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                {lead.email}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {lead.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{lead.source}</Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(lead.status)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {lead.date}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                    <p className="text-2xl font-bold text-foreground">{mockAnalytics.pageViews.toLocaleString()}</p>
                    <p className="text-xs text-green-400">+12% vs last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Unique Visitors</p>
                    <p className="text-2xl font-bold text-foreground">{mockAnalytics.uniqueVisitors.toLocaleString()}</p>
                    <p className="text-xs text-green-400">+8% vs last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Bounce Rate</p>
                    <p className="text-2xl font-bold text-foreground">{mockAnalytics.bounceRate}%</p>
                    <p className="text-xs text-red-400">+2% vs last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-1">Avg. Session</p>
                    <p className="text-2xl font-bold text-foreground">{mockAnalytics.avgSessionDuration}</p>
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
                      {mockAnalytics.topPages.map((page, idx) => (
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
                    {Object.entries(mockAnalytics.conversions).filter(([key]) => key !== 'total').map(([source, count]) => (
                      <div key={source} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium capitalize">{source.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="text-sm text-muted-foreground">{count}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(count / mockAnalytics.conversions.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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
