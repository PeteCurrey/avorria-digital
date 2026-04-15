import { Metadata } from 'next';
import { routeMetadata, locationList } from '@/data/routeMetadata';
import DynamicLanding from '@/views/DynamicLanding';
import { getLandingPageBySlug } from '@/data/landingPages';
import { getServiceLocationPageBySlug } from '@/data/serviceLocationLandingPages';
import { getServiceBySlug } from '@/data/services';
import { getLocationBySlug } from '@/data/locations';

type Props = {
  params: Promise<{ locationSlug: string }>;
};

export async function generateStaticParams() {
  return locationList.map((slug) => ({
    locationSlug: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locationSlug } = await params;
  const path = `/paid-media-agency/${locationSlug}`;
  const meta = routeMetadata[path];

  if (!meta) {
    return {
      title: 'Paid Media Agency | Avorria',
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function PaidMediaLocationPage({ params }: Props) {
  const { locationSlug } = await params;
  const serviceSlug = 'paid-media';
  const potentialSlug = `${serviceSlug}-${locationSlug}`;

  // Resolve landing page server-side so content is in SSR HTML for Googlebot
  const landingPage =
    getServiceLocationPageBySlug(potentialSlug) ??
    getLandingPageBySlug(potentialSlug) ??
    null;

  const service = getServiceBySlug(serviceSlug) ?? null;
  const location = getLocationBySlug(locationSlug) ?? null;

  return <DynamicLanding landingPage={landingPage} service={service} location={location} />;
}
