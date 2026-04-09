import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import Resources from '@/views/Resources';

export const metadata: Metadata = {
  title: routeMetadata['/resources'].title,
  description: routeMetadata['/resources'].description,
  alternates: {
    canonical: routeMetadata['/resources'].canonical,
  },
};

export default Resources;

