import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProject } from "@/hooks/useClientProjects";
import { useProjectAssets } from "@/hooks/useProjectAssets";
import AppShell from "@/components/app/AppShell";
import { BeforeAfterSliderMulti } from "@/components/case-studies/BeforeAfterSliderMulti";
import { ProjectTimeline } from "@/components/client/ProjectTimeline";
import { ProjectShowcase } from "@/components/client/ProjectShowcase";
import { DevicePreview } from "@/components/client/DevicePreview";
import { LiveSitePreview } from "@/components/client/LiveSitePreview";
import { AssetCommentForm } from "@/components/client/AssetCommentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Globe, 
  ExternalLink, 
  Calendar,
  FileText,
  Image,
  Download,
  Clock,
  Rocket,
  CheckCircle2,
  Search,
  Palette,
  MessageSquare,
  Monitor,
  Maximize2,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";

const statusConfig = {
  discovery: { label: "Discovery", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", icon: Search },
  in_progress: { label: "In Progress", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", icon: Clock },
  review: { label: "Review", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", icon: CheckCircle2 },
  launched: { label: "Launched", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: Rocket },
  maintenance: { label: "Maintenance", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", icon: Globe },
};

const ClientProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { impersonatedClient, user } = useAuth();
  const clientName = impersonatedClient || "Your Company";
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || "there";
  
  const { data: project, isLoading: projectLoading } = useProject(id);
  const { data: assets, isLoading: assetsLoading } = useProjectAssets(id);
  
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Filter assets by type
  const screenshots = assets?.filter(a => 
    a.asset_type === "screenshot_before" || a.asset_type === "screenshot_after"
  ) || [];
  const wireframes = assets?.filter(a => a.asset_type === "wireframe" || a.asset_type === "technical_drawing") || [];
  const documents = assets?.filter(a => 
    a.asset_type === "seo_proposal" || 
    a.asset_type === "roadmap" || 
    a.asset_type === "pricing_proposal" ||
    a.asset_type === "contract"
  ) || [];

  // Create before/after pairs using pair_id or fallback to position-based
  const beforeAfterPairs = React.useMemo(() => {
    if (!assets) return [];
    
    const beforeShots = assets.filter(a => a.asset_type === "screenshot_before");
    const afterShots = assets.filter(a => a.asset_type === "screenshot_after");
    const pairs: Array<{ id: string; label: string; beforeImage: string; afterImage: string }> = [];
    
    // First, try to match by pair_id
    const pairedBefore = new Set<string>();
    const pairedAfter = new Set<string>();
    
    beforeShots.forEach(before => {
      if (before.pair_id) {
        const matchingAfter = afterShots.find(after => 
          after.pair_id === before.pair_id && !pairedAfter.has(after.id)
        );
        if (matchingAfter) {
          pairs.push({
            id: before.id,
            label: before.pair_id || before.title,
            beforeImage: before.file_url,
            afterImage: matchingAfter.file_url,
          });
          pairedBefore.add(before.id);
          pairedAfter.add(matchingAfter.id);
        }
      }
    });
    
    // Fall back to position-based pairing for unpaired screenshots
    const unpairedBefore = beforeShots.filter(b => !pairedBefore.has(b.id));
    const unpairedAfter = afterShots.filter(a => !pairedAfter.has(a.id));
    
    for (let i = 0; i < Math.min(unpairedBefore.length, unpairedAfter.length); i++) {
      pairs.push({
        id: unpairedBefore[i].id,
        label: unpairedBefore[i].title || `Screenshot ${pairs.length + 1}`,
        beforeImage: unpairedBefore[i].file_url,
        afterImage: unpairedAfter[i].file_url,
      });
    }
    
    return pairs;
  }, [assets]);

  // Gallery images for fullscreen view
  const galleryImages = React.useMemo(() => {
    return screenshots.map(s => ({
      id: s.id,
      url: s.file_url,
      title: s.title,
      description: s.description || undefined,
    }));
  }, [screenshots]);

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setShowGallery(true);
  };

  if (projectLoading) {
    return (
      <AppShell type="client" userName={userName} userRole="Marketing Director" clientName={clientName}>
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </AppShell>
    );
  }

  if (!project) {
    return (
      <AppShell type="client" userName={userName} userRole="Marketing Director" clientName={clientName}>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Project not found</p>
          <Link to="/client/projects">
            <Button variant="link">Back to Projects</Button>
          </Link>
        </div>
      </AppShell>
    );
  }

  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <>
      <Helmet>
        <title>{project.name} - Client Portal</title>
      </Helmet>

      {/* Fullscreen Gallery */}
      {showGallery && galleryImages.length > 0 && (
        <ProjectShowcase
          images={galleryImages}
          initialIndex={galleryIndex}
          onClose={() => setShowGallery(false)}
        />
      )}

      {/* Live Site Preview Modal */}
      {showLivePreview && project.live_url && (
        <div className="fixed inset-0 z-50">
          <LiveSitePreview 
            url={project.live_url} 
            title={project.name}
            className="h-full"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowLivePreview(false)}
            className="absolute top-4 right-4 z-50 bg-background/80 hover:bg-background"
          >
            ×
          </Button>
        </div>
      )}

      <AppShell
        type="client"
        userName={userName}
        userRole="Marketing Director"
        clientName={clientName}
      >
        <div className="space-y-6">
          {/* Back Button */}
          <Link to="/client/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light text-foreground mb-2">{project.name}</h1>
              {project.description && (
                <p className="text-muted-foreground max-w-2xl">{project.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${status.color} shrink-0`}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {status.label}
              </Badge>
              {project.live_url && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowLivePreview(true)}
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Preview Live Site
                </Button>
              )}
            </div>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.live_url && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Live Site</span>
                  </div>
                  <a 
                    href={project.live_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                  >
                    Visit Site
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            )}
            {project.staging_url && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Staging</span>
                  </div>
                  <a 
                    href={project.staging_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-foreground hover:underline flex items-center gap-1"
                  >
                    Preview
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            )}
            {project.start_date && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Started</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {format(new Date(project.start_date), "MMM d, yyyy")}
                  </p>
                </CardContent>
              </Card>
            )}
            {project.target_launch_date && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Rocket className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Target Launch</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {format(new Date(project.target_launch_date), "MMM d, yyyy")}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Project Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectTimeline 
                status={project.status}
                startDate={project.start_date || undefined}
                targetLaunchDate={project.target_launch_date || undefined}
                launchedAt={project.launched_at || undefined}
              />
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="screenshots" className="w-full">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="screenshots" className="gap-2">
                <Image className="h-4 w-4" />
                Design Showcase
              </TabsTrigger>
              <TabsTrigger value="wireframes" className="gap-2">
                <Palette className="h-4 w-4" />
                Wireframes
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="screenshots" className="mt-6 space-y-6">
              {assetsLoading ? (
                <Skeleton className="h-96 w-full" />
              ) : beforeAfterPairs.length > 0 ? (
                <>
                  {/* Before/After Slider */}
                  <Card className="overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Before & After</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openGallery(0)}
                      >
                        <Maximize2 className="h-4 w-4 mr-2" />
                        Fullscreen Gallery
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <BeforeAfterSliderMulti pairs={beforeAfterPairs} />
                    </CardContent>
                  </Card>

                  {/* Device Preview (show latest after screenshot) */}
                  {beforeAfterPairs.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Device Preview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <DevicePreview 
                          imageUrl={beforeAfterPairs[0].afterImage}
                          alt={`${project.name} - ${beforeAfterPairs[0].label}`}
                        />
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : screenshots.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {screenshots.map((asset, index) => (
                    <Card 
                      key={asset.id} 
                      className="cursor-pointer hover:shadow-lg transition-shadow group"
                      onClick={() => openGallery(index)}
                    >
                      <CardContent className="p-4 relative">
                        <img 
                          src={asset.file_url} 
                          alt={asset.title}
                          className="w-full rounded-lg mb-2"
                        />
                        <div className="absolute inset-4 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Maximize2 className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-sm font-medium">{asset.title}</p>
                        {asset.description && (
                          <p className="text-xs text-muted-foreground">{asset.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Design concepts coming soon
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're working on your website design. Once the first concepts are ready, 
                      you'll be able to view before & after comparisons, explore in fullscreen, 
                      and leave feedback directly.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="wireframes" className="mt-6">
              {assetsLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : wireframes.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {wireframes.map((asset) => (
                    <Card key={asset.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <img 
                          src={asset.file_url} 
                          alt={asset.title}
                          className="w-full rounded-lg mb-2"
                        />
                        <p className="text-sm font-medium">{asset.title}</p>
                        {asset.description && (
                          <p className="text-xs text-muted-foreground">{asset.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-12 text-center">
                    <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Wireframes will appear here once created</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="documents" className="mt-6">
              {assetsLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : documents.length > 0 ? (
                <div className="space-y-3">
                  {documents.map((asset) => (
                    <Card key={asset.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{asset.title}</p>
                            {asset.description && (
                              <p className="text-sm text-muted-foreground">{asset.description}</p>
                            )}
                            <Badge variant="outline" className="mt-1 text-xs capitalize">
                              {asset.asset_type.replace(/_/g, " ")}
                            </Badge>
                          </div>
                        </div>
                        <a href={asset.file_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="p-12 text-center">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Documents will appear here as they're added</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Feedback Section */}
          {beforeAfterPairs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Leave Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Have thoughts on the design? Leave a comment and we'll review it promptly.
                </p>
                <AssetCommentForm assetId={beforeAfterPairs[0].id} assetTitle={beforeAfterPairs[0].label} />
              </CardContent>
            </Card>
          )}
        </div>
      </AppShell>
    </>
  );
};

export default ClientProjectDetail;
