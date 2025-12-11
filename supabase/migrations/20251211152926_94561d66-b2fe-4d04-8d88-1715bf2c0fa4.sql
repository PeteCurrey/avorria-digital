-- Create storage bucket for case study images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'case-study-images', 
  'case-study-images', 
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Allow anyone to view public images
CREATE POLICY "Public can view case study images"
ON storage.objects FOR SELECT
USING (bucket_id = 'case-study-images');

-- Allow authenticated staff to upload images
CREATE POLICY "Staff can upload case study images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'case-study-images' 
  AND (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'))
);

-- Allow staff to update images
CREATE POLICY "Staff can update case study images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'case-study-images' 
  AND (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'))
);

-- Allow staff to delete images
CREATE POLICY "Staff can delete case study images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'case-study-images' 
  AND (has_role(auth.uid(), 'strategist') OR has_role(auth.uid(), 'admin'))
);

-- Update case_studies table to support multiple before/after pairs
ALTER TABLE public.case_studies 
ADD COLUMN IF NOT EXISTS before_after_pairs jsonb DEFAULT '[]'::jsonb;