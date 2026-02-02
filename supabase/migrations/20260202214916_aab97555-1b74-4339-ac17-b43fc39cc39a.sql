-- Create enum for project types
CREATE TYPE public.project_type AS ENUM ('website', 'seo', 'ongoing', 'branding');

-- Create enum for project status
CREATE TYPE public.project_status AS ENUM ('discovery', 'in_progress', 'review', 'launched', 'maintenance');

-- Create enum for asset types
CREATE TYPE public.asset_type AS ENUM ('screenshot_before', 'screenshot_after', 'wireframe', 'technical_drawing', 'seo_proposal', 'roadmap', 'pricing_proposal', 'contract', 'other');

-- Create enum for invoice status
CREATE TYPE public.invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');

-- Create client_projects table
CREATE TABLE public.client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  project_type project_type NOT NULL DEFAULT 'website',
  status project_status NOT NULL DEFAULT 'discovery',
  live_url TEXT,
  staging_url TEXT,
  start_date DATE,
  target_launch_date DATE,
  launched_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create project_assets table
CREATE TABLE public.project_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.client_projects(id) ON DELETE CASCADE NOT NULL,
  asset_type asset_type NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  position INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.client_projects(id) ON DELETE SET NULL,
  user_id UUID NOT NULL,
  invoice_number TEXT NOT NULL UNIQUE,
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'GBP',
  status invoice_status NOT NULL DEFAULT 'draft',
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  line_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  notes TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  payment_method TEXT,
  transaction_id TEXT,
  paid_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  notes TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create client_analytics_connections table
CREATE TABLE public.client_analytics_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.client_projects(id) ON DELETE CASCADE,
  ga4_property_id TEXT,
  gsc_property TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  credentials_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(client_id, project_id)
);

-- Enable RLS on all tables
ALTER TABLE public.client_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_analytics_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_projects
CREATE POLICY "Staff can view all projects" ON public.client_projects
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can create projects" ON public.client_projects
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update projects" ON public.client_projects
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can delete projects" ON public.client_projects
  FOR DELETE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view their own projects" ON public.client_projects
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for project_assets
CREATE POLICY "Staff can view all assets" ON public.project_assets
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can create assets" ON public.project_assets
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update assets" ON public.project_assets
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can delete assets" ON public.project_assets
  FOR DELETE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view assets for their projects" ON public.project_assets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.client_projects
      WHERE client_projects.id = project_assets.project_id
      AND client_projects.user_id = auth.uid()
    )
  );

-- RLS Policies for invoices
CREATE POLICY "Staff can view all invoices" ON public.invoices
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can create invoices" ON public.invoices
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update invoices" ON public.invoices
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can delete invoices" ON public.invoices
  FOR DELETE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view their own invoices" ON public.invoices
  FOR SELECT USING (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Staff can view all payments" ON public.payments
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can create payments" ON public.payments
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update payments" ON public.payments
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view payments for their invoices" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.invoices
      WHERE invoices.id = payments.invoice_id
      AND invoices.user_id = auth.uid()
    )
  );

-- RLS Policies for client_analytics_connections
CREATE POLICY "Staff can view all analytics connections" ON public.client_analytics_connections
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can manage analytics connections" ON public.client_analytics_connections
  FOR ALL USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Clients can view their own analytics connections" ON public.client_analytics_connections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.clients
      WHERE clients.id = client_analytics_connections.client_id
      AND clients.owner_id = auth.uid()
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_client_projects_updated_at
  BEFORE UPDATE ON public.client_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_project_assets_updated_at
  BEFORE UPDATE ON public.project_assets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_client_analytics_connections_updated_at
  BEFORE UPDATE ON public.client_analytics_connections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_client_projects_client_id ON public.client_projects(client_id);
CREATE INDEX idx_client_projects_user_id ON public.client_projects(user_id);
CREATE INDEX idx_project_assets_project_id ON public.project_assets(project_id);
CREATE INDEX idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX idx_payments_invoice_id ON public.payments(invoice_id);

-- Create private storage bucket for client assets
INSERT INTO storage.buckets (id, name, public) VALUES ('client-assets', 'client-assets', false);

-- Storage policies for client-assets bucket
CREATE POLICY "Staff can upload client assets" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'client-assets' AND
    (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Staff can view all client assets" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'client-assets' AND
    (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Staff can update client assets" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'client-assets' AND
    (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Staff can delete client assets" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'client-assets' AND
    (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'))
  );

CREATE POLICY "Clients can view their own assets" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'client-assets' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );