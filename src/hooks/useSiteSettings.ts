import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface SiteSettings {
  popup_slide_in_enabled: boolean;
  popup_exit_intent_enabled: boolean;
}

const DEFAULT_SETTINGS: SiteSettings = {
  popup_slide_in_enabled: true,
  popup_exit_intent_enabled: true,
};

async function fetchSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value");

  if (error) throw error;

  const settings = { ...DEFAULT_SETTINGS };
  for (const row of data ?? []) {
    if (row.key in settings) {
      (settings as Record<string, unknown>)[row.key] = row.value === true || row.value === "true";
    }
  }
  return settings;
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: fetchSiteSettings,
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}

export function useUpdateSiteSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: boolean }) => {
      const { error } = await supabase
        .from("site_settings")
        .update({ value })
        .eq("key", key);

      if (error) throw error;
    },
    onSuccess: (_, { key, value }) => {
      queryClient.setQueryData<SiteSettings>(["site_settings"], (old) =>
        old ? { ...old, [key]: value } : old
      );
      toast.success("Setting updated");
    },
    onError: () => {
      toast.error("Failed to update setting");
    },
  });
}
