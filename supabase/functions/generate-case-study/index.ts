import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.38.4");
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Try to get user-provided Claude key
    const { data: claudeRecord } = await supabaseAdmin
      .from("seo_integrations")
      .select("config, is_active")
      .eq("integration_type", "claude")
      .eq("is_active", true)
      .maybeSingle();

    const userClaudeKey = claudeRecord?.config?.apiKey;
    
    // ... later in the code we'll use userClaudeKey if it exists

    const { client, sector, services, outcome, timeframe, year } = await req.json();

    if (!client || !sector) {
      return new Response(
        JSON.stringify({ error: "Client name and sector are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are a senior digital marketing strategist at Avorria, a premium UK digital agency. Generate compelling case study content based on the client details provided. The content should be professional, results-driven, and avoid generic AI language. Never use words like "fluff", "leverage", "synergy", "cutting-edge", or "game-changer". Write in a direct, confident tone. All statistics should be realistic and plausible for the sector.`;

    const userPrompt = `Generate a complete case study for:
- Client: ${client}
- Sector: ${sector}
- Services: ${(services || []).join(", ") || "Web Design, SEO"}
- Primary outcome: ${outcome || "leads"}
- Timeframe: ${timeframe || "6 months"}
- Year: ${year || new Date().getFullYear()}

Generate all content fields using the generate_case_study_content tool.`;

    let content: any;
    
    if (userClaudeKey) {
      console.log("Using user-provided Claude API key for case study generation...");
      const anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": userClaudeKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-3-5-sonnet-20240620",
          max_tokens: 4096,
          system: systemPrompt,
          messages: [{ role: "user", content: userPrompt }],
          tools: [
            {
              name: "generate_case_study_content",
              description: "Generate structured case study content fields",
              input_schema: {
                type: "object",
                properties: {
                  headline: { type: "string" },
                  subheadline: { type: "string" },
                  problem: { type: "string" },
                  approach: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        phase: { type: "string" },
                        title: { type: "string" },
                        description: { type: "string" },
                        duration: { type: "string" },
                      },
                      required: ["phase", "title", "description", "duration"],
                    },
                  },
                  kpi_badges: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        label: { type: "string" },
                        value: { type: "string" },
                        highlight: { type: "boolean" },
                      },
                      required: ["label", "value", "highlight"],
                    },
                  },
                  outcomes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        label: { type: "string" },
                        value: { type: "string" },
                        baseline: { type: "string" },
                        highlight: { type: "boolean" },
                      },
                      required: ["label", "value", "baseline", "highlight"],
                    },
                  },
                  quote: {
                    type: "object",
                    properties: {
                      text: { type: "string" },
                      name: { type: "string" },
                      role: { type: "string" },
                      company: { type: "string" },
                    },
                    required: ["text", "name", "role", "company"],
                  },
                  title: { type: "string" },
                  slug: { type: "string" },
                },
                required: ["headline", "subheadline", "problem", "approach", "kpi_badges", "outcomes", "quote", "title", "slug"],
              },
            },
          ],
          tool_choice: { type: "tool", name: "generate_case_study_content" },
        }),
      });

      if (!anthropicResponse.ok) {
        const errorText = await anthropicResponse.text();
        console.error("Claude API error:", anthropicResponse.status, errorText);
        throw new Error(`Claude API error: ${anthropicResponse.status}`);
      }

      const anthropicData = await anthropicResponse.json();
      const toolUse = anthropicData.content.find((c: any) => c.type === "tool_use");
      
      if (!toolUse?.input) {
        throw new Error("No structured output received from Claude");
      }
      
      content = toolUse.input;
    } else {
      console.log("No Claude key found, falling back to default Gemini...");
      if (!LOVABLE_API_KEY) {
        throw new Error("No AI key (Claude or Lovable) is configured");
      }

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-exp",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "generate_case_study_content",
                description: "Generate structured case study content fields",
                parameters: {
                  type: "object",
                  properties: {
                    headline: { type: "string" },
                    subheadline: { type: "string" },
                    problem: { type: "string" },
                    approach: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          phase: { type: "string" },
                          title: { type: "string" },
                          description: { type: "string" },
                          duration: { type: "string" },
                        },
                        required: ["phase", "title", "description", "duration"],
                      },
                    },
                    kpi_badges: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          label: { type: "string" },
                          value: { type: "string" },
                          highlight: { type: "boolean" },
                        },
                        required: ["label", "value", "highlight"],
                      },
                    },
                    outcomes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          label: { type: "string" },
                          value: { type: "string" },
                          baseline: { type: "string" },
                          highlight: { type: "boolean" },
                        },
                        required: ["label", "value", "baseline", "highlight"],
                      },
                    },
                    quote: {
                      type: "object",
                      properties: {
                        text: { type: "string" },
                        name: { type: "string" },
                        role: { type: "string" },
                        company: { type: "string" },
                      },
                      required: ["text", "name", "role", "company"],
                    },
                    title: { type: "string" },
                    slug: { type: "string" },
                  },
                  required: ["headline", "subheadline", "problem", "approach", "kpi_badges", "outcomes", "quote", "title", "slug"],
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "generate_case_study_content" } },
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const text = await response.text();
        console.error("AI gateway error:", response.status, text);
        throw new Error(`AI gateway error: ${response.status}`);
      }

      const data = await response.json();
      const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

      if (!toolCall?.function?.arguments) {
        throw new Error("No structured output received from AI");
      }

      content = JSON.parse(toolCall.function.arguments);
    }

    return new Response(JSON.stringify(content), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("generate-case-study error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
