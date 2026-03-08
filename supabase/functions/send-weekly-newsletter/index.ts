import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !supabaseKey) throw new Error("Supabase credentials missing");
    if (!resendApiKey) throw new Error("RESEND_API_KEY not configured");

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 1. Get active subscribers
    const { data: subscribers, error: subError } = await supabase
      .from("newsletter_subscribers")
      .select("email, name")
      .eq("status", "active");

    if (subError) throw subError;
    if (!subscribers || subscribers.length === 0) {
      return new Response(
        JSON.stringify({ message: "No active subscribers" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Get published content from last 7 days
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const { data: recentContent } = await supabase
      .from("ai_generated_content")
      .select("title, content, platform, published_at")
      .eq("status", "published")
      .gte("published_at", weekAgo.toISOString())
      .order("published_at", { ascending: false })
      .limit(5);

    // 3. Get recently published resources
    const { data: recentResources } = await supabase
      .from("resources")
      .select("title, slug, summary, category")
      .eq("is_published", true)
      .gte("published_date", weekAgo.toISOString().split("T")[0])
      .order("published_date", { ascending: false })
      .limit(3);

    // 4. Generate newsletter HTML with AI
    let newsletterHtml = "";

    if (lovableApiKey) {
      const contentSummary = (recentContent || []).map(c => `- ${c.title || "Untitled"}: ${c.content?.slice(0, 100)}...`).join("\n");
      const resourcesSummary = (recentResources || []).map(r => `- ${r.title} (${r.category}): ${r.summary?.slice(0, 80)}...`).join("\n");

      const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${lovableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: "You are a newsletter copywriter for Avorria, a premium digital marketing agency. Write engaging, concise weekly digest newsletters in HTML format. Use clean, professional email HTML with inline styles. Include a branded header, content highlights, resource links, and a CTA. Keep it under 800 words. Brand colour: #e91e8c (pink/magenta accent).",
            },
            {
              role: "user",
              content: `Write this week's newsletter digest.\n\nPublished content this week:\n${contentSummary || "No new content published this week."}\n\nNew resources/articles:\n${resourcesSummary || "No new resources this week."}\n\nInclude a warm intro, highlight the best content, link to resources, and end with a CTA to visit avorria.com.`,
            },
          ],
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        newsletterHtml = aiData.choices?.[0]?.message?.content || "";
        // Strip markdown code fences if present
        newsletterHtml = newsletterHtml.replace(/```html\n?/g, "").replace(/```\n?/g, "").trim();
      }
    }

    // Fallback if AI generation fails
    if (!newsletterHtml) {
      newsletterHtml = buildFallbackHtml(recentContent || [], recentResources || []);
    }

    // 5. Send via Resend
    const { Resend } = await import("https://esm.sh/resend@2.0.0");
    const resend = new Resend(resendApiKey);

    const results = await Promise.allSettled(
      subscribers.map(async (sub) => {
        try {
          await resend.emails.send({
            from: "Avorria <newsletter@resend.dev>",
            to: [sub.email],
            subject: `Your Weekly Marketing Digest — ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`,
            html: newsletterHtml,
          });
          return { email: sub.email, success: true };
        } catch (e: any) {
          console.error(`Failed to send to ${sub.email}:`, e);
          return { email: sub.email, success: false };
        }
      })
    );

    const sent = results.filter(r => r.status === "fulfilled" && (r.value as any).success).length;

    // 6. Save newsletter record
    await supabase.from("newsletters").insert({
      subject: `Weekly Digest — ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
      content_html: newsletterHtml,
      status: "sent",
      sent_at: new Date().toISOString(),
      recipient_count: sent,
    });

    // 7. Notify staff
    const { data: staffUsers } = await supabase
      .from("user_roles")
      .select("user_id")
      .in("role", ["admin", "strategist"]);

    if (staffUsers) {
      await Promise.all(
        staffUsers.map((u) =>
          supabase.from("notifications").insert({
            user_id: u.user_id,
            title: "Weekly newsletter sent",
            message: `Newsletter sent to ${sent} subscribers`,
            type: "newsletter",
            link: "/admin?tab=newsletter",
          })
        )
      );
    }

    return new Response(
      JSON.stringify({ success: true, sent, total: subscribers.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-weekly-newsletter:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function buildFallbackHtml(content: any[], resources: any[]): string {
  const contentItems = content.map(c =>
    `<li style="margin-bottom:8px"><strong>${c.title || "Update"}</strong>: ${c.content?.slice(0, 120)}...</li>`
  ).join("");

  const resourceItems = resources.map(r =>
    `<li style="margin-bottom:8px"><a href="https://avorria.com/resources/${r.slug}" style="color:#e91e8c;text-decoration:none"><strong>${r.title}</strong></a> — ${r.summary?.slice(0, 80)}...</li>`
  ).join("");

  return `
    <!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
    <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;margin:0;padding:0;background:#f8fafc">
      <div style="max-width:600px;margin:0 auto;background:white">
        <div style="background:linear-gradient(135deg,#0a0a0a,#1a1a2e);padding:40px 20px;text-align:center;color:white">
          <h1 style="margin:0;font-size:24px">Your Weekly Marketing Digest</h1>
          <p style="margin:10px 0 0;opacity:0.8;font-size:14px">From Avorria — ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <div style="padding:30px 20px">
          ${contentItems ? `<h2 style="color:#1e293b;font-size:18px">This Week's Highlights</h2><ul style="color:#64748b;line-height:1.6">${contentItems}</ul>` : ""}
          ${resourceItems ? `<h2 style="color:#1e293b;font-size:18px;margin-top:24px">Latest Resources</h2><ul style="color:#64748b;line-height:1.6">${resourceItems}</ul>` : ""}
          ${!contentItems && !resourceItems ? `<p style="color:#64748b;text-align:center">Stay tuned — we're preparing exciting content for next week!</p>` : ""}
          <div style="text-align:center;padding:30px 0">
            <a href="https://avorria.com" style="display:inline-block;background:#e91e8c;color:white;padding:12px 24px;text-decoration:none;border-radius:6px;font-weight:500">Visit Avorria</a>
          </div>
        </div>
        <div style="background:#1e293b;color:#94a3b8;padding:20px;text-align:center;font-size:12px">
          <p>© ${new Date().getFullYear()} Avorria. All rights reserved.</p>
        </div>
      </div>
    </body></html>
  `;
}
