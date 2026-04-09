import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import PaidMediaAgencyPillar from '@/views/PaidMediaAgencyPillar';

export const metadata: Metadata = {
  title: routeMetadata['/paid-media-agency'].title,
  description: routeMetadata['/paid-media-agency'].description,
  alternates: {
    canonical: routeMetadata['/paid-media-agency'].canonical,
  },
};

export default PaidMediaAgencyPillar;

