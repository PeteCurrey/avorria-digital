
-- Target keywords for automated tracking
CREATE TABLE public.seo_target_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  target_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.seo_target_keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage target keywords" ON public.seo_target_keywords
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'strategist'))
  WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'strategist'));
