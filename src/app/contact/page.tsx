import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import Contact from '@/views/Contact';

export const metadata: Metadata = {
  title: routeMetadata['/contact'].title,
  description: routeMetadata['/contact'].description,
  alternates: {
    canonical: routeMetadata['/contact'].canonical,
  },
};

export default Contact;

