import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useClientStats, useClientFocus } from "@/hooks/useClientStats";
import { useMyProjects } from "@/hooks/useClientProjects";
import { useMyInvoices } from "@/hooks/useInvoices";
import AppShell from "@/components/app/AppShell";
import { WelcomeHero } from "@/components/client/WelcomeHero";
import { ClientOnboarding } from "@/components/client/ClientOnboarding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  FileCheck, 
  Activity, 
  BarChart3, 
  ArrowRight, 
  Search, 
  Loader2,
  CreditCard,
  Clock,
  Briefcase,
  Eye,
  Sparkles
} from "lucide-react";

const ClientOverview = () => {
  const { impersonatedClient, user } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || "there";
  
  const { data: stats, isLoading: statsLoading } = useClientStats(null);
  const { data: currentFocus, isLoading: focusLoading } = useClientFocus(null);
  const { data: projects, isLoading: projectsLoading } = useMyProjects();
  const { data: invoices } = useMyInvoices();

  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check for first-time visit
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem(`onboarding-complete-${clientName}`) || 
                               localStorage.getItem(`onboarding-dismissed-${clientName}`);
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, [clientName]);

  // Find featured website project
  const websiteProject = projects?.find(p => p.project_type === 'website');
  const hasWebsiteProject = !!websiteProject;

  // Calculate account balance
  const outstandingInvoices = invoices?.filter(inv => inv.status === 'sent' || inv.status === 'overdue') || [];
  const totalOutstanding = outstandingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const nextDueInvoice = outstandingInvoices.sort((a, b) => 
    new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  )[0];

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `£${(value / 1000).toFixed(1)}k`;
    }
    return `£${value.toLocaleString()}`;
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

      {/* Onboarding Modal */}
      {showOnboarding && (
        <ClientOnboarding
          userName={userName}
          clientName={clientName}
          accountManagerName="Tom Currey"
          accountManagerEmail="tom@avorria.com"
          onComplete={() => setShowOnboarding(false)}
          onDismiss={() => setShowOnboarding(false)}
        />
      )}

      <AppShell
        type="client"
        userName={userName}
        userRole="Marketing Director"
        clientName={clientName}
      >
        <div className="space-y-6">
          {/* Welcome Hero - Visual first for web design projects */}
          <WelcomeHero
            userName={userName}
            clientName={clientName}
            featuredProject={websiteProject ? {
              id: websiteProject.id,
              name: websiteProject.name,
              status: websiteProject.status,
              description: websiteProject.description || undefined,
            } : null}
            hasWebsiteProject={hasWebsiteProject}
          />

          {/* Account Balance & Active Projects Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Balance Widget */}
            <Card className="bg-gradient-to-br from-card to-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Account Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-light text-foreground">
                      {totalOutstanding > 0 ? formatCurrency(totalOutstanding) : '£0'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {totalOutstanding > 0 
                        ? `${outstandingInvoices.length} invoice${outstandingInvoices.length > 1 ? 's' : ''} outstanding`
                        : 'All invoices paid'}
                    </p>
                  </div>
                  
                  {nextDueInvoice && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Next due</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {formatCurrency(nextDueInvoice.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(nextDueInvoice.due_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  <Link to="/client/billing">
                    <Button variant="outline" className="w-full">
                      View Invoices
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Active Projects Widget */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Active Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                {projectsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : projects && projects.length > 0 ? (
                  <div className="space-y-3">
                    {projects.slice(0, 3).map((project) => (
                      <Link 
                        key={project.id}
                        to={`/client/projects/${project.id}`}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Briefcase className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {project.name}
                            </p>
                            <Badge variant="outline" className="text-xs capitalize">
                              {project.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <Eye className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                    
                    {projects.length > 3 && (
                      <Link to="/client/projects">
                        <Button variant="ghost" size="sm" className="w-full text-muted-foreground">
                          View all {projects.length} projects
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Sparkles className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Your first project is being set up.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll notify you when it's ready to view.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
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
