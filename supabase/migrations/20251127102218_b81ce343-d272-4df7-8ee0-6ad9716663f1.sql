-- Update the handle_new_user function to auto-assign role based on metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_type TEXT;
  assigned_role public.app_role;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );

  -- Get user type from metadata, default to 'client'
  user_type := COALESCE(NEW.raw_user_meta_data->>'user_type', 'client');
  
  -- Assign role based on user type
  assigned_role := CASE user_type
    WHEN 'platform' THEN 'strategist'::public.app_role
    WHEN 'admin' THEN 'admin'::public.app_role
    WHEN 'specialist' THEN 'specialist'::public.app_role
    ELSE 'client'::public.app_role
  END;
  
  -- Insert role for the user
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, assigned_role);
  
  RETURN NEW;
END;
$$;