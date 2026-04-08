'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects, useProjectsByStage, useProjectStats, useUpdateProject, useDeleteProject, Project } from "@/hooks/useProjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  FolderKanban, 
  List, 
  Search, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  MoreHorizontal,
  Eye,
  Trash2,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  FileText,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ViewMode = "kanban" | "list";

const STAGES = [
  { id: "discovery", label: "Discovery", color: "bg-sky-500" },
  { id: "proposal", label: "Proposal", color: "bg-amber-500" },
  { id: "design", label: "Design", color: "bg-violet-500" },
  { id: "development", label: "Development", color: "bg-emerald-500" },
  { id: "launch", label: "Launch", color: "bg-pink-500" },
  { id: "completed", label: "Completed", color: "bg-slate-500" },
];

const PRIORITIES = [
  { id: "low", label: "Low", color: "text-slate-400" },
  { id: "normal", label: "Normal", color: "text-blue-400" },
  { id: "high", label: "High", color: "text-amber-400" },
  { id: "urgent", label: "Urgent", color: "text-red-400" },
];

export const ProjectsTab = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: projects, isLoading } = useProjects();
  const { projectsByStage } = useProjectsByStage();
  const stats = useProjectStats();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const filteredProjects = projects?.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.project_code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStageChange = (projectId: string, newStage: string) => {
    updateProject.mutate({ id: projectId, updates: { stage: newStage } });
  };

  const handlePriorityChange = (projectId: string, newPriority: string) => {
    updateProject.mutate({ id: projectId, updates: { priority: newPriority } });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm) {
      deleteProject.mutate(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    const stage = STAGES.find((s) => s.id === (project.stage || "discovery"));
    const priority = PRIORITIES.find((p) => p.id === (project.priority || "normal"));

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="group rounded-xl border border-border/50 bg-card p-4 hover:border-border hover:shadow-md transition-all cursor-pointer"
        onClick={() => setSelectedProject(project)}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-[10px] font-mono text-muted-foreground mb-1">{project.project_code}</p>
            <h4 className="font-medium text-sm">{project.name}</h4>
            {project.company && (
              <p className="text-xs text-muted-foreground">{project.company}</p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSelectedProject(project)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteConfirm(project.id);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-[10px]">
            {project.purpose?.replace(/_/g, " ") || "—"}
          </Badge>
          {project.budget && (
            <Badge variant="secondary" className="text-[10px]">
              {project.budget}
            </Badge>
          )}
          {priority && (
            <span className={`text-[10px] ${priority.color}`}>● {priority.label}</span>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{format(new Date(project.created_at), "MMM d, yyyy")}</span>
          {project.timeline && <span>{project.timeline}</span>}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FolderKanban className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Projects</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-sky-500/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-sky-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.thisMonth}</p>
                <p className="text-xs text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  £{stats.totalValue.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Pipeline Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "kanban" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("kanban")}
          >
            <FolderKanban className="h-4 w-4 mr-2" />
            Kanban
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Views */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      ) : viewMode === "kanban" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STAGES.map((stage) => (
            <div key={stage.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${stage.color}`} />
                <span className="text-sm font-medium">{stage.label}</span>
                <Badge variant="secondary" className="ml-auto text-[10px]">
                  {projectsByStage[stage.id]?.length || 0}
                </Badge>
              </div>
              <ScrollArea className="h-[500px]">
                <div className="space-y-3 pr-2">
                  <AnimatePresence>
                    {projectsByStage[stage.id]?.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </AnimatePresence>
                  {projectsByStage[stage.id]?.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border/50 p-4 text-center text-xs text-muted-foreground">
                      No projects
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Project</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Stage</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Priority</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Budget</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Timeline</th>
                    <th className="text-left p-4 text-xs font-medium text-muted-foreground">Created</th>
                    <th className="text-right p-4 text-xs font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects?.map((project) => (
                    <tr key={project.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <p className="text-[10px] font-mono text-muted-foreground">{project.project_code}</p>
                          <p className="font-medium text-sm">{project.name}</p>
                          <p className="text-xs text-muted-foreground">{project.company}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Select
                          value={project.stage || "discovery"}
                          onValueChange={(v) => handleStageChange(project.id, v)}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STAGES.map((s) => (
                              <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-4">
                        <Select
                          value={project.priority || "normal"}
                          onValueChange={(v) => handlePriorityChange(project.id, v)}
                        >
                          <SelectTrigger className="w-24 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {PRIORITIES.map((p) => (
                              <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="p-4 text-sm">{project.budget || "—"}</td>
                      <td className="p-4 text-sm">{project.timeline || "—"}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {format(new Date(project.created_at), "MMM d, yyyy")}
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedProject(project)}
                        >
                          View
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Project Detail Sheet */}
      <Sheet open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedProject && (
            <>
              <SheetHeader className="pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground">
                    {selectedProject.project_code}
                  </span>
                </div>
                <SheetTitle className="text-xl">{selectedProject.name}</SheetTitle>
              </SheetHeader>

              <div className="space-y-6">
                {/* Contact Info */}
                <div className="rounded-lg border p-4 space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedProject.company || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedProject.email}</span>
                    </div>
                    {selectedProject.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedProject.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Specs */}
                <div className="rounded-lg border p-4 space-y-3">
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Configuration
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Purpose</p>
                      <p className="capitalize">{selectedProject.purpose?.replace(/_/g, " ")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Site Size</p>
                      <p className="capitalize">{selectedProject.site_size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Palette</p>
                      <p className="capitalize">{selectedProject.palette}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p>{selectedProject.budget || "—"}</p>
                    </div>
                  </div>
                  {selectedProject.features && (selectedProject.features as string[]).length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Features</p>
                      <div className="flex flex-wrap gap-1">
                        {(selectedProject.features as string[]).map((f) => (
                          <Badge key={f} variant="secondary" className="text-[10px]">{f}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Management */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Stage</Label>
                      <Select
                        value={selectedProject.stage || "discovery"}
                        onValueChange={(v) => {
                          handleStageChange(selectedProject.id, v);
                          setSelectedProject({ ...selectedProject, stage: v });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STAGES.map((s) => (
                            <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Priority</Label>
                      <Select
                        value={selectedProject.priority || "normal"}
                        onValueChange={(v) => {
                          handlePriorityChange(selectedProject.id, v);
                          setSelectedProject({ ...selectedProject, priority: v });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PRIORITIES.map((p) => (
                            <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">Internal Notes</Label>
                    <Textarea
                      value={selectedProject.internal_notes || ""}
                      onChange={(e) => setSelectedProject({ ...selectedProject, internal_notes: e.target.value })}
                      onBlur={() => {
                        if (selectedProject.internal_notes !== undefined) {
                          updateProject.mutate({
                            id: selectedProject.id,
                            updates: { internal_notes: selectedProject.internal_notes },
                          });
                        }
                      }}
                      placeholder="Add notes about this project..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10"
                    onClick={() => {
                      setDeleteConfirm(selectedProject.id);
                      setSelectedProject(null);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Project
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The project and all its data will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

