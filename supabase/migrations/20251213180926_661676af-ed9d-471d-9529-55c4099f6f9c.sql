-- Create enum for audit status
CREATE TYPE public.audit_status AS ENUM ('pending', 'processing', 'completed', 'failed');

-- Create enum for proposal status
CREATE TYPE public.proposal_status AS ENUM ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired');

-- Client websites table - stores client website URLs and configurations
CREATE TABLE public.client_websites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  name TEXT NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  google_analytics_property_id TEXT,
  google_search_console_property TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Website audits table - stores AI-generated audit results
CREATE TABLE public.website_audits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id UUID NOT NULL REFERENCES public.client_websites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status audit_status NOT NULL DEFAULT 'pending',
  overall_score INTEGER,
  strengths JSONB DEFAULT '[]'::jsonb,
  seo_opportunities JSONB DEFAULT '[]'::jsonb,
  technical_issues JSONB DEFAULT '[]'::jsonb,
  quick_wins JSONB DEFAULT '[]'::jsonb,
  medium_term JSONB DEFAULT '[]'::jsonb,
  long_term JSONB DEFAULT '[]'::jsonb,
  raw_response JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Competitor analyses table
CREATE TABLE public.competitor_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id UUID NOT NULL REFERENCES public.client_websites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  competitor_url TEXT NOT NULL,
  company_name TEXT,
  positioning TEXT,
  strengths JSONB DEFAULT '[]'::jsonb,
  weaknesses JSONB DEFAULT '[]'::jsonb,
  opportunities JSONB DEFAULT '[]'::jsonb,
  marketing_tactics JSONB DEFAULT '[]'::jsonb,
  threat_level TEXT,
  raw_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Keyword tracking table
CREATE TABLE public.keyword_tracking (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website_id UUID NOT NULL REFERENCES public.client_websites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  keyword TEXT NOT NULL,
  current_position INTEGER,
  previous_position INTEGER,
  search_volume INTEGER,
  difficulty INTEGER,
  intent TEXT,
  tracked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Proposals table
CREATE TABLE public.proposals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status proposal_status NOT NULL DEFAULT 'draft',
  services JSONB DEFAULT '[]'::jsonb,
  pricing JSONB DEFAULT '{}'::jsonb,
  content JSONB DEFAULT '{}'::jsonb,
  valid_until TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  viewed_at TIMESTAMP WITH TIME ZONE,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- AI conversations table
CREATE TABLE public.ai_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  messages JSONB DEFAULT '[]'::jsonb,
  sentiment TEXT,
  handoff_requested BOOLEAN DEFAULT false,
  handoff_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Client activities table
CREATE TABLE public.client_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.client_websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keyword_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for client_websites
CREATE POLICY "Users can view their own websites" ON public.client_websites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own websites" ON public.client_websites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own websites" ON public.client_websites
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own websites" ON public.client_websites
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all websites" ON public.client_websites
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- RLS Policies for website_audits
CREATE POLICY "Users can view their own audits" ON public.website_audits
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own audits" ON public.website_audits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own audits" ON public.website_audits
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all audits" ON public.website_audits
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- RLS Policies for competitor_analyses
CREATE POLICY "Users can view their own competitor analyses" ON public.competitor_analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own competitor analyses" ON public.competitor_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own competitor analyses" ON public.competitor_analyses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all competitor analyses" ON public.competitor_analyses
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- RLS Policies for keyword_tracking
CREATE POLICY "Users can view their own keywords" ON public.keyword_tracking
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own keywords" ON public.keyword_tracking
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own keywords" ON public.keyword_tracking
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own keywords" ON public.keyword_tracking
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all keywords" ON public.keyword_tracking
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- RLS Policies for proposals
CREATE POLICY "Staff can view all proposals" ON public.proposals
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can create proposals" ON public.proposals
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can update proposals" ON public.proposals
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can delete proposals" ON public.proposals
  FOR DELETE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- RLS Policies for ai_conversations
CREATE POLICY "Users can view their own conversations" ON public.ai_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all conversations" ON public.ai_conversations
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create conversations" ON public.ai_conversations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Staff can update conversations" ON public.ai_conversations
  FOR UPDATE USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- RLS Policies for client_activities
CREATE POLICY "Users can view their own activities" ON public.client_activities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Staff can view all activities" ON public.client_activities
  FOR SELECT USING (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Staff can create activities for users" ON public.client_activities
  FOR INSERT WITH CHECK (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_client_websites_updated_at
  BEFORE UPDATE ON public.client_websites
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_website_audits_updated_at
  BEFORE UPDATE ON public.website_audits
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_competitor_analyses_updated_at
  BEFORE UPDATE ON public.competitor_analyses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_keyword_tracking_updated_at
  BEFORE UPDATE ON public.keyword_tracking
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_proposals_updated_at
  BEFORE UPDATE ON public.proposals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_conversations_updated_at
  BEFORE UPDATE ON public.ai_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for performance
CREATE INDEX idx_client_websites_user_id ON public.client_websites(user_id);
CREATE INDEX idx_website_audits_website_id ON public.website_audits(website_id);
CREATE INDEX idx_website_audits_user_id ON public.website_audits(user_id);
CREATE INDEX idx_competitor_analyses_website_id ON public.competitor_analyses(website_id);
CREATE INDEX idx_keyword_tracking_website_id ON public.keyword_tracking(website_id);
CREATE INDEX idx_proposals_lead_id ON public.proposals(lead_id);
CREATE INDEX idx_ai_conversations_session_id ON public.ai_conversations(session_id);
CREATE INDEX idx_client_activities_user_id ON public.client_activities(user_id);