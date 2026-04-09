import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import Services from '@/views/Services';

export const metadata: Metadata = {
  title: routeMetadata['/services'].title,
  description: routeMetadata['/services'].description,
  alternates: {
    canonical: routeMetadata['/services'].canonical,
  },
};

export default Services;

