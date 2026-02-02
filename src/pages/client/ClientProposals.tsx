import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { useMyProjects } from "@/hooks/useClientProjects";
import { useProjectAssets } from "@/hooks/useProjectAssets";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Map,
  TrendingUp,
  ArrowRight,
  Eye
} from "lucide-react";
import { format } from "date-fns";

const ClientProposals = () => {
  const { impersonatedClient } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const { data: projects, isLoading: projectsLoading } = useMyProjects();

  // Get the first project to fetch its assets
  const firstProjectId = projects?.[0]?.id;
  const { data: assets, isLoading: assetsLoading } = useProjectAssets(firstProjectId);

  // Filter for proposal and roadmap assets
  const proposals = assets?.filter(a => 
    a.asset_type === "seo_proposal" || 
    a.asset_type === "pricing_proposal"
  ) || [];

  const roadmaps = assets?.filter(a => a.asset_type === "roadmap") || [];

  const isLoading = projectsLoading || assetsLoading;

  return (
    <>
      <Helmet>
        <title>Proposals & Roadmaps - Client Portal</title>
      </Helmet>

      <AppShell
        type="client"
        userName="Sarah Mitchell"
        userRole="Marketing Director"
        clientName={clientName}
      >
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-light text-foreground mb-2">Proposals & Roadmaps</h1>
            <p className="text-muted-foreground">
              Review SEO proposals, strategic roadmaps, and pricing documents.
            </p>
          </div>

          {/* Proposals Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Active Proposals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : proposals.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Active Proposals</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active proposals at the moment.
                  </p>
                  <Button variant="outline">
                    Request a Proposal
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {proposals.map((proposal) => (
                    <Card key={proposal.id} className="bg-muted/30">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{proposal.title}</h4>
                            {proposal.description && (
                              <p className="text-sm text-muted-foreground">{proposal.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs capitalize">
                                {proposal.asset_type.replace(/_/g, " ")}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {format(new Date(proposal.created_at), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href={proposal.file_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </a>
                          <a href={proposal.file_url} download>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Roadmaps Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5 text-primary" />
                Strategic Roadmaps
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(2)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : roadmaps.length === 0 ? (
                <div className="text-center py-12">
                  <Map className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Roadmaps Yet</h3>
                  <p className="text-muted-foreground">
                    Your strategic roadmaps will appear here once created.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {roadmaps.map((roadmap) => (
                    <Card key={roadmap.id} className="bg-muted/30">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{roadmap.title}</h4>
                            {roadmap.description && (
                              <p className="text-sm text-muted-foreground">{roadmap.description}</p>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(roadmap.created_at), "MMM d, yyyy")}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href={roadmap.file_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </a>
                          <a href={roadmap.file_url} download>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-1">Need a Custom Proposal?</h3>
                  <p className="text-sm text-muted-foreground">
                    Get in touch with your account manager to discuss your requirements.
                  </p>
                </div>
                <Button variant="default">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </AppShell>
    </>
  );
};

export default ClientProposals;
