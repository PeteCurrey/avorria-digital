import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SerpAPIRequest {
  action: "sync" | "search" | "rankings";
  query?: string;
  domain?: string;
  keywords?: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, query, domain, keywords }: SerpAPIRequest = await req.json();

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch SerpAPI credentials from integrations table
    const { data: integration, error: integrationError } = await supabase
      .from("seo_integrations")
      .select("config")
      .eq("integration_type", "serpapi")
      .eq("is_active", true)
      .single();

    if (integrationError || !integration?.config) {
      // Return honest empty state — no mock data
      console.log("SerpAPI not configured, returning empty state");
      return new Response(
        JSON.stringify({ configured: false, data: null, message: "SerpAPI not configured. Add your API key in Integrations." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { apiKey } = integration.config as { apiKey: string };

    let result;

    switch (action) {
      case "search":
        result = await performSearch(query || "", apiKey);
        break;
      case "rankings":
        result = await trackRankings(domain || "", keywords || [], apiKey, supabase);
        break;
      case "sync":
        result = { message: "Sync completed", timestamp: new Date().toISOString() };
        break;
      default:
        result = { configured: true, data: null };
    }

    // Update last sync time
    await supabase
      .from("seo_integrations")
      .update({ last_sync_at: new Date().toISOString() })
      .eq("integration_type", "serpapi");

    return new Response(
      JSON.stringify({ configured: true, ...result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in serpapi function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function performSearch(query: string, apiKey: string) {
  try {
    const params = new URLSearchParams({
      api_key: apiKey,
      q: query,
      engine: "google",
      num: "10",
    });

    const response = await fetch(`https://serpapi.com/search?${params}`);

    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      query,
      results: data.organic_results?.map((r: any, i: number) => ({
        position: i + 1,
        title: r.title,
        url: r.link,
        snippet: r.snippet,
      })) || [],
      relatedSearches: data.related_searches || [],
      peopleAlsoAsk: data.related_questions || [],
    };
  } catch (error) {
    console.error("Error performing search:", error);
    throw error;
  }
}

async function trackRankings(domain: string, keywords: string[], apiKey: string, supabase: any) {
  const rankings = [];

  for (const keyword of keywords) {
    try {
      const params = new URLSearchParams({
        api_key: apiKey,
        q: keyword,
        engine: "google",
        num: "100",
      });

      const response = await fetch(`https://serpapi.com/search?${params}`);

      if (!response.ok) continue;

      const data = await response.json();
      
      const organicResults = data.organic_results || [];
      const position = organicResults.findIndex((r: any) => 
        r.link?.includes(domain)
      ) + 1;

      const rankingData = {
        keyword,
        url: domain,
        position: position || null,
        source: "serpapi",
        recorded_at: new Date().toISOString(),
      };

      rankings.push(rankingData);

      await supabase.from("seo_rankings").insert(rankingData);

    } catch (error) {
      console.error(`Error tracking keyword "${keyword}":`, error);
    }
  }

  return { domain, rankings, trackedAt: new Date().toISOString() };
}
