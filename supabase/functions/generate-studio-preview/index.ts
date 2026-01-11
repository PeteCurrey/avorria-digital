import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PreviewRequest {
  purpose: string;
  palette: string;
  density: string;
  energy: string;
}

const purposePrompts: Record<string, string> = {
  "lead_gen": "premium B2B website hero section, dark luxury aesthetic, minimalist conversion-focused layout, professional photography background showing modern office architecture",
  "authority": "editorial magazine website layout, sophisticated typography-first design, premium content hub, thought leadership aesthetic with elegant grid system",
  "saas": "modern SaaS product landing page, futuristic floating UI elements, tech-forward design with subtle gradients and premium glass morphism effects",
  "platform": "enterprise service platform dashboard, professional service portal interface, sophisticated dark theme with data visualization elements"
};

const paletteModifiers: Record<string, string> = {
  "dark": "dark theme with deep blacks and subtle blue undertones, premium automotive configurator aesthetic",
  "light": "clean white theme with elegant shadows, luxury fashion brand aesthetic, light and airy",
  "mono": "high contrast black and white, dramatic monochrome, editorial magazine feel",
  "gradient": "sophisticated purple to blue gradient, premium glass effects, subtle color transitions"
};

const energyModifiers: Record<string, string> = {
  "bold": "bold geometric shapes, strong contrast, dynamic composition, statement piece aesthetic",
  "calm": "serene and minimal, generous whitespace, refined typography, understated elegance"
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { purpose, palette, density, energy }: PreviewRequest = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build sophisticated prompt
    const basePrompt = purposePrompts[purpose] || purposePrompts["lead_gen"];
    const paletteModifier = paletteModifiers[palette] || paletteModifiers["dark"];
    const energyModifier = energyModifiers[energy] || energyModifiers["calm"];
    const densityModifier = density === "content_rich" 
      ? "content-rich layout with multiple sections visible"
      : "minimal design with generous negative space";

    const fullPrompt = `Ultra high resolution website concept mockup: ${basePrompt}. Style: ${paletteModifier}. Energy: ${energyModifier}. ${densityModifier}. Photorealistic, ultra-premium quality, 16:9 aspect ratio, website screenshot aesthetic, no text or logos, focus on layout and atmosphere. Ferrari/Mercedes car configurator level of polish.`;

    console.log("Generating preview with prompt:", fullPrompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: fullPrompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ 
          error: "Image generation failed",
          fallback: true 
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Generate preview error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        fallback: true
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
