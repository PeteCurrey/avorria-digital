import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import PaidMedia from '@/views/PaidMedia';

export const metadata: Metadata = {
  title: routeMetadata['/services/paid-media'].title,
  description: routeMetadata['/services/paid-media'].description,
  alternates: {
    canonical: routeMetadata['/services/paid-media'].canonical,
  },
};

export default PaidMedia;

