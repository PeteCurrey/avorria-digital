-- Create client_logos table
CREATE TABLE public.client_logos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  is_published BOOLEAN DEFAULT true NOT NULL,
  display_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;

-- Public read policy for published logos
CREATE POLICY "Anyone can view published client logos"
ON public.client_logos FOR SELECT
USING (is_published = true);

-- Staff can view all logos
CREATE POLICY "Staff can view all client logos"
ON public.client_logos FOR SELECT
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can create logos
CREATE POLICY "Staff can create client logos"
ON public.client_logos FOR INSERT
WITH CHECK (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can update logos
CREATE POLICY "Staff can update client logos"
ON public.client_logos FOR UPDATE
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can delete logos
CREATE POLICY "Staff can delete client logos"
ON public.client_logos FOR DELETE
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Create updated_at trigger
CREATE TRIGGER update_client_logos_updated_at
BEFORE UPDATE ON public.client_logos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for client logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('client-logos', 'client-logos', true);

-- Storage policies
CREATE POLICY "Public can view client logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'client-logos');

CREATE POLICY "Authenticated users can upload client logos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'client-logos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update client logos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'client-logos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete client logos"
ON storage.objects FOR DELETE
USING (bucket_id = 'client-logos' AND auth.uid() IS NOT NULL);