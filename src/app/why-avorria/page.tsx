import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import WhyAvorria from '@/views/WhyAvorria';

export const metadata: Metadata = {
  title: routeMetadata['/why-avorria'].title,
  description: routeMetadata['/why-avorria'].description,
  alternates: {
    canonical: routeMetadata['/why-avorria'].canonical,
  },
};

export default WhyAvorria;

