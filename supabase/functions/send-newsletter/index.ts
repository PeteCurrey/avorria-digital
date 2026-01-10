import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  subject: string;
  previewText?: string;
  html: string;
  subscribers: string[];
  newsletterId?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured. Please add it to your backend secrets.");
    }

    // Dynamic import of Resend
    const { Resend } = await import("https://esm.sh/resend@2.0.0");

    const resend = new Resend(resendApiKey);
    const { subject, previewText, html, subscribers, newsletterId }: NewsletterRequest = await req.json();

    if (!subscribers || subscribers.length === 0) {
      throw new Error("No subscribers provided");
    }

    console.log(`Sending newsletter to ${subscribers.length} subscribers`);

    // Send to each subscriber
    const results = await Promise.allSettled(
      subscribers.map(async (email) => {
        try {
          const emailResponse = await resend.emails.send({
            from: "Avorria <newsletter@resend.dev>", // Replace with your verified domain
            to: [email],
            subject: subject,
            html: html,
            headers: previewText ? { "X-Preview-Text": previewText } : undefined,
          });
          return { email, success: true, id: emailResponse.id };
        } catch (error: any) {
          console.error(`Failed to send to ${email}:`, error);
          return { email, success: false, error: error.message };
        }
      })
    );

    const successful = results.filter(
      (r) => r.status === "fulfilled" && r.value.success
    ).length;
    const failed = results.length - successful;

    console.log(`Newsletter sent: ${successful} successful, ${failed} failed`);

    // Update newsletter record if ID provided
    if (newsletterId) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        await supabase
          .from("newsletters")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
            recipient_count: successful,
          })
          .eq("id", newsletterId);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        sent: successful,
        failed: failed,
        total: subscribers.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in send-newsletter:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
