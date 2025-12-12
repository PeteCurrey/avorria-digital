-- Add admin role to your user account (pete@entirefm.com)
INSERT INTO public.user_roles (user_id, role)
VALUES ('d673b4da-6769-4fff-8e9c-1f98751afb13', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;