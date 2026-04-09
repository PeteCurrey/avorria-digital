import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import About from '@/views/About';

export const metadata: Metadata = {
  title: routeMetadata['/about'].title,
  description: routeMetadata['/about'].description,
  alternates: {
    canonical: routeMetadata['/about'].canonical,
  },
};

export default About;

