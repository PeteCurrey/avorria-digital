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
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

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

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
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
                  headline: {
                    type: "string",
                    description: "A bold, outcome-led headline (8-12 words). E.g. 'From invisible to industry leader in 6 months'",
                  },
                  subheadline: {
                    type: "string",
                    description: "A supporting sentence expanding on the headline (15-25 words)",
                  },
                  problem: {
                    type: "string",
                    description: "2-3 paragraphs describing the client's challenge before working with us. Be specific and paint a picture of the pain points.",
                  },
                  approach: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        phase: { type: "string", description: "Phase name e.g. Discovery, Strategy, Execution, Optimisation" },
                        title: { type: "string", description: "Short title for this phase" },
                        description: { type: "string", description: "2-3 sentences describing what was done" },
                        duration: { type: "string", description: "e.g. '2 weeks', '1 month'" },
                      },
                      required: ["phase", "title", "description", "duration"],
                      additionalProperties: false,
                    },
                    description: "3-4 approach phases",
                  },
                  kpi_badges: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        label: { type: "string", description: "Metric name e.g. 'Organic Traffic', 'Lead Volume'" },
                        value: { type: "string", description: "The result value e.g. '+340%', '£125k'" },
                        highlight: { type: "boolean" },
                      },
                      required: ["label", "value", "highlight"],
                      additionalProperties: false,
                    },
                    description: "3-4 headline KPI badges",
                  },
                  outcomes: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        label: { type: "string", description: "Metric name" },
                        value: { type: "string", description: "Final value" },
                        baseline: { type: "string", description: "Starting value before engagement" },
                        highlight: { type: "boolean" },
                      },
                      required: ["label", "value", "baseline", "highlight"],
                      additionalProperties: false,
                    },
                    description: "3-4 detailed outcome metrics with baselines",
                  },
                  quote: {
                    type: "object",
                    properties: {
                      text: { type: "string", description: "A realistic client testimonial quote (2-3 sentences)" },
                      name: { type: "string", description: "A realistic first and last name" },
                      role: { type: "string", description: "Job title e.g. 'Managing Director', 'Head of Marketing'" },
                      company: { type: "string", description: "The client company name" },
                    },
                    required: ["text", "name", "role", "company"],
                    additionalProperties: false,
                  },
                  title: {
                    type: "string",
                    description: "Internal title for the case study (client name + key result)",
                  },
                  slug: {
                    type: "string",
                    description: "URL-friendly slug derived from client name, lowercase with hyphens",
                  },
                },
                required: ["headline", "subheadline", "problem", "approach", "kpi_badges", "outcomes", "quote", "title", "slug"],
                additionalProperties: false,
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
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please top up in Settings → Workspace → Usage." }), {
          status: 402,
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

    const content = JSON.parse(toolCall.function.arguments);

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
