-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  avatar_url TEXT,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public can view published testimonials
CREATE POLICY "Anyone can view published testimonials"
ON public.testimonials
FOR SELECT
USING (is_published = true);

-- Staff can view all testimonials
CREATE POLICY "Staff can view all testimonials"
ON public.testimonials
FOR SELECT
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can create testimonials
CREATE POLICY "Staff can create testimonials"
ON public.testimonials
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can update testimonials
CREATE POLICY "Staff can update testimonials"
ON public.testimonials
FOR UPDATE
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can delete testimonials
CREATE POLICY "Staff can delete testimonials"
ON public.testimonials
FOR DELETE
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();