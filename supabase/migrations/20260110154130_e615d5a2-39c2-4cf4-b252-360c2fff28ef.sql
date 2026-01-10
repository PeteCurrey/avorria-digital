-- Create content_recipes table for auto-generation configurations
CREATE TABLE public.content_recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL DEFAULT 'social',
  platform TEXT,
  topics JSONB DEFAULT '[]'::jsonb,
  tone TEXT DEFAULT 'professional',
  frequency TEXT DEFAULT 'daily',
  posts_per_run INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT true,
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add new columns to ai_generated_content for recipe tracking and review workflow
ALTER TABLE public.ai_generated_content 
ADD COLUMN IF NOT EXISTS recipe_id UUID REFERENCES public.content_recipes(id),
ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS reviewed_by UUID,
ADD COLUMN IF NOT EXISTS rejection_reason TEXT,
ADD COLUMN IF NOT EXISTS auto_generated BOOLEAN DEFAULT false;

-- Enable RLS on content_recipes
ALTER TABLE public.content_recipes ENABLE ROW LEVEL SECURITY;

-- RLS policies for content_recipes - staff only
CREATE POLICY "Staff can view all recipes" ON public.content_recipes
FOR SELECT USING (
  has_role(auth.uid(), 'strategist'::app_role) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Staff can create recipes" ON public.content_recipes
FOR INSERT WITH CHECK (
  has_role(auth.uid(), 'strategist'::app_role) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Staff can update recipes" ON public.content_recipes
FOR UPDATE USING (
  has_role(auth.uid(), 'strategist'::app_role) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Staff can delete recipes" ON public.content_recipes
FOR DELETE USING (
  has_role(auth.uid(), 'strategist'::app_role) OR 
  has_role(auth.uid(), 'admin'::app_role)
);

-- Create updated_at trigger for content_recipes
CREATE TRIGGER update_content_recipes_updated_at
BEFORE UPDATE ON public.content_recipes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();