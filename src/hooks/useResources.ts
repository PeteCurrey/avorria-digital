import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DbResource {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: string;
  reading_time: number;
  service_relation: string | null;
  industry_relation: string | null;
  is_pillar: boolean;
  is_published: boolean;
  target_keyword: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published_date: string | null;
  created_at: string;
  updated_at: string;
}

export const useResources = () => {
  return useQuery({
    queryKey: ["admin-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as DbResource[];
    },
  });
};

export const useCreateResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (resource: Omit<DbResource, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("resources")
        .insert(resource)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-resources"] }),
  });
};

export const useUpdateResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<DbResource> }) => {
      const { data, error } = await supabase
        .from("resources")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-resources"] }),
  });
};

export const useDeleteResource = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("resources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-resources"] }),
  });
};
