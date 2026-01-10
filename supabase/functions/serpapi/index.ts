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

    // Get credentials from database
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
      // Return mock data if not configured
      console.log("SerpAPI not configured, returning mock data");
      return new Response(
        JSON.stringify(getMockData(action)),
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
        result = getMockData(action);
    }

    // Update last sync time
    await supabase
      .from("seo_integrations")
      .update({ last_sync_at: new Date().toISOString() })
      .eq("integration_type", "serpapi");

    return new Response(
      JSON.stringify(result),
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
    return getMockData("search");
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
      
      // Find the domain's position
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

      // Store in database
      await supabase.from("seo_rankings").insert(rankingData);

    } catch (error) {
      console.error(`Error tracking keyword "${keyword}":`, error);
    }
  }

  return { domain, rankings, trackedAt: new Date().toISOString() };
}

function getMockData(action: string) {
  switch (action) {
    case "search":
      return {
        query: "sample query",
        results: [
          { position: 1, title: "Top Result", url: "https://example.com/page1", snippet: "This is the top result..." },
          { position: 2, title: "Second Result", url: "https://example.com/page2", snippet: "This is the second result..." },
          { position: 3, title: "Third Result", url: "https://example.com/page3", snippet: "This is the third result..." },
        ],
        relatedSearches: ["related term 1", "related term 2"],
        peopleAlsoAsk: ["What is X?", "How does Y work?"],
      };
    case "rankings":
      return {
        domain: "example.com",
        rankings: [
          { keyword: "digital marketing", position: 5, change: "+2" },
          { keyword: "seo services", position: 12, change: "-1" },
          { keyword: "web design", position: 8, change: "+3" },
        ],
        trackedAt: new Date().toISOString(),
      };
    default:
      return { message: "Mock data returned", configured: false };
  }
}
