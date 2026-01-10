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
      const { data, error } = await supabase
        .from("content_calendar")
        .select("*")
        .order("scheduled_date", { ascending: true, nullsFirst: false });
      
      if (error) throw error;
      return data as ContentItem[];
    },
  });
}

export function useCreateContentItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Omit<Partial<ContentItem>, 'id' | 'created_at' | 'updated_at' | 'metadata'>) => {
      const { data, error } = await supabase
        .from("content_calendar")
        .insert(item as Record<string, unknown>)
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
