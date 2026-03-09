
CREATE TABLE public.client_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  integration_type text NOT NULL,
  platform text NOT NULL,
  display_name text,
  credentials jsonb DEFAULT '{}'::jsonb,
  config jsonb DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  last_synced_at timestamp with time zone,
  sync_status text DEFAULT 'idle',
  error_message text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (client_id, platform, integration_type)
);

ALTER TABLE public.client_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff can manage client integrations"
ON public.client_integrations
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'strategist'::app_role));

CREATE POLICY "Clients can view their own integrations"
ON public.client_integrations
FOR SELECT
TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.clients
  WHERE clients.id = client_integrations.client_id
  AND clients.owner_id = auth.uid()
));

CREATE TRIGGER update_client_integrations_updated_at
  BEFORE UPDATE ON public.client_integrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
