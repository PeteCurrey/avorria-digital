import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface GoogleAdsRequest {
  action: "sync_campaigns" | "sync_metrics" | "update_campaign";
  accountId?: string;
  customerId?: string;
  campaignId?: string;
  updates?: Record<string, unknown>;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, accountId, customerId, campaignId, updates }: GoogleAdsRequest = await req.json();

    switch (action) {
      case "sync_campaigns":
        return await syncCampaigns(supabaseClient, accountId!);

      case "sync_metrics":
        return await syncMetrics(supabaseClient, accountId!);

      case "update_campaign":
        return await updateCampaign(supabaseClient, campaignId!, updates!);

      default:
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

async function syncCampaigns(supabaseClient: any, accountId: string) {
  // Get account details
  const { data: account, error: accountError } = await supabaseClient
    .from("google_ads_accounts")
    .select("*")
    .eq("id", accountId)
    .single();

  if (accountError) {
    return new Response(
      JSON.stringify({ error: "Account not found" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // TODO: Implement actual Google Ads API integration
  // This is a placeholder that would normally:
  // 1. Use the refresh_token to get a new access_token
  // 2. Call Google Ads API to fetch campaigns
  // 3. Upsert campaigns to the database
  
  console.log(`Syncing campaigns for account ${account.customer_id}`);

  // Mock response for now
  return new Response(
    JSON.stringify({
      success: true,
      message: "Campaigns synced successfully",
      synced: 0,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

async function syncMetrics(supabaseClient: any, accountId: string) {
  // Get campaigns for this account
  const { data: campaigns, error: campaignsError } = await supabaseClient
    .from("google_ads_campaigns")
    .select("*")
    .eq("account_id", accountId);

  if (campaignsError) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch campaigns" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // TODO: Implement actual Google Ads API integration
  // This is a placeholder that would normally:
  // 1. Call Google Ads API to fetch metrics for each campaign
  // 2. Insert metrics into the database
  // 3. Create alerts if thresholds are exceeded
  
  console.log(`Syncing metrics for ${campaigns.length} campaigns`);

  // Mock response
  return new Response(
    JSON.stringify({
      success: true,
      message: "Metrics synced successfully",
      campaigns: campaigns.length,
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

async function updateCampaign(
  supabaseClient: any,
  campaignId: string,
  updates: Record<string, unknown>
) {
  // Get campaign details
  const { data: campaign, error: campaignError } = await supabaseClient
    .from("google_ads_campaigns")
    .select("*, google_ads_accounts(*)")
    .eq("id", campaignId)
    .single();

  if (campaignError) {
    return new Response(
      JSON.stringify({ error: "Campaign not found" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  // TODO: Implement actual Google Ads API integration
  // This is a placeholder that would normally:
  // 1. Call Google Ads API to update the campaign
  // 2. Update the local database with the changes
  
  console.log(`Updating campaign ${campaign.campaign_id}:`, updates);

  // Update local database
  const { error: updateError } = await supabaseClient
    .from("google_ads_campaigns")
    .update(updates)
    .eq("id", campaignId);

  if (updateError) {
    return new Response(
      JSON.stringify({ error: "Failed to update campaign" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: "Campaign updated successfully",
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}
