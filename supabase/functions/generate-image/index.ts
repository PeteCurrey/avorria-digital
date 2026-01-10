import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ImageRequest {
  prompt: string;
  contentId?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, contentId }: ImageRequest = await req.json();

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating image with prompt:", prompt);

    // Use Google's Gemini image generation model via Lovable AI
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: `Generate a professional, modern marketing image: ${prompt}. Style: clean, minimalist, high-quality, suitable for social media marketing.`,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Image generation API error:", errorText);
      throw new Error(`Image generation failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the image URL from the response
    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageData) {
      console.log("No image in response, falling back to placeholder");
      // Return a placeholder if image generation fails
      return new Response(
        JSON.stringify({ 
          imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
          message: "Using placeholder image - image generation requires additional setup"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // If we have a base64 image, we could upload it to storage
    // For now, return the data URL directly
    let imageUrl = imageData;

    // Optionally upload to Supabase storage
    if (contentId && imageData.startsWith("data:image")) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
        
        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          
          // Extract base64 data
          const base64Data = imageData.split(",")[1];
          const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
          
          const fileName = `ai-generated/${contentId}-${Date.now()}.png`;
          
          const { error: uploadError } = await supabase.storage
            .from("case-study-images")
            .upload(fileName, imageBuffer, {
              contentType: "image/png",
              upsert: true,
            });

          if (!uploadError) {
            const { data: urlData } = supabase.storage
              .from("case-study-images")
              .getPublicUrl(fileName);
            
            imageUrl = urlData.publicUrl;
          }
        }
      } catch (storageError) {
        console.error("Error uploading to storage:", storageError);
        // Continue with the base64 URL
      }
    }

    console.log("Image generated successfully");

    return new Response(
      JSON.stringify({ imageUrl }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in generate-image:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
