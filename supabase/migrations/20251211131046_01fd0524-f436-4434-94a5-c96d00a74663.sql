-- Create case_studies table to store all case study data
CREATE TABLE public.case_studies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  client TEXT NOT NULL,
  sector TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  timeframe TEXT NOT NULL,
  year INTEGER NOT NULL,
  outcome TEXT NOT NULL CHECK (outcome IN ('leads', 'revenue', 'traffic', 'efficiency')),
  
  -- Hero section
  hero_media_type TEXT NOT NULL DEFAULT 'image' CHECK (hero_media_type IN ('image', 'video')),
  hero_media_src TEXT NOT NULL,
  hero_media_poster TEXT,
  headline TEXT NOT NULL,
  subheadline TEXT NOT NULL,
  kpi_badges JSONB NOT NULL DEFAULT '[]',
  
  -- Content
  problem TEXT NOT NULL,
  approach JSONB NOT NULL DEFAULT '[]',
  outcomes JSONB NOT NULL DEFAULT '[]',
  
  -- Media
  gallery_media JSONB NOT NULL DEFAULT '[]',
  before_media TEXT,
  after_media TEXT,
  
  -- Social proof
  quote JSONB,
  
  -- PDF content
  pdf_content JSONB,
  
  -- Related
  related_slugs TEXT[] DEFAULT '{}',
  
  -- Featured toggle
  is_featured BOOLEAN NOT NULL DEFAULT false,
  
  -- Status
  is_published BOOLEAN NOT NULL DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Public can view published case studies
CREATE POLICY "Anyone can view published case studies"
ON public.case_studies
FOR SELECT
USING (is_published = true);

-- Staff can view all case studies
CREATE POLICY "Staff can view all case studies"
ON public.case_studies
FOR SELECT
USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Staff can create case studies
CREATE POLICY "Staff can create case studies"
ON public.case_studies
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Staff can update case studies
CREATE POLICY "Staff can update case studies"
ON public.case_studies
FOR UPDATE
USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Staff can delete case studies
CREATE POLICY "Staff can delete case studies"
ON public.case_studies
FOR DELETE
USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Add timestamp trigger
CREATE TRIGGER update_case_studies_updated_at
BEFORE UPDATE ON public.case_studies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();