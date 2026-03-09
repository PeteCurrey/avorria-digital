import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type GoogleAdsAccount = Database["public"]["Tables"]["google_ads_accounts"]["Row"];
type GoogleAdsCampaign = Database["public"]["Tables"]["google_ads_campaigns"]["Row"];
type GoogleAdsMetrics = Database["public"]["Tables"]["google_ads_metrics"]["Row"];
type GoogleAdsAlert = Database["public"]["Tables"]["google_ads_alerts"]["Row"];

// Accounts
export function useGoogleAdsAccounts() {
  return useQuery({
    queryKey: ["google-ads-accounts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("google_ads_accounts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as GoogleAdsAccount[];
    },
  });
}

export function useConnectGoogleAdsAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (account: Omit<GoogleAdsAccount, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("google_ads_accounts")
        .insert([account])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["google-ads-accounts"] });
      toast.success("Google Ads account connected");
    },
    onError: (error: Error) => {
      toast.error(`Failed to connect account: ${error.message}`);
    },
  });
}

// Campaigns
export function useGoogleAdsCampaigns(accountId?: string) {
  return useQuery({
    queryKey: ["google-ads-campaigns", accountId],
    queryFn: async () => {
      let query = supabase
        .from("google_ads_campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (accountId) {
        query = query.eq("account_id", accountId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as GoogleAdsCampaign[];
    },
    enabled: !!accountId,
  });
}

export function useCreateGoogleAdsCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (campaign: Omit<GoogleAdsCampaign, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("google_ads_campaigns")
        .insert([campaign])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["google-ads-campaigns"] });
      toast.success("Campaign created");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create campaign: ${error.message}`);
    },
  });
}

export function useUpdateGoogleAdsCampaign() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<GoogleAdsCampaign> }) => {
      const { data, error } = await supabase
        .from("google_ads_campaigns")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["google-ads-campaigns"] });
      toast.success("Campaign updated");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update campaign: ${error.message}`);
    },
  });
}

// Metrics
export function useGoogleAdsMetrics(campaignId?: string, days = 30) {
  return useQuery({
    queryKey: ["google-ads-metrics", campaignId, days],
    queryFn: async () => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      let query = supabase
        .from("google_ads_metrics")
        .select("*")
        .gte("date", startDate.toISOString().split("T")[0])
        .order("date", { ascending: false });

      if (campaignId) {
        query = query.eq("campaign_id", campaignId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as GoogleAdsMetrics[];
    },
  });
}

export function useAggregatedMetrics(accountId?: string) {
  return useQuery({
    queryKey: ["google-ads-aggregated-metrics", accountId],
    queryFn: async () => {
      const { data: campaigns } = await supabase
        .from("google_ads_campaigns")
        .select("id")
        .eq("account_id", accountId || "");

      if (!campaigns?.length) return null;

      const campaignIds = campaigns.map((c) => c.id);
      const { data, error } = await supabase
        .from("google_ads_metrics")
        .select("*")
        .in("campaign_id", campaignIds);

      if (error) throw error;

      const metrics = data as GoogleAdsMetrics[];
      const totals = metrics.reduce(
        (acc, m) => ({
          spend: acc.spend + Number(m.cost),
          impressions: acc.impressions + Number(m.impressions),
          clicks: acc.clicks + Number(m.clicks),
          conversions: acc.conversions + Number(m.conversions),
          conversionValue: acc.conversionValue + Number(m.conversion_value),
        }),
        { spend: 0, impressions: 0, clicks: 0, conversions: 0, conversionValue: 0 }
      );

      return {
        ...totals,
        cpl: totals.conversions > 0 ? totals.spend / totals.conversions : 0,
        roas: totals.spend > 0 ? totals.conversionValue / totals.spend : 0,
        ctr: totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0,
      };
    },
    enabled: !!accountId,
  });
}

// Alerts
export function useGoogleAdsAlerts() {
  return useQuery({
    queryKey: ["google-ads-alerts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("google_ads_alerts")
        .select("*")
        .eq("is_resolved", false)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as GoogleAdsAlert[];
    },
  });
}

export function useResolveGoogleAdsAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (alertId: string) => {
      const { data, error } = await supabase
        .from("google_ads_alerts")
        .update({ is_resolved: true, resolved_at: new Date().toISOString() })
        .eq("id", alertId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["google-ads-alerts"] });
      toast.success("Alert resolved");
    },
    onError: (error: Error) => {
      toast.error(`Failed to resolve alert: ${error.message}`);
    },
  });
}
