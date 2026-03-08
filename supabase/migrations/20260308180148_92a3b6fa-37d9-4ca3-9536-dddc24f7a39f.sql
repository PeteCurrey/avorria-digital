
-- Competitor snapshots table for automated weekly analysis
CREATE TABLE public.competitor_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_url text NOT NULL,
  company_name text,
  positioning text,
  strengths jsonb DEFAULT '[]'::jsonb,
  weaknesses jsonb DEFAULT '[]'::jsonb,
  opportunities jsonb DEFAULT '[]'::jsonb,
  marketing_tactics jsonb DEFAULT '[]'::jsonb,
  threat_level text DEFAULT 'medium',
  key_differentiators jsonb DEFAULT '[]'::jsonb,
  recommendations jsonb DEFAULT '[]'::jsonb,
  raw_response jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.competitor_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage competitor snapshots" ON public.competitor_snapshots
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'strategist'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'strategist'::app_role));

-- Competitor targets table to track which competitors to monitor
CREATE TABLE public.competitor_targets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competitor_url text NOT NULL UNIQUE,
  company_name text,
  is_active boolean DEFAULT true,
  check_frequency text DEFAULT 'weekly',
  last_checked_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.competitor_targets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage competitor targets" ON public.competitor_targets
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'strategist'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'strategist'::app_role));

-- SEO suggestions table for AI-powered optimization recommendations
CREATE TABLE public.seo_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  suggestion_type text NOT NULL, -- 'internal_link', 'meta_description', 'content_gap', 'title_tag'
  target_url text,
  target_page text,
  suggestion text NOT NULL,
  context text,
  priority text DEFAULT 'medium', -- 'high', 'medium', 'low'
  status text DEFAULT 'pending', -- 'pending', 'applied', 'dismissed'
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

ALTER TABLE public.seo_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage SEO suggestions" ON public.seo_suggestions
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'strategist'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) OR public.has_role(auth.uid(), 'strategist'::app_role));
