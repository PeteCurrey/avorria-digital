import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import Pricing from '@/views/Pricing';

export const metadata: Metadata = {
  title: routeMetadata['/pricing'].title,
  description: routeMetadata['/pricing'].description,
  alternates: {
    canonical: routeMetadata['/pricing'].canonical,
  },
};

export default Pricing;

