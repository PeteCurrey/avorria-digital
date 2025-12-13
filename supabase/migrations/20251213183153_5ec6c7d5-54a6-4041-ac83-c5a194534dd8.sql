-- Fix profiles table RLS - drop public exposure policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;