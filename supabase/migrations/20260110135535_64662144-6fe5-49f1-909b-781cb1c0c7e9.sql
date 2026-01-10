-- Create content_calendar table for planning blog posts and landing pages
CREATE TABLE public.content_calendar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL DEFAULT 'blog_post', -- blog_post, landing_page, case_study, social_post
  status TEXT NOT NULL DEFAULT 'idea', -- idea, planned, in_progress, review, published
  scheduled_date DATE,
  published_date TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT,
  tags TEXT[],
  priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
  notes TEXT,
  slug TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.content_calendar ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to view content calendar
CREATE POLICY "Authenticated users can view content calendar" 
ON public.content_calendar 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to create content items
CREATE POLICY "Authenticated users can create content items" 
ON public.content_calendar 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update content items
CREATE POLICY "Authenticated users can update content items" 
ON public.content_calendar 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete content items
CREATE POLICY "Authenticated users can delete content items" 
ON public.content_calendar 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE TRIGGER update_content_calendar_updated_at
BEFORE UPDATE ON public.content_calendar
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create scheduled_reports table for weekly PDF reports
CREATE TABLE public.scheduled_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  report_type TEXT NOT NULL DEFAULT 'weekly_summary', -- weekly_summary, monthly_summary, custom
  recipients TEXT[] NOT NULL,
  schedule TEXT NOT NULL DEFAULT 'weekly', -- daily, weekly, monthly
  last_sent_at TIMESTAMP WITH TIME ZONE,
  next_scheduled_at TIMESTAMP WITH TIME ZONE,
  config JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scheduled_reports ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage scheduled reports
CREATE POLICY "Authenticated users can view scheduled reports" 
ON public.scheduled_reports 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create scheduled reports" 
ON public.scheduled_reports 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update scheduled reports" 
ON public.scheduled_reports 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete scheduled reports" 
ON public.scheduled_reports 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Create updated_at trigger for scheduled_reports
CREATE TRIGGER update_scheduled_reports_updated_at
BEFORE UPDATE ON public.scheduled_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create generated_reports table to store report history
CREATE TABLE public.generated_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scheduled_report_id UUID REFERENCES public.scheduled_reports(id) ON DELETE SET NULL,
  report_type TEXT NOT NULL,
  file_url TEXT,
  data JSONB,
  period_start DATE,
  period_end DATE,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sent_to TEXT[]
);

-- Enable RLS
ALTER TABLE public.generated_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view generated reports" 
ON public.generated_reports 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can create generated reports" 
ON public.generated_reports 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');