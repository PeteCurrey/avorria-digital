import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import ContentEmail from '@/views/ContentEmail';

export const metadata: Metadata = {
  title: routeMetadata['/services/content-email'].title,
  description: routeMetadata['/services/content-email'].description,
  alternates: {
    canonical: routeMetadata['/services/content-email'].canonical,
  },
};

export default ContentEmail;

