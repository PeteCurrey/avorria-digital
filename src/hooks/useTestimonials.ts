import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialInsert {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar_url?: string | null;
  is_featured?: boolean;
  is_published?: boolean;
  display_order?: number;
}

export interface TestimonialUpdate extends Partial<TestimonialInsert> {
  id: string;
}

// Fetch published testimonials for public display
export const useTestimonialsPublic = () => {
  return useQuery({
    queryKey: ["testimonials-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Testimonial[];
    },
  });
};

// Fetch all testimonials for admin
export const useTestimonialsAdmin = () => {
  return useQuery({
    queryKey: ["testimonials-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Testimonial[];
    },
  });
};

// Create testimonial
export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonial: TestimonialInsert) => {
      const { data, error } = await supabase
        .from("testimonials")
        .insert(testimonial)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials-admin"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials-public"] });
      toast.success("Testimonial created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create testimonial: " + error.message);
    },
  });
};

// Update testimonial
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: TestimonialUpdate) => {
      const { data, error } = await supabase
        .from("testimonials")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials-admin"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials-public"] });
      toast.success("Testimonial updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update testimonial: " + error.message);
    },
  });
};

// Delete testimonial
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials-admin"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials-public"] });
      toast.success("Testimonial deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete testimonial: " + error.message);
    },
  });
};
