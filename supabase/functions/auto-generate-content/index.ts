import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ContentRecipe {
  id: string;
  name: string;
  description: string | null;
  content_type: string;
  platform: string | null;
  topics: string[];
  tone: string;
  frequency: string;
  posts_per_run: number;
  is_active: boolean;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { recipeId, runAll } = await req.json().catch(() => ({}));

    let recipes: ContentRecipe[] = [];

    if (recipeId) {
      // Run specific recipe
      const { data, error } = await supabase
        .from("content_recipes")
        .select("*")
        .eq("id", recipeId)
        .single();

      if (error) throw error;
      recipes = [data];
    } else if (runAll) {
      // Run all active recipes
      const { data, error } = await supabase
        .from("content_recipes")
        .select("*")
        .eq("is_active", true);

      if (error) throw error;
      recipes = data || [];
    } else {
      return new Response(
        JSON.stringify({ error: "Must provide recipeId or runAll flag" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Processing ${recipes.length} recipe(s)`);

    const results = [];

    for (const recipe of recipes) {
      console.log(`Generating content for recipe: ${recipe.name}`);

      try {
        const generatedContent = await generateContentForRecipe(recipe);
        
        // Save all generated content to database
        for (const content of generatedContent) {
          const { error: insertError } = await supabase
            .from("ai_generated_content")
            .insert({
              content_type: recipe.content_type,
              platform: recipe.platform,
              title: content.title || null,
              content: content.content,
              hashtags: content.hashtags || [],
              tone: recipe.tone,
              status: "review", // Auto-generated content goes to review queue
              auto_generated: true,
              recipe_id: recipe.id,
              ai_prompt: buildPrompt(recipe),
            });

          if (insertError) {
            console.error("Failed to save content:", insertError);
          }
        }

        // Update recipe last_run_at
        await supabase
          .from("content_recipes")
          .update({ 
            last_run_at: new Date().toISOString(),
            next_run_at: calculateNextRun(recipe.frequency),
          })
          .eq("id", recipe.id);

        results.push({
          recipeId: recipe.id,
          recipeName: recipe.name,
          generated: generatedContent.length,
          success: true,
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error(`Error processing recipe ${recipe.name}:`, error);
        results.push({
          recipeId: recipe.id,
          recipeName: recipe.name,
          generated: 0,
          success: false,
          error: errorMessage,
        });
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        results,
        totalGenerated: results.reduce((sum, r) => sum + r.generated, 0),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in auto-generate-content:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function buildPrompt(recipe: ContentRecipe): string {
  const topicsText = Array.isArray(recipe.topics) && recipe.topics.length > 0
    ? recipe.topics.join(", ")
    : "digital marketing, SEO, web design";

  let prompt = `Generate ${recipe.posts_per_run} ${recipe.content_type} posts`;
  
  if (recipe.platform) {
    prompt += ` for ${recipe.platform}`;
  }
  
  prompt += ` about: ${topicsText}. Use a ${recipe.tone} tone.`;
  
  if (recipe.description) {
    prompt += ` Additional context: ${recipe.description}`;
  }

  return prompt;
}

async function generateContentForRecipe(recipe: ContentRecipe): Promise<any[]> {
  const prompt = buildPrompt(recipe);
  
  const systemPrompt = buildSystemPrompt(recipe);

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content || "";

  return parseGeneratedContent(rawContent, recipe.posts_per_run);
}

function buildSystemPrompt(recipe: ContentRecipe): string {
  let systemPrompt = `You are a professional content creator for ${recipe.platform || "social media"}. 
Generate exactly ${recipe.posts_per_run} unique, engaging ${recipe.content_type} posts.

IMPORTANT: Return ONLY a valid JSON array with no additional text or markdown formatting.
Each item in the array must have this structure:
{
  "title": "optional title for the post",
  "content": "the main post content",
  "hashtags": ["relevant", "hashtags"]
}

Guidelines for ${recipe.platform || "general"} content:`;

  switch (recipe.platform) {
    case "twitter":
      systemPrompt += `
- Keep each post under 280 characters
- Make them punchy and engaging
- Use 2-3 relevant hashtags
- Include a hook in the first line`;
      break;
    case "linkedin":
      systemPrompt += `
- Professional but approachable tone
- Include actionable insights
- Can be longer (up to 3000 chars)
- Use 3-5 hashtags
- Start with an attention-grabbing hook`;
      break;
    case "instagram":
      systemPrompt += `
- Engaging and visual-friendly captions
- Use emoji strategically
- Include 5-10 relevant hashtags
- Include a call-to-action`;
      break;
    case "facebook":
      systemPrompt += `
- Conversational and community-focused
- Encourage engagement with questions
- Can include longer form content
- Use 2-3 hashtags`;
      break;
    case "blog":
      systemPrompt += `
- Create blog post outlines with:
  - Compelling headline (title)
  - Introduction hook
  - 3-5 main points to cover
  - Conclusion with CTA`;
      break;
    case "email":
      systemPrompt += `
- Create email content with:
  - Subject line (as title)
  - Preview text
  - Main body content
  - Clear call-to-action`;
      break;
    default:
      systemPrompt += `
- Create engaging, platform-appropriate content
- Include relevant hashtags
- Make it shareable and valuable`;
  }

  systemPrompt += `

Tone: ${recipe.tone}
Remember: Return ONLY valid JSON array, no markdown code blocks or additional text.`;

  return systemPrompt;
}

function parseGeneratedContent(text: string, expectedCount: number): any[] {
  try {
    // Try to extract JSON from potential markdown code blocks
    let jsonText = text;
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1].trim();
    }

    // Clean up any remaining non-JSON characters
    jsonText = jsonText.trim();
    if (!jsonText.startsWith("[")) {
      const arrayStart = jsonText.indexOf("[");
      const arrayEnd = jsonText.lastIndexOf("]");
      if (arrayStart !== -1 && arrayEnd !== -1) {
        jsonText = jsonText.substring(arrayStart, arrayEnd + 1);
      }
    }

    const parsed = JSON.parse(jsonText);
    
    if (Array.isArray(parsed)) {
      return parsed.slice(0, expectedCount);
    }
    
    // If single object, wrap in array
    return [parsed];
  } catch (error) {
    console.error("Failed to parse generated content:", error);
    console.log("Raw text:", text);
    
    // Fallback: try to create content from raw text
    return [{
      title: "Generated Content",
      content: text.substring(0, 500),
      hashtags: [],
    }];
  }
}

function calculateNextRun(frequency: string): string {
  const now = new Date();
  
  switch (frequency) {
    case "hourly":
      now.setHours(now.getHours() + 1);
      break;
    case "daily":
      now.setDate(now.getDate() + 1);
      break;
    case "weekly":
      now.setDate(now.getDate() + 7);
      break;
    case "monthly":
      now.setMonth(now.getMonth() + 1);
      break;
    default:
      now.setDate(now.getDate() + 1);
  }
  
  return now.toISOString();
}
