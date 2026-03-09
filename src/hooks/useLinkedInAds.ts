import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types based on the database schema
type LinkedInAdsAccount = {
  id: string;
  account_id: string;
  name: string;
  account_status: string;
  currency: string;
  timezone: string;
  is_active: boolean;
  access_token: string | null;
  refresh_token: string | null;
  token_expires_at: string | null;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
};

type LinkedInAdsCampaign = {
  id: string;
  account_id: string;
  campaign_id: string;
  name: string;
  objective: string;
  status: string;
  campaign_type: string;
  daily_budget: number | null;
  total_budget: number | null;
  unit_cost: number | null;
  bid_type: string | null;
  audience_targeting: Record<string, unknown> | null;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
};

type LinkedInAdsCreative = {
  id: string;
  account_id: string;
  campaign_id: string | null;
  creative_id: string;
  name: string | null;
  status: string;
  creative_type: string;
  headline: string | null;
  body: string | null;
  call_to_action: string | null;
  destination_url: string | null;
  image_url: string | null;
  video_url: string | null;
  created_at: string;
  updated_at: string;
};

type LinkedInAdsMetric = {
  id: string;
  account_id: string;
  campaign_id: string | null;
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
  conversion_value: number;
  leads: number;
  video_views: number | null;
  shares: number | null;
  comments: number | null;
  reactions: number | null;
  follows: number | null;
  ctr: number | null;
  cpc: number | null;
  cpm: number | null;
  cpl: number | null;
  roas: number | null;
  created_at: string;
};

// Accounts
export const useLinkedInAdsAccounts = () => {
  return useQuery({
    queryKey: ["linkedin-ads-accounts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("linkedin_ads_accounts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as LinkedInAdsAccount[];
    },
  });
};

export const useCreateLinkedInAdsAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (account: Omit<LinkedInAdsAccount, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("linkedin_ads_accounts")
        .insert(account)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkedin-ads-accounts"] });
      toast.success("LinkedIn Ads account connected successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to connect account: ${error.message}`);
    },
  });
};

// Campaigns
export const useLinkedInAdsCampaigns = (accountId?: string) => {
  return useQuery({
    queryKey: ["linkedin-ads-campaigns", accountId],
    queryFn: async () => {
      let query = supabase
        .from("linkedin_ads_campaigns")
        .select("*")
        .order("created_at", { ascending: false });
      if (accountId) query = query.eq("account_id", accountId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LinkedInAdsCampaign[];
    },
    enabled: !!accountId,
  });
};

export const useUpdateLinkedInCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ campaignId, status }: { campaignId: string; status: string }) => {
      const { data, error } = await supabase
        .from("linkedin_ads_campaigns")
        .update({ status })
        .eq("id", campaignId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["linkedin-ads-campaigns"] });
      toast.success("Campaign updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update campaign: ${error.message}`);
    },
  });
};

// Creatives
export const useLinkedInAdsCreatives = (accountId?: string) => {
  return useQuery({
    queryKey: ["linkedin-ads-creatives", accountId],
    queryFn: async () => {
      let query = supabase
        .from("linkedin_ads_creatives")
        .select("*")
        .order("created_at", { ascending: false });
      if (accountId) query = query.eq("account_id", accountId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LinkedInAdsCreative[];
    },
    enabled: !!accountId,
  });
};

// Metrics
export const useLinkedInAdsMetrics = (accountId?: string) => {
  return useQuery({
    queryKey: ["linkedin-ads-metrics", accountId],
    queryFn: async () => {
      let query = supabase
        .from("linkedin_ads_metrics")
        .select("*")
        .order("date", { ascending: false });
      if (accountId) query = query.eq("account_id", accountId);
      const { data, error } = await query;
      if (error) throw error;
      return data as LinkedInAdsMetric[];
    },
    enabled: !!accountId,
  });
};

// Aggregated metrics
export const useLinkedInAdsAggregatedMetrics = (accountId?: string) => {
  const { data: metrics } = useLinkedInAdsMetrics(accountId);

  const aggregated = metrics?.reduce(
    (acc, m) => ({
      spend: acc.spend + Number(m.spend || 0),
      impressions: acc.impressions + Number(m.impressions || 0),
      clicks: acc.clicks + Number(m.clicks || 0),
      conversions: acc.conversions + Number(m.conversions || 0),
      conversionValue: acc.conversionValue + Number(m.conversion_value || 0),
      leads: acc.leads + Number(m.leads || 0),
      shares: acc.shares + Number(m.shares || 0),
      reactions: acc.reactions + Number(m.reactions || 0),
    }),
    { spend: 0, impressions: 0, clicks: 0, conversions: 0, conversionValue: 0, leads: 0, shares: 0, reactions: 0 }
  );

  const ctr = aggregated && aggregated.impressions > 0
    ? (aggregated.clicks / aggregated.impressions) * 100 : 0;
  const cpc = aggregated && aggregated.clicks > 0
    ? aggregated.spend / aggregated.clicks : 0;
  const cpl = aggregated && aggregated.leads > 0
    ? aggregated.spend / aggregated.leads : 0;
  const roas = aggregated && aggregated.spend > 0
    ? aggregated.conversionValue / aggregated.spend : 0;

  return { ...aggregated, ctr, cpc, cpl, roas };
};
