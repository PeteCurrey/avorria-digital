import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { toast } from "sonner";

export interface ClientProject {
  id: string;
  client_id: string;
  user_id: string;
  name: string;
  description: string | null;
  project_type: "website" | "seo" | "ongoing" | "branding";
  status: "discovery" | "in_progress" | "review" | "launched" | "maintenance";
  live_url: string | null;
  staging_url: string | null;
  start_date: string | null;
  target_launch_date: string | null;
  launched_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  client?: {
    name: string;
    industry: string | null;
  };
}

export interface CreateProjectData {
  client_id: string;
  user_id: string;
  name: string;
  description?: string;
  project_type: "website" | "seo" | "ongoing" | "branding";
  status?: "discovery" | "in_progress" | "review" | "launched" | "maintenance";
  live_url?: string;
  staging_url?: string;
  start_date?: string;
  target_launch_date?: string;
}

// Admin: Fetch all projects
export function useAllProjects() {
  return useQuery({
    queryKey: ["client-projects", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_projects")
        .select(`
          *,
          client:clients(name, industry)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ClientProject[];
    },
  });
}

// Client: Fetch their own projects
export function useMyProjects() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["client-projects", "my", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("client_projects")
        .select(`
          *,
          client:clients(name, industry)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ClientProject[];
    },
    enabled: !!user?.id,
  });
}

// Fetch single project by ID
export function useProject(projectId: string | undefined) {
  return useQuery({
    queryKey: ["client-projects", projectId],
    queryFn: async () => {
      if (!projectId) return null;

      const { data, error } = await supabase
        .from("client_projects")
        .select(`
          *,
          client:clients(name, industry)
        `)
        .eq("id", projectId)
        .single();

      if (error) throw error;
      return data as ClientProject;
    },
    enabled: !!projectId,
  });
}

// Create project
export function useCreateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectData: CreateProjectData) => {
      const { data, error } = await supabase
        .from("client_projects")
        .insert(projectData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-projects"] });
      toast.success("Project created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create project: " + error.message);
    },
  });
}

// Update project
export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CreateProjectData>;
    }) => {
      const { data, error } = await supabase
        .from("client_projects")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-projects"] });
      toast.success("Project updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update project: " + error.message);
    },
  });
}

// Delete project
export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from("client_projects")
        .delete()
        .eq("id", projectId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-projects"] });
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete project: " + error.message);
    },
  });
}
