-- Create clients table
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  services TEXT[] DEFAULT '{}',
  monthly_value TEXT,
  status TEXT NOT NULL DEFAULT 'onboarding',
  owner_id UUID REFERENCES public.profiles(id),
  owner_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create campaigns table
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  client_name TEXT,
  channel TEXT NOT NULL,
  objective TEXT,
  status TEXT NOT NULL DEFAULT 'planned',
  budget NUMERIC,
  next_review DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  client_name TEXT,
  type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'medium',
  description TEXT,
  is_resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create analytics_snapshots table
CREATE TABLE public.analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  website_id UUID REFERENCES public.client_websites(id) ON DELETE CASCADE,
  page_views INTEGER,
  unique_visitors INTEGER,
  bounce_rate NUMERIC,
  avg_session_duration TEXT,
  top_pages JSONB DEFAULT '[]'::jsonb,
  conversions JSONB DEFAULT '{}'::jsonb,
  snapshot_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_snapshots ENABLE ROW LEVEL SECURITY;

-- Clients RLS policies (staff only)
CREATE POLICY "Staff can view all clients" ON public.clients
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can create clients" ON public.clients
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update clients" ON public.clients
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can delete clients" ON public.clients
  FOR DELETE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Campaigns RLS policies (staff only)
CREATE POLICY "Staff can view all campaigns" ON public.campaigns
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can create campaigns" ON public.campaigns
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update campaigns" ON public.campaigns
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can delete campaigns" ON public.campaigns
  FOR DELETE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Alerts RLS policies (staff only)
CREATE POLICY "Staff can view all alerts" ON public.alerts
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can create alerts" ON public.alerts
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update alerts" ON public.alerts
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can delete alerts" ON public.alerts
  FOR DELETE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Analytics snapshots RLS policies (staff can view all, users can view their own websites)
CREATE POLICY "Staff can view all analytics" ON public.analytics_snapshots
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view their own analytics" ON public.analytics_snapshots
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.client_websites
      WHERE client_websites.id = analytics_snapshots.website_id
      AND client_websites.user_id = auth.uid()
    )
  );

CREATE POLICY "Staff can create analytics" ON public.analytics_snapshots
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update analytics" ON public.analytics_snapshots
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can delete analytics" ON public.analytics_snapshots
  FOR DELETE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Add updated_at triggers
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON public.campaigns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();