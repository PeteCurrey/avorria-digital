import { Metadata } from 'next';
import { supabase } from '@/integrations/supabase/client';
import CaseStudyDetail from '@/views/CaseStudyDetail';
import { CaseStudyDB } from '@/hooks/useCaseStudies';

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
    alternates: {
      canonical: `https://avorria.com/case-studies/${slug}`,
    },
    openGraph: {
      type: 'article',
      title: `${study.title} | Avorria`,
      description: study.headline || study.subheadline,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;

  // Fetch data server-side so all content is in SSR HTML for Googlebot
  const { data: caseStudy } = await supabase
    .from('case_studies')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  const { data: allCaseStudies } = await supabase
    .from('case_studies')
    .select('*')
    .eq('is_published', true);

  return (
    <CaseStudyDetail
      initialCaseStudy={(caseStudy as unknown as CaseStudyDB) ?? null}
      initialAllCaseStudies={(allCaseStudies as unknown as CaseStudyDB[]) ?? []}
      slug={slug}
    />
  );
}
