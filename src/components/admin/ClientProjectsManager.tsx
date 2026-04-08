'use client';
import Link from "next/link";
import Navigate from '@/components/Navigate';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAllProjects, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/useClientProjects";
import { useClients } from "@/hooks/useClients";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Plus, Search, Globe, Trash2, Pencil, ExternalLink, Rocket, Clock, CheckCircle2, Eye
} from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const statusConfig = {
  discovery: { label: "Discovery", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  in_progress: { label: "In Progress", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  review: { label: "Review", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  launched: { label: "Launched", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  maintenance: { label: "Maintenance", color: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

const typeConfig = {
  website: "Website",
  seo: "SEO",
  ongoing: "Ongoing",
  branding: "Branding",
};

interface PortalConfig {
  show_design_showcase: boolean;
  show_seo_performance: boolean;
  show_documents: boolean;
  show_wireframes: boolean;
  featured_image_url: string | null;
}

const defaultPortalConfig: PortalConfig = {
  show_design_showcase: true,
  show_seo_performance: false,
  show_documents: true,
  show_wireframes: true,
  featured_image_url: null,
};

const ClientProjectsManager = () => {
  const router = useRouter();
  const { setImpersonatedClient } = useAuth();
  const { data: projects, isLoading } = useAllProjects();
  const { data: clients } = useClients();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    client_id: "",
    name: "",
    description: "",
    project_type: "website" as const,
    status: "discovery" as const,
    live_url: "",
    staging_url: "",
    start_date: "",
    target_launch_date: "",
  });

  const [portalConfig, setPortalConfig] = useState<PortalConfig>(defaultPortalConfig);

  const resetForm = () => {
    setFormData({
      client_id: "", name: "", description: "", project_type: "website", status: "discovery",
      live_url: "", staging_url: "", start_date: "", target_launch_date: "",
    });
    setPortalConfig(defaultPortalConfig);
    setEditingProject(null);
  };

  const handleSubmit = async () => {
    if (!formData.client_id || !formData.name) return;
    const client = clients?.find(c => c.id === formData.client_id);
    const user_id = client?.owner_id || "";

    const sanitizedData = {
      client_id: formData.client_id,
      name: formData.name,
      project_type: formData.project_type,
      status: formData.status,
      description: formData.description || undefined,
      live_url: formData.live_url || undefined,
      staging_url: formData.staging_url || undefined,
      start_date: formData.start_date || undefined,
      target_launch_date: formData.target_launch_date || undefined,
    };

    if (editingProject) {
      await updateProject.mutateAsync({ id: editingProject, updates: sanitizedData });
      // Update portal_config separately since it's not in the typed interface
      await supabase.from("client_projects").update({ portal_config: portalConfig as any }).eq("id", editingProject);
    } else {
      await createProject.mutateAsync({ ...sanitizedData, user_id });
    }

    resetForm();
    setIsCreateOpen(false);
  };

  const handleEdit = (project: any) => {
    setFormData({
      client_id: project.client_id,
      name: project.name,
      description: project.description || "",
      project_type: project.project_type,
      status: project.status,
      live_url: project.live_url || "",
      staging_url: project.staging_url || "",
      start_date: project.start_date || "",
      target_launch_date: project.target_launch_date || "",
    });
    setPortalConfig(project.portal_config || defaultPortalConfig);
    setEditingProject(project.id);
    setIsCreateOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject.mutateAsync(id);
    }
  };

  const handlePreviewPortal = (project: any) => {
    const clientName = project.client?.name || "Client";
    if (setImpersonatedClient) {
      setImpersonatedClient(clientName);
    }
    router.push(`/client/projects/${project.id}`);
  };

  const filteredProjects = projects?.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-card/50 border-border/50" />
        </div>
        <Dialog open={isCreateOpen} onOpenChange={(open) => { setIsCreateOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Add Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProject ? "Edit Project" : "Create New Project"}</DialogTitle>
              <DialogDescription>{editingProject ? "Update project details and portal configuration" : "Add a new client project"}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Select value={formData.client_id} onValueChange={(value) => setFormData({ ...formData, client_id: value })}>
                    <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                    <SelectContent>{clients?.map((client) => (<SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <Select value={formData.project_type} onValueChange={(value: any) => setFormData({ ...formData, project_type: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="branding">Branding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Website Redesign 2024" />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief project description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discovery">Discovery</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="launched">Launched</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Live URL</Label>
                  <Input value={formData.live_url} onChange={(e) => setFormData({ ...formData, live_url: e.target.value })} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>Staging URL</Label>
                  <Input value={formData.staging_url} onChange={(e) => setFormData({ ...formData, staging_url: e.target.value })} placeholder="https://staging..." />
                </div>
              </div>

              {/* Portal Config Section */}
              {editingProject && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Portal Configuration</h4>
                      <p className="text-xs text-muted-foreground">Control which sections are visible to the client</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Design Showcase</Label>
                        <Switch checked={portalConfig.show_design_showcase} onCheckedChange={(v) => setPortalConfig({ ...portalConfig, show_design_showcase: v })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">SEO Performance</Label>
                        <Switch checked={portalConfig.show_seo_performance} onCheckedChange={(v) => setPortalConfig({ ...portalConfig, show_seo_performance: v })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Documents</Label>
                        <Switch checked={portalConfig.show_documents} onCheckedChange={(v) => setPortalConfig({ ...portalConfig, show_documents: v })} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Wireframes</Label>
                        <Switch checked={portalConfig.show_wireframes} onCheckedChange={(v) => setPortalConfig({ ...portalConfig, show_wireframes: v })} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Featured Image URL</Label>
                      <Input 
                        value={portalConfig.featured_image_url || ""} 
                        onChange={(e) => setPortalConfig({ ...portalConfig, featured_image_url: e.target.value || null })} 
                        placeholder="https://... (optional hero image)"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={!formData.client_id || !formData.name}>
                {editingProject ? "Save Changes" : "Create Project"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusConfig).map(([key, config]) => {
          const count = projects?.filter(p => p.status === key).length || 0;
          return (
            <Card key={key} className="bg-card/50 border-border/50">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-muted-foreground">{config.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Projects Table */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-muted-foreground">Loading projects...</div>
          ) : filteredProjects?.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">No projects found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>URLs</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects?.map((project) => (
                  <TableRow key={project.id} className="border-border/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{project.name}</p>
                        {project.description && <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>}
                      </div>
                    </TableCell>
                    <TableCell>{project.client?.name || "Ã¢â‚¬â€"}</TableCell>
                    <TableCell><Badge variant="outline">{typeConfig[project.project_type]}</Badge></TableCell>
                    <TableCell><Badge className={statusConfig[project.status].color}>{statusConfig[project.status].label}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {project.live_url && (
                          <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="h-8 w-8"><Globe className="h-4 w-4" /></Button>
                          </a>
                        )}
                        {project.staging_url && (
                          <a href={project.staging_url} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="h-8 w-8"><ExternalLink className="h-4 w-4" /></Button>
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{format(new Date(project.created_at), "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" title="Preview Portal" onClick={() => handlePreviewPortal(project)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(project.id)}>
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
    </div>
  );
};

export default ClientProjectsManager;


