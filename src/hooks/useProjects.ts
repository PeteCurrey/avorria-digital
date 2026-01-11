import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Project {
  id: string;
  project_code: string | null;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  purpose: string;
  palette: string;
  site_size: string;
  minimal: number;
  bold: number;
  straight_talking: number;
  analytical: number;
  understated: number;
  modules: string[] | null;
  features: string[] | null;
  notes: string | null;
  budget: string | null;
  timeline: string | null;
  status: string;
  stage: string | null;
  priority: string | null;
  assigned_to: string | null;
  estimated_value: number | null;
  estimated_hours: number | null;
  proposal_url: string | null;
  contract_signed: boolean | null;
  kickoff_date: string | null;
  target_launch: string | null;
  internal_notes: string | null;
  pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("website_blueprints")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Project[];
    },
  });
}

export function useProjectsByStage() {
  const { data: projects, ...rest } = useProjects();

  const stages = ["discovery", "proposal", "design", "development", "launch", "completed"];
  
  const projectsByStage = stages.reduce((acc, stage) => {
    acc[stage] = projects?.filter((p) => (p.stage || "discovery") === stage) || [];
    return acc;
  }, {} as Record<string, Project[]>);

  return { projectsByStage, ...rest };
}

export function useProjectStats() {
  const { data: projects } = useProjects();

  const stats = {
    total: projects?.length || 0,
    active: projects?.filter((p) => !["completed", "cancelled"].includes(p.stage || "")).length || 0,
    thisMonth: projects?.filter((p) => {
      const created = new Date(p.created_at);
      const now = new Date();
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
    }).length || 0,
    totalValue: projects?.reduce((sum, p) => sum + (p.estimated_value || 0), 0) || 0,
  };

  return stats;
}

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Project> }) => {
      const { data, error } = await supabase
        .from("website_blueprints")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated");
    },
    onError: (error) => {
      console.error("Update project error:", error);
      toast.error("Failed to update project");
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("website_blueprints").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onError: (error) => {
      console.error("Delete project error:", error);
      toast.error("Failed to delete project");
    },
  });
}
