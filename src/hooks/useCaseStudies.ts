import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CaseStudyDB {
  id: string;
  slug: string;
  title: string;
  client: string;
  sector: string;
  services: string[];
  timeframe: string;
  year: number;
  outcome: 'leads' | 'revenue' | 'traffic' | 'efficiency';
  hero_media_type: 'image' | 'video';
  hero_media_src: string;
  hero_media_poster?: string;
  headline: string;
  subheadline: string;
  kpi_badges: { label: string; value: string; baseline?: string; highlight?: boolean }[];
  problem: string;
  approach: { phase: string; title: string; description: string; duration?: string }[];
  outcomes: { label: string; value: string; baseline?: string; highlight?: boolean }[];
  gallery_media: { type: 'image' | 'video'; src: string; alt: string }[];
  before_media?: string;
  after_media?: string;
  quote?: { text: string; name: string; role: string; company?: string };
  pdf_content?: { summary: string; keyResults: string[] };
  related_slugs: string[];
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type CaseStudyInsert = Omit<CaseStudyDB, 'id' | 'created_at' | 'updated_at'>;
export type CaseStudyUpdate = Partial<CaseStudyInsert>;

// Fetch all case studies (admin view)
export const useCaseStudiesAdmin = () => {
  return useQuery({
    queryKey: ['case-studies-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as CaseStudyDB[];
    },
  });
};

// Fetch published case studies (public view)
export const useCaseStudiesPublic = () => {
  return useQuery({
    queryKey: ['case-studies-public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('is_published', true)
        .order('year', { ascending: false });
      
      if (error) throw error;
      return data as CaseStudyDB[];
    },
  });
};

// Fetch single case study by slug
export const useCaseStudyBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['case-study', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('case_studies')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data as CaseStudyDB;
    },
    enabled: !!slug,
  });
};

// Create case study
export const useCreateCaseStudy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (caseStudy: CaseStudyInsert) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const insertData: any = {
        slug: caseStudy.slug,
        title: caseStudy.title,
        client: caseStudy.client,
        sector: caseStudy.sector,
        services: caseStudy.services,
        timeframe: caseStudy.timeframe,
        year: caseStudy.year,
        outcome: caseStudy.outcome,
        hero_media_type: caseStudy.hero_media_type,
        hero_media_src: caseStudy.hero_media_src,
        hero_media_poster: caseStudy.hero_media_poster,
        headline: caseStudy.headline,
        subheadline: caseStudy.subheadline,
        kpi_badges: caseStudy.kpi_badges,
        problem: caseStudy.problem,
        approach: caseStudy.approach,
        outcomes: caseStudy.outcomes,
        gallery_media: caseStudy.gallery_media,
        before_media: caseStudy.before_media,
        after_media: caseStudy.after_media,
        quote: caseStudy.quote,
        pdf_content: caseStudy.pdf_content,
        related_slugs: caseStudy.related_slugs,
        is_featured: caseStudy.is_featured,
        is_published: caseStudy.is_published,
      };

      const { data, error } = await supabase
        .from('case_studies')
        .insert(insertData)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies-admin'] });
      queryClient.invalidateQueries({ queryKey: ['case-studies-public'] });
      toast.success('Case study created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create case study: ${error.message}`);
    },
  });
};

// Update case study
export const useUpdateCaseStudy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: CaseStudyUpdate }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = { ...updates };

      const { data, error } = await supabase
        .from('case_studies')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['case-studies-admin'] });
      queryClient.invalidateQueries({ queryKey: ['case-studies-public'] });
      queryClient.invalidateQueries({ queryKey: ['case-study', data.slug] });
      toast.success('Case study updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update case study: ${error.message}`);
    },
  });
};

// Delete case study
export const useDeleteCaseStudy = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies-admin'] });
      queryClient.invalidateQueries({ queryKey: ['case-studies-public'] });
      toast.success('Case study deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete case study: ${error.message}`);
    },
  });
};

// Toggle featured status
export const useToggleFeatured = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
      const { data, error } = await supabase
        .from('case_studies')
        .update({ is_featured: isFeatured })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies-admin'] });
      queryClient.invalidateQueries({ queryKey: ['case-studies-public'] });
    },
  });
};

// Toggle published status
export const useTogglePublished = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      const { data, error } = await supabase
        .from('case_studies')
        .update({ is_published: isPublished })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['case-studies-admin'] });
      queryClient.invalidateQueries({ queryKey: ['case-studies-public'] });
    },
  });
};
