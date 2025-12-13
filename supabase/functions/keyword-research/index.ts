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
    const { keywords, industry, targetAudience } = await req.json();
    
    if (!keywords || keywords.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Keywords are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log(`Researching keywords: ${keywords.join(', ')}`);

    const systemPrompt = `You are an expert SEO strategist and market researcher.
Provide comprehensive keyword research and market intelligence.
Always respond with valid JSON matching the exact schema requested.
Include realistic estimates for search volumes and difficulty based on your knowledge.`;

    const userPrompt = `Conduct comprehensive keyword research and market intelligence for the following keywords: ${keywords.join(', ')}
${industry ? `Industry: ${industry}` : ''}
${targetAudience ? `Target Audience: ${targetAudience}` : ''}

Provide your analysis in the following JSON format:
{
  "market_overview": {
    "size": "string (estimated market size)",
    "growth": "string (growth trend)",
    "key_trends": ["string"]
  },
  "keywords": [
    {
      "keyword": "string",
      "search_volume": number (estimated monthly),
      "difficulty": number (1-100),
      "intent": "informational|navigational|commercial|transactional",
      "opportunity_score": number (1-100),
      "suggested_content_type": "string"
    }
  ],
  "related_keywords": [
    {
      "keyword": "string",
      "search_volume": number,
      "difficulty": number,
      "relevance": "high|medium|low"
    }
  ],
  "long_tail_keywords": [
    {
      "keyword": "string",
      "intent": "string",
      "content_angle": "string"
    }
  ],
  "content_opportunities": [
    {
      "topic": "string",
      "format": "blog|guide|video|infographic|tool",
      "target_keywords": ["string"],
      "estimated_traffic_potential": "high|medium|low"
    }
  ],
  "pain_points": ["string"],
  "questions_to_answer": ["string"],
  "target_job_titles": ["string"],
  "competitive_landscape": "string",
  "recommendations": [
    {"priority": number (1-5), "action": "string", "rationale": "string"}
  ]
}

Provide realistic estimates and actionable insights. Focus on opportunities with good traffic potential and manageable competition.`;

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
      throw new Error('Failed to parse research results');
    }

    console.log('Keyword research completed successfully');

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in keyword-research function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
