import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) throw new Error("Supabase credentials missing");

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Get active target keywords
    const { data: targetKeywords, error: kwError } = await supabase
      .from("seo_target_keywords")
      .select("*")
      .eq("is_active", true);

    if (kwError) throw kwError;
    if (!targetKeywords || targetKeywords.length === 0) {
      return new Response(
        JSON.stringify({ message: "No target keywords configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Check if SerpAPI is configured
    const { data: integration } = await supabase
      .from("seo_integrations")
      .select("config")
      .eq("integration_type", "serpapi")
      .eq("is_active", true)
      .single();

    const serpApiKey = (integration?.config as any)?.apiKey;

    const results = [];
    const notifications = [];

    for (const kw of targetKeywords) {
      // Get previous position
      const { data: prevRankings } = await supabase
        .from("seo_rankings")
        .select("position")
        .eq("keyword", kw.keyword)
        .order("recorded_at", { ascending: false })
        .limit(1);

      const previousPosition = prevRankings?.[0]?.position || null;

      let currentPosition: number | null = null;

      if (serpApiKey) {
        // Use SerpAPI for real data
        try {
          const params = new URLSearchParams({
            api_key: serpApiKey,
            q: kw.keyword,
            engine: "google",
            num: "100",
          });

          const response = await fetch(`https://serpapi.com/search?${params}`);
          if (response.ok) {
            const data = await response.json();
            const domain = kw.target_url || "avorria.com";
            const organicResults = data.organic_results || [];
            const pos = organicResults.findIndex((r: any) =>
              r.link?.includes(domain)
            );
            currentPosition = pos >= 0 ? pos + 1 : null;
          }
        } catch (e) {
          console.error(`SerpAPI error for "${kw.keyword}":`, e);
        }
      }

      // Store ranking
      const rankingData = {
        keyword: kw.keyword,
        url: kw.target_url || "avorria.com",
        position: currentPosition,
        previous_position: previousPosition,
        source: serpApiKey ? "serpapi" : "manual",
        recorded_at: new Date().toISOString(),
      };

      await supabase.from("seo_rankings").insert(rankingData);
      results.push(rankingData);

      // Check for significant changes (≥3 positions)
      if (currentPosition && previousPosition) {
        const change = previousPosition - currentPosition;
        if (Math.abs(change) >= 3) {
          const direction = change > 0 ? "improved" : "dropped";
          notifications.push({
            keyword: kw.keyword,
            change,
            direction,
            from: previousPosition,
            to: currentPosition,
          });
        }
      }
    }

    // 3. Create notifications for significant changes
    if (notifications.length > 0) {
      const { data: staffUsers } = await supabase
        .from("user_roles")
        .select("user_id")
        .in("role", ["admin", "strategist"]);

      if (staffUsers) {
        for (const notif of notifications) {
          await Promise.all(
            staffUsers.map((u) =>
              supabase.from("notifications").insert({
                user_id: u.user_id,
                title: `Rank ${notif.direction}: "${notif.keyword}"`,
                message: `Position moved from #${notif.from} to #${notif.to} (${notif.change > 0 ? "+" : ""}${notif.change})`,
                type: "seo",
                link: "/admin?tab=seo",
              })
            )
          );
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        tracked: results.length,
        notifications: notifications.length,
        results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in track-seo-rankings:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
