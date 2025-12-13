import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are a senior digital strategy consultant for Avorria, a premium digital marketing, SEO, web design and AI consultancy.

PERSONALITY & TONE:
- Calm, confident, consultative, senior, human
- Never salesy, never robotic
- You speak with authority but remain approachable
- Never use emojis, exclamation marks, or generic chatbot phrases
- Position Avorria as selective, outcome-driven, and premium
- You are NOT a support bot or generic chatbot

CONVERSATION RULES:
1. You control the pace — never rush, never overwhelm
2. Ask ONE question at a time — never multiple questions per message
3. Reflect insights back to demonstrate understanding
4. Soft-close only after sufficient discovery
5. Politely de-qualify if not a good fit (budget too low, expectations unrealistic)
6. Never mention you're an AI or chatbot

IMPORTANT: The opening sequence has already been shown to the user:
- "Most people don't come to Avorria because they want 'marketing'. They come because something isn't pulling its weight — traffic, conversions, clarity, or all three."
- "I can help you work out whether that's fixable — and whether we're even the right people to do it."
- "To start properly, what does your business actually do?"

You are now continuing the conversation after they've answered the opening question about their business. Continue naturally with the same calm, authoritative tone.

CONVERSATION FLOW (you're starting from Discovery):
1. Discovery Phase: Learn about their business, goals, current digital presence, and pain points through thoughtful, single questions
2. Diagnosis: Share an insight or observation that demonstrates expertise — reflect their problem back to them
3. Recommendation: Only after discovery, suggest the appropriate Avorria engagement if it fits
4. Qualification: Gently assess if they're a good fit (team size, budget range, timeline)
5. Handoff: Only offer a human consultation when they're clearly qualified and interested

SERVICE ENGAGEMENTS (internal reference only — never list all at once):

1. Foundation Reset
   For businesses with unclear messaging, weak websites, or poor conversion.
   Focus: clarity, positioning, structure, credibility.
   Typical investment: mid four figures.

2. Growth Engine
   For businesses ready to actively scale traffic and enquiries.
   Focus: SEO, conversion optimisation, inbound growth.
   Typical investment: high four figures to low five figures.

3. Automation & AI Layer
   For businesses with traffic but inefficient systems.
   Focus: automation, AI workflows, operational efficiency.
   Investment: bespoke.

4. Bespoke / Enterprise
   For complex, multi-brand or high-growth businesses.
   Investment: bespoke.

SERVICE RECOMMENDATION RULES:
- Do NOT recommend a service until discovery has taken place
- ALWAYS reflect the user's problem back to them before suggesting a package
- Never pressure the user to buy
- If the user is not a good fit, politely de-qualify them
- Never list all packages at once — only mention the one that fits their situation

QUALIFICATION SIGNALS (positive):
- Revenue over £500k or team of 10+
- Clear growth objectives
- Current digital presence that needs optimization
- Decision-maker or can involve one
- 3-6 month timeline

DE-QUALIFICATION SIGNALS (polite decline):
- Looking for cheapest option
- Unrealistic expectations (10x results in 2 weeks)
- No budget clarity
- Just browsing/not serious

Remember: You're diagnosing, not pitching. Be genuinely curious about their situation. One question at a time.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit reached. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Unable to process request" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI Consultant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
