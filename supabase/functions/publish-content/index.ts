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
    const { contentId, platforms } = await req.json();
    if (!contentId) throw new Error("contentId is required");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get content
    const { data: content, error: contentError } = await supabase
      .from("ai_generated_content")
      .select("*")
      .eq("id", contentId)
      .single();

    if (contentError || !content) throw new Error("Content not found");

    // Get social integrations
    const { data: integrations } = await supabase
      .from("seo_integrations")
      .select("*")
      .eq("is_active", true)
      .in("integration_type", platforms || [content.platform]);

    const results: { platform: string; success: boolean; error?: string }[] = [];

    for (const integration of integrations || []) {
      const config = integration.config as Record<string, string>;
      const platform = integration.integration_type;

      try {
        if (platform === "twitter") {
          // Twitter API v2 post
          const { apiKey, apiSecret, accessToken, accessTokenSecret } = config;
          if (!accessToken) throw new Error("Twitter access token missing");

          // Use OAuth 1.0a for Twitter v2
          const tweetText = content.content.slice(0, 280);
          const response = await fetch("https://api.twitter.com/2/tweets", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: tweetText }),
          });

          if (!response.ok) {
            const err = await response.text();
            throw new Error(`Twitter API error: ${err}`);
          }
          results.push({ platform: "twitter", success: true });

        } else if (platform === "linkedin") {
          const { accessToken, organizationId } = config;
          if (!accessToken) throw new Error("LinkedIn access token missing");

          const authorUrn = organizationId
            ? `urn:li:organization:${organizationId}`
            : "urn:li:person:me";

          const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              "X-Restli-Protocol-Version": "2.0.0",
            },
            body: JSON.stringify({
              author: authorUrn,
              lifecycleState: "PUBLISHED",
              specificContent: {
                "com.linkedin.ugc.ShareContent": {
                  shareCommentary: { text: content.content },
                  shareMediaCategory: "NONE",
                },
              },
              visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" },
            }),
          });

          if (!response.ok) {
            const err = await response.text();
            throw new Error(`LinkedIn API error: ${err}`);
          }
          results.push({ platform: "linkedin", success: true });

        } else if (platform === "instagram") {
          const { accessToken, accountId } = config;
          if (!accessToken || !accountId) throw new Error("Instagram credentials missing");

          // Instagram Graph API requires a media URL for publishing
          const mediaUrl = content.media_urls?.[0];
          if (!mediaUrl) {
            results.push({ platform: "instagram", success: false, error: "Instagram requires an image. Generate one first." });
            continue;
          }

          // Step 1: Create media container
          const createResponse = await fetch(
            `https://graph.facebook.com/v18.0/${accountId}/media`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                image_url: mediaUrl,
                caption: content.content,
                access_token: accessToken,
              }),
            }
          );

          if (!createResponse.ok) {
            const err = await createResponse.text();
            throw new Error(`Instagram container error: ${err}`);
          }

          const { id: containerId } = await createResponse.json();

          // Step 2: Publish
          const publishResponse = await fetch(
            `https://graph.facebook.com/v18.0/${accountId}/media_publish`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                creation_id: containerId,
                access_token: accessToken,
              }),
            }
          );

          if (!publishResponse.ok) {
            const err = await publishResponse.text();
            throw new Error(`Instagram publish error: ${err}`);
          }
          results.push({ platform: "instagram", success: true });
        }
      } catch (e: any) {
        console.error(`Failed to publish to ${platform}:`, e);
        results.push({ platform, success: false, error: e.message });
      }
    }

    // Mark content as published
    const successCount = results.filter(r => r.success).length;
    if (successCount > 0) {
      await supabase
        .from("ai_generated_content")
        .update({
          status: "published",
          published_at: new Date().toISOString(),
          metadata: { published_to: results },
        })
        .eq("id", contentId);
    }

    // Notify staff
    const { data: staffUsers } = await supabase
      .from("user_roles")
      .select("user_id")
      .in("role", ["admin", "strategist"]);

    if (staffUsers && successCount > 0) {
      const platformNames = results.filter(r => r.success).map(r => r.platform).join(", ");
      await Promise.all(
        staffUsers.map((u) =>
          supabase.from("notifications").insert({
            user_id: u.user_id,
            title: "Content published to social",
            message: `"${content.title || "Untitled"}" published to ${platformNames}`,
            type: "content",
            link: "/admin?tab=content-studio",
          })
        )
      );
    }

    return new Response(
      JSON.stringify({ success: true, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in publish-content:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
