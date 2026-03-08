import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ContentItem {
  id: string;
  title: string;
  description: string | null;
  content_type: string;
  status: string;
  scheduled_date: string | null;
  published_date: string | null;
  author_id: string | null;
  author_name: string | null;
  tags: string[] | null;
  priority: string;
  notes: string | null;
  slug: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export function useContentCalendar() {
  return useQuery({
    queryKey: ["content-calendar"],
    queryFn: async () => {
      // Get manual calendar items
      const { data: calendarItems, error: calError } = await supabase
        .from("content_calendar")
        .select("*")
        .order("scheduled_date", { ascending: true, nullsFirst: false });
      
      if (calError) throw calError;

      // Get scheduled AI content to merge into calendar
      const { data: aiScheduled } = await supabase
        .from("ai_generated_content")
        .select("id, title, content, content_type, platform, status, scheduled_for, created_at, updated_at")
        .eq("status", "scheduled")
        .not("scheduled_for", "is", null)
        .order("scheduled_for", { ascending: true });

      // Convert AI scheduled content into calendar format
      const aiCalendarItems: ContentItem[] = (aiScheduled || []).map((ai) => ({
        id: `ai-${ai.id}`,
        title: ai.title || `${ai.platform || ai.content_type} post`,
        description: ai.content?.slice(0, 120) + "..." || null,
        content_type: ai.content_type === "social" ? "social_post" : ai.content_type || "blog_post",
        status: "planned",
        scheduled_date: ai.scheduled_for?.split("T")[0] || null,
        published_date: null,
        author_id: null,
        author_name: "AI Content Studio",
        tags: [ai.platform || "auto"].filter(Boolean),
        priority: "medium",
        notes: `Auto-synced from Content Studio (${ai.platform || "general"})`,
        slug: null,
        metadata: { source: "ai_generated_content", original_id: ai.id } as Record<string, unknown>,
        created_at: ai.created_at,
        updated_at: ai.updated_at,
      }));

      return [...(calendarItems as ContentItem[]), ...aiCalendarItems];
    },
  });
}

export function useCreateContentItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: { title: string } & Omit<Partial<ContentItem>, 'id' | 'created_at' | 'updated_at' | 'metadata'>) => {
      const { data, error } = await supabase
        .from("content_calendar")
        .insert([item])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-calendar"] });
      toast.success("Content item created");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create: ${error.message}`);
    },
  });
}

export function useUpdateContentItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<ContentItem> & { id: string }) => {
      const { data, error } = await supabase
        .from("content_calendar")
        .update(updates as Record<string, unknown>)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-calendar"] });
      toast.success("Content item updated");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update: ${error.message}`);
    },
  });
}

export function useDeleteContentItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("content_calendar")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-calendar"] });
      toast.success("Content item deleted");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete: ${error.message}`);
    },
  });
}
