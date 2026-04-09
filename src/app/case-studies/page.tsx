import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import CaseStudies from '@/views/CaseStudies';

export const metadata: Metadata = {
  title: routeMetadata['/case-studies'].title,
  description: routeMetadata['/case-studies'].description,
  alternates: {
    canonical: routeMetadata['/case-studies'].canonical,
  },
};

export default CaseStudies;

