import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import SEOAgencyPillar from '@/views/SEOAgencyPillar';

export const metadata: Metadata = {
  title: routeMetadata['/seo-agency'].title,
  description: routeMetadata['/seo-agency'].description,
  alternates: {
    canonical: routeMetadata['/seo-agency'].canonical,
  },
};

export default SEOAgencyPillar;

