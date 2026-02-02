import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useMyProjects } from "@/hooks/useClientProjects";
import AppShell from "@/components/app/AppShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Globe, 
  ExternalLink, 
  ArrowRight,
  Rocket,
  Clock,
  CheckCircle2,
  Search,
  Palette
} from "lucide-react";

const statusConfig = {
  discovery: { label: "Discovery", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Search },
  in_progress: { label: "In Progress", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock },
  review: { label: "Review", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: CheckCircle2 },
  launched: { label: "Launched", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: Rocket },
  maintenance: { label: "Maintenance", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: Globe },
};

const typeConfig = {
  website: { label: "Website", icon: Globe },
  seo: { label: "SEO", icon: Search },
  ongoing: { label: "Ongoing", icon: Clock },
  branding: { label: "Branding", icon: Palette },
};

const ClientProjects = () => {
  const { impersonatedClient } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const { data: projects, isLoading } = useMyProjects();

  return (
    <>
      <Helmet>
        <title>Projects - Client Portal</title>
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
            <h1 className="text-3xl font-light text-foreground mb-2">Your Projects</h1>
            <p className="text-muted-foreground">
              View all your active and completed projects with Avorria.
            </p>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <Skeleton className="h-24 w-full mb-4" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : projects?.length === 0 ? (
            <Card className="bg-card">
              <CardContent className="p-12 text-center">
                <Globe className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any projects with us yet. Get in touch to start your first project.
                </p>
                <Link to="/contact">
                  <Button variant="default">
                    Start a Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map((project) => {
                const status = statusConfig[project.status];
                const type = typeConfig[project.project_type];
                const StatusIcon = status.icon;
                const TypeIcon = type.icon;

                return (
                  <Card 
                    key={project.id} 
                    className="bg-card hover:shadow-lg transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <TypeIcon className="h-5 w-5 text-primary" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {type.label}
                          </Badge>
                        </div>
                        <Badge className={status.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      
                      {project.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>
                      )}

                      {/* URLs */}
                      <div className="space-y-2 mb-4">
                        {project.live_url && (
                          <a 
                            href={project.live_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Globe className="h-4 w-4" />
                            Live Site
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {project.staging_url && (
                          <a 
                            href={project.staging_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                          >
                            <Clock className="h-4 w-4" />
                            Staging Site
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>

                      <Link to={`/client/projects/${project.id}`}>
                        <Button variant="outline" className="w-full">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </AppShell>
    </>
  );
};

export default ClientProjects;
