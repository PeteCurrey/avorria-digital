import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const WATERMARK_URL = "https://delvgmrcfaeubuixprwz.supabase.co/storage/v1/object/public/case-study-images/watermark%2Favorria-watermark-dark.png";

interface ImageRequest {
  prompt: string;
  contentId?: string;
  imageStyle?: string;
}

async function compositeWatermark(baseImageData: string): Promise<string> {
  try {
    const base64 = baseImageData.split(",")[1];
    const baseBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const baseImage = await Image.decode(baseBytes);

    const wmResponse = await fetch(WATERMARK_URL);
    if (!wmResponse.ok) throw new Error("Failed to fetch watermark");
    const wmBytes = new Uint8Array(await wmResponse.arrayBuffer());
    let watermark = await Image.decode(wmBytes);

    const targetWidth = Math.round(baseImage.width * 0.15);
    const scale = targetWidth / watermark.width;
    const targetHeight = Math.round(watermark.height * scale);
    watermark = watermark.resize(targetWidth, targetHeight);

    watermark.opacity(0.4);

    const margin = Math.round(baseImage.width * 0.03);
    const x = baseImage.width - targetWidth - margin;
    const y = baseImage.height - targetHeight - margin;

    baseImage.composite(watermark, x, y);

    const outputBytes = await baseImage.encode();
    const outputBase64 = btoa(String.fromCharCode(...outputBytes));
    return `data:image/png;base64,${outputBase64}`;
  } catch (err) {
    console.error("Watermark compositing error (non-fatal):", err);
    return baseImageData;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, contentId, imageStyle }: ImageRequest = await req.json();

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating image with prompt:", prompt, "style:", imageStyle);

    // Use the higher-quality model for better images
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content: `Generate a professional, modern marketing image: ${prompt}. Style: clean, high-quality, suitable for digital marketing. Do not include any text in the image.`,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Image generation API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`Image generation failed: ${response.status}`);
    }

    const data = await response.json();
    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageData) {
      console.log("No image in response");
      return new Response(
        JSON.stringify({ 
          error: "Image generation did not return an image. Try a different prompt.",
          imageUrl: null,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Programmatically composite the Avorria watermark
    console.log("Compositing Avorria watermark...");
    const finalImageData = await compositeWatermark(imageData);
    console.log("Watermark composited successfully");

    // Upload to storage
    let imageUrl = finalImageData;

    if (finalImageData.startsWith("data:image")) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL");
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

        if (supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);

          const base64Data = finalImageData.split(",")[1];
          const imageBuffer = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));

          const fileName = `ai-generated/${contentId || "img"}-${Date.now()}.png`;

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
            console.log("Image uploaded to storage:", imageUrl);
          } else {
            console.error("Storage upload error:", uploadError);
          }
        }
      } catch (storageError) {
        console.error("Error uploading to storage:", storageError);
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
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
