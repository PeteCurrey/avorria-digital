-- Drop existing policy and recreate with authenticated role
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create a security definer function to safely fetch user role
-- This bypasses RLS and prevents recursive issues
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id uuid)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::text
  FROM public.user_roles
  WHERE user_id = _user_id
  ORDER BY 
    CASE role::text
      WHEN 'admin' THEN 1
      WHEN 'strategist' THEN 2
      WHEN 'specialist' THEN 3
      WHEN 'client' THEN 4
      ELSE 5
    END
  LIMIT 1
$$;