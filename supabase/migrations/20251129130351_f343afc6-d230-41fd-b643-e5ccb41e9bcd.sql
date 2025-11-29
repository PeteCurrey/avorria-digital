-- Create website plans table
CREATE TABLE public.website_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create website plan pages table
CREATE TABLE public.website_plan_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID NOT NULL REFERENCES public.website_plans(id) ON DELETE CASCADE,
  page_type TEXT NOT NULL,
  page_title TEXT NOT NULL,
  page_slug TEXT NOT NULL,
  sections JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_plan_pages ENABLE ROW LEVEL SECURITY;

-- Policies for website_plans
CREATE POLICY "Users can view their own plans"
ON public.website_plans FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own plans"
ON public.website_plans FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own plans"
ON public.website_plans FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own plans"
ON public.website_plans FOR DELETE
USING (auth.uid() = user_id);

-- Policies for website_plan_pages
CREATE POLICY "Users can view pages from their own plans"
ON public.website_plan_pages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.website_plans
    WHERE id = website_plan_pages.plan_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create pages in their own plans"
ON public.website_plan_pages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.website_plans
    WHERE id = website_plan_pages.plan_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update pages in their own plans"
ON public.website_plan_pages FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.website_plans
    WHERE id = website_plan_pages.plan_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete pages from their own plans"
ON public.website_plan_pages FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.website_plans
    WHERE id = website_plan_pages.plan_id
    AND user_id = auth.uid()
  )
);

-- Triggers for updated_at
CREATE TRIGGER update_website_plans_updated_at
BEFORE UPDATE ON public.website_plans
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_website_plan_pages_updated_at
BEFORE UPDATE ON public.website_plan_pages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();