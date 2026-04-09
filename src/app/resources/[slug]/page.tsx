import { Metadata } from 'next';
import { routeMetadata } from '@/data/routeMetadata';
import ResourceDetail from '@/views/ResourceDetail';
import { resources } from '@/data/resources';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return resources.map((res) => ({
    slug: res.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const path = `/resources/${slug}`;
  const meta = routeMetadata[path];

  if (!meta) {
    return {
      title: 'Marketing Resource | Avorria',
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

export default async function ResourceDetailPage({ params }: Props) {
  return <ResourceDetail />;
}
