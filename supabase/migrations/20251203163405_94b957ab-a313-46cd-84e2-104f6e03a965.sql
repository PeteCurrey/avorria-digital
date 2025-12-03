-- Create table for website blueprint submissions
CREATE TABLE public.website_blueprints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  budget TEXT,
  timeline TEXT,
  purpose TEXT NOT NULL,
  minimal INTEGER NOT NULL DEFAULT 50,
  bold INTEGER NOT NULL DEFAULT 50,
  palette TEXT NOT NULL,
  site_size TEXT NOT NULL,
  modules JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  straight_talking INTEGER NOT NULL DEFAULT 50,
  analytical INTEGER NOT NULL DEFAULT 50,
  understated INTEGER NOT NULL DEFAULT 50,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.website_blueprints ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (for lead capture, even non-authenticated)
CREATE POLICY "Anyone can submit blueprints"
ON public.website_blueprints
FOR INSERT
WITH CHECK (true);

-- Policy: Users can view their own blueprints
CREATE POLICY "Users can view their own blueprints"
ON public.website_blueprints
FOR SELECT
USING (auth.uid() = user_id OR user_id IS NULL);

-- Policy: Strategists and admins can view all blueprints
CREATE POLICY "Staff can view all blueprints"
ON public.website_blueprints
FOR SELECT
USING (
  public.has_role(auth.uid(), 'strategist') OR 
  public.has_role(auth.uid(), 'admin')
);

-- Policy: Staff can update blueprints
CREATE POLICY "Staff can update blueprints"
ON public.website_blueprints
FOR UPDATE
USING (
  public.has_role(auth.uid(), 'strategist') OR 
  public.has_role(auth.uid(), 'admin')
);

-- Trigger for updated_at
CREATE TRIGGER update_website_blueprints_updated_at
BEFORE UPDATE ON public.website_blueprints
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();