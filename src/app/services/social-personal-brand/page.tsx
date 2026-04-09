import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import SocialPersonalBrand from '@/views/SocialPersonalBrand';

export const metadata: Metadata = {
  title: routeMetadata['/services/social-personal-brand'].title,
  description: routeMetadata['/services/social-personal-brand'].description,
  alternates: {
    canonical: routeMetadata['/services/social-personal-brand'].canonical,
  },
};

export default SocialPersonalBrand;

