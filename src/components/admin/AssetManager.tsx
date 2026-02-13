import React, { useState, useRef } from "react";
import { useProjectAssets, useCreateAsset, useDeleteAsset, uploadAssetFile, type AssetType } from "@/hooks/useProjectAssets";
import { useAllProjects } from "@/hooks/useClientProjects";
import { useClients } from "@/hooks/useClients";
import { useAuth } from "@/hooks/useAuth";
import { BeforeAfterSliderMulti } from "@/components/case-studies/BeforeAfterSliderMulti";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Plus, Search, Trash2, Upload, Image, FileText, Eye, Download, Link, ChevronDown, Info, Camera, Lightbulb, SlidersHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const assetTypeConfig: Record<AssetType, { label: string; color: string; group: string }> = {
  screenshot_before: { label: "Screenshot (Before)", color: "bg-orange-500/20 text-orange-400", group: "screenshots" },
  screenshot_after: { label: "Screenshot (After)", color: "bg-green-500/20 text-green-400", group: "screenshots" },
  wireframe: { label: "Wireframe", color: "bg-blue-500/20 text-blue-400", group: "wireframes" },
  technical_drawing: { label: "Technical Drawing", color: "bg-purple-500/20 text-purple-400", group: "wireframes" },
  seo_proposal: { label: "SEO Proposal", color: "bg-pink-500/20 text-pink-400", group: "documents" },
  roadmap: { label: "Roadmap", color: "bg-cyan-500/20 text-cyan-400", group: "documents" },
  pricing_proposal: { label: "Pricing Proposal", color: "bg-yellow-500/20 text-yellow-400", group: "documents" },
  contract: { label: "Contract", color: "bg-gray-500/20 text-gray-400", group: "documents" },
  other: { label: "Other", color: "bg-gray-500/20 text-gray-400", group: "documents" },
};

const AssetManager = () => {
  const { user } = useAuth();
  const { data: projects } = useAllProjects();
  const { data: clients } = useClients();
  const createAsset = useCreateAsset();
  const deleteAsset = useDeleteAsset();

  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const { data: assets, isLoading } = useProjectAssets(selectedProjectId || undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUrlCaptureOpen, setIsUrlCaptureOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // URL capture form state
  const [urlFormData, setUrlFormData] = useState({
    beforeUrl: "",
    afterUrl: "",
  });

  // Form state
  const [formData, setFormData] = useState({
    project_id: "",
    asset_type: "other" as AssetType,
    title: "",
    description: "",
    file: null as File | null,
    pair_id: "",
  });

  // Filter projects by selected client
  const filteredProjects = selectedClientId
    ? projects?.filter(p => p.client_id === selectedClientId)
    : projects;

  // Auto-select project if only one exists for the client
  React.useEffect(() => {
    if (filteredProjects?.length === 1 && !selectedProjectId) {
      setSelectedProjectId(filteredProjects[0].id);
    }
  }, [filteredProjects, selectedProjectId]);

  const resetForm = () => {
    setFormData({
      project_id: selectedProjectId || "",
      asset_type: "other",
      title: "",
      description: "",
      file: null,
      pair_id: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        file,
        title: formData.title || file.name.replace(/\.[^/.]+$/, ""),
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        file,
        title: formData.title || file.name.replace(/\.[^/.]+$/, ""),
      });
      setIsUploadOpen(true);
    }
  };

  const handleSubmit = async () => {
    const projectId = formData.project_id || selectedProjectId;
    if (!projectId || !formData.file || !formData.title || !user?.id) return;

    setIsUploading(true);
    try {
      // Upload file to storage
      const fileUrl = await uploadAssetFile(formData.file, user.id, projectId);

      // Create asset record
      await createAsset.mutateAsync({
        project_id: projectId,
        asset_type: formData.asset_type,
        title: formData.title,
        description: formData.description || undefined,
        file_url: fileUrl,
        file_size: formData.file.size,
        mime_type: formData.file.type,
        pair_id: formData.pair_id || undefined,
      });

      resetForm();
      setIsUploadOpen(false);
      toast.success("Asset uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload asset: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this asset?")) {
      await deleteAsset.mutateAsync(id);
    }
  };

  // Group assets by type
  const groupedAssets = React.useMemo(() => {
    if (!assets) return { screenshots: [], wireframes: [], documents: [] };
    
    return {
      screenshots: assets.filter(a => assetTypeConfig[a.asset_type]?.group === "screenshots"),
      wireframes: assets.filter(a => assetTypeConfig[a.asset_type]?.group === "wireframes"),
      documents: assets.filter(a => assetTypeConfig[a.asset_type]?.group === "documents"),
    };
  }, [assets]);

  const filteredAssets = React.useMemo(() => {
    let filtered = assets || [];
    
    // Filter by group
    if (activeGroup !== "all") {
      filtered = filtered.filter(a => assetTypeConfig[a.asset_type]?.group === activeGroup);
    }
    
    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(asset =>
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [assets, activeGroup, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-4 flex-1 flex-wrap">
            {/* Client Filter */}
            <Select
              value={selectedClientId}
              onValueChange={(value) => {
                setSelectedClientId(value);
                setSelectedProjectId("");
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Clients</SelectItem>
                {clients?.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Project Selector */}
            <Select
              value={selectedProjectId}
              onValueChange={setSelectedProjectId}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {filteredProjects?.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name} ({project.client?.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 border-border/50"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {/* URL Capture Dialog */}
            <Dialog open={isUrlCaptureOpen} onOpenChange={setIsUrlCaptureOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Camera className="h-4 w-4 mr-2" />
                  Capture from URL
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Screenshot from URL</DialogTitle>
                  <DialogDescription>
                    Enter URLs to capture before/after screenshots
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Tip:</strong> Use <a href="https://screenshotmonster.com" target="_blank" rel="noopener noreferrer" className="text-accent underline">ScreenshotMonster</a> or similar tools to capture full-page screenshots from URLs, then download and upload them here.
                    </AlertDescription>
                  </Alert>
                  
                  <div className="space-y-2">
                    <Label>Before URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={urlFormData.beforeUrl}
                        onChange={(e) => setUrlFormData({ ...urlFormData, beforeUrl: e.target.value })}
                        placeholder="e.g., web.archive.org/web/... or staging URL"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => window.open(urlFormData.beforeUrl, "_blank")}
                        disabled={!urlFormData.beforeUrl}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The original website before your redesign
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>After URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={urlFormData.afterUrl}
                        onChange={(e) => setUrlFormData({ ...urlFormData, afterUrl: e.target.value })}
                        placeholder="e.g., client-site.com (live site)"
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => window.open(urlFormData.afterUrl, "_blank")}
                        disabled={!urlFormData.afterUrl}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      The new live website after your redesign
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/50">
                    <h4 className="text-sm font-medium mb-2">How to capture screenshots:</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Open ScreenshotMonster or similar tool</li>
                      <li>Enter each URL and capture full-page screenshot</li>
                      <li>Download the screenshot images</li>
                      <li>Upload them using the "Upload Asset" button</li>
                    </ol>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUrlCaptureOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    setIsUrlCaptureOpen(false);
                    setIsUploadOpen(true);
                  }}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Screenshots
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Upload Dialog */}
            <Dialog open={isUploadOpen} onOpenChange={(open) => {
              setIsUploadOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Asset
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload Asset</DialogTitle>
                  <DialogDescription>
                    Upload screenshots, wireframes, proposals, or other project documents.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Project</Label>
                    <Select
                      value={formData.project_id || selectedProjectId}
                      onValueChange={(value) => setFormData({ ...formData, project_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects?.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name} ({project.client?.name})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Asset Type</Label>
                    <Select
                      value={formData.asset_type}
                      onValueChange={(value: AssetType) => setFormData({ ...formData, asset_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(assetTypeConfig).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            {config.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Drag and Drop Zone */}
                  <div 
                    className="space-y-2"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <Label>File</Label>
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-accent/50 transition-colors">
                      {formData.file ? (
                        <div className="flex items-center justify-center gap-2">
                          <FileText className="h-6 w-6 text-accent" />
                          <span className="font-medium">{formData.file.name}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setFormData({ ...formData, file: null });
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Drag and drop a file here, or click to browse
                          </p>
                          <Input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*,.pdf,.doc,.docx"
                            className="max-w-[200px] mx-auto"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Homepage Before Redesign"
                    />
                  </div>
                  
                  {/* Show pair_id field for screenshots */}
                  {(formData.asset_type === "screenshot_before" || formData.asset_type === "screenshot_after") && (
                    <div className="space-y-2">
                      <Label>Page/Section Name</Label>
                      <Input
                        value={formData.pair_id}
                        onChange={(e) => setFormData({ ...formData, pair_id: e.target.value })}
                        placeholder="e.g., Homepage, About Page, Contact"
                      />
                      <p className="text-xs text-muted-foreground">
                        This links before/after screenshots together. Use the same name for matching pairs.
                      </p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Description (Optional)</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of the asset..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!(formData.project_id || selectedProjectId) || !formData.file || !formData.title || isUploading}
                  >
                    {isUploading ? "Uploading..." : "Upload Asset"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Asset Type Tabs */}
        {selectedProjectId && assets && assets.length > 0 && (
          <div className="flex gap-2">
            <Button 
              variant={activeGroup === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveGroup("all")}
            >
              All ({assets.length})
            </Button>
            <Button 
              variant={activeGroup === "screenshots" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveGroup("screenshots")}
            >
              Screenshots ({groupedAssets.screenshots.length})
            </Button>
            <Button 
              variant={activeGroup === "wireframes" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveGroup("wireframes")}
            >
              Wireframes ({groupedAssets.wireframes.length})
            </Button>
            <Button 
              variant={activeGroup === "documents" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveGroup("documents")}
            >
              Documents ({groupedAssets.documents.length})
            </Button>
          </div>
        )}
      </div>

      {/* Assets Table */}
      <Card 
        className="bg-card/50 border-border/50"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CardContent className="p-0">
          {!selectedProjectId ? (
            <div className="p-8 text-center text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">Select a project to view its assets</p>
              <p className="text-sm">Or drag and drop a file here to start uploading</p>
            </div>
          ) : isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading assets...</div>
          ) : filteredAssets?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">No assets uploaded for this project</p>
              <p className="text-sm mb-4">
                {activeGroup !== "all" ? "Try viewing all assets or " : ""}
                Drag and drop files here or use the upload button
              </p>
              <div className="flex gap-2 justify-center">
                <Button 
                  variant="outline"
                  onClick={() => setIsUrlCaptureOpen(true)}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Capture from URL
                </Button>
                <Button 
                  onClick={() => setIsUploadOpen(true)}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload First Asset
                </Button>
      </div>

      {/* Inline Before/After Preview */}
      {selectedProjectId && groupedAssets.screenshots.length >= 2 && (() => {
        const beforeShots = groupedAssets.screenshots.filter(a => a.asset_type === "screenshot_before");
        const afterShots = groupedAssets.screenshots.filter(a => a.asset_type === "screenshot_after");
        const previewPairs: Array<{ id: string; label: string; beforeImage: string; afterImage: string }> = [];
        const pairedIds = new Set<string>();
        beforeShots.forEach(before => {
          if (before.pair_id) {
            const match = afterShots.find(a => a.pair_id === before.pair_id && !pairedIds.has(a.id));
            if (match) {
              previewPairs.push({ id: before.id, label: before.pair_id || before.title, beforeImage: before.file_url, afterImage: match.file_url });
              pairedIds.add(match.id);
            }
          }
        });
        if (previewPairs.length === 0) return null;
        return (
          <Card className="bg-card/50 border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-primary" />
                Before/After Preview
              </CardTitle>
              <CardDescription>Preview how the client will see the before/after slider</CardDescription>
            </CardHeader>
            <CardContent>
              <BeforeAfterSliderMulti pairs={previewPairs} />
            </CardContent>
          </Card>
        );
      })()}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Preview</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Uploaded</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets?.map((asset) => {
                  const config = assetTypeConfig[asset.asset_type];
                  const isImage = asset.mime_type?.startsWith("image/");
                  return (
                    <TableRow key={asset.id} className="border-border/50">
                      <TableCell>
                        {isImage ? (
                          <img 
                            src={asset.file_url} 
                            alt={asset.title}
                            className="h-12 w-20 object-cover rounded"
                          />
                        ) : (
                          <div className="h-12 w-20 bg-muted rounded flex items-center justify-center">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{asset.title}</p>
                          {asset.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">{asset.description}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={config.color}>
                          {config.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(new Date(asset.created_at), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <a href={asset.file_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </a>
                          <a href={asset.file_url} download>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </a>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(asset.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssetManager;
