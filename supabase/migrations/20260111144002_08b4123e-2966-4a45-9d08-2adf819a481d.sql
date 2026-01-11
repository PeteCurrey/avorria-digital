-- Enhance website_blueprints table with project management fields
ALTER TABLE public.website_blueprints 
ADD COLUMN IF NOT EXISTS project_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS assigned_to UUID,
ADD COLUMN IF NOT EXISTS stage TEXT DEFAULT 'discovery',
ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'normal',
ADD COLUMN IF NOT EXISTS estimated_value NUMERIC,
ADD COLUMN IF NOT EXISTS estimated_hours INTEGER,
ADD COLUMN IF NOT EXISTS proposal_url TEXT,
ADD COLUMN IF NOT EXISTS contract_signed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS kickoff_date DATE,
ADD COLUMN IF NOT EXISTS target_launch DATE,
ADD COLUMN IF NOT EXISTS internal_notes TEXT,
ADD COLUMN IF NOT EXISTS pdf_url TEXT;

-- Create function to generate project codes
CREATE OR REPLACE FUNCTION public.generate_project_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.project_code IS NULL THEN
    NEW.project_code := 'AVR-' || TO_CHAR(NOW(), 'YYYY') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 4));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate project codes
DROP TRIGGER IF EXISTS generate_project_code_trigger ON public.website_blueprints;
CREATE TRIGGER generate_project_code_trigger
BEFORE INSERT ON public.website_blueprints
FOR EACH ROW
EXECUTE FUNCTION public.generate_project_code();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_website_blueprints_stage ON public.website_blueprints(stage);
CREATE INDEX IF NOT EXISTS idx_website_blueprints_priority ON public.website_blueprints(priority);
CREATE INDEX IF NOT EXISTS idx_website_blueprints_project_code ON public.website_blueprints(project_code);

-- Update existing rows with project codes
UPDATE public.website_blueprints 
SET project_code = 'AVR-' || TO_CHAR(created_at, 'YYYY') || '-' || UPPER(SUBSTRING(MD5(id::TEXT) FROM 1 FOR 4))
WHERE project_code IS NULL;