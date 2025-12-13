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
    const { competitorUrl, myUrl } = await req.json();
    
    if (!competitorUrl) {
      return new Response(
        JSON.stringify({ error: 'Competitor URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Analyzing competitor: ${competitorUrl}`);

    const systemPrompt = `You are an expert competitive intelligence analyst specializing in digital marketing and business strategy.
Analyze competitor websites and provide actionable insights for differentiation.
Always respond with valid JSON matching the exact schema requested.`;

    const userPrompt = `Analyze the competitor website at ${competitorUrl}${myUrl ? ` compared to ${myUrl}` : ''}.

Provide your competitive analysis in the following JSON format:
{
  "company_name": "string (inferred from website)",
  "positioning": "string (their market positioning statement)",
  "strengths": [
    {"area": "string", "description": "string", "evidence": "string"}
  ],
  "weaknesses": [
    {"area": "string", "description": "string", "opportunity": "string"}
  ],
  "opportunities": [
    {"title": "string", "description": "string", "action": "string"}
  ],
  "marketing_tactics": [
    {"tactic": "string", "effectiveness": "high|medium|low", "replicable": boolean}
  ],
  "threat_level": "high|medium|low",
  "threat_reasoning": "string",
  "key_differentiators": ["string"],
  "target_audience": "string",
  "pricing_strategy": "string (if visible)",
  "content_strategy": "string",
  "recommendations": [
    {"priority": "high|medium|low", "action": "string", "expected_outcome": "string"}
  ]
}

Analyze:
1. Their brand positioning and messaging
2. Service/product offerings and unique selling propositions
3. Content marketing approach
4. User experience and conversion tactics
5. Technical implementation quality
6. Gaps we can exploit
7. Best practices we should adopt

Focus on actionable competitive intelligence.`;

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

    let analysis;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      analysis = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse analysis results');
    }

    console.log('Competitor analysis completed successfully');

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in competitor-analysis function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
