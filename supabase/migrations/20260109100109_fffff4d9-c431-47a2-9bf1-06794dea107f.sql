-- Create audit-reports storage bucket for storing generated PDF audits
INSERT INTO storage.buckets (id, name, public)
VALUES ('audit-reports', 'audit-reports', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to audit reports (for download links)
CREATE POLICY "Public can view audit reports"
ON storage.objects FOR SELECT
USING (bucket_id = 'audit-reports');

-- Allow edge functions (service role) to upload audit reports
CREATE POLICY "Service role can upload audit reports"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'audit-reports');

-- Allow service role to delete audit reports
CREATE POLICY "Service role can delete audit reports"
ON storage.objects FOR DELETE
USING (bucket_id = 'audit-reports');