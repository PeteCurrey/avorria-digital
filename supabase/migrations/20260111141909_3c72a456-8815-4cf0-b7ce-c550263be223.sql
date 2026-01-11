-- Drop conflicting storage policies if they exist, then recreate them
DROP POLICY IF EXISTS "Public can view audit reports" ON storage.objects;
DROP POLICY IF EXISTS "Service role can upload audit reports" ON storage.objects;

-- Allow public read access to audit reports storage
CREATE POLICY "Public can view audit reports" 
  ON storage.objects FOR SELECT 
  USING (bucket_id = 'audit-reports');

-- Allow anyone to upload to audit-reports (edge functions)
CREATE POLICY "Anyone can upload audit reports"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'audit-reports');