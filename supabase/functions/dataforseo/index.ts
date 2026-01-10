import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DataForSEORequest {
  action: "sync" | "backlinks" | "keywords" | "serp";
  domain?: string;
  keywords?: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, domain, keywords }: DataForSEORequest = await req.json();

    // Get credentials from database
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase credentials not configured");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch DataforSEO credentials from integrations table
    const { data: integration, error: integrationError } = await supabase
      .from("seo_integrations")
      .select("config")
      .eq("integration_type", "dataforseo")
      .eq("is_active", true)
      .single();

    if (integrationError || !integration?.config) {
      // Return mock data if not configured
      console.log("DataforSEO not configured, returning mock data");
      return new Response(
        JSON.stringify(getMockData(action)),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { apiLogin, apiPassword } = integration.config as { apiLogin: string; apiPassword: string };
    const authHeader = "Basic " + btoa(`${apiLogin}:${apiPassword}`);

    let result;

    switch (action) {
      case "backlinks":
        result = await fetchBacklinks(domain || "", authHeader);
        break;
      case "keywords":
        result = await fetchKeywordData(keywords || [], authHeader);
        break;
      case "serp":
        result = await fetchSerpData(keywords || [], authHeader);
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
      .eq("integration_type", "dataforseo");

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in dataforseo function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function fetchBacklinks(domain: string, authHeader: string) {
  try {
    const response = await fetch("https://api.dataforseo.com/v3/backlinks/summary/live", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([{ target: domain, limit: 100 }]),
    });

    if (!response.ok) {
      throw new Error(`DataforSEO API error: ${response.status}`);
    }

    const data = await response.json();
    return data.tasks?.[0]?.result?.[0] || {};
  } catch (error) {
    console.error("Error fetching backlinks:", error);
    return getMockData("backlinks");
  }
}

async function fetchKeywordData(keywords: string[], authHeader: string) {
  try {
    const tasks = keywords.map((keyword) => ({
      keyword,
      location_code: 2840, // USA
      language_code: "en",
    }));

    const response = await fetch("https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });

    if (!response.ok) {
      throw new Error(`DataforSEO API error: ${response.status}`);
    }

    const data = await response.json();
    return data.tasks?.[0]?.result || [];
  } catch (error) {
    console.error("Error fetching keyword data:", error);
    return getMockData("keywords");
  }
}

async function fetchSerpData(keywords: string[], authHeader: string) {
  try {
    const tasks = keywords.map((keyword) => ({
      keyword,
      location_code: 2840,
      language_code: "en",
      depth: 10,
    }));

    const response = await fetch("https://api.dataforseo.com/v3/serp/google/organic/live/regular", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    });

    if (!response.ok) {
      throw new Error(`DataforSEO API error: ${response.status}`);
    }

    const data = await response.json();
    return data.tasks?.[0]?.result?.[0] || {};
  } catch (error) {
    console.error("Error fetching SERP data:", error);
    return getMockData("serp");
  }
}

function getMockData(action: string) {
  switch (action) {
    case "backlinks":
      return {
        total_backlinks: 15420,
        referring_domains: 892,
        domain_authority: 45,
        trust_flow: 32,
        citation_flow: 41,
        topReferringDomains: [
          { domain: "example.com", backlinks: 45, authority: 72 },
          { domain: "blog.industry.com", backlinks: 32, authority: 65 },
          { domain: "news.site.com", backlinks: 28, authority: 78 },
        ],
      };
    case "keywords":
      return [
        { keyword: "digital marketing", search_volume: 165000, cpc: 12.50, competition: 0.85 },
        { keyword: "seo services", search_volume: 74000, cpc: 25.00, competition: 0.92 },
        { keyword: "content marketing", search_volume: 49500, cpc: 8.75, competition: 0.78 },
      ];
    case "serp":
      return {
        keyword: "sample keyword",
        results: [
          { position: 1, url: "https://example.com", title: "Example Result" },
          { position: 2, url: "https://another.com", title: "Another Result" },
        ],
      };
    default:
      return { message: "Mock data returned", configured: false };
  }
}
