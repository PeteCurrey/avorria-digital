import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuditRequest {
  email: string;
  name: string;
  websiteUrl: string;
  companyName: string;
  leadId?: string;
}

interface AuditSection {
  title: string;
  score: number;
  findings: string[];
  recommendations: string[];
}

interface AuditResult {
  overallScore: number;
  executiveSummary: string;
  sections: {
    technical: AuditSection;
    seo: AuditSection;
    performance: AuditSection;
    content: AuditSection;
    conversion: AuditSection;
  };
  quickWins: string[];
  roadmap90Days: string[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, websiteUrl, companyName, leadId } = await req.json() as AuditRequest;

    if (!email || !websiteUrl) {
      return new Response(
        JSON.stringify({ error: "Email and website URL are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Starting audit for ${websiteUrl} requested by ${email}`);

    // Initialize Supabase client with service role for storage operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Step 1: Generate comprehensive audit using AI
    const auditResult = await generateAuditContent(websiteUrl, companyName);
    console.log(`Audit generated with overall score: ${auditResult.overallScore}`);

    // Step 2: Generate HTML report
    const htmlReport = generateHTMLReport(auditResult, companyName, websiteUrl, name);
    console.log("HTML report generated");

    // Step 3: Store HTML report in Supabase Storage
    const fileName = `audit-${Date.now()}-${companyName.toLowerCase().replace(/[^a-z0-9]/g, "-")}.html`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("audit-reports")
      .upload(fileName, htmlReport, {
        contentType: "text/html",
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(`Failed to store report: ${uploadError.message}`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("audit-reports")
      .getPublicUrl(fileName);
    
    const reportUrl = publicUrlData.publicUrl;
    console.log(`Report stored at: ${reportUrl}`);

    // Step 4: Update lead record with audit results if leadId provided
    if (leadId) {
      const { error: updateError } = await supabase
        .from("leads")
        .update({
          metadata: {
            audit_completed: true,
            audit_score: auditResult.overallScore,
            audit_url: reportUrl,
            audit_date: new Date().toISOString(),
          },
        })
        .eq("id", leadId);

      if (updateError) {
        console.warn("Failed to update lead:", updateError);
      }
    }

    // Step 5: Save audit report to database for admin panel visibility
    const { error: insertError } = await supabase
      .from("audit_reports")
      .insert({
        lead_id: leadId || null,
        email,
        name,
        company_name: companyName,
        website_url: websiteUrl,
        overall_score: auditResult.overallScore,
        report_url: reportUrl,
        report_file_name: fileName,
        sections: auditResult.sections,
        quick_wins: auditResult.quickWins,
        roadmap: auditResult.roadmap90Days,
        email_sent: false, // Will be updated after email is sent
        status: 'completed'
      });

    if (insertError) {
      console.warn("Failed to save audit record:", insertError);
    } else {
      console.log("Audit record saved to database");
    }

    // Step 6: Send email via Resend (if API key is available)
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    let emailSent = false;

    if (resendApiKey) {
      try {
        const emailHtml = generateEmailHTML(name, companyName, auditResult.overallScore, reportUrl);
        
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Avorria Audits <audits@avorria.com>",
            to: [email],
            subject: `Your Free SEO & Website Audit is Ready - ${companyName}`,
            html: emailHtml,
          }),
        });

        if (emailResponse.ok) {
          emailSent = true;
          console.log("Email sent successfully");
          
          // Update audit record with email_sent status
          await supabase
            .from("audit_reports")
            .update({ email_sent: true })
            .eq("report_url", reportUrl);
        } else {
          const emailError = await emailResponse.text();
          console.warn("Email sending failed:", emailError);
        }
      } catch (emailErr) {
        console.warn("Email error:", emailErr);
      }
    } else {
      console.log("RESEND_API_KEY not configured - skipping email");
    }

    return new Response(
      JSON.stringify({
        success: true,
        reportUrl,
        emailSent,
        overallScore: auditResult.overallScore,
        executiveSummary: auditResult.executiveSummary,
        sections: auditResult.sections,
        quickWins: auditResult.quickWins,
        roadmap90Days: auditResult.roadmap90Days,
        message: emailSent
          ? "Your audit has been generated and emailed to you!"
          : "Your audit has been generated! Download link is ready.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: unknown) {
    console.error("Audit generation error:", error);
    
    // Handle specific errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes("rate limit") || errorMessage.includes("429")) {
      return new Response(
        JSON.stringify({ error: "Service is busy. Please try again in a few minutes." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Failed to generate audit. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function generateAuditContent(websiteUrl: string, companyName: string): Promise<AuditResult> {
  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  
  if (!lovableApiKey) {
    throw new Error("LOVABLE_API_KEY not configured");
  }

  const systemPrompt = `You are an expert SEO and website auditor. Analyze the provided website URL and generate a comprehensive, professional audit report.

Your analysis should be:
- Specific and actionable
- Prioritized by impact and effort
- Written in plain English without jargon
- Honest about both strengths and weaknesses

Return your analysis as valid JSON matching this exact structure:
{
  "overallScore": <number 0-100>,
  "executiveSummary": "<2-3 paragraphs summarizing key findings>",
  "sections": {
    "technical": {
      "title": "Technical Health",
      "score": <number 0-100>,
      "findings": ["<finding 1>", "<finding 2>", ...],
      "recommendations": ["<recommendation 1>", "<recommendation 2>", ...]
    },
    "seo": {
      "title": "SEO & Visibility",
      "score": <number 0-100>,
      "findings": ["<finding 1>", ...],
      "recommendations": ["<recommendation 1>", ...]
    },
    "performance": {
      "title": "Performance & Speed",
      "score": <number 0-100>,
      "findings": ["<finding 1>", ...],
      "recommendations": ["<recommendation 1>", ...]
    },
    "content": {
      "title": "Content Quality",
      "score": <number 0-100>,
      "findings": ["<finding 1>", ...],
      "recommendations": ["<recommendation 1>", ...]
    },
    "conversion": {
      "title": "Conversion Optimization",
      "score": <number 0-100>,
      "findings": ["<finding 1>", ...],
      "recommendations": ["<recommendation 1>", ...]
    }
  },
  "quickWins": ["<quick win 1>", "<quick win 2>", ...],
  "roadmap90Days": ["<week 1-2: action>", "<week 3-4: action>", ...]
}`;

  const userPrompt = `Please analyze this website and generate a comprehensive SEO and website audit:

Website URL: ${websiteUrl}
Company Name: ${companyName}

Provide specific, actionable findings across technical SEO, on-page SEO, performance, content quality, and conversion optimization. Be thorough but practical - focus on what will actually move the needle for this business.`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${lovableApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("AI API error:", errorText);
    throw new Error(`AI analysis failed: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No content in AI response");
  }

  // Parse JSON from response (handle markdown code blocks)
  let jsonContent = content;
  const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonContent = jsonMatch[1].trim();
  }

  try {
    return JSON.parse(jsonContent) as AuditResult;
  } catch (parseError) {
    console.error("JSON parse error:", parseError);
    console.error("Content:", jsonContent.substring(0, 500));
    throw new Error("Failed to parse audit results");
  }
}

function generateHTMLReport(audit: AuditResult, companyName: string, websiteUrl: string, userName: string): string {
  const scoreColor = (score: number) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#eab308";
    if (score >= 40) return "#f97316";
    return "#ef4444";
  };

  const sectionHTML = (section: AuditSection) => `
    <div style="background: #f8fafc; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h3 style="margin: 0; color: #1e293b; font-size: 20px;">${section.title}</h3>
        <div style="background: ${scoreColor(section.score)}; color: white; padding: 8px 16px; border-radius: 20px; font-weight: bold;">
          ${section.score}/100
        </div>
      </div>
      
      <div style="margin-bottom: 16px;">
        <h4 style="color: #64748b; font-size: 14px; text-transform: uppercase; margin-bottom: 8px;">Findings</h4>
        <ul style="margin: 0; padding-left: 20px; color: #475569;">
          ${section.findings.map(f => `<li style="margin-bottom: 8px;">${f}</li>`).join("")}
        </ul>
      </div>
      
      <div>
        <h4 style="color: #64748b; font-size: 14px; text-transform: uppercase; margin-bottom: 8px;">Recommendations</h4>
        <ul style="margin: 0; padding-left: 20px; color: #475569;">
          ${section.recommendations.map(r => `<li style="margin-bottom: 8px;">${r}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SEO & Website Audit - ${companyName}</title>
  <style>
    * { box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
      margin: 0; 
      padding: 0; 
      background: #f1f5f9;
      color: #1e293b;
      line-height: 1.6;
    }
    @media print {
      body { background: white; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: white; padding: 48px 40px; border-radius: 12px; margin-bottom: 32px; text-align: center;">
      <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; margin-bottom: 8px;">Avorria</div>
      <h1 style="margin: 0 0 16px 0; font-size: 32px; font-weight: 300;">SEO & Website Audit</h1>
      <p style="margin: 0; opacity: 0.9; font-size: 18px;">${companyName}</p>
      <p style="margin: 8px 0 0 0; opacity: 0.7; font-size: 14px;">${websiteUrl}</p>
    </div>

    <!-- Overall Score -->
    <div style="background: white; border-radius: 12px; padding: 40px; margin-bottom: 32px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 16px;">Overall Score</div>
      <div style="font-size: 72px; font-weight: 700; color: ${scoreColor(audit.overallScore)}; line-height: 1;">${audit.overallScore}</div>
      <div style="font-size: 18px; color: #64748b;">/100</div>
    </div>

    <!-- Executive Summary -->
    <div style="background: white; border-radius: 12px; padding: 40px; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 24px; font-weight: 300;">Executive Summary</h2>
      <p style="color: #475569; white-space: pre-line;">${audit.executiveSummary}</p>
    </div>

    <!-- Detailed Sections -->
    <div style="background: white; border-radius: 12px; padding: 40px; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 24px; font-weight: 300;">Detailed Analysis</h2>
      ${sectionHTML(audit.sections.technical)}
      ${sectionHTML(audit.sections.seo)}
      ${sectionHTML(audit.sections.performance)}
      ${sectionHTML(audit.sections.content)}
      ${sectionHTML(audit.sections.conversion)}
    </div>

    <!-- Quick Wins -->
    <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; border-radius: 12px; padding: 40px; margin-bottom: 32px;">
      <h2 style="margin: 0 0 24px 0; font-size: 24px; font-weight: 300;">⚡ Quick Wins</h2>
      <p style="opacity: 0.9; margin-bottom: 16px;">These are high-impact, low-effort improvements you can make right away:</p>
      <ul style="margin: 0; padding-left: 24px;">
        ${audit.quickWins.map(qw => `<li style="margin-bottom: 12px;">${qw}</li>`).join("")}
      </ul>
    </div>

    <!-- 90-Day Roadmap -->
    <div style="background: white; border-radius: 12px; padding: 40px; margin-bottom: 32px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 24px; font-weight: 300;">📅 90-Day Roadmap</h2>
      <p style="color: #64748b; margin-bottom: 16px;">Here's what we'd prioritize over the next 90 days:</p>
      <ol style="margin: 0; padding-left: 24px; color: #475569;">
        ${audit.roadmap90Days.map(item => `<li style="margin-bottom: 12px;">${item}</li>`).join("")}
      </ol>
    </div>

    <!-- CTA -->
    <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: white; border-radius: 12px; padding: 48px 40px; text-align: center;">
      <h2 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 300;">Ready to implement these recommendations?</h2>
      <p style="margin: 0 0 24px 0; opacity: 0.9; font-size: 18px;">Let's discuss how we can help you improve your website's performance.</p>
      <a href="https://avorria.com/contact" style="display: inline-block; background: #ec4899; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 16px;">Book a Strategy Call</a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 32px 0; color: #94a3b8; font-size: 14px;">
      <p style="margin: 0;">Generated by Avorria on ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
      <p style="margin: 8px 0 0 0;">Questions? Email us at hello@avorria.com</p>
    </div>
  </div>
</body>
</html>`;
}

function generateEmailHTML(userName: string, companyName: string, score: number, reportUrl: string): string {
  const firstName = userName.split(" ")[0] || "there";
  
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f1f5f9;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: white; padding: 32px; text-align: center;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; margin-bottom: 8px;">Avorria</div>
        <h1 style="margin: 0; font-size: 24px; font-weight: 300;">Your Audit is Ready</h1>
      </div>
      
      <!-- Body -->
      <div style="padding: 32px;">
        <p style="color: #1e293b; font-size: 16px; margin: 0 0 24px 0;">Hey ${firstName},</p>
        
        <p style="color: #475569; font-size: 16px; margin: 0 0 24px 0;">
          Thanks for requesting a free SEO & Website Audit for <strong>${companyName}</strong>. We've completed our analysis and your report is ready.
        </p>
        
        <!-- Score Box -->
        <div style="background: #f8fafc; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 8px;">Your Overall Score</div>
          <div style="font-size: 48px; font-weight: 700; color: ${score >= 70 ? "#22c55e" : score >= 50 ? "#eab308" : "#ef4444"};">${score}</div>
          <div style="font-size: 14px; color: #64748b;">/100</div>
        </div>
        
        <p style="color: #475569; font-size: 16px; margin: 0 0 24px 0;">
          Your audit includes detailed findings across technical SEO, content quality, performance, and conversion optimization – plus a prioritized 90-day roadmap.
        </p>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${reportUrl}" style="display: inline-block; background: #ec4899; color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 500; font-size: 16px;">View Your Full Report</a>
        </div>
        
        <p style="color: #64748b; font-size: 14px; margin: 0 0 16px 0;">
          Got questions about your audit? Just reply to this email or <a href="https://avorria.com/contact" style="color: #ec4899;">book a call</a> to walk through it together.
        </p>
        
        <p style="color: #475569; font-size: 16px; margin: 24px 0 0 0;">
          Best,<br>
          The Avorria Team
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          Avorria • SEO & Digital Marketing Agency<br>
          <a href="https://avorria.com" style="color: #64748b;">avorria.com</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}