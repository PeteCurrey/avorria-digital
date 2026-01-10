-- Create seo_landing_pages table to store custom landing page configurations
CREATE TABLE public.seo_landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  page_type TEXT NOT NULL DEFAULT 'service-location',
  
  -- Core associations
  service_slug TEXT NOT NULL,
  location_slug TEXT,
  industry_slug TEXT,
  
  -- Hero content
  hero_headline TEXT NOT NULL,
  hero_subheadline TEXT NOT NULL,
  primary_cta TEXT NOT NULL DEFAULT 'Book a Strategy Call',
  secondary_cta TEXT NOT NULL DEFAULT 'Request a Free Audit',
  
  -- Content sections
  problem_bullets JSONB DEFAULT '[]'::jsonb,
  solution_bullets JSONB DEFAULT '[]'::jsonb,
  key_metrics JSONB DEFAULT '[]'::jsonb,
  process_steps JSONB DEFAULT '[]'::jsonb,
  faq_list JSONB DEFAULT '[]'::jsonb,
  
  -- Testimonial
  testimonial_quote TEXT,
  testimonial_author TEXT,
  testimonial_role TEXT,
  testimonial_company TEXT,
  
  -- SEO fields
  target_keyword TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  
  -- Additional content
  working_with_you TEXT,
  pricing_snapshot TEXT,
  related_case_studies JSONB DEFAULT '[]'::jsonb,
  related_articles JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seo_landing_pages ENABLE ROW LEVEL SECURITY;

-- Public can view published pages
CREATE POLICY "Anyone can view published landing pages" ON public.seo_landing_pages
FOR SELECT USING (is_published = true);

-- Staff can manage all pages
CREATE POLICY "Staff can view all landing pages" ON public.seo_landing_pages
FOR SELECT USING (
  has_role(auth.uid(), 'strategist'::app_role) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Staff can create landing pages" ON public.seo_landing_pages
FOR INSERT WITH CHECK (
  has_role(auth.uid(), 'strategist'::app_role) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Staff can update landing pages" ON public.seo_landing_pages
FOR UPDATE USING (
  has_role(auth.uid(), 'strategist'::app_role) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Staff can delete landing pages" ON public.seo_landing_pages
FOR DELETE USING (
  has_role(auth.uid(), 'strategist'::app_role) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Updated at trigger
CREATE TRIGGER update_seo_landing_pages_updated_at
BEFORE UPDATE ON public.seo_landing_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for fast slug lookups
CREATE INDEX idx_seo_landing_pages_slug ON public.seo_landing_pages(slug);
CREATE INDEX idx_seo_landing_pages_published ON public.seo_landing_pages(is_published);