import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseKey);

    if (!lovableApiKey) throw new Error("LOVABLE_API_KEY not configured");

    // Get published resources for analysis
    const { data: resources } = await supabase
      .from("resources")
      .select("id, title, slug, summary, content, category, meta_title, meta_description, target_keyword")
      .eq("is_published", true)
      .order("published_date", { ascending: false })
      .limit(50);

    if (!resources || resources.length === 0) {
      return new Response(
        JSON.stringify({ message: "No published resources to analyze" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get current SEO rankings for context
    const { data: rankings } = await supabase
      .from("seo_rankings")
      .select("keyword, position, url")
      .order("recorded_at", { ascending: false })
      .limit(100);

    // Build analysis prompt
    const resourceList = resources.map(r =>
      `- "${r.title}" (/${r.slug}) | Keyword: ${r.target_keyword || "none"} | Meta: ${r.meta_description?.slice(0, 60) || "missing"}...`
    ).join("\n");

    const rankingContext = (rankings || []).slice(0, 20).map(r =>
      `- "${r.keyword}" → #${r.position || "unranked"} (${r.url})`
    ).join("\n");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert SEO strategist. Analyze website content and provide actionable optimization suggestions. Respond with valid JSON only.",
          },
          {
            role: "user",
            content: `Analyze these published pages for SEO improvements:\n\n${resourceList}\n\nCurrent rankings:\n${rankingContext}\n\nProvide suggestions in JSON array format:\n[{"type":"internal_link|meta_description|content_gap|title_tag","target_page":"slug","suggestion":"actionable text","context":"why this matters","priority":"high|medium|low"}]\n\nFocus on:\n1. Internal linking opportunities between related pages\n2. Missing or weak meta descriptions\n3. Content gaps (topics we should cover)\n4. Title tag improvements for CTR\n\nProvide 5-10 highest-impact suggestions.`,
          },
        ],
        temperature: 0.6,
      }),
    });

    if (!aiResponse.ok) throw new Error(`AI Gateway error: ${aiResponse.status}`);

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
    const jsonStr = jsonMatch ? jsonMatch[1] : content;
    const suggestions = JSON.parse(jsonStr.trim());

    // Store suggestions
    let insertedCount = 0;
    for (const s of suggestions) {
      const { error } = await supabase.from("seo_suggestions").insert({
        suggestion_type: s.type,
        target_page: s.target_page,
        suggestion: s.suggestion,
        context: s.context,
        priority: s.priority || "medium",
      });
      if (!error) insertedCount++;
    }

    // Notify staff
    const { data: staffUsers } = await supabase
      .from("user_roles")
      .select("user_id")
      .in("role", ["admin", "strategist"]);

    if (staffUsers && insertedCount > 0) {
      await Promise.all(
        staffUsers.map((u) =>
          supabase.from("notifications").insert({
            user_id: u.user_id,
            title: "New SEO suggestions",
            message: `${insertedCount} optimization opportunities found`,
            type: "seo",
            link: "/admin?tab=seo",
          })
        )
      );
    }

    return new Response(
      JSON.stringify({ success: true, suggestions: insertedCount }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in seo-auto-optimize:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
