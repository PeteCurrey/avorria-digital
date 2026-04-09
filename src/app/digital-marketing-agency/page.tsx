import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import DigitalMarketingAgencyPillar from '@/views/DigitalMarketingAgencyPillar';

export const metadata: Metadata = {
  title: routeMetadata['/digital-marketing-agency'].title,
  description: routeMetadata['/digital-marketing-agency'].description,
  alternates: {
    canonical: routeMetadata['/digital-marketing-agency'].canonical,
  },
};

export default DigitalMarketingAgencyPillar;

