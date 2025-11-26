# Generic "SEO for [Industry]" Landing Page Template

This template is used to quickly create new industry-specific SEO landing pages.

## Field Guidance

### heroHeadline
**Pattern:** `"SEO for [Industry] that [primary commercial outcome]."`

**Examples:**
- "SEO for healthcare providers that fills appointment books."
- "SEO for education institutions that drives qualified applicant enquiries."
- "SEO for manufacturing that generates high-value B2B leads."

### heroSubheadline
**Pattern:** `"We shape SEO around how your buyers actually research and evaluate [industry offering] – and connect visibility to qualified enquiries and pipeline."`

**Examples:**
- "We shape SEO around how patients research healthcare providers – and connect visibility to qualified appointment bookings and enquiries."
- "We shape SEO around how B2B buyers evaluate manufacturing partners – and connect visibility to qualified RFQs and pipeline."

### problemBullets (5 bullets)
**Focus areas:**
1. Traffic vs leads disconnect specific to industry
2. Content not aligned to decision-makers / buyer journey in that industry
3. Technical or structural issues common in that industry (e.g., complex sites, multi-location challenges)
4. Lack of clear link between SEO and revenue for this industry
5. Competitive or market-specific challenge

**Examples for Healthcare:**
- "You rank for general health queries but not for the services that actually book appointments."
- "Your content reads like medical textbooks, not answers to patient questions."
- "Multi-location practices have inconsistent profiles and no clear local strategy."
- "You can't link organic traffic to appointment bookings or patient acquisition."
- "Competitors with weaker reputations dominate local search results."

### solutionBullets (5 bullets)
**Standard structure:**
1. "Keyword & topic strategy mapped to [industry] buyer stages."
2. "Pages and content structured around offers, outcomes and proof."
3. "[Industry-specific technical or local SEO elements]."
4. "Tracking wired into your CRM / sales process (where possible)."
5. "[Conversion optimization or reporting specific to industry]."

**Examples for Education:**
- "Keyword & topic strategy mapped to prospective student and parent research journeys."
- "Program pages and content structured around outcomes, career paths and social proof."
- "Local SEO for campus visibility and event-based content for open days."
- "Tracking wired into your admissions CRM to measure enquiry quality."
- "Reporting that shows which programs and pages drive qualified applications."

### keyMetrics (2-3 metrics)
**Pattern:**
- Use percentage uplift or multiplier metrics when available
- Focus on commercial outcomes (leads, pipeline, revenue) not vanity metrics
- Use placeholders until real case data available

**Placeholder examples:**
- "+X% increase in qualified enquiries"
- "X% reduction in cost per lead"
- "Pipeline up Xx from SEO in Y months"

### testimonialSnippet
**Tone:** Industry-appropriate, outcome-focused quote

**Structure:**
- Short (1-2 sentences)
- Mention the commercial impact or clarity gained
- Written in industry-appropriate language (e.g., clinical for healthcare, technical for B2B manufacturing)

**Example for Legal:**
```
"We'd been investing in SEO for years but couldn't connect it to case quality or partner revenue. Avorria restructured everything around our practice areas and buyer journey – now SEO is a credible pipeline source."
```

### faqList (3-5 Q&A pairs)
**Standard questions to adapt:**

1. **Timeline question**
   - "How long until we see results in [industry]?"
   - Answer: Realistic timeline based on industry dynamics (2-6 months typically)

2. **Resource/implementation question**
   - "Can you work with our existing [CMS/dev team/content team]?"
   - Answer: Yes, explain how we adapt to their setup

3. **Industry-specific concern**
   - For regulated industries: "Can you work around compliance/regulations?"
   - For complex sales: "How do you handle long sales cycles?"
   - For multi-location: "Can you manage multiple branches/franchises?"

4. **Success measurement**
   - "How do we measure success for [industry] SEO?"
   - Answer: Industry-appropriate KPIs (appointments, applications, RFQs, demos, etc.)

5. **Competitive/market question**
   - "What makes [industry] SEO different from other sectors?"
   - Answer: Specific challenges or nuances for that industry

### targetKeyword
**Pattern:** `"seo for [industry]"` or `"[industry] seo"`

### metaTitle
**Pattern:** `"SEO for [Industry] | [Outcome] | Avorria"`

**Examples:**
- "SEO for Healthcare Providers | Drive Qualified Patient Enquiries | Avorria"
- "SEO for Manufacturing | Generate B2B Leads & RFQs | Avorria"

### metaDescription (max 160 characters)
**Pattern:** Brief value prop + key differentiators

**Examples:**
- "SEO for healthcare providers that fills appointment books. Patient-focused content strategy, local SEO and conversion tracking."
- "SEO for manufacturing businesses. B2B-focused keyword strategy, technical content and pipeline attribution."

## Usage Instructions

1. Identify the industry and its key characteristics
2. Research common pain points and buyer behavior for that industry
3. Adapt the patterns above with industry-specific language
4. Add to `src/data/landingPages.ts` as new entry
5. Ensure industry exists in `src/data/industries.ts` or create it
6. Routing is automatic via `/:serviceSlug/for/:industrySlug`

## Internal Linking Requirements

On each "SEO for [Industry]" page, ensure these inline links are present:

1. Link to `/project-estimator` with text: "Not sure scope or budget? Use the estimator."
2. Link to relevant pillar guide in `/resources` (SEO guide or website playbook)
3. Link to `/free-seo-website-audit` in FAQ or CTA section
4. Link from `/services/seo` in the "SEO by industry" section

## Notes

- Keep copy direct and outcome-focused
- Avoid industry jargon unless the audience expects it
- Use specific metrics where available; use directional language where not
- Testimonials should feel authentic to that industry's tone
- FAQs should address real concerns, not SEO theory
