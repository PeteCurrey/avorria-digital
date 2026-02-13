
-- Create resources table for admin-managed resources
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  summary text NOT NULL,
  content text NOT NULL,
  category text NOT NULL DEFAULT 'SEO',
  reading_time integer NOT NULL DEFAULT 5,
  service_relation text,
  industry_relation text,
  is_pillar boolean NOT NULL DEFAULT false,
  is_published boolean NOT NULL DEFAULT true,
  target_keyword text,
  meta_title text,
  meta_description text,
  published_date date DEFAULT CURRENT_DATE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Anyone can view published resources
CREATE POLICY "Anyone can view published resources"
ON public.resources
FOR SELECT
USING (is_published = true);

-- Staff can view all resources
CREATE POLICY "Staff can view all resources"
ON public.resources
FOR SELECT
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can create resources
CREATE POLICY "Staff can create resources"
ON public.resources
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can update resources
CREATE POLICY "Staff can update resources"
ON public.resources
FOR UPDATE
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can delete resources
CREATE POLICY "Staff can delete resources"
ON public.resources
FOR DELETE
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Add updated_at trigger
CREATE TRIGGER update_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
