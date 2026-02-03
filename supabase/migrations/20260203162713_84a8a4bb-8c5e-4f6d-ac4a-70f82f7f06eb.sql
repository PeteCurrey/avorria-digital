-- Phase 4: Create landing page analytics table for tracking page performance

CREATE TABLE public.landing_page_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  landing_page_id UUID REFERENCES public.seo_landing_pages(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  bounce_rate NUMERIC(5,2),
  avg_time_on_page INTEGER DEFAULT 0, -- in seconds
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(landing_page_id, date)
);

-- Enable RLS
ALTER TABLE public.landing_page_analytics ENABLE ROW LEVEL SECURITY;

-- Staff can view all analytics
CREATE POLICY "Staff can view landing page analytics"
ON public.landing_page_analytics
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'strategist'::app_role)
);

-- Staff can create analytics records
CREATE POLICY "Staff can create landing page analytics"
ON public.landing_page_analytics
FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'strategist'::app_role)
);

-- Staff can update analytics records
CREATE POLICY "Staff can update landing page analytics"
ON public.landing_page_analytics
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'strategist'::app_role)
);

-- Create indexes for performance
CREATE INDEX idx_lp_analytics_page_id ON public.landing_page_analytics(landing_page_id);
CREATE INDEX idx_lp_analytics_date ON public.landing_page_analytics(date DESC);

-- Insert some sample data for the seeded landing pages
INSERT INTO public.landing_page_analytics (landing_page_id, date, page_views, unique_visitors, conversions, bounce_rate, avg_time_on_page)
SELECT 
  lp.id,
  CURRENT_DATE - (n || ' days')::interval,
  floor(random() * 200 + 50)::int, -- page views 50-250
  floor(random() * 150 + 30)::int, -- unique visitors 30-180
  floor(random() * 10 + 1)::int, -- conversions 1-11
  round((random() * 30 + 30)::numeric, 2), -- bounce rate 30-60%
  floor(random() * 180 + 60)::int -- avg time 60-240 seconds
FROM public.seo_landing_pages lp
CROSS JOIN generate_series(0, 30) n;