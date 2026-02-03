-- Phase 3: Create notifications table and triggers for real-time notifications

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT NOT NULL DEFAULT 'system', -- 'lead', 'content', 'report', 'alert', 'system'
  link TEXT, -- URL to navigate to when clicked
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Staff can see all notifications (for admin panel)
CREATE POLICY "Staff can view all notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'strategist'::app_role)
);

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Staff can create notifications
CREATE POLICY "Staff can create notifications"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'strategist'::app_role)
);

-- Staff can update notifications (mark as read, etc)
CREATE POLICY "Staff can update notifications"
ON public.notifications
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'strategist'::app_role)
);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
ON public.notifications
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- Staff can delete notifications
CREATE POLICY "Staff can delete notifications"
ON public.notifications
FOR DELETE
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role) OR 
  has_role(auth.uid(), 'strategist'::app_role)
);

-- Create function to notify staff on new lead (with proper search_path)
CREATE OR REPLACE FUNCTION public.notify_on_new_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Notify all staff users
  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT ur.user_id, 
    'New lead received', 
    NEW.name || ' submitted a contact form from ' || COALESCE(NEW.source, 'website'),
    'lead',
    '/admin?tab=leads'
  FROM public.user_roles ur
  WHERE ur.role IN ('admin', 'strategist');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new leads
DROP TRIGGER IF EXISTS lead_notification_trigger ON public.leads;
CREATE TRIGGER lead_notification_trigger
AFTER INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.notify_on_new_lead();

-- Create function to notify staff on new report
CREATE OR REPLACE FUNCTION public.notify_on_new_report()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Notify all staff users
  INSERT INTO public.notifications (user_id, title, message, type, link)
  SELECT ur.user_id, 
    'Report generated', 
    NEW.report_type || ' report is ready',
    'report',
    '/admin?tab=reporting'
  FROM public.user_roles ur
  WHERE ur.role IN ('admin', 'strategist');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new reports
DROP TRIGGER IF EXISTS report_notification_trigger ON public.generated_reports;
CREATE TRIGGER report_notification_trigger
AFTER INSERT ON public.generated_reports
FOR EACH ROW EXECUTE FUNCTION public.notify_on_new_report();

-- Create function to notify staff on content status change
CREATE OR REPLACE FUNCTION public.notify_on_content_published()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only notify when status changes to 'published'
  IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status <> 'published') THEN
    INSERT INTO public.notifications (user_id, title, message, type, link)
    SELECT ur.user_id, 
      'Content published', 
      COALESCE(NEW.title, 'Untitled') || ' has been published',
      'content',
      '/admin?tab=content-studio'
    FROM public.user_roles ur
    WHERE ur.role IN ('admin', 'strategist');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for content publication
DROP TRIGGER IF EXISTS content_notification_trigger ON public.content_calendar;
CREATE TRIGGER content_notification_trigger
AFTER INSERT OR UPDATE ON public.content_calendar
FOR EACH ROW EXECUTE FUNCTION public.notify_on_content_published();

-- Create index for faster queries
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);