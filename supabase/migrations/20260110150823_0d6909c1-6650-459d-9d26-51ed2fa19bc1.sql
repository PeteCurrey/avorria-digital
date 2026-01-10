-- Create AI Generated Content table
CREATE TABLE public.ai_generated_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content_type TEXT NOT NULL CHECK (content_type IN ('social', 'email', 'blog', 'newsletter')),
  platform TEXT CHECK (platform IN ('twitter', 'linkedin', 'instagram', 'facebook', 'email', 'blog')),
  title TEXT,
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved', 'scheduled', 'published')),
  scheduled_for TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  ai_prompt TEXT,
  tone TEXT DEFAULT 'professional',
  target_audience TEXT,
  hashtags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_generated_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for AI Generated Content
CREATE POLICY "Authenticated users can view all content"
ON public.ai_generated_content
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create content"
ON public.ai_generated_content
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update content"
ON public.ai_generated_content
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete content"
ON public.ai_generated_content
FOR DELETE
USING (auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_ai_generated_content_updated_at
BEFORE UPDATE ON public.ai_generated_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create Newsletter Subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  preferences JSONB DEFAULT '{}',
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Newsletter Subscribers
CREATE POLICY "Authenticated users can view subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can subscribe"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can update subscribers"
ON public.newsletter_subscribers
FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Create Newsletters table
CREATE TABLE public.newsletters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  preview_text TEXT,
  content_html TEXT,
  content_json JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent')),
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  recipient_count INTEGER DEFAULT 0,
  open_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Newsletters
CREATE POLICY "Authenticated users can view newsletters"
ON public.newsletters
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can create newsletters"
ON public.newsletters
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update newsletters"
ON public.newsletters
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete newsletters"
ON public.newsletters
FOR DELETE
USING (auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_newsletters_updated_at
BEFORE UPDATE ON public.newsletters
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create SEO Rankings table for historical tracking
CREATE TABLE public.seo_rankings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword TEXT NOT NULL,
  url TEXT NOT NULL,
  position INTEGER,
  previous_position INTEGER,
  search_volume INTEGER,
  difficulty NUMERIC(5,2),
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'dataforseo', 'serpapi', 'gsc')),
  recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE public.seo_rankings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for SEO Rankings
CREATE POLICY "Authenticated users can view rankings"
ON public.seo_rankings
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert rankings"
ON public.seo_rankings
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Create SEO Integrations table for storing API configurations
CREATE TABLE public.seo_integrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  integration_type TEXT NOT NULL CHECK (integration_type IN ('google_analytics', 'google_search_console', 'dataforseo', 'serpapi')),
  is_active BOOLEAN DEFAULT false,
  config JSONB DEFAULT '{}',
  last_sync_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seo_integrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for SEO Integrations
CREATE POLICY "Authenticated users can view integrations"
ON public.seo_integrations
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage integrations"
ON public.seo_integrations
FOR ALL
USING (auth.uid() IS NOT NULL);

-- Trigger for updated_at
CREATE TRIGGER update_seo_integrations_updated_at
BEFORE UPDATE ON public.seo_integrations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();