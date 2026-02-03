import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AssetComment {
  id: string;
  asset_id: string;
  user_id: string;
  comment: string;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateCommentData {
  asset_id: string;
  comment: string;
}

export function useAssetComments(assetId: string | undefined) {
  return useQuery({
    queryKey: ["asset-comments", assetId],
    queryFn: async () => {
      if (!assetId) return [];

      const { data, error } = await supabase
        .from("project_asset_comments")
        .select("*")
        .eq("asset_id", assetId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as AssetComment[];
    },
    enabled: !!assetId,
  });
}

export function useProjectAssetComments(projectId: string | undefined) {
  return useQuery({
    queryKey: ["project-asset-comments", projectId],
    queryFn: async () => {
      if (!projectId) return [];

      const { data, error } = await supabase
        .from("project_asset_comments")
        .select(`
          *,
          project_assets!inner(project_id)
        `)
        .eq("project_assets.project_id", projectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as AssetComment[];
    },
    enabled: !!projectId,
  });
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCommentData & { user_id: string }) => {
      const { data: result, error } = await supabase
        .from("project_asset_comments")
        .insert({
          asset_id: data.asset_id,
          user_id: data.user_id,
          comment: data.comment,
        })
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["asset-comments", variables.asset_id] });
      queryClient.invalidateQueries({ queryKey: ["project-asset-comments"] });
      toast.success("Comment added");
    },
    onError: (error) => {
      toast.error("Failed to add comment: " + error.message);
    },
  });
}

export function useResolveComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_resolved }: { id: string; is_resolved: boolean }) => {
      const { error } = await supabase
        .from("project_asset_comments")
        .update({ is_resolved })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asset-comments"] });
      queryClient.invalidateQueries({ queryKey: ["project-asset-comments"] });
      toast.success("Comment updated");
    },
    onError: (error) => {
      toast.error("Failed to update comment: " + error.message);
    },
  });
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("project_asset_comments")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["asset-comments"] });
      queryClient.invalidateQueries({ queryKey: ["project-asset-comments"] });
      toast.success("Comment deleted");
    },
    onError: (error) => {
      toast.error("Failed to delete comment: " + error.message);
    },
  });
}
