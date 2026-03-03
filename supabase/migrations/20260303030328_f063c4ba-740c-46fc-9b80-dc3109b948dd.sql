
-- Create audit_reports table for persisting audit results
CREATE TABLE public.audit_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  company_name TEXT NOT NULL DEFAULT '',
  website_url TEXT NOT NULL,
  overall_score INTEGER,
  report_url TEXT,
  report_file_name TEXT,
  sections JSONB,
  quick_wins JSONB,
  roadmap JSONB,
  email_sent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'completed',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.audit_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (public audit form)
CREATE POLICY "Anyone can submit audit reports"
ON public.audit_reports FOR INSERT
WITH CHECK (true);

-- Staff can view all
CREATE POLICY "Staff can view all audit reports"
ON public.audit_reports FOR SELECT
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can update
CREATE POLICY "Staff can update audit reports"
ON public.audit_reports FOR UPDATE
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can delete
CREATE POLICY "Staff can delete audit reports"
ON public.audit_reports FOR DELETE
USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_audit_reports_updated_at
BEFORE UPDATE ON public.audit_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
