import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface BeforeAfterPair {
  id: string;
  label: string;
  beforeImage: string;
  afterImage: string;
}

export interface CaseStudyDB {
  id: string;
  slug: string;
  title: string;
  client: string;
  sector: string;
  services: string[];
  timeframe: string;
  year: number;
  outcome: "leads" | "revenue" | "traffic" | "efficiency";
  hero_media_type: "image" | "video";
  hero_media_src: string;
  hero_media_poster?: string;
  headline: string;
  subheadline: string;
  kpi_badges: { label: string; value: string; baseline?: string; highlight?: boolean }[];
  problem: string;
  approach: { phase: string; title: string; description: string; duration?: string }[];
  outcomes: { label: string; value: string; baseline?: string; highlight?: boolean }[];
  gallery_media: { type: "image" | "video"; src: string; alt: string }[];
  before_media?: string;
  after_media?: string;
  before_after_pairs?: BeforeAfterPair[];
  quote?: { text: string; name: string; role: string; company?: string };
  pdf_content?: { summary: string; keyResults: string[] };
  related_slugs: string[];
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type CaseStudyInsert = Omit<CaseStudyDB, "id" | "created_at" | "updated_at">;
export type CaseStudyUpdate = Partial<CaseStudyInsert>;

interface QueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
}

interface MutationResult<TInput, TOutput = void> {
  mutateAsync: (input: TInput) => Promise<TOutput>;
  mutate: (input: TInput) => void;
  isLoading: boolean;
  isPending: boolean;
  error: Error | null;
}

// Fetch all case studies (admin view) with realtime updates
export const useCaseStudiesAdmin = (): QueryResult<CaseStudyDB[]> & { refetch: () => Promise<void> } => {
  const [data, setData] = useState<CaseStudyDB[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCaseStudies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setData(data as unknown as CaseStudyDB[]);
    } catch (err) {
      console.error("Error fetching case studies:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCaseStudies();

    // Subscribe to realtime updates
    const channel = supabase
      .channel("case-studies-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "case_studies" },
        (payload) => {
          setData((prev) => [payload.new as unknown as CaseStudyDB, ...(prev || [])]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "case_studies" },
        (payload) => {
          setData((prev) =>
            prev?.map((study) =>
              study.id === payload.new.id ? (payload.new as unknown as CaseStudyDB) : study
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "case_studies" },
        (payload) => {
          setData((prev) =>
            prev?.filter((study) => study.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchCaseStudies]);

  return { data, isLoading, error, refetch: fetchCaseStudies };
};

// Fetch published case studies (public view)
export const useCaseStudiesPublic = (): QueryResult<CaseStudyDB[]> => {
  const [data, setData] = useState<CaseStudyDB[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCaseStudies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("is_published", true)
        .order("year", { ascending: false });

      if (error) throw error;
      setData(data as unknown as CaseStudyDB[]);
    } catch (err) {
      console.error("Error fetching case studies:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchCaseStudies();
  }, [fetchCaseStudies]);

  return { data, isLoading, error };
};

// Fetch single case study by slug
export const useCaseStudyBySlug = (slug: string): QueryResult<CaseStudyDB | null> => {
  const [data, setData] = useState<CaseStudyDB | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(!!slug);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setData(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const fetchCaseStudy = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("case_studies")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (error) throw error;
        if (!cancelled) {
          setData((data ?? null) as unknown as CaseStudyDB | null);
        }
      } catch (err) {
        console.error("Error fetching case study:", err);
        if (!cancelled) {
          setError(err as Error);
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchCaseStudy();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { data: (data ?? null) as CaseStudyDB | null, isLoading, error };
};

// Create case study
export const useCreateCaseStudy = (): MutationResult<CaseStudyInsert, CaseStudyDB> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = useCallback(async (caseStudy: CaseStudyInsert) => {
    try {
      setIsLoading(true);
      setError(null);

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
        before_after_pairs: caseStudy.before_after_pairs,
        quote: caseStudy.quote,
        pdf_content: caseStudy.pdf_content,
        related_slugs: caseStudy.related_slugs,
        is_featured: caseStudy.is_featured,
        is_published: caseStudy.is_published,
      };

      const { data, error } = await supabase
        .from("case_studies")
        .insert(insertData)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error(
          "Permission denied. Please ensure you are logged in with admin or strategist role."
        );
      }

      const created = data[0] as unknown as CaseStudyDB;
      toast.success("Case study created successfully");
      return created;
    } catch (err) {
      const error = err as Error;
      toast.error(`Failed to create case study: ${error.message}`);
      setError(error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const mutate = useCallback(
    (input: CaseStudyInsert) => {
      void mutateAsync(input);
    },
    [mutateAsync]
  );

  return { mutateAsync, mutate, isLoading, isPending: isLoading, error };
};

// Update case study
export const useUpdateCaseStudy = (): MutationResult<
  { id: string; updates: CaseStudyUpdate },
  CaseStudyDB
> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = useCallback(
    async ({ id, updates }: { id: string; updates: CaseStudyUpdate }) => {
      try {
        setIsLoading(true);
        setError(null);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: any = { ...updates };

        const { data, error } = await supabase
          .from("case_studies")
          .update(updateData)
          .eq("id", id)
          .select();

        if (error) throw error;
        if (!data || data.length === 0) {
          throw new Error(
            "Permission denied. Please ensure you are logged in with admin or strategist role."
          );
        }

        const updated = data[0] as unknown as CaseStudyDB;
        toast.success("Case study updated successfully");
        return updated;
      } catch (err) {
        const error = err as Error;
        toast.error(`Failed to update case study: ${error.message}`);
        setError(error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const mutate = useCallback(
    (input: { id: string; updates: CaseStudyUpdate }) => {
      void mutateAsync(input);
    },
    [mutateAsync]
  );

  return { mutateAsync, mutate, isLoading, isPending: isLoading, error };
};

// Delete case study
export const useDeleteCaseStudy = (): MutationResult<string> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from("case_studies")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Case study deleted successfully");
    } catch (err) {
      const error = err as Error;
      toast.error(`Failed to delete case study: ${error.message}`);
      setError(error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const mutate = useCallback(
    (id: string) => {
      void mutateAsync(id);
    },
    [mutateAsync]
  );

  return { mutateAsync, mutate, isLoading, isPending: isLoading, error };
};

// Toggle featured status
export const useToggleFeatured = (): MutationResult<{ id: string; isFeatured: boolean }> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = useCallback(
    async ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
      try {
        setIsLoading(true);
        setError(null);

        const { error } = await supabase
          .from("case_studies")
          .update({ is_featured: isFeatured })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const mutate = useCallback(
    (input: { id: string; isFeatured: boolean }) => {
      void mutateAsync(input);
    },
    [mutateAsync]
  );

  return { mutateAsync, mutate, isLoading, isPending: isLoading, error };
};

// Toggle published status
export const useTogglePublished = (): MutationResult<{ id: string; isPublished: boolean }> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutateAsync = useCallback(
    async ({ id, isPublished }: { id: string; isPublished: boolean }) => {
      try {
        setIsLoading(true);
        setError(null);

        const { error } = await supabase
          .from("case_studies")
          .update({ is_published: isPublished })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const mutate = useCallback(
    (input: { id: string; isPublished: boolean }) => {
      void mutateAsync(input);
    },
    [mutateAsync]
  );

  return { mutateAsync, mutate, isLoading, isPending: isLoading, error };
};
