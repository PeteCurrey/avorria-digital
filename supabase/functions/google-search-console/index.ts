import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper to get Google access token from service account
async function getAccessToken(serviceAccountJson: string): Promise<string> {
  const serviceAccount = JSON.parse(serviceAccountJson);
  
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };
  
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  // Encode header and payload
  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const signatureInput = `${headerB64}.${payloadB64}`;
  
  // Import private key and sign
  const privateKeyPem = serviceAccount.private_key;
  const pemContents = privateKeyPem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\n/g, '');
  
  const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(signatureInput)
  );
  
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const jwt = `${signatureInput}.${signatureB64}`;
  
  // Exchange JWT for access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  
  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const serviceAccountJson = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');
    const siteUrl = Deno.env.get('GOOGLE_SEARCH_CONSOLE_SITE_URL') || 'https://avorria.com';

    if (!serviceAccountJson) {
      console.log('GOOGLE_SERVICE_ACCOUNT_JSON not configured');
      return new Response(JSON.stringify({
        error: 'Google Search Console not configured',
        configured: false,
        mockData: getMockData()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { startDate, endDate, dimensions = ['query'], rowLimit = 25 } = await req.json().catch(() => ({}));
    
    const start = startDate || getDateString(-30);
    const end = endDate || getDateString(-1);

    console.log(`Fetching Search Console data for ${siteUrl} from ${start} to ${end}`);

    const accessToken = await getAccessToken(serviceAccountJson);

    // Fetch search analytics data
    const analyticsResponse = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: start,
          endDate: end,
          dimensions,
          rowLimit,
          dataState: 'final',
        }),
      }
    );

    if (!analyticsResponse.ok) {
      const errorText = await analyticsResponse.text();
      console.error('Search Console API error:', errorText);
      throw new Error(`Search Console API error: ${analyticsResponse.status}`);
    }

    const analyticsData = await analyticsResponse.json();

    // Fetch site info
    const siteInfoResponse = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}`,
      {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      }
    );

    const siteInfo = siteInfoResponse.ok ? await siteInfoResponse.json() : null;

    // Calculate totals
    const totals = (analyticsData.rows || []).reduce(
      (acc: any, row: any) => ({
        clicks: acc.clicks + (row.clicks || 0),
        impressions: acc.impressions + (row.impressions || 0),
        ctr: 0,
        position: 0,
      }),
      { clicks: 0, impressions: 0, ctr: 0, position: 0 }
    );

    if (totals.impressions > 0) {
      totals.ctr = totals.clicks / totals.impressions;
    }

    const positions = (analyticsData.rows || []).map((r: any) => r.position).filter((p: number) => p > 0);
    totals.position = positions.length > 0 
      ? positions.reduce((a: number, b: number) => a + b, 0) / positions.length 
      : 0;

    return new Response(JSON.stringify({
      configured: true,
      siteUrl,
      dateRange: { start, end },
      totals,
      rows: analyticsData.rows || [],
      siteInfo,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in google-search-console function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      configured: false,
      mockData: getMockData()
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getDateString(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
}

function getMockData() {
  return {
    totals: {
      clicks: 12847,
      impressions: 284521,
      ctr: 0.0451,
      position: 14.2,
    },
    topQueries: [
      { query: 'digital marketing agency uk', clicks: 1240, impressions: 8420, ctr: 0.147, position: 3.2 },
      { query: 'seo services london', clicks: 892, impressions: 6130, ctr: 0.145, position: 4.1 },
      { query: 'web design agency', clicks: 756, impressions: 12400, ctr: 0.061, position: 8.7 },
      { query: 'content marketing services', clicks: 623, impressions: 4280, ctr: 0.145, position: 5.3 },
      { query: 'paid media management', clicks: 534, impressions: 3890, ctr: 0.137, position: 6.1 },
    ],
    topPages: [
      { page: '/services/seo', clicks: 2341, impressions: 45230, ctr: 0.052, position: 12.4 },
      { page: '/', clicks: 1892, impressions: 34120, ctr: 0.055, position: 8.9 },
      { page: '/services/web-design', clicks: 1456, impressions: 28340, ctr: 0.051, position: 11.2 },
      { page: '/case-studies', clicks: 987, impressions: 19230, ctr: 0.051, position: 15.3 },
      { page: '/contact', clicks: 743, impressions: 12340, ctr: 0.060, position: 7.8 },
    ],
  };
}
