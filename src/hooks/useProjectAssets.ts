import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export type AssetType =
  | "screenshot_before"
  | "screenshot_after"
  | "wireframe"
  | "technical_drawing"
  | "seo_proposal"
  | "roadmap"
  | "pricing_proposal"
  | "contract"
  | "other";

export interface ProjectAsset {
  id: string;
  project_id: string;
  asset_type: AssetType;
  title: string;
  description: string | null;
  file_url: string;
  file_size: number | null;
  mime_type: string | null;
  position: number;
  is_featured: boolean;
  metadata: Json;
  pair_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAssetData {
  project_id: string;
  asset_type: AssetType;
  title: string;
  description?: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  position?: number;
  is_featured?: boolean;
  metadata?: Json;
  pair_id?: string;
}

// Fetch assets for a project
export function useProjectAssets(projectId: string | undefined) {
  return useQuery({
    queryKey: ["project-assets", projectId],
    queryFn: async () => {
      if (!projectId) return [];

      const { data, error } = await supabase
        .from("project_assets")
        .select("*")
        .eq("project_id", projectId)
        .order("position", { ascending: true });

      if (error) throw error;
      return data as ProjectAsset[];
    },
    enabled: !!projectId,
  });
}

// Fetch all assets (admin)
export function useAllProjectAssets() {
  return useQuery({
    queryKey: ["project-assets", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_assets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ProjectAsset[];
    },
  });
}

// Create asset
export function useCreateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assetData: CreateAssetData) => {
      const { data, error } = await supabase
        .from("project_assets")
        .insert(assetData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["project-assets", variables.project_id] });
      queryClient.invalidateQueries({ queryKey: ["project-assets", "all"] });
      toast.success("Asset uploaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to upload asset: " + error.message);
    },
  });
}

// Update asset
export function useUpdateAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CreateAssetData>;
    }) => {
      const { data, error } = await supabase
        .from("project_assets")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-assets"] });
      toast.success("Asset updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update asset: " + error.message);
    },
  });
}

// Delete asset
export function useDeleteAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (assetId: string) => {
      const { error } = await supabase
        .from("project_assets")
        .delete()
        .eq("id", assetId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-assets"] });
      toast.success("Asset deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete asset: " + error.message);
    },
  });
}

// Upload file to storage
export async function uploadAssetFile(
  file: File,
  userId: string,
  projectId: string
): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${projectId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("client-assets")
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("client-assets").getPublicUrl(fileName);
  return data.publicUrl;
}
