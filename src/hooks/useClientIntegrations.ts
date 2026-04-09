import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export interface ClientIntegration {
  id: string;
  client_id: string;
  integration_type: string;
  platform: string;
  display_name: string | null;
  credentials: Json;
  config: Json;
  is_active: boolean;
  last_synced_at: string | null;
  sync_status: string | null;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateIntegrationData {
  client_id: string;
  integration_type: string;
  platform: string;
  display_name?: string;
  credentials?: Json;
  config?: Json;
  is_active?: boolean;
}

// Integration type constants
export const INTEGRATION_TYPES = {
  ANALYTICS: "analytics",
  SOCIAL_MEDIA: "social_media",
  ADVERTISING: "advertising",
  COMPETITOR: "competitor",
  CONTENT: "content",
} as const;

export const PLATFORMS = {
  // Analytics
  GA4: { key: "ga4", label: "Google Analytics 4", type: INTEGRATION_TYPES.ANALYTICS, icon: "ChartBar" },
  GSC: { key: "gsc", label: "Google Search Console", type: INTEGRATION_TYPES.ANALYTICS, icon: "Search" },
  // Social
  TWITTER: { key: "twitter", label: "Twitter / X", type: INTEGRATION_TYPES.SOCIAL_MEDIA, icon: "Twitter" },
  LINKEDIN: { key: "linkedin", label: "LinkedIn", type: INTEGRATION_TYPES.SOCIAL_MEDIA, icon: "Linkedin" },
  INSTAGRAM: { key: "instagram", label: "Instagram", type: INTEGRATION_TYPES.SOCIAL_MEDIA, icon: "Instagram" },
  FACEBOOK: { key: "facebook", label: "Facebook", type: INTEGRATION_TYPES.SOCIAL_MEDIA, icon: "Facebook" },
  // Advertising
  GOOGLE_ADS: { key: "google_ads", label: "Google Ads", type: INTEGRATION_TYPES.ADVERTISING, icon: "Goal" },
  META_ADS: { key: "meta_ads", label: "Meta Ads", type: INTEGRATION_TYPES.ADVERTISING, icon: "Target" },
  LINKEDIN_ADS: { key: "linkedin_ads", label: "LinkedIn Ads", type: INTEGRATION_TYPES.ADVERTISING, icon: "Users" },
  // Competitor
  COMPETITOR_MONITOR: { key: "competitor_monitor", label: "Competitor Monitor", type: INTEGRATION_TYPES.COMPETITOR, icon: "Eye" },
  // Content
  CONTENT_AUTOMATION: { key: "content_automation", label: "Content Automation", type: INTEGRATION_TYPES.CONTENT, icon: "FileText" },
} as const;

export const ALL_PLATFORMS = Object.values(PLATFORMS);

export function useClientIntegrations(clientId: string | undefined) {
  return useQuery({
    queryKey: ["client-integrations", clientId],
    queryFn: async () => {
      if (!clientId) return [];
      const { data, error } = await supabase
        .from("client_integrations")
        .select("*")
        .eq("client_id", clientId)
        .order("platform");
      if (error) throw error;
      return data as ClientIntegration[];
    },
    enabled: !!clientId,
  });
}

export function useAllClientIntegrations() {
  return useQuery({
    queryKey: ["client-integrations", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("client_integrations")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as ClientIntegration[];
    },
  });
}

export function useCreateClientIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateIntegrationData) => {
      const { data: result, error } = await supabase
        .from("client_integrations")
        .insert(data)
        .select()
        .single();
      if (error) throw error;
      return result;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["client-integrations"] });
      toast.success("Integration added successfully");
    },
    onError: (error) => {
      toast.error("Failed to add integration: " + error.message);
    },
  });
}

export function useUpdateClientIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<CreateIntegrationData & { is_active: boolean }> }) => {
      const { data, error } = await supabase
        .from("client_integrations")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-integrations"] });
      toast.success("Integration updated");
    },
    onError: (error) => {
      toast.error("Failed to update: " + error.message);
    },
  });
}

export function useDeleteClientIntegration() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("client_integrations")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["client-integrations"] });
      toast.success("Integration removed");
    },
    onError: (error) => {
      toast.error("Failed to remove: " + error.message);
    },
  });
}
