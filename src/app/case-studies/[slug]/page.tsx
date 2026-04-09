import { Metadata } from 'next';
import { supabase } from '@/integrations/supabase/client';
import CaseStudyDetail from '@/views/CaseStudyDetail';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data: studies } = await supabase
    .from('case_studies')
    .select('slug')
    .eq('is_published', true);

  return (studies || []).map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: study } = await supabase
    .from('case_studies')
    .select('title, subheadline, headline')
    .eq('slug', slug)
    .single();

  if (!study) {
    return {
      title: 'Case Study | Avorria',
    };
  }

  return {
    title: `${study.title} | Case Study | Avorria`,
    description: study.headline || study.subheadline,
    openGraph: {
      type: 'article',
      title: `${study.title} | Avorria`,
      description: study.headline || study.subheadline,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  return <CaseStudyDetail />;
}
