import React, { useState, useRef } from "react";
import { useProjectAssets, useCreateAsset, useDeleteAsset, uploadAssetFile, type AssetType } from "@/hooks/useProjectAssets";
import { useAllProjects } from "@/hooks/useClientProjects";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Search, 
  Trash2, 
  Upload,
  Image,
  FileText,
  Eye,
  Download
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const assetTypeConfig: Record<AssetType, { label: string; color: string }> = {
  screenshot_before: { label: "Screenshot (Before)", color: "bg-orange-500/20 text-orange-400" },
  screenshot_after: { label: "Screenshot (After)", color: "bg-green-500/20 text-green-400" },
  wireframe: { label: "Wireframe", color: "bg-blue-500/20 text-blue-400" },
  technical_drawing: { label: "Technical Drawing", color: "bg-purple-500/20 text-purple-400" },
  seo_proposal: { label: "SEO Proposal", color: "bg-pink-500/20 text-pink-400" },
  roadmap: { label: "Roadmap", color: "bg-cyan-500/20 text-cyan-400" },
  pricing_proposal: { label: "Pricing Proposal", color: "bg-yellow-500/20 text-yellow-400" },
  contract: { label: "Contract", color: "bg-gray-500/20 text-gray-400" },
  other: { label: "Other", color: "bg-gray-500/20 text-gray-400" },
};

const AssetManager = () => {
  const { user } = useAuth();
  const { data: projects } = useAllProjects();
  const createAsset = useCreateAsset();
  const deleteAsset = useDeleteAsset();

  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const { data: assets, isLoading } = useProjectAssets(selectedProjectId || undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    project_id: "",
    asset_type: "other" as AssetType,
    title: "",
    description: "",
    file: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      project_id: "",
      asset_type: "other",
      title: "",
      description: "",
      file: null,
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

  const handleSubmit = async () => {
    if (!formData.project_id || !formData.file || !formData.title || !user?.id) return;

    setIsUploading(true);
    try {
      // Upload file to storage
      const fileUrl = await uploadAssetFile(formData.file, user.id, formData.project_id);

      // Create asset record
      await createAsset.mutateAsync({
        project_id: formData.project_id,
        asset_type: formData.asset_type,
        title: formData.title,
        description: formData.description || undefined,
        file_url: fileUrl,
        file_size: formData.file.size,
        mime_type: formData.file.type,
      });

      resetForm();
      setIsUploadOpen(false);
      
      // Refresh the selected project's assets
      if (formData.project_id === selectedProjectId) {
        // Assets will be refetched automatically
      }
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

  const filteredAssets = assets?.filter(asset =>
    asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-4 flex-1">
          <Select
            value={selectedProjectId}
            onValueChange={setSelectedProjectId}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent>
              {projects?.map((project) => (
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
                  value={formData.project_id}
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
              <div className="space-y-2">
                <Label>File</Label>
                <Input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Homepage Before Redesign"
                />
              </div>
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
                disabled={!formData.project_id || !formData.file || !formData.title || isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Asset"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Assets Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          {!selectedProjectId ? (
            <div className="p-8 text-center text-muted-foreground">
              Select a project to view its assets
            </div>
          ) : isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading assets...</div>
          ) : filteredAssets?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Image className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No assets uploaded for this project</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setIsUploadOpen(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload First Asset
              </Button>
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
