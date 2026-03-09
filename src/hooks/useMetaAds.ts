import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type MetaAdsAccount = Database["public"]["Tables"]["meta_ads_accounts"]["Row"];
type MetaAdsCampaign = Database["public"]["Tables"]["meta_ads_campaigns"]["Row"];
type MetaAdsMetric = Database["public"]["Tables"]["meta_ads_metrics"]["Row"];
type MetaAdsCreative = Database["public"]["Tables"]["meta_ads_creatives"]["Row"];

// Fetch all Meta Ads accounts
export const useMetaAdsAccounts = () => {
  return useQuery({
    queryKey: ["meta-ads-accounts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("meta_ads_accounts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as MetaAdsAccount[];
    },
  });
};

// Fetch campaigns for a specific account
export const useMetaAdsCampaigns = (accountId?: string) => {
  return useQuery({
    queryKey: ["meta-ads-campaigns", accountId],
    queryFn: async () => {
      let query = supabase
        .from("meta_ads_campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (accountId) {
        query = query.eq("account_id", accountId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as MetaAdsCampaign[];
    },
    enabled: !!accountId,
  });
};

// Fetch metrics for campaigns
export const useMetaAdsMetrics = (accountId?: string, dateRange?: { start: string; end: string }) => {
  return useQuery({
    queryKey: ["meta-ads-metrics", accountId, dateRange],
    queryFn: async () => {
      let query = supabase
        .from("meta_ads_metrics")
        .select("*")
        .order("date", { ascending: false });

      if (accountId) {
        query = query.eq("account_id", accountId);
      }

      if (dateRange) {
        query = query
          .gte("date", dateRange.start)
          .lte("date", dateRange.end);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as MetaAdsMetric[];
    },
    enabled: !!accountId,
  });
};

// Fetch creatives
export const useMetaAdsCreatives = (accountId?: string) => {
  return useQuery({
    queryKey: ["meta-ads-creatives", accountId],
    queryFn: async () => {
      let query = supabase
        .from("meta_ads_creatives")
        .select("*")
        .order("created_at", { ascending: false });

      if (accountId) {
        query = query.eq("account_id", accountId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as MetaAdsCreative[];
    },
    enabled: !!accountId,
  });
};

// Create Meta Ads account
export const useCreateMetaAdsAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (account: Omit<MetaAdsAccount, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("meta_ads_accounts")
        .insert(account)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meta-ads-accounts"] });
      toast.success("Meta Ads account connected successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to connect account: ${error.message}`);
    },
  });
};

// Update campaign status
export const useUpdateMetaCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      campaignId, 
      status 
    }: { 
      campaignId: string; 
      status: string;
    }) => {
      const { data, error } = await supabase
        .from("meta_ads_campaigns")
        .update({ status })
        .eq("id", campaignId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meta-ads-campaigns"] });
      toast.success("Campaign updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update campaign: ${error.message}`);
    },
  });
};

// Calculate aggregated metrics
export const useMetaAdsAggregatedMetrics = (accountId?: string, dateRange?: { start: string; end: string }) => {
  const { data: metrics } = useMetaAdsMetrics(accountId, dateRange);

  const aggregated = metrics?.reduce(
    (acc, metric) => ({
      spend: acc.spend + Number(metric.spend || 0),
      impressions: acc.impressions + Number(metric.impressions || 0),
      clicks: acc.clicks + Number(metric.clicks || 0),
      reach: acc.reach + Number(metric.reach || 0),
      conversions: acc.conversions + Number(metric.conversions || 0),
      conversionValue: acc.conversionValue + Number(metric.conversion_value || 0),
    }),
    {
      spend: 0,
      impressions: 0,
      clicks: 0,
      reach: 0,
      conversions: 0,
      conversionValue: 0,
    }
  );

  const ctr = aggregated && aggregated.impressions > 0
    ? (aggregated.clicks / aggregated.impressions) * 100
    : 0;

  const cpc = aggregated && aggregated.clicks > 0
    ? aggregated.spend / aggregated.clicks
    : 0;

  const cpa = aggregated && aggregated.conversions > 0
    ? aggregated.spend / aggregated.conversions
    : 0;

  const roas = aggregated && aggregated.spend > 0
    ? aggregated.conversionValue / aggregated.spend
    : 0;

  return {
    ...aggregated,
    ctr,
    cpc,
    cpa,
    roas,
  };
};
