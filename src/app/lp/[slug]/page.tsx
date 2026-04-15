import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import LandingPageDetail from '@/views/LandingPageDetail';
import { getLandingPageBySlug } from '@/data/landingPages';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  // Extract all slugs from routeMetadata that start with /lp/
  return Object.keys(routeMetadata)
    .filter((path) => path.startsWith('/lp/'))
    .map((path) => ({
      slug: path.replace('/lp/', ''),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = `/lp/${slug}`;
  const meta = routeMetadata[path];

  if (!meta) {
    return {
      title: 'Digital Marketing | Avorria',
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

export default async function LandingPage({ params }: Props) {
  const { slug } = await params;

  // Resolve landing page server-side so content is in SSR HTML for Googlebot
  const landingPage = getLandingPageBySlug(slug) ?? null;

  return <LandingPageDetail landingPage={landingPage} />;
}
