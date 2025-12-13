import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, websiteName } = await req.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Analyzing website: ${url}`);

    const systemPrompt = `You are an expert SEO and website analyst. Analyze websites and provide detailed, actionable insights.
Always respond with valid JSON matching the exact schema requested.
Be specific with recommendations - include actual implementation steps.
Score websites objectively based on industry standards.`;

    const userPrompt = `Analyze the website at ${url} (${websiteName || 'Website'}) and provide a comprehensive SEO and performance audit.

Provide your analysis in the following JSON format:
{
  "overall_score": <number 0-100>,
  "strengths": [
    {"title": "string", "description": "string", "impact": "high|medium|low"}
  ],
  "seo_opportunities": [
    {"title": "string", "description": "string", "priority": "high|medium|low", "effort": "easy|medium|hard"}
  ],
  "technical_issues": [
    {"title": "string", "description": "string", "severity": "critical|warning|info"}
  ],
  "quick_wins": [
    {"title": "string", "description": "string", "estimated_impact": "string"}
  ],
  "medium_term": [
    {"title": "string", "description": "string", "timeline": "string"}
  ],
  "long_term": [
    {"title": "string", "description": "string", "expected_outcome": "string"}
  ],
  "seo_keywords": ["string"],
  "content_gaps": ["string"],
  "competitor_insights": "string"
}

Analyze:
1. Current SEO strengths and what's working well
2. Technical SEO issues (meta tags, structure, speed indicators)
3. Content quality and optimization opportunities
4. User experience factors
5. Mobile optimization
6. Actionable recommendations categorized by timeframe

Be thorough but practical. Focus on high-impact improvements.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Usage limit reached. Please add credits.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content in AI response');
    }

    // Parse the JSON from the response
    let analysis;
    try {
      // Try to extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      analysis = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse analysis results');
    }

    console.log('Analysis completed successfully');

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in website-audit function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
