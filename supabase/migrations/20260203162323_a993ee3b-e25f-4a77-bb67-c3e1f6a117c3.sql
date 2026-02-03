-- Phase 1: Fix profiles RLS policy to allow staff to view all profiles
-- This fixes the "Add Client" error by allowing admin/strategist users to see all profiles

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create a new combined policy that allows:
-- 1. Staff (admin/strategist) to view all profiles for the client linking dropdown
-- 2. Regular users to only view their own profile
CREATE POLICY "Users can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'strategist'::app_role) OR
  auth.uid() = id
);