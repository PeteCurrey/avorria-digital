
-- LinkedIn Ads Accounts
CREATE TABLE public.linkedin_ads_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id TEXT NOT NULL,
  name TEXT NOT NULL,
  account_status TEXT NOT NULL DEFAULT 'active',
  currency TEXT NOT NULL DEFAULT 'GBP',
  timezone TEXT NOT NULL DEFAULT 'Europe/London',
  is_active BOOLEAN NOT NULL DEFAULT true,
  access_token TEXT,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.linkedin_ads_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage LinkedIn Ads accounts"
  ON public.linkedin_ads_accounts FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

CREATE TRIGGER update_linkedin_ads_accounts_updated_at
  BEFORE UPDATE ON public.linkedin_ads_accounts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- LinkedIn Ads Campaigns
CREATE TABLE public.linkedin_ads_campaigns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES public.linkedin_ads_accounts(id) ON DELETE CASCADE,
  campaign_id TEXT NOT NULL,
  name TEXT NOT NULL,
  objective TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  campaign_type TEXT NOT NULL DEFAULT 'SPONSORED_UPDATES',
  daily_budget NUMERIC,
  total_budget NUMERIC,
  unit_cost NUMERIC,
  bid_type TEXT,
  audience_targeting JSONB DEFAULT '{}'::jsonb,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.linkedin_ads_campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage LinkedIn Ads campaigns"
  ON public.linkedin_ads_campaigns FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

CREATE TRIGGER update_linkedin_ads_campaigns_updated_at
  BEFORE UPDATE ON public.linkedin_ads_campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_linkedin_ads_campaigns_account_id ON public.linkedin_ads_campaigns(account_id);

-- LinkedIn Ads Creatives
CREATE TABLE public.linkedin_ads_creatives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES public.linkedin_ads_accounts(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.linkedin_ads_campaigns(id) ON DELETE SET NULL,
  creative_id TEXT NOT NULL,
  name TEXT,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  creative_type TEXT NOT NULL DEFAULT 'SPONSORED_UPDATE_TEXT',
  headline TEXT,
  body TEXT,
  call_to_action TEXT,
  destination_url TEXT,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.linkedin_ads_creatives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage LinkedIn Ads creatives"
  ON public.linkedin_ads_creatives FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

CREATE TRIGGER update_linkedin_ads_creatives_updated_at
  BEFORE UPDATE ON public.linkedin_ads_creatives
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_linkedin_ads_creatives_account_id ON public.linkedin_ads_creatives(account_id);
CREATE INDEX idx_linkedin_ads_creatives_campaign_id ON public.linkedin_ads_creatives(campaign_id);

-- LinkedIn Ads Metrics
CREATE TABLE public.linkedin_ads_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  account_id UUID NOT NULL REFERENCES public.linkedin_ads_accounts(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.linkedin_ads_campaigns(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  impressions BIGINT NOT NULL DEFAULT 0,
  clicks BIGINT NOT NULL DEFAULT 0,
  spend NUMERIC NOT NULL DEFAULT 0,
  conversions NUMERIC NOT NULL DEFAULT 0,
  conversion_value NUMERIC NOT NULL DEFAULT 0,
  leads NUMERIC NOT NULL DEFAULT 0,
  video_views BIGINT DEFAULT 0,
  shares BIGINT DEFAULT 0,
  comments BIGINT DEFAULT 0,
  reactions BIGINT DEFAULT 0,
  follows BIGINT DEFAULT 0,
  ctr NUMERIC,
  cpc NUMERIC,
  cpm NUMERIC,
  cpl NUMERIC,
  roas NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.linkedin_ads_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can view LinkedIn Ads metrics"
  ON public.linkedin_ads_metrics FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

CREATE POLICY "Staff can insert LinkedIn Ads metrics"
  ON public.linkedin_ads_metrics FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

CREATE INDEX idx_linkedin_ads_metrics_account_id ON public.linkedin_ads_metrics(account_id);
CREATE INDEX idx_linkedin_ads_metrics_campaign_id ON public.linkedin_ads_metrics(campaign_id);
CREATE INDEX idx_linkedin_ads_metrics_date ON public.linkedin_ads_metrics(date);
