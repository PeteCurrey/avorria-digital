# Google Ads Management Integration

## Overview
The Google Ads management suite provides a complete platform for managing Google Ads campaigns directly from the Avorria admin panel.

## Features Implemented
- ✅ Database schema for accounts, campaigns, metrics, alerts, experiments, and bulk operations
- ✅ React hooks for data fetching and mutations (`useGoogleAds.ts`)
- ✅ Admin UI tab with KPI cards, campaign table, and alerts
- ✅ Campaign status controls (Play/Pause)
- ✅ Account selector for MCC (Manager) accounts
- ✅ Edge function scaffold for API integration

## Architecture

### Database Tables
1. **google_ads_accounts** - Store Google Ads account connections (MCC and sub-accounts)
2. **google_ads_campaigns** - Campaign details, status, budget, bidding
3. **google_ads_metrics** - Daily performance metrics (impressions, clicks, cost, conversions)
4. **google_ads_alerts** - Performance alerts (budget depletion, high CPA, low ROAS)
5. **google_ads_experiments** - A/B test tracking for creative and bidding strategies
6. **google_ads_bulk_operations** - Queue for batch campaign updates

### Edge Function: google-ads-sync
Located at: `supabase/functions/google-ads-sync/index.ts`

**Actions:**
- `sync_campaigns` - Fetch campaigns from Google Ads API
- `sync_metrics` - Fetch daily metrics for all campaigns
- `update_campaign` - Push campaign updates to Google Ads

## TODO: Google Ads API Integration
The edge function currently has placeholder logic. To complete the integration:

### 1. Google Ads API Setup
- Create a Google Cloud Project
- Enable Google Ads API
- Set up OAuth 2.0 credentials
- Request access to the Google Ads API (requires approval)

### 2. OAuth Flow
Implement the OAuth flow for connecting Google Ads accounts:
```typescript
// Redirect user to Google OAuth
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/adwords&access_type=offline`;

// After callback, exchange code for tokens
const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  body: JSON.stringify({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code',
  }),
});
```

### 3. Google Ads API Client
Install the official client library (or use REST API directly):
```typescript
import { GoogleAdsApi } from 'google-ads-api';

const client = new GoogleAdsApi({
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  developer_token: DEVELOPER_TOKEN,
});

const customer = client.Customer({
  customer_id: CUSTOMER_ID,
  refresh_token: REFRESH_TOKEN,
});
```

### 4. Sync Campaigns
```typescript
const campaigns = await customer.query(`
  SELECT
    campaign.id,
    campaign.name,
    campaign.status,
    campaign.advertising_channel_type,
    campaign_budget.amount_micros,
    bidding_strategy.type
  FROM campaign
  WHERE campaign.status != 'REMOVED'
`);
```

### 5. Sync Metrics
```typescript
const metrics = await customer.query(`
  SELECT
    campaign.id,
    metrics.impressions,
    metrics.clicks,
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value
  FROM campaign
  WHERE segments.date = '2024-01-01'
`);
```

### 6. Update Campaigns
```typescript
await customer.campaigns.update({
  resource_name: `customers/${CUSTOMER_ID}/campaigns/${CAMPAIGN_ID}`,
  status: 'PAUSED', // or 'ENABLED'
});
```

## Environment Variables Required
Add these secrets using the Supabase secrets manager:
- `GOOGLE_ADS_CLIENT_ID`
- `GOOGLE_ADS_CLIENT_SECRET`
- `GOOGLE_ADS_DEVELOPER_TOKEN`
- `GOOGLE_ADS_LOGIN_CUSTOMER_ID` (for MCC accounts)

## RLS Policies
All tables use role-based security:
- **Admin** and **Strategist** roles have full access
- Policies use the `has_role()` function to check permissions

## Usage

### Connect an Account
1. Navigate to Admin → Google Ads
2. Click "Connect Google Ads Account"
3. Complete OAuth flow (TODO: implement)
4. Account appears in account selector

### Sync Data
Run edge function manually or set up cron job:
```typescript
const { data } = await supabase.functions.invoke('google-ads-sync', {
  body: {
    action: 'sync_campaigns',
    accountId: 'account-uuid',
  },
});
```

### View Metrics
Select an account from the dropdown to see:
- Aggregated KPIs (spend, impressions, clicks, conversions, CPL, ROAS)
- Campaign list with status controls
- Active alerts

## Performance Alerts
The system can generate alerts for:
- Budget depletion (>80% spent)
- High CPA (above target)
- Low ROAS (below target)
- Campaign paused unexpectedly
- Disapproved ads

## Next Steps
1. Implement OAuth flow for account connection
2. Integrate Google Ads API client
3. Build campaign creation form
4. Add bulk operations UI
5. Implement creative A/B testing interface
6. Set up automated sync (cron job)
7. Build custom reporting views
