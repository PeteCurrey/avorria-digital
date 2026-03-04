
-- Create team_members table
CREATE TABLE public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL DEFAULT '',
  initials text NOT NULL DEFAULT '',
  photo_url text,
  linkedin_url text,
  email text,
  phone text,
  display_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published team members"
  ON public.team_members FOR SELECT USING (is_published = true);

CREATE POLICY "Staff can view all team members"
  ON public.team_members FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

CREATE POLICY "Staff can create team members"
  ON public.team_members FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

CREATE POLICY "Staff can update team members"
  ON public.team_members FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

CREATE POLICY "Staff can delete team members"
  ON public.team_members FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

INSERT INTO storage.buckets (id, name, public) VALUES ('team-photos', 'team-photos', true);

CREATE POLICY "Anyone can view team photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'team-photos');

CREATE POLICY "Staff can upload team photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'team-photos' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role)));

CREATE POLICY "Staff can update team photos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'team-photos' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role)));

CREATE POLICY "Staff can delete team photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'team-photos' AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role)));

INSERT INTO public.team_members (full_name, title, bio, initials, display_order) VALUES
('James Hartley', 'Founder & Strategy Lead', 'Spent a decade inside B2B and SaaS businesses watching agencies burn budgets on vanity metrics. Started Avorria to build the agency he wished he''d hired — one that thinks like an owner, not a supplier.', 'JH', 0),
('Sophie Reynolds', 'Head of SEO & Technical', 'Former in-house SEO lead for a £40M e-commerce brand. Obsessed with site architecture, Core Web Vitals and the kind of technical detail that actually moves rankings — not just blog posts.', 'SR', 1),
('Marcus Keane', 'Head of Paid Media & CRO', 'Has managed over £8M in ad spend across Google, Meta and LinkedIn. Believes every pound should be accountable and that landing pages matter more than audience targeting.', 'MK', 2),
('Ava Linton', 'Head of Design & Development', 'Designs websites that convert, not just look good. Background in UX research and front-end development means every layout decision is backed by data and built to perform.', 'AL', 3);
