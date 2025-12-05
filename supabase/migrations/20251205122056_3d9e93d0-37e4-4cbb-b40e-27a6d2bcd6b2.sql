-- Drop the old policy that allows viewing blueprints with null user_id
DROP POLICY IF EXISTS "Users can view their own blueprints" ON public.website_blueprints;

-- Create a new policy that only allows users to view their own blueprints (no null user_id access)
CREATE POLICY "Users can view their own blueprints" 
ON public.website_blueprints 
FOR SELECT 
USING (auth.uid() = user_id);