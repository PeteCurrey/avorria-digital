'use client';
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
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
  Palette,
  Sparkles,
  MessageCircle
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
  const { impersonatedClient, user } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || "there";
  const { data: projects, isLoading } = useMyProjects();

  return (
    <>
      
        <title>Projects - Client Portal</title>
      

      <AppShell
        type="client"
        userName={userName}
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-card to-card border-dashed">
                <CardContent className="p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                  >
                    <Sparkles className="h-10 w-10 text-primary" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Welcome to your project hub!
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your {clientName} projects are being set up. Once your first project is ready, 
                    you'll be able to view design progress, compare before & after screenshots, 
                    and track milestones here.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                    <div className="p-4 rounded-xl bg-muted/50">
                      <Globe className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">Design Progress</p>
                      <p className="text-xs text-muted-foreground">Before & after views</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <CheckCircle2 className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">Milestone Tracking</p>
                      <p className="text-xs text-muted-foreground">Real-time updates</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50">
                      <MessageCircle className="h-6 w-6 text-primary mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">Direct Feedback</p>
                      <p className="text-xs text-muted-foreground">Comment on designs</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link href="/contact">
                      <Button variant="default">
                        Start a Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <a href="mailto:hello@avorria.com">
                      <Button variant="outline">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Your Account Manager
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map((project, index) => {
                const status = statusConfig[project.status];
                const type = typeConfig[project.project_type];
                const StatusIcon = status.icon;
                const TypeIcon = type.icon;

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className="bg-card hover:shadow-lg transition-all duration-300 group h-full"
                    >
                      <CardContent className="p-6 flex flex-col h-full">
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
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
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

                        <Link href={`/client/projects/${project.id}`} className="mt-auto">
                          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
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


