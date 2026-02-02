-- Fix security issue: leads table public exposure
-- Remove the overly permissive policy that allows anonymous reading of recent leads
-- This exposes customer contact details (email, phone, company) to anyone

DROP POLICY IF EXISTS "Anonymous can read recent leads by email" ON public.leads;

-- The existing policies are sufficient:
-- "Anyone can submit leads" - INSERT (needed for contact forms)
-- "Staff can view all leads" - SELECT for strategist/admin roles
-- "Staff can update leads" - UPDATE for strategist/admin roles  
-- "Staff can delete leads" - DELETE for strategist/admin roles