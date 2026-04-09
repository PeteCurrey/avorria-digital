import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import Analytics from '@/views/Analytics';

export const metadata: Metadata = {
  title: routeMetadata['/services/analytics'].title,
  description: routeMetadata['/services/analytics'].description,
  alternates: {
    canonical: routeMetadata['/services/analytics'].canonical,
  },
};

export default Analytics;

