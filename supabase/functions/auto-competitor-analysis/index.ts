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

    // Get active competitor targets
    const { data: targets, error } = await supabase
      .from("competitor_targets")
      .select("*")
      .eq("is_active", true);

    if (error) throw error;
    if (!targets || targets.length === 0) {
      return new Response(
        JSON.stringify({ message: "No competitor targets configured" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const results = [];

    for (const target of targets) {
      try {
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
                content: "You are a competitive intelligence analyst. Analyze websites and respond with valid JSON only.",
              },
              {
                role: "user",
                content: `Analyze ${target.competitor_url} as a competitor to avorria.com (digital marketing agency). Return JSON: {"company_name":"string","positioning":"string","strengths":[{"area":"string","description":"string"}],"weaknesses":[{"area":"string","opportunity":"string"}],"opportunities":[{"title":"string","action":"string"}],"marketing_tactics":[{"tactic":"string","effectiveness":"high|medium|low"}],"threat_level":"high|medium|low","key_differentiators":["string"],"recommendations":[{"priority":"high|medium|low","action":"string"}]}`,
              },
            ],
            temperature: 0.7,
          }),
        });

        if (!aiResponse.ok) continue;

        const aiData = await aiResponse.json();
        const content = aiData.choices?.[0]?.message?.content || "";
        const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
        const jsonStr = jsonMatch ? jsonMatch[1] : content;
        const analysis = JSON.parse(jsonStr.trim());

        // Store snapshot
        await supabase.from("competitor_snapshots").insert({
          competitor_url: target.competitor_url,
          company_name: analysis.company_name || target.company_name,
          positioning: analysis.positioning,
          strengths: analysis.strengths || [],
          weaknesses: analysis.weaknesses || [],
          opportunities: analysis.opportunities || [],
          marketing_tactics: analysis.marketing_tactics || [],
          threat_level: analysis.threat_level || "medium",
          key_differentiators: analysis.key_differentiators || [],
          recommendations: analysis.recommendations || [],
          raw_response: analysis,
        });

        // Update last checked
        await supabase
          .from("competitor_targets")
          .update({ last_checked_at: new Date().toISOString(), company_name: analysis.company_name || target.company_name })
          .eq("id", target.id);

        results.push({ url: target.competitor_url, success: true });
      } catch (e: any) {
        console.error(`Error analyzing ${target.competitor_url}:`, e);
        results.push({ url: target.competitor_url, success: false, error: e.message });
      }
    }

    // Notify staff
    const { data: staffUsers } = await supabase
      .from("user_roles")
      .select("user_id")
      .in("role", ["admin", "strategist"]);

    if (staffUsers) {
      const successCount = results.filter(r => r.success).length;
      await Promise.all(
        staffUsers.map((u) =>
          supabase.from("notifications").insert({
            user_id: u.user_id,
            title: "Competitor analysis complete",
            message: `Analyzed ${successCount} competitor(s)`,
            type: "seo",
            link: "/admin?tab=seo",
          })
        )
      );
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in auto-competitor-analysis:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
