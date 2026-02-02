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
  Palette,
  PenTool,
  Eye,
  FolderOpen
} from "lucide-react";
import { format } from "date-fns";

const assetTypeConfig = {
  wireframe: { label: "Wireframe", icon: PenTool, color: "bg-blue-500/20 text-blue-400" },
  technical_drawing: { label: "Technical Drawing", icon: Palette, color: "bg-purple-500/20 text-purple-400" },
  contract: { label: "Contract", icon: FileText, color: "bg-green-500/20 text-green-400" },
  other: { label: "Document", icon: FileText, color: "bg-gray-500/20 text-gray-400" },
};

const ClientDocuments = () => {
  const { impersonatedClient } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const { data: projects, isLoading: projectsLoading } = useMyProjects();

  // Get the first project to fetch its assets
  const firstProjectId = projects?.[0]?.id;
  const { data: assets, isLoading: assetsLoading } = useProjectAssets(firstProjectId);

  // Filter for document assets (wireframes, technical drawings, contracts)
  const documents = assets?.filter(a => 
    a.asset_type === "wireframe" || 
    a.asset_type === "technical_drawing" ||
    a.asset_type === "contract" ||
    a.asset_type === "other"
  ) || [];

  const wireframes = documents.filter(d => d.asset_type === "wireframe");
  const technicalDrawings = documents.filter(d => d.asset_type === "technical_drawing");
  const contracts = documents.filter(d => d.asset_type === "contract" || d.asset_type === "other");

  const isLoading = projectsLoading || assetsLoading;

  const renderDocumentCard = (doc: typeof documents[0]) => {
    const config = assetTypeConfig[doc.asset_type as keyof typeof assetTypeConfig] || assetTypeConfig.other;
    const Icon = config.icon;

    return (
      <Card key={doc.id} className="bg-card hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg ${config.color} flex items-center justify-center shrink-0`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">{doc.title}</h4>
              {doc.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{doc.description}</p>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="text-xs">
                  {config.label}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(doc.created_at), "MMM d, yyyy")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </a>
              <a href={doc.file_url} download>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Helmet>
        <title>Documents - Client Portal</title>
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
            <h1 className="text-3xl font-light text-foreground mb-2">Documents</h1>
            <p className="text-muted-foreground">
              Access wireframes, technical drawings, and other project documents.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : documents.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Documents Yet</h3>
                <p className="text-muted-foreground">
                  Your project documents, wireframes, and technical drawings will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Wireframes */}
              {wireframes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PenTool className="h-5 w-5 text-primary" />
                      Wireframes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {wireframes.map(renderDocumentCard)}
                  </CardContent>
                </Card>
              )}

              {/* Technical Drawings */}
              {technicalDrawings.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      Technical Drawings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {technicalDrawings.map(renderDocumentCard)}
                  </CardContent>
                </Card>
              )}

              {/* Contracts & Other Documents */}
              {contracts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Contracts & Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {contracts.map(renderDocumentCard)}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </AppShell>
    </>
  );
};

export default ClientDocuments;
