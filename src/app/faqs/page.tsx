import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import FAQs from '@/views/FAQs';

export const metadata: Metadata = {
  title: routeMetadata['/faqs'].title,
  description: routeMetadata['/faqs'].description,
  alternates: {
    canonical: routeMetadata['/faqs'].canonical,
  },
};

export default FAQs;

