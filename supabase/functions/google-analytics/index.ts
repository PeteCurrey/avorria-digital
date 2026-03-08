import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function getAccessToken(serviceAccountJson: string): Promise<string> {
  const serviceAccount = JSON.parse(serviceAccountJson);
  
  const header = { alg: 'RS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const signatureInput = `${headerB64}.${payloadB64}`;
  
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
    const propertyId = Deno.env.get('GOOGLE_ANALYTICS_PROPERTY_ID');

    if (!serviceAccountJson || !propertyId) {
      console.log('Google Analytics not configured - missing credentials');
      return new Response(JSON.stringify({
        error: 'Google Analytics not configured',
        configured: false,
        data: null,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { startDate, endDate, metrics, dimensions } = await req.json().catch(() => ({}));
    
    const start = startDate || getDateString(-30);
    const end = endDate || getDateString(-1);

    console.log(`Fetching GA4 data for property ${propertyId} from ${start} to ${end}`);

    const accessToken = await getAccessToken(serviceAccountJson);

    const reportResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: start, endDate: end }],
          metrics: metrics || [
            { name: 'sessions' },
            { name: 'totalUsers' },
            { name: 'newUsers' },
            { name: 'screenPageViews' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
            { name: 'conversions' },
          ],
          dimensions: dimensions || [{ name: 'date' }],
        }),
      }
    );

    if (!reportResponse.ok) {
      const errorText = await reportResponse.text();
      console.error('GA4 API error:', errorText);
      throw new Error(`GA4 API error: ${reportResponse.status}`);
    }

    const reportData = await reportResponse.json();

    const pagesResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: start, endDate: end }],
          metrics: [
            { name: 'screenPageViews' },
            { name: 'sessions' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
          ],
          dimensions: [{ name: 'pagePath' }],
          limit: 20,
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        }),
      }
    );

    const pagesData = pagesResponse.ok ? await pagesResponse.json() : null;

    const sourcesResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: start, endDate: end }],
          metrics: [
            { name: 'sessions' },
            { name: 'totalUsers' },
            { name: 'conversions' },
          ],
          dimensions: [{ name: 'sessionSource' }, { name: 'sessionMedium' }],
          limit: 15,
          orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        }),
      }
    );

    const sourcesData = sourcesResponse.ok ? await sourcesResponse.json() : null;

    const devicesResponse = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: start, endDate: end }],
          metrics: [{ name: 'sessions' }, { name: 'totalUsers' }],
          dimensions: [{ name: 'deviceCategory' }],
        }),
      }
    );

    const devicesData = devicesResponse.ok ? await devicesResponse.json() : null;

    const totals = parseReportTotals(reportData);

    return new Response(JSON.stringify({
      configured: true,
      propertyId,
      dateRange: { start, end },
      totals,
      dailyData: parseDailyData(reportData),
      topPages: parseTopPages(pagesData),
      trafficSources: parseTrafficSources(sourcesData),
      devices: parseDevices(devicesData),
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error in google-analytics function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      configured: false,
      data: null,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getDateString(daysOffset: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split('T')[0];
}

function parseReportTotals(data: any) {
  if (!data?.rows?.length) return null;
  
  const totals: Record<string, number> = {};
  const metricHeaders = data.metricHeaders || [];
  
  data.rows.forEach((row: any) => {
    row.metricValues?.forEach((value: any, index: number) => {
      const metricName = metricHeaders[index]?.name || `metric_${index}`;
      totals[metricName] = (totals[metricName] || 0) + parseFloat(value.value || '0');
    });
  });

  const rowCount = data.rows.length;
  if (totals.bounceRate) totals.bounceRate = totals.bounceRate / rowCount;
  if (totals.averageSessionDuration) totals.averageSessionDuration = totals.averageSessionDuration / rowCount;

  return totals;
}

function parseDailyData(data: any) {
  if (!data?.rows?.length) return [];
  
  const metricHeaders = data.metricHeaders || [];
  
  return data.rows.map((row: any) => {
    const date = row.dimensionValues?.[0]?.value || '';
    const metrics: Record<string, number> = { date };
    
    row.metricValues?.forEach((value: any, index: number) => {
      const metricName = metricHeaders[index]?.name || `metric_${index}`;
      metrics[metricName] = parseFloat(value.value || '0');
    });
    
    return metrics;
  }).sort((a: any, b: any) => a.date.localeCompare(b.date));
}

function parseTopPages(data: any) {
  if (!data?.rows?.length) return [];
  
  return data.rows.map((row: any) => ({
    page: row.dimensionValues?.[0]?.value || '',
    pageViews: parseInt(row.metricValues?.[0]?.value || '0'),
    sessions: parseInt(row.metricValues?.[1]?.value || '0'),
    bounceRate: parseFloat(row.metricValues?.[2]?.value || '0'),
    avgDuration: parseFloat(row.metricValues?.[3]?.value || '0'),
  }));
}

function parseTrafficSources(data: any) {
  if (!data?.rows?.length) return [];
  
  return data.rows.map((row: any) => ({
    source: row.dimensionValues?.[0]?.value || '(direct)',
    medium: row.dimensionValues?.[1]?.value || '(none)',
    sessions: parseInt(row.metricValues?.[0]?.value || '0'),
    users: parseInt(row.metricValues?.[1]?.value || '0'),
    conversions: parseInt(row.metricValues?.[2]?.value || '0'),
  }));
}

function parseDevices(data: any) {
  if (!data?.rows?.length) return [];
  
  return data.rows.map((row: any) => ({
    device: row.dimensionValues?.[0]?.value || 'unknown',
    sessions: parseInt(row.metricValues?.[0]?.value || '0'),
    users: parseInt(row.metricValues?.[1]?.value || '0'),
  }));
}
