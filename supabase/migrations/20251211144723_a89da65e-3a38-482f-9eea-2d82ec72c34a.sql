-- Create leads table for capturing form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  source TEXT NOT NULL DEFAULT 'contact', -- contact, audit, estimator, newsletter
  status TEXT NOT NULL DEFAULT 'new', -- new, contacted, qualified, converted, lost
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can submit leads (for public forms)
CREATE POLICY "Anyone can submit leads"
ON public.leads
FOR INSERT
WITH CHECK (true);

-- Staff can view all leads
CREATE POLICY "Staff can view all leads"
ON public.leads
FOR SELECT
USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Staff can update leads
CREATE POLICY "Staff can update leads"
ON public.leads
FOR UPDATE
USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Staff can delete leads
CREATE POLICY "Staff can delete leads"
ON public.leads
FOR DELETE
USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();