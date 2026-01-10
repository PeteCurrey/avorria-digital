import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContentRequest {
  prompt: string;
  contentType: string;
  platform: string;
  tone: string;
  includeHashtags?: boolean;
  count?: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, contentType, platform, tone, includeHashtags = true, count = 1 }: ContentRequest = await req.json();

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = buildSystemPrompt(contentType, platform, tone, includeHashtags, count);

    console.log("Generating content with prompt:", prompt);
    console.log("System prompt:", systemPrompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content;

    if (!generatedText) {
      throw new Error("No content generated");
    }

    // Parse the generated content
    const content = parseGeneratedContent(generatedText, count);

    console.log("Generated content:", content);

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in generate-content:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function buildSystemPrompt(
  contentType: string,
  platform: string,
  tone: string,
  includeHashtags: boolean,
  count: number
): string {
  let prompt = `You are an expert content creator specializing in ${contentType} content for ${platform}. 
Your writing style is ${tone}.

Generate ${count} unique piece(s) of content based on the user's topic.

Output format: Return a JSON array with the following structure for each piece:
{
  "title": "A catchy title/headline (if applicable)",
  "content": "The main content text",
  "subtitle": "A subtitle or hook (if applicable)",
  "hashtags": ["relevant", "hashtags"] // only if hashtags are requested
}

Platform-specific guidelines:
`;

  switch (platform) {
    case "twitter":
      prompt += `- Keep each post under 280 characters
- Be punchy and attention-grabbing
- Use emojis sparingly but effectively
- Encourage engagement (questions, calls to action)`;
      break;
    case "linkedin":
      prompt += `- Professional but personable tone
- Optimal length: 1300-2000 characters for best engagement
- Start with a strong hook (first 2 lines are crucial)
- Include line breaks for readability
- End with a question or call to action
- Share insights, lessons learned, or thought leadership`;
      break;
    case "instagram":
      prompt += `- Visually descriptive language
- Engaging and relatable tone
- Use emojis appropriately
- Include a call to action
- Maximum 2200 characters, but 125-150 is ideal for above-the-fold`;
      break;
    case "facebook":
      prompt += `- Conversational and community-focused
- Can be longer form
- Encourage discussion
- Include a clear call to action`;
      break;
    case "email":
      prompt += `- Clear, scannable structure
- Compelling subject line as title
- Preview text as subtitle
- Personable but professional
- Clear call to action`;
      break;
    case "blog":
      prompt += `- SEO-optimized with natural keyword usage
- Well-structured with clear sections
- Informative and valuable
- Include meta description as subtitle
- 1500-2000 words is optimal`;
      break;
    default:
      prompt += `- Create engaging, valuable content
- Match the tone to the audience
- Include a clear message and purpose`;
  }

  if (includeHashtags) {
    prompt += `\n\nInclude 3-5 relevant hashtags that would help with discoverability.`;
  } else {
    prompt += `\n\nDo not include hashtags.`;
  }

  prompt += `\n\nIMPORTANT: Return ONLY valid JSON. Do not include any markdown formatting or code blocks.`;

  return prompt;
}

function parseGeneratedContent(text: string, expectedCount: number): any[] {
  try {
    // Try to extract JSON from the response
    let jsonText = text;
    
    // Remove markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1].trim();
    }
    
    // Try to find JSON array
    const arrayMatch = jsonText.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      jsonText = arrayMatch[0];
    }

    const parsed = JSON.parse(jsonText);
    
    // Ensure it's an array
    if (Array.isArray(parsed)) {
      return parsed;
    }
    
    // If it's a single object, wrap it
    return [parsed];
  } catch (e) {
    console.error("Error parsing generated content:", e);
    // Return a fallback structure
    return [{
      title: "Generated Content",
      content: text,
      hashtags: [],
    }];
  }
}
