import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ContentRecipe {
  id: string;
  name: string;
  description: string | null;
  content_type: string;
  platform: string | null;
  topics: string[];
  tone: string;
  frequency: string;
  posts_per_run: number;
  is_active: boolean;
  last_run_at: string | null;
  next_run_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateRecipeInput {
  name: string;
  description?: string;
  content_type: string;
  platform?: string;
  topics?: string[];
  tone?: string;
  frequency?: string;
  posts_per_run?: number;
  is_active?: boolean;
}

export function useContentRecipes() {
  return useQuery({
    queryKey: ["content-recipes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ContentRecipe[];
    },
  });
}

export function useActiveRecipes() {
  return useQuery({
    queryKey: ["content-recipes", "active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("content_recipes")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ContentRecipe[];
    },
  });
}

export function useCreateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateRecipeInput) => {
      const { data, error } = await supabase
        .from("content_recipes")
        .insert({
          name: input.name,
          description: input.description || null,
          content_type: input.content_type,
          platform: input.platform || null,
          topics: input.topics || [],
          tone: input.tone || "professional",
          frequency: input.frequency || "daily",
          posts_per_run: input.posts_per_run || 3,
          is_active: input.is_active ?? true,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-recipes"] });
      toast.success("Recipe created successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create recipe: ${error.message}`);
    },
  });
}

export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CreateRecipeInput>;
    }) => {
      const { data, error } = await supabase
        .from("content_recipes")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-recipes"] });
      toast.success("Recipe updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update recipe: ${error.message}`);
    },
  });
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("content_recipes")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-recipes"] });
      toast.success("Recipe deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete recipe: ${error.message}`);
    },
  });
}

export function useToggleRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { data, error } = await supabase
        .from("content_recipes")
        .update({ is_active })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["content-recipes"] });
      toast.success(
        data.is_active ? "Recipe activated" : "Recipe paused"
      );
    },
    onError: (error: Error) => {
      toast.error(`Failed to toggle recipe: ${error.message}`);
    },
  });
}

export function useRunRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (recipeId: string) => {
      const { data, error } = await supabase.functions.invoke(
        "auto-generate-content",
        {
          body: { recipeId },
        }
      );

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["content-recipes"] });
      queryClient.invalidateQueries({ queryKey: ["ai-generated-content"] });
      toast.success("Content generated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to generate content: ${error.message}`);
    },
  });
}
