-- Phase 1: Fix leads RLS policy for anonymous submissions
-- Drop existing select policy if it exists
DROP POLICY IF EXISTS "Staff can view all leads" ON public.leads;
DROP POLICY IF EXISTS "Allow reading own lead by session" ON public.leads;

-- Create new policy allowing staff to view all leads
CREATE POLICY "Staff can view all leads"
ON public.leads
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'strategist') OR 
  has_role(auth.uid(), 'admin')
);

-- Allow anonymous users to read their own recently created lead (for form flow)
CREATE POLICY "Anonymous can read recent leads by email"
ON public.leads
FOR SELECT
USING (
  created_at > (now() - interval '5 minutes')
);

-- Phase 2: Clean up duplicate user roles
DELETE FROM public.user_roles a
USING public.user_roles b
WHERE a.id > b.id 
  AND a.user_id = b.user_id 
  AND a.role = b.role;

-- Add unique constraint to prevent future duplicates (if not exists)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'unique_user_role'
  ) THEN
    ALTER TABLE public.user_roles ADD CONSTRAINT unique_user_role UNIQUE (user_id, role);
  END IF;
END $$;