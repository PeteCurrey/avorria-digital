import { Metadata } from 'next';
import { routeMetadata, locationList } from '@/data/routeMetadata';
import DynamicLanding from '@/views/DynamicLanding';

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
  const path = `/seo-agency/${locationSlug}`;
  const meta = routeMetadata[path];

  if (!meta) {
    return {
      title: 'SEO Agency | Avorria',
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

export default async function SEOAgencyLocationPage({ params }: Props) {
  return <DynamicLanding />;
}
