import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Quote } from "lucide-react";
import { trackEvent } from "@/lib/tracking";
import { getCaseStudyBySlug, getRelatedCaseStudies } from "@/data/caseStudies";
import { CaseHero } from "@/components/case-studies/CaseHero";
import { CaseTimeline } from "@/components/case-studies/CaseTimeline";
import { CaseMetrics } from "@/components/case-studies/CaseMetrics";
import { CaseGallery } from "@/components/case-studies/CaseGallery";
import { BeforeAfterSlider } from "@/components/case-studies/BeforeAfterSlider";
import { CaseCTACluster } from "@/components/case-studies/CaseCTACluster";
import { RelatedProjects } from "@/components/case-studies/RelatedProjects";

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getCaseStudyBySlug(slug) : null;

  useEffect(() => {
    if (caseStudy) {
      trackEvent("case_detail_viewed", { case_slug: slug, sector: caseStudy.sector });
    }
  }, [slug, caseStudy]);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(220,25%,8%)]">
        <div className="text-center">
          <h1 className="text-3xl font-light text-white mb-4">Case Study Not Found</h1>
          <Button asChild>
            <Link to="/case-studies">View All Case Studies</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedProjects = getRelatedCaseStudies(caseStudy.slug, caseStudy.relatedSlugs);

  const handleDownloadPDF = () => {
    trackEvent("case_downloaded_pdf", { case_slug: slug });
    // PDF generation would go here
  };

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | Avorria Case Study</title>
        <meta name="description" content={caseStudy.subheadline} />
        <link rel="canonical" href={`https://avorria.com/case-studies/${slug}`} />
      </Helmet>

      <div className="min-h-screen bg-[hsl(220,25%,8%)]">
        {/* Hero */}
        <CaseHero
          headline={caseStudy.headline}
          subheadline={caseStudy.subheadline}
          backgroundMedia={caseStudy.heroMedia}
          kpiBadges={caseStudy.kpiBadges}
          client={caseStudy.client}
          sector={caseStudy.sector}
          ctaText="Get similar results"
          ctaHref="/contact"
        />

        {/* Summary Row */}
        <section className="py-8 px-6 border-b border-white/10">
          <div className="container mx-auto flex flex-wrap justify-center gap-8 text-center">
            <div><span className="text-white/50 text-sm">Client</span><div className="text-white">{caseStudy.client}</div></div>
            <div><span className="text-white/50 text-sm">Sector</span><div className="text-white">{caseStudy.sector}</div></div>
            <div><span className="text-white/50 text-sm">Timeframe</span><div className="text-white">{caseStudy.timeframe}</div></div>
            <div><span className="text-white/50 text-sm">Services</span><div className="text-white">{caseStudy.services.join(", ")}</div></div>
          </div>
        </section>

        {/* Problem */}
        <section className="py-20 px-6 section-dark">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">The Challenge</span>
              <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed">{caseStudy.problem}</p>
            </motion.div>
          </div>
        </section>

        {/* Approach Timeline */}
        <section className="py-20 px-6 section-gradient">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">Our Approach</span>
              <h2 className="text-3xl md:text-4xl font-light text-white">How we delivered results</h2>
            </motion.div>
            <CaseTimeline steps={caseStudy.approach} />
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-20 px-6 section-dark">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">The Results</span>
              <h2 className="text-3xl md:text-4xl font-light text-white">Measurable outcomes</h2>
            </motion.div>
            <CaseMetrics metrics={caseStudy.outcomes} />
          </div>
        </section>

        {/* Before/After */}
        {caseStudy.beforeMedia && caseStudy.afterMedia && (
          <section className="py-20 px-6 section-dark">
            <div className="container mx-auto max-w-4xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <h2 className="text-3xl font-light text-white">Before & After</h2>
              </motion.div>
              <BeforeAfterSlider beforeImage={caseStudy.beforeMedia} afterImage={caseStudy.afterMedia} />
            </div>
          </section>
        )}

        {/* Gallery */}
        {caseStudy.galleryMedia.length > 0 && (
          <section className="py-20 px-6 section-dark">
            <div className="container mx-auto max-w-5xl">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                <h2 className="text-3xl font-light text-white text-center">Project Gallery</h2>
              </motion.div>
              <CaseGallery media={caseStudy.galleryMedia} />
            </div>
          </section>
        )}

        {/* Quote */}
        {caseStudy.quote && (
          <section className="py-20 px-6 section-gradient">
            <div className="container mx-auto max-w-3xl text-center">
              <Quote className="w-12 h-12 text-accent/30 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-3xl text-white/90 font-light italic mb-8">"{caseStudy.quote.text}"</blockquote>
              <div className="text-white font-medium">{caseStudy.quote.name}</div>
              <div className="text-white/60">{caseStudy.quote.role}{caseStudy.quote.company && `, ${caseStudy.quote.company}`}</div>
            </div>
          </section>
        )}

        {/* CTA Cluster */}
        <CaseCTACluster onDownloadPDF={handleDownloadPDF} />

        {/* Related Projects */}
        <RelatedProjects projects={relatedProjects} />

        {/* Back link */}
        <section className="py-12 px-6 section-dark border-t border-white/5">
          <div className="container mx-auto">
            <Button variant="ghost" asChild className="text-white/60 hover:text-white">
              <Link to="/case-studies"><ArrowLeft className="mr-2" size={18} />All Case Studies</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudyDetail;
