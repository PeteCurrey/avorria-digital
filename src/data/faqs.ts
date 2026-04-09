import Link from "next/link";
export interface FAQ {
  question: string;
  answer: string;
  category: "working-with-avorria" | "pricing-budgets" | "seo" | "web-funnels" | "reporting-data";
}

export const faqs: FAQ[] = [
  // Working with Avorria
  {
    question: "Do you work with early-stage startups?",
    answer: "Sometimes. If you're pre-revenue or pre-product-market fit, we're probably not the right partner yet. We work best with businesses that have some traction, a clear offer and budget to invest in growth. If you're spending £3–5k+/month on marketing already (or planning to), let's talk.",
    category: "working-with-avorria"
  },
  {
    question: "Do you white-label for other agencies?",
    answer: "No. We occasionally partner with agencies on specific technical projects, but we don't do white-label work. We're designed to work directly with businesses, not through intermediaries.",
    category: "working-with-avorria"
  },
  {
    question: "How quickly can we start?",
    answer: "Usually 1–2 weeks from decision to kick-off, depending on onboarding requirements and our current capacity. If you need something faster, tell us – we'll see what we can do.",
    category: "working-with-avorria"
  },
  {
    question: "What does onboarding look like?",
    answer: "We start with a structured onboarding process: access setup (analytics, ad accounts, CMS), stakeholder interviews, competitive and keyword research, baseline benchmarking, and a 90-day roadmap. This usually takes 1–2 weeks before active execution starts.",
    category: "working-with-avorria"
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes, if you need one. We treat all client data and strategy as confidential by default, but we're happy to formalise it.",
    category: "working-with-avorria"
  },
  {
    question: "What if we already have an in-house marketing team?",
    answer: "We work alongside in-house teams all the time. We can own execution on specific channels (SEO, paid, web) while your team handles brand, content or product marketing. We're not precious about who does what – just about clarity and results.",
    category: "working-with-avorria"
  },

  // Pricing & Budgets
  {
    question: "How much does it cost to work with Avorria?",
    answer: "It depends on scope and engagement model. Most clients land in £3–10k/month for retainers (SEO, paid media, or integrated growth), or £10–50k for one-off projects (website rebuilds, funnel builds, migrations). Use our project estimator or book a call for a realistic range.",
    category: "pricing-budgets"
  },
  {
    question: "Do you have minimum budgets?",
    answer: "Yes. For retainers, we typically work with businesses investing at least £3k/month in marketing. For one-off projects, minimum engagement is usually around £10k. Below that, the economics don't work for either of us.",
    category: "pricing-budgets"
  },
  {
    question: "Do you charge separately for ad spend?",
    answer: "Yes. Our fees cover strategy, execution and management. Media spend (what you pay Google, Meta, LinkedIn) is separate and billed directly by the platforms.",
    category: "pricing-budgets"
  },
  {
    question: "What's the contract length?",
    answer: "For retainers, we prefer 6-month initial commitments with 30-day rolling after that. This gives us time to execute properly without locking you into years of obligation. One-off projects are milestone-based with no ongoing commitment.",
    category: "pricing-budgets"
  },
  {
    question: "Do you offer payment plans?",
    answer: "For larger one-off projects, yes – usually split across key milestones (e.g., 50% upfront, 50% on completion). For retainers, payment is monthly in advance.",
    category: "pricing-budgets"
  },

  // SEO-specific
  {
    question: "How long does SEO take to show results?",
    answer: "Honest answer: 3–6 months for meaningful movement, 6–12 months for compounding results. Anyone promising page-one rankings in 30 days is lying or targeting irrelevant keywords. SEO is a medium-term play, not a quick win.",
    category: "seo"
  },
  {
    question: "Do you guarantee rankings?",
    answer: "No. Anyone who does is either targeting useless keywords or doesn't understand how search engines work. We guarantee a disciplined process, clear reporting and prioritised actions. Rankings follow when the work is right.",
    category: "seo"
  },
  {
    question: "What's the difference between SEO and paid search?",
    answer: "SEO is organic (unpaid) visibility that compounds over time. Paid search (Google Ads) is instant visibility you pay for per click. SEO takes longer but costs less over time. Paid is faster but stops when you stop paying. Most businesses need both.",
    category: "seo"
  },
  {
    question: "Can you help if we've been penalised by Google?",
    answer: "Depends on the penalty. If it's manual (you'll see a notification in Search Console), we can review, fix and submit a reconsideration request. If it's algorithmic (e.g., from thin content or bad links), we can diagnose and fix, but recovery takes time.",
    category: "seo"
  },
  {
    question: "Do you do link building?",
    answer: "Yes, but not the spammy kind. We focus on editorial links, digital PR and strategic partnerships – not bulk directory submissions or PBN nonsense. Link building is one part of a broader SEO strategy, not the whole thing.",
    category: "seo"
  },

  // Web & Funnels
  {
    question: "Do you build websites from scratch?",
    answer: "Yes. We design and build high-converting websites on modern platforms (Webflow, WordPress, Shopify, or custom if needed). We focus on sites that look premium and convert hard – not just portfolio pieces.",
    category: "web-funnels"
  },
  {
    question: "Can you redesign our existing site without starting over?",
    answer: "Sometimes. If the underlying structure is salvageable, we can refresh design and optimise conversions without a full rebuild. If the foundation is broken (slow, outdated CMS, poor architecture), starting fresh is often faster and cheaper.",
    category: "web-funnels"
  },
  {
    question: "What platforms do you work with?",
    answer: "Most commonly: Webflow (our preference for marketing sites), WordPress, Shopify (for e-commerce), and custom builds where needed. We're platform-agnostic – we pick based on your needs, not our preferences.",
    category: "web-funnels"
  },
  {
    question: "How long does a website project take?",
    answer: "Depends on scope. A focused rebuild or new site is usually 6–12 weeks from kick-off to launch. Complex sites with custom functionality, integrations or heavy content can take 3–4 months.",
    category: "web-funnels"
  },
  {
    question: "Do you provide ongoing website support after launch?",
    answer: "Yes. We offer retainer-based support for updates, optimisation and maintenance, or ad-hoc hourly support if you only need occasional help.",
    category: "web-funnels"
  },

  // Reporting & Data
  {
    question: "What tools do you use for reporting?",
    answer: "We're tool-agnostic. We work with GA4, Google Ads, Meta Ads Manager, LinkedIn Campaign Manager, and can integrate with CRMs like HubSpot or Salesforce. What matters is that the data is accurate and the reporting is clear.",
    category: "reporting-data"
  },
  {
    question: "Can you integrate with our CRM?",
    answer: "In most cases, yes. We regularly connect marketing activity to CRMs like HubSpot, Salesforce and Pipedrive to track leads, pipeline and revenue attribution.",
    category: "reporting-data"
  },
  {
    question: "Can we customise the dashboard?",
    answer: "Absolutely. There's a core structure we know works, but we'll adapt it to your business model, sales process and internal reporting rhythm.",
    category: "reporting-data"
  },
  {
    question: "Do we still get human explanation or just a dashboard link?",
    answer: "You get both. The dashboard is the truth; the written summary and calls are where we translate that into decisions.",
    category: "reporting-data"
  },
  {
    question: "How often do we get reports?",
    answer: "Weekly snapshots (key movements, fires to put out), monthly deep-dives (full channel performance and decisions), and quarterly strategy reviews (bigger-picture planning).",
    category: "reporting-data"
  }
];

export const getFAQsByCategory = (category: FAQ['category']): FAQ[] => {
  return faqs.filter(faq => faq.category === category);
};

export const categoryLabels: Record<FAQ['category'], string> = {
  "working-with-avorria": "Working with Avorria",
  "pricing-budgets": "Pricing & Budgets",
  "seo": "SEO-Specific Questions",
  "web-funnels": "Web & Funnels",
  "reporting-data": "Reporting & Data"
};

