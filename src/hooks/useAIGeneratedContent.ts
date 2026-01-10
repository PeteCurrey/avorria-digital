import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AIGeneratedContent {
  id: string;
  content_type: string;
  platform: string | null;
  title: string | null;
  content: string;
  hashtags: string[] | null;
  media_urls: string[] | null;
  status: string;
  ai_prompt: string | null;
  tone: string | null;
  target_audience: string | null;
  scheduled_for: string | null;
  published_at: string | null;
  metadata: unknown;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  recipe_id: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  rejection_reason: string | null;
  auto_generated: boolean | null;
}

export function useAIGeneratedContent(status?: string) {
  return useQuery({
    queryKey: ["ai-generated-content", status],
    queryFn: async () => {
      let query = supabase
        .from("ai_generated_content")
        .select("*")
        .order("created_at", { ascending: false });

      if (status) {
        query = query.eq("status", status);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as AIGeneratedContent[];
    },
  });
}

export function usePendingReviewContent() {
  return useQuery({
    queryKey: ["ai-generated-content", "review"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_generated_content")
        .select("*")
        .eq("status", "review")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as AIGeneratedContent[];
    },
  });
}

export function useScheduledContent() {
  return useQuery({
    queryKey: ["ai-generated-content", "scheduled"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ai_generated_content")
        .select("*")
        .eq("status", "scheduled")
        .not("scheduled_for", "is", null)
        .order("scheduled_for", { ascending: true });

      if (error) throw error;
      return data as AIGeneratedContent[];
    },
  });
}

export function useApproveContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      scheduledFor,
    }: {
      id: string;
      scheduledFor?: string;
    }) => {
      const { data, error } = await supabase
        .from("ai_generated_content")
        .update({
          status: scheduledFor ? "scheduled" : "approved",
          scheduled_for: scheduledFor || null,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-generated-content"] });
      toast.success("Content approved");
    },
    onError: (error: Error) => {
      toast.error(`Failed to approve content: ${error.message}`);
    },
  });
}

export function useRejectContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      reason,
    }: {
      id: string;
      reason?: string;
    }) => {
      const { data, error } = await supabase
        .from("ai_generated_content")
        .update({
          status: "rejected",
          rejection_reason: reason || null,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-generated-content"] });
      toast.success("Content rejected");
    },
    onError: (error: Error) => {
      toast.error(`Failed to reject content: ${error.message}`);
    },
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Omit<AIGeneratedContent, 'metadata'>>;
    }) => {
      const { data, error } = await supabase
        .from("ai_generated_content")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-generated-content"] });
      toast.success("Content updated");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update content: ${error.message}`);
    },
  });
}

export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("ai_generated_content")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-generated-content"] });
      toast.success("Content deleted");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete content: ${error.message}`);
    },
  });
}

export function useSaveGeneratedContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: {
      content_type: string;
      platform?: string;
      title?: string;
      content: string;
      hashtags?: string[];
      tone?: string;
      ai_prompt?: string;
      status?: string;
      scheduled_for?: string;
      auto_generated?: boolean;
      recipe_id?: string;
    }) => {
      const { data, error } = await supabase
        .from("ai_generated_content")
        .insert({
          content_type: content.content_type,
          platform: content.platform || null,
          title: content.title || null,
          content: content.content,
          hashtags: content.hashtags || [],
          tone: content.tone || "professional",
          ai_prompt: content.ai_prompt || null,
          status: content.status || "draft",
          scheduled_for: content.scheduled_for || null,
          auto_generated: content.auto_generated || false,
          recipe_id: content.recipe_id || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ai-generated-content"] });
      toast.success("Content saved");
    },
    onError: (error: Error) => {
      toast.error(`Failed to save content: ${error.message}`);
    },
  });
}
