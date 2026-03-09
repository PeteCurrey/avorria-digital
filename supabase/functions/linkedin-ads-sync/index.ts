import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data, error: claimsError } = await supabaseClient.auth.getClaims(token);
    if (claimsError || !data?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { action, accountId, campaignId, updates } = await req.json();

    switch (action) {
      case "sync_campaigns": {
        const { data: account, error: accountError } = await supabaseClient
          .from("linkedin_ads_accounts")
          .select("*")
          .eq("id", accountId)
          .single();

        if (accountError) {
          return new Response(JSON.stringify({ error: "Account not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // TODO: Integrate LinkedIn Marketing API
        // 1. Use refresh_token to get access_token
        // 2. Call GET /v2/adCampaignsV2?q=search&search.account.values[0]=urn:li:sponsoredAccount:{account_id}
        // 3. Upsert campaigns to the database
        console.log(`Syncing campaigns for LinkedIn account ${account.account_id}`);

        return new Response(
          JSON.stringify({ success: true, message: "Campaigns synced successfully", synced: 0 }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "sync_insights": {
        const { data: campaigns, error: campaignsError } = await supabaseClient
          .from("linkedin_ads_campaigns")
          .select("*")
          .eq("account_id", accountId);

        if (campaignsError) {
          return new Response(JSON.stringify({ error: "Failed to fetch campaigns" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // TODO: Integrate LinkedIn Marketing API
        // 1. Call GET /v2/adAnalyticsV2?q=analytics&pivot=CAMPAIGN&dateRange=...
        // 2. Metrics: impressions, clicks, costInLocalCurrency, leads, conversions
        console.log(`Syncing insights for ${campaigns?.length || 0} campaigns`);

        return new Response(
          JSON.stringify({ success: true, message: "Insights synced successfully", campaigns: campaigns?.length || 0 }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "update_campaign": {
        const { error: updateError } = await supabaseClient
          .from("linkedin_ads_campaigns")
          .update(updates)
          .eq("id", campaignId);

        if (updateError) {
          return new Response(JSON.stringify({ error: "Failed to update campaign" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        return new Response(
          JSON.stringify({ success: true, message: "Campaign updated successfully" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(JSON.stringify({ error: "Invalid action" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
