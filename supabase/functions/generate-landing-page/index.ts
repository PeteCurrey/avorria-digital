import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GenerateRequest {
  service: string;
  location?: string;
  industry?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { service, location, industry }: GenerateRequest = await req.json();

    const contextParts: string[] = [];
    if (location) contextParts.push(`in ${location}`);
    if (industry) contextParts.push(`for the ${industry} industry`);
    const contextString = contextParts.length > 0 ? ` ${contextParts.join(" ")}` : "";

    const prompt = `Generate comprehensive, engaging, and trustworthy landing page content for a ${service} service${contextString}.

The content should be professional, persuasive, and optimized for SEO while building trust with potential clients.

Return a JSON object with EXACTLY this structure (no markdown, no code blocks, just pure JSON):
{
  "heroHeadline": "A compelling, benefit-focused headline (under 80 chars)",
  "heroSubheadline": "A supporting statement that expands on the value proposition (2-3 sentences)",
  "problemBullets": ["5 specific pain points the target audience faces"],
  "solutionBullets": ["5 clear solutions/benefits your service provides"],
  "keyMetrics": [
    {"value": "+XX%", "label": "Metric Name", "description": "Brief context for this result"}
  ],
  "processSteps": [
    {"title": "Step Name", "description": "What happens in this step"}
  ],
  "faqList": [
    {"question": "Common question?", "answer": "Helpful, trust-building answer"}
  ],
  "testimonialQuote": "A realistic testimonial quote",
  "testimonialAuthor": "First Last",
  "testimonialRole": "Job Title",
  "testimonialCompany": "Company Name",
  "targetKeyword": "primary seo keyword",
  "metaTitle": "Page Title | Brand (under 60 chars)",
  "metaDescription": "Compelling meta description under 160 chars that includes the keyword"
}

Guidelines:
- Make headlines specific and outcome-focused, not generic
- Problem bullets should resonate emotionally with the target audience
- Solution bullets should directly address the problems
- Metrics should be realistic and impressive (e.g., +47% conversion rate, 2.3x ROI)
- Process steps should show a clear, professional methodology (4-5 steps)
- FAQs should address common objections and build trust (4-5 questions)
- Testimonial should sound authentic and mention specific results
${location ? `- Include local references to ${location} where natural` : ""}
${industry ? `- Use ${industry}-specific language and concerns` : ""}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are an expert marketing copywriter specializing in B2B services. Generate compelling, trustworthy landing page content that converts. Always return valid JSON only, no markdown formatting.",
          },
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

    // Parse the JSON response
    let parsedContent;
    try {
      // Try to extract JSON from potential markdown code blocks
      let jsonText = rawContent;
      const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1].trim();
      }
      
      // Clean up any remaining non-JSON characters
      jsonText = jsonText.trim();
      if (!jsonText.startsWith("{")) {
        const objectStart = jsonText.indexOf("{");
        const objectEnd = jsonText.lastIndexOf("}");
        if (objectStart !== -1 && objectEnd !== -1) {
          jsonText = jsonText.substring(objectStart, objectEnd + 1);
        }
      }

      parsedContent = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw content:", rawContent);
      
      // Return fallback content
      parsedContent = {
        heroHeadline: `${service} Services${location ? ` in ${location}` : ""}${industry ? ` for ${industry}` : ""}`,
        heroSubheadline: `Professional ${service.toLowerCase()} services designed to drive measurable results for your business.`,
        problemBullets: [
          "Struggling to see ROI from your current marketing efforts",
          "Competitors are outranking you in search results",
          "Your website isn't converting visitors into leads",
          "Lack of clear strategy and direction",
          "Difficulty measuring what's working",
        ],
        solutionBullets: [
          "Data-driven strategy focused on your specific goals",
          "Transparent reporting and clear attribution",
          "Proven methodology refined across multiple industries",
          "Dedicated team focused on your success",
          "Continuous optimization based on real results",
        ],
        keyMetrics: [
          { value: "+67%", label: "Lead Growth", description: "Average increase in qualified leads" },
          { value: "2.4x", label: "ROI", description: "Typical return on marketing investment" },
          { value: "-35%", label: "Cost Reduction", description: "Lower cost per acquisition" },
        ],
        processSteps: [
          { title: "Discovery", description: "We analyze your current situation, goals, and competitive landscape" },
          { title: "Strategy", description: "We develop a custom plan tailored to your business objectives" },
          { title: "Implementation", description: "Our team executes the strategy with precision and care" },
          { title: "Optimization", description: "We continuously refine based on data and results" },
        ],
        faqList: [
          { question: "How quickly will I see results?", answer: "Most clients see initial improvements within 2-3 months, with compounding gains over time." },
          { question: "What makes you different from other agencies?", answer: "We focus on business outcomes, not vanity metrics. Every action is tied to your revenue goals." },
          { question: "Do you work with businesses my size?", answer: "We work with growth-focused businesses from startups to established enterprises." },
          { question: "How do you measure success?", answer: "We establish clear KPIs upfront and provide transparent reporting on metrics that matter to your business." },
        ],
        testimonialQuote: "Working with this team transformed our digital presence. We went from struggling to find leads to having a consistent pipeline of qualified prospects.",
        testimonialAuthor: "Sarah Johnson",
        testimonialRole: "Marketing Director",
        testimonialCompany: "Growth Corp",
        targetKeyword: `${service.toLowerCase()}${location ? ` ${location.toLowerCase()}` : ""}`,
        metaTitle: `${service}${location ? ` in ${location}` : ""} | Professional Services`,
        metaDescription: `Professional ${service.toLowerCase()} services${location ? ` in ${location}` : ""}. Drive measurable results with our proven methodology and dedicated team.`,
      };
    }

    return new Response(
      JSON.stringify(parsedContent),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in generate-landing-page:", error);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
