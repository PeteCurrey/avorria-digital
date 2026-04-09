import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import SEOServices from '@/views/SEOServices';

export const metadata: Metadata = {
  title: routeMetadata['/services/seo'].title,
  description: routeMetadata['/services/seo'].description,
  alternates: {
    canonical: routeMetadata['/services/seo'].canonical,
  },
};

export default SEOServices;

