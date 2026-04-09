import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import WebDesign from '@/views/WebDesign';

export const metadata: Metadata = {
  title: routeMetadata['/services/web-design'].title,
  description: routeMetadata['/services/web-design'].description,
  alternates: {
    canonical: routeMetadata['/services/web-design'].canonical,
  },
};

export default WebDesign;

