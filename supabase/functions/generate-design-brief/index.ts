import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface DesignBriefRequest {
  messages: Message[];
  config?: {
    purpose?: string;
    palette?: string;
    siteSize?: string;
    features?: string[];
    modules?: string[];
  };
  generateFinalBrief?: boolean;
}

const systemPrompt = `You are a senior web design consultant at a premium digital agency. You're having a conversation with a client to understand their website needs and create a comprehensive design brief.

Your personality:
- Professional yet approachable
- Ask insightful, strategic questions
- Draw out details about their brand, audience, and goals
- Provide expert recommendations when appropriate
- Keep responses concise but valuable (2-3 paragraphs max per response)

Conversation flow:
1. First, understand their business and what they do
2. Learn about their target audience and who visits their site
3. Explore their brand personality and values
4. Understand their goals and what success looks like
5. Discuss competitors and what they like/dislike about other sites
6. Talk about features and functionality they need

When you have enough information (usually after 5-7 exchanges), offer to generate their comprehensive design brief.

Always acknowledge what they've shared and build on it. Never be generic - reference specific details they've mentioned.

If the user seems ready for the brief or asks for it, respond with exactly: "READY_FOR_BRIEF" followed by a summary of what you've learned.`;

const briefGenerationPrompt = `Based on the conversation, generate a comprehensive website design brief in the following JSON structure:

{
  "projectOverview": {
    "businessName": "string",
    "industry": "string",
    "projectSummary": "2-3 sentence summary"
  },
  "targetAudience": {
    "primaryPersona": {
      "name": "string",
      "demographics": "string",
      "goals": ["string"],
      "painPoints": ["string"]
    },
    "secondaryPersonas": [{ "name": "string", "description": "string" }]
  },
  "brandPersonality": {
    "tone": ["3-5 adjectives"],
    "values": ["3-5 values"],
    "differentiators": ["what makes them unique"]
  },
  "designDirection": {
    "visualStyle": "string description",
    "colorRecommendations": {
      "primary": "hex and reasoning",
      "secondary": "hex and reasoning",
      "accent": "hex and reasoning"
    },
    "typographyNotes": "string",
    "moodKeywords": ["5-7 keywords"]
  },
  "siteStructure": {
    "recommendedPages": [
      { "page": "string", "purpose": "string", "priority": "high|medium|low" }
    ],
    "keyFeatures": [
      { "feature": "string", "rationale": "string" }
    ]
  },
  "contentStrategy": {
    "keyMessages": ["3-5 key messages"],
    "callsToAction": ["primary and secondary CTAs"],
    "contentNeeds": ["what content they'll need to provide"]
  },
  "successMetrics": {
    "goals": ["measurable goals"],
    "kpis": ["key performance indicators"]
  },
  "competitiveInsights": {
    "strengths": ["what competitors do well"],
    "opportunities": ["gaps to exploit"],
    "avoidList": ["what to avoid"]
  },
  "nextSteps": ["recommended next actions"]
}

Return ONLY the JSON, no additional text.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, config, generateFinalBrief } = await req.json() as DesignBriefRequest;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context from config if provided
    let contextNote = "";
    if (config) {
      const parts = [];
      if (config.purpose) parts.push(`website type: ${config.purpose}`);
      if (config.palette) parts.push(`color preference: ${config.palette}`);
      if (config.siteSize) parts.push(`site scope: ${config.siteSize}`);
      if (config.features?.length) parts.push(`features: ${config.features.join(", ")}`);
      if (parts.length > 0) {
        contextNote = `\n\nThe client has already selected: ${parts.join("; ")}. Reference these choices naturally in the conversation.`;
      }
    }

    // Prepare messages for the API
    const apiMessages: Message[] = [
      { 
        role: "system", 
        content: generateFinalBrief 
          ? briefGenerationPrompt 
          : systemPrompt + contextNote 
      },
      ...messages,
    ];

    if (generateFinalBrief) {
      // Add instruction to generate brief
      apiMessages.push({
        role: "user",
        content: "Based on our entire conversation, please generate the comprehensive design brief now.",
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: apiMessages,
        stream: false,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "API credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Check if AI is ready to generate brief
    const isReadyForBrief = content.includes("READY_FOR_BRIEF");
    
    // If generating final brief, try to parse JSON
    let brief = null;
    if (generateFinalBrief) {
      try {
        // Clean up the response - remove markdown code blocks if present
        let jsonStr = content.trim();
        if (jsonStr.startsWith("```json")) {
          jsonStr = jsonStr.slice(7);
        } else if (jsonStr.startsWith("```")) {
          jsonStr = jsonStr.slice(3);
        }
        if (jsonStr.endsWith("```")) {
          jsonStr = jsonStr.slice(0, -3);
        }
        brief = JSON.parse(jsonStr.trim());
      } catch (e) {
        console.error("Failed to parse brief JSON:", e);
        // Return the raw content if parsing fails
      }
    }

    return new Response(
      JSON.stringify({
        message: isReadyForBrief ? content.replace("READY_FOR_BRIEF", "").trim() : content,
        readyForBrief: isReadyForBrief,
        brief: brief,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Design brief generation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
