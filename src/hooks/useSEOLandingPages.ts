import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SEOLandingPage {
  id: string;
  slug: string;
  title: string;
  page_type: string;
  service_slug: string;
  location_slug: string | null;
  industry_slug: string | null;
  hero_headline: string;
  hero_subheadline: string;
  primary_cta: string;
  secondary_cta: string;
  problem_bullets: string[];
  solution_bullets: string[];
  key_metrics: Array<{ value: string; label: string; description: string }>;
  process_steps: Array<{ title: string; description: string }>;
  faq_list: Array<{ question: string; answer: string }>;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  testimonial_role: string | null;
  testimonial_company: string | null;
  target_keyword: string;
  meta_title: string;
  meta_description: string;
  working_with_you: string | null;
  pricing_snapshot: string | null;
  related_case_studies: string[];
  related_articles: string[];
  is_published: boolean;
  is_featured: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateLandingPageInput {
  slug: string;
  title: string;
  page_type?: string;
  service_slug: string;
  location_slug?: string;
  industry_slug?: string;
  hero_headline: string;
  hero_subheadline: string;
  primary_cta?: string;
  secondary_cta?: string;
  problem_bullets?: string[];
  solution_bullets?: string[];
  key_metrics?: Array<{ value: string; label: string; description: string }>;
  process_steps?: Array<{ title: string; description: string }>;
  faq_list?: Array<{ question: string; answer: string }>;
  testimonial_quote?: string;
  testimonial_author?: string;
  testimonial_role?: string;
  testimonial_company?: string;
  target_keyword: string;
  meta_title: string;
  meta_description: string;
  working_with_you?: string;
  pricing_snapshot?: string;
  related_case_studies?: string[];
  related_articles?: string[];
  is_published?: boolean;
  is_featured?: boolean;
}

export function useSEOLandingPages() {
  return useQuery({
    queryKey: ["seo-landing-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_landing_pages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as SEOLandingPage[];
    },
  });
}

export function useSEOLandingPage(slug: string) {
  return useQuery({
    queryKey: ["seo-landing-pages", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_landing_pages")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as SEOLandingPage;
    },
    enabled: !!slug,
  });
}

export function usePublishedLandingPages() {
  return useQuery({
    queryKey: ["seo-landing-pages", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_landing_pages")
        .select("*")
        .eq("is_published", true)
        .order("title", { ascending: true });

      if (error) throw error;
      return data as SEOLandingPage[];
    },
  });
}

export function useCreateLandingPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateLandingPageInput) => {
      const { data, error } = await supabase
        .from("seo_landing_pages")
        .insert({
          slug: input.slug,
          title: input.title,
          page_type: input.page_type || "service-location",
          service_slug: input.service_slug,
          location_slug: input.location_slug || null,
          industry_slug: input.industry_slug || null,
          hero_headline: input.hero_headline,
          hero_subheadline: input.hero_subheadline,
          primary_cta: input.primary_cta || "Book a Strategy Call",
          secondary_cta: input.secondary_cta || "Request a Free Audit",
          problem_bullets: input.problem_bullets || [],
          solution_bullets: input.solution_bullets || [],
          key_metrics: input.key_metrics || [],
          process_steps: input.process_steps || [],
          faq_list: input.faq_list || [],
          testimonial_quote: input.testimonial_quote || null,
          testimonial_author: input.testimonial_author || null,
          testimonial_role: input.testimonial_role || null,
          testimonial_company: input.testimonial_company || null,
          target_keyword: input.target_keyword,
          meta_title: input.meta_title,
          meta_description: input.meta_description,
          working_with_you: input.working_with_you || null,
          pricing_snapshot: input.pricing_snapshot || null,
          related_case_studies: input.related_case_studies || [],
          related_articles: input.related_articles || [],
          is_published: input.is_published || false,
          is_featured: input.is_featured || false,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-landing-pages"] });
      toast.success("Landing page created successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create landing page: ${error.message}`);
    },
  });
}

export function useUpdateLandingPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<CreateLandingPageInput>;
    }) => {
      const { data, error } = await supabase
        .from("seo_landing_pages")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-landing-pages"] });
      toast.success("Landing page updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update landing page: ${error.message}`);
    },
  });
}

export function useDeleteLandingPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("seo_landing_pages")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-landing-pages"] });
      toast.success("Landing page deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete landing page: ${error.message}`);
    },
  });
}

export function useToggleLandingPagePublish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { data, error } = await supabase
        .from("seo_landing_pages")
        .update({ is_published })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["seo-landing-pages"] });
      toast.success(data.is_published ? "Page published" : "Page unpublished");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update page status: ${error.message}`);
    },
  });
}

export function useGenerateLandingPageContent() {
  return useMutation({
    mutationFn: async ({
      service,
      location,
      industry,
    }: {
      service: string;
      location?: string;
      industry?: string;
    }) => {
      const { data, error } = await supabase.functions.invoke(
        "generate-landing-page",
        {
          body: { service, location, industry },
        }
      );

      if (error) throw error;
      return data;
    },
    onError: (error: Error) => {
      toast.error(`Failed to generate content: ${error.message}`);
    },
  });
}
