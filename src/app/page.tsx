import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import Home from '@/views/Home';

export const metadata: Metadata = {
  title: routeMetadata['/'].title,
  description: routeMetadata['/'].description,
  alternates: {
    canonical: routeMetadata['/'].canonical,
  },
};

export default Home;

