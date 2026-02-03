-- 1. Add pair_id to project_assets for linking before/after screenshots
ALTER TABLE project_assets 
ADD COLUMN pair_id TEXT;

COMMENT ON COLUMN project_assets.pair_id IS 
'Groups before/after screenshots into pairs (e.g., "homepage", "about-page")';

-- 2. Create project_asset_comments table for client feedback
CREATE TABLE project_asset_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID NOT NULL REFERENCES project_assets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  comment TEXT NOT NULL,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE project_asset_comments ENABLE ROW LEVEL SECURITY;

-- Policies: Clients can view comments on their project assets
CREATE POLICY "Clients can view comments on their project assets"
  ON project_asset_comments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_assets pa
      JOIN client_projects cp ON pa.project_id = cp.id
      WHERE pa.id = project_asset_comments.asset_id
      AND cp.user_id = auth.uid()
    )
  );

-- Staff can view all comments
CREATE POLICY "Staff can view all comments"
  ON project_asset_comments FOR SELECT
  USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Users can create comments on assets they can view
CREATE POLICY "Users can create comments"
  ON project_asset_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Staff can update comments (mark resolved)
CREATE POLICY "Staff can update comments"
  ON project_asset_comments FOR UPDATE
  USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Staff can delete comments
CREATE POLICY "Staff can delete comments"
  ON project_asset_comments FOR DELETE
  USING (has_role(auth.uid(), 'strategist'::app_role) OR has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_project_asset_comments_updated_at
  BEFORE UPDATE ON project_asset_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();