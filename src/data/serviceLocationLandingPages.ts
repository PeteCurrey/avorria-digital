import { LandingPage, Service, Location } from "@/types/landingPage";
import { services, getServiceBySlug } from "./services";
import { locations, getLocationBySlug } from "./locations";

// Service-specific content templates
interface ServiceTemplate {
  problemBullets: (city: string, region: string) => string[];
  solutionBullets: (city: string, region: string) => string[];
  keyMetrics: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  testimonialTemplate: (city: string) => {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  faqList: (city: string, region: string) => Array<{
    question: string;
    answer: string;
  }>;
  processSteps: Array<{
    title: string;
    description: string;
  }>;
  workingWithYou: (city: string, region: string) => string;
  pricingSnapshot: string;
}

const seoTemplate: ServiceTemplate = {
  problemBullets: (city, region) => [
    `You've used SEO agencies before in ${city} and got monthly reports but no real change in enquiries.`,
    `You rank for your brand name but not for the searches that matter in ${city} and ${region}.`,
    `Your site gets traffic, but people don't fill in forms or pick up the phone.`,
    `You're spending on ads or directories because SEO has never really been sorted.`,
    `Nobody can show you a clear line from SEO to your pipeline.`,
  ],
  solutionBullets: (city, region) => [
    `Local and regional SEO strategy focused on the services and areas in ${region} that actually make you money.`,
    `Technical and on-page clean-up so Google understands what you do and who you do it for.`,
    `Service and location pages for ${city} built for conversion – clear offers, proof and CTAs.`,
    `Tracking wired into calls, forms and enquiries so you can see what came from where.`,
    `Simple dashboards showing organic leads and pipeline – not just 'visibility'.`,
  ],
  keyMetrics: [
    {
      value: "+63%",
      label: "Qualified Enquiries",
      description: "Increase in qualified enquiries in 3 months after fixing structure and key pages",
    },
    {
      value: "+82%",
      label: "Organic Traffic",
      description: "Non-branded organic traffic up over 9 months for a regional service firm",
    },
    {
      value: "Clear View",
      label: "Local Insights",
      description: "Clear view of which local searches actually drive business",
    },
  ],
  testimonialTemplate: (city) => ({
    quote: `We'd tried a couple of SEO suppliers in ${city} and got nowhere. Once Avorria rebuilt the structure and pages, our organic leads finally started to look like the reports.`,
    author: "James Mitchell",
    role: "Managing Director",
    company: `${city} Business Solutions`,
  }),
  faqList: (city, region) => [
    {
      question: `Do we have to be based in ${city}?`,
      answer: `Not at all. We work with businesses across ${region} and the wider area. What matters is understanding your local market, not our proximity.`,
    },
    {
      question: "Can you work alongside our existing web developer?",
      answer: "Yes. We can provide technical recommendations for your developer to implement, or handle changes directly if you give us access.",
    },
    {
      question: `How long until we see results locally in ${city}?`,
      answer: "Typically 2-3 months for early movement on key terms, 4-6 months for meaningful impact on enquiries. We'll set realistic expectations upfront.",
    },
    {
      question: "Is this just about Google rankings?",
      answer: "Rankings are a means to an end. We focus on the searches that drive revenue, then track the connection from SEO to actual business results.",
    },
    {
      question: "Do you lock us into long contracts?",
      answer: "No. We recommend a 6-12 month runway for meaningful SEO work, but we don't hide behind punitive terms.",
    },
  ],
  processSteps: [
    {
      title: "Discovery & Audit",
      description: "We review your current SEO position, analyse competitors in your local market, and identify quick wins alongside longer-term opportunities.",
    },
    {
      title: "Strategy & Roadmap",
      description: "We build a prioritised plan focused on the searches and pages that will have the biggest commercial impact for your business.",
    },
    {
      title: "Implementation",
      description: "Technical fixes, content improvements, and new pages built to capture local demand. We handle the work or guide your team.",
    },
    {
      title: "Tracking & Reporting",
      description: "Proper tracking on calls, forms and enquiries, with simple dashboards showing what SEO is actually doing for your pipeline.",
    },
  ],
  workingWithYou: (city, region) =>
    `We work with businesses across ${city} and ${region} who are serious about growing through organic search. Whether you're a single-location business or expanding across the region, we bring the same discipline: clear strategy, proper tracking, and a focus on commercial outcomes rather than vanity metrics.`,
  pricingSnapshot:
    "SEO retainers typically start from £1,500/month for local SEO and go up to £5,000+/month for larger regional or national campaigns. We'll scope properly based on your situation and give you honest expectations.",
};

const webDesignTemplate: ServiceTemplate = {
  problemBullets: (city, region) => [
    `Your current website looks dated compared to competitors in ${city}.`,
    `Visitors browse but don't enquire – your site isn't converting.`,
    `The site is slow, awkward on mobile, or hard to update.`,
    `You've had agencies redesign before but it didn't move the needle on leads.`,
    `There's no clear tracking to show which pages or channels drive business.`,
  ],
  solutionBullets: (city, region) => [
    `Modern, fast websites designed to convert ${city} visitors into enquiries.`,
    `Mobile-first design that works beautifully on every device.`,
    `Clear conversion paths with prominent CTAs and easy contact options.`,
    `Built for SEO from day one – structure, speed and content that ranks.`,
    `Tracking wired in so you can see exactly what's driving business.`,
  ],
  keyMetrics: [
    {
      value: "+127%",
      label: "Conversion Rate",
      description: "Increase in website enquiries after redesign and CRO implementation",
    },
    {
      value: "2.1s",
      label: "Load Time",
      description: "Average page load time on new builds, down from 6+ seconds",
    },
    {
      value: "+45%",
      label: "Time on Site",
      description: "Visitors staying longer and engaging more with content",
    },
  ],
  testimonialTemplate: (city) => ({
    quote: `Our old site looked fine but did nothing for leads. The new site from Avorria actually works – enquiries went up within the first month and we can finally see what's happening.`,
    author: "Sarah Patterson",
    role: "Operations Director",
    company: `${city} Professional Services`,
  }),
  faqList: (city, region) => [
    {
      question: "How long does a website project take?",
      answer: "A typical business website takes 6-10 weeks from kickoff to launch. Larger or more complex sites may take longer. We'll give you a clear timeline upfront.",
    },
    {
      question: "Do you work with existing brands and guidelines?",
      answer: "Yes. We can work within your existing brand or help refine it as part of the project. Either way, the result will be consistent and professional.",
    },
    {
      question: "Will we be able to update the site ourselves?",
      answer: "Absolutely. We build on modern platforms with intuitive editing. We'll train you and provide documentation so you're not dependent on us for every change.",
    },
    {
      question: `Can you help with ongoing SEO and marketing after launch?`,
      answer: "Yes. Many clients work with us on ongoing SEO, content and paid media after the initial build. We can discuss what makes sense for your goals.",
    },
    {
      question: "What's included in the price?",
      answer: "Design, development, copywriting support, basic SEO setup, and training. We'll scope properly so there are no surprises.",
    },
  ],
  processSteps: [
    {
      title: "Discovery & Planning",
      description: "We understand your business, goals and audience. Then map out the site structure, pages and features you actually need.",
    },
    {
      title: "Design",
      description: "Custom designs that match your brand and convert visitors. You'll see and approve everything before we build.",
    },
    {
      title: "Development",
      description: "Clean, fast code built for performance and SEO. Mobile-first and tested across devices and browsers.",
    },
    {
      title: "Launch & Handover",
      description: "We handle the launch, set up analytics and tracking, and train your team so you can manage the site confidently.",
    },
  ],
  workingWithYou: (city, region) =>
    `We design and build websites for businesses in ${city} and across ${region} who want their site to work as a proper sales tool. Not just something that looks nice, but a site that converts visitors into leads and gives you clear visibility on what's happening.`,
  pricingSnapshot:
    "Website projects typically range from £5,000 for a focused business site to £25,000+ for larger builds with custom functionality. We'll scope based on your needs and give you a fixed price upfront.",
};

const digitalMarketingTemplate: ServiceTemplate = {
  problemBullets: (city, region) => [
    `You're spending on marketing but can't clearly connect it to revenue.`,
    `Multiple agencies, tools and channels but no coherent strategy.`,
    `SEO says one thing, ads say another – nobody owns the full picture.`,
    `Reports focus on vanity metrics instead of pipeline and sales.`,
    `You suspect you're wasting budget but can't prove where.`,
  ],
  solutionBullets: (city, region) => [
    `Integrated digital strategy across SEO, paid, content and web – one team, one plan.`,
    `Clear focus on the channels and tactics that drive results for ${city} businesses.`,
    `Proper tracking and attribution so you can see what's actually working.`,
    `Regular strategy reviews and adjustments based on real performance data.`,
    `One point of contact who understands your whole marketing picture.`,
  ],
  keyMetrics: [
    {
      value: "+94%",
      label: "Pipeline Growth",
      description: "Increase in qualified pipeline after consolidating and optimising channels",
    },
    {
      value: "-35%",
      label: "Cost Per Lead",
      description: "Reduction in average cost per lead through better channel mix",
    },
    {
      value: "Clear",
      label: "Attribution",
      description: "Finally know which channels drive revenue, not just clicks",
    },
  ],
  testimonialTemplate: (city) => ({
    quote: `We had three agencies doing different things with no coordination. Avorria brought it together and suddenly we could see what was working and why. Pipeline went up and spend efficiency improved.`,
    author: "Michael Thompson",
    role: "Commercial Director",
    company: `${city} Growth Partners`,
  }),
  faqList: (city, region) => [
    {
      question: "Do you handle everything or just strategy?",
      answer: "We can do both. Some clients want full execution, others want strategic oversight while their team or other partners execute. We'll design an engagement that fits.",
    },
    {
      question: "How do you work with our existing marketing team?",
      answer: "Collaboratively. We can fill gaps, provide specialist capability, or act as a strategic layer. We're not here to replace your team, but to make them more effective.",
    },
    {
      question: `What industries do you specialise in?`,
      answer: "We work best with B2B service businesses, multi-location brands, and companies where leads and pipeline are the main measures of marketing success.",
    },
    {
      question: "How quickly can we expect to see results?",
      answer: "Paid channels can show results quickly (weeks). SEO and content take longer (months). We'll set realistic expectations and show progress along the way.",
    },
    {
      question: "What's the minimum commitment?",
      answer: "We recommend at least 6 months for meaningful impact, but we don't require long lock-in contracts. Results will speak for themselves.",
    },
  ],
  processSteps: [
    {
      title: "Audit & Discovery",
      description: "We review everything you're currently doing, identify what's working, what's wasted, and where the opportunities are.",
    },
    {
      title: "Strategy & Planning",
      description: "A clear roadmap prioritising the channels and tactics that will have the biggest impact on your specific goals.",
    },
    {
      title: "Execution & Optimisation",
      description: "We implement (or oversee implementation), then continuously test, measure and optimise based on performance data.",
    },
    {
      title: "Reporting & Review",
      description: "Regular reporting focused on business outcomes, with strategic reviews to adjust course as we learn what works.",
    },
  ],
  workingWithYou: (city, region) =>
    `We partner with businesses across ${city} and ${region} who want marketing that actually moves the needle. Not more activity for activity's sake, but a focused approach that connects spend to pipeline and revenue.`,
  pricingSnapshot:
    "Digital marketing retainers typically start from £3,000/month and scale based on scope and channels. We'll propose something that fits your budget and goals.",
};

const paidMediaTemplate: ServiceTemplate = {
  problemBullets: (city, region) => [
    `You're spending on Google or Meta ads but can't clearly tie it to revenue.`,
    `Previous agencies focused on clicks and impressions, not leads and sales.`,
    `Landing pages don't convert – you're paying for traffic that goes nowhere.`,
    `Campaigns haven't been properly reviewed or optimised in months.`,
    `Attribution is a mess – you don't know what's really working.`,
  ],
  solutionBullets: (city, region) => [
    `Paid campaigns built around your commercial goals, not vanity metrics.`,
    `Targeting focused on ${city} and ${region} audiences most likely to convert.`,
    `Landing pages designed for conversion, not just traffic.`,
    `Proper tracking and attribution so you can see real ROI.`,
    `Continuous optimisation based on what's actually driving results.`,
  ],
  keyMetrics: [
    {
      value: "-42%",
      label: "Cost Per Lead",
      description: "Reduction in CPL after restructuring campaigns and improving targeting",
    },
    {
      value: "+78%",
      label: "Conversion Rate",
      description: "Increase in landing page conversion after CRO improvements",
    },
    {
      value: "3.2x",
      label: "ROAS",
      description: "Return on ad spend achieved for clients with proper tracking",
    },
  ],
  testimonialTemplate: (city) => ({
    quote: `Our previous agency was obsessed with click-through rates. Avorria rebuilt our campaigns around actual leads and suddenly the ads started paying for themselves. We can finally see what we're getting for the spend.`,
    author: "David Chen",
    role: "Marketing Manager",
    company: `${city} Tech Solutions`,
  }),
  faqList: (city, region) => [
    {
      question: "Which platforms do you work with?",
      answer: "Primarily Google Ads, Meta (Facebook/Instagram), and LinkedIn. We can also help with Microsoft Ads, TikTok and other platforms where it makes sense for your audience.",
    },
    {
      question: "What's the minimum ad spend you work with?",
      answer: "We typically work with clients spending £2,000/month or more on ads. Below that, the economics often don't justify agency management.",
    },
    {
      question: "Do you manage landing pages too?",
      answer: "Yes. Ads are only half the story – we can build or optimise landing pages to improve conversion and make your spend work harder.",
    },
    {
      question: "How do you handle attribution?",
      answer: "We set up proper conversion tracking, integrate with your CRM where possible, and give you a realistic view of what's driving results across the funnel.",
    },
    {
      question: "What reporting do we get?",
      answer: "Monthly reporting focused on leads, cost per lead, and revenue impact – not just impressions and clicks. Plus a strategy call to review performance and next steps.",
    },
  ],
  processSteps: [
    {
      title: "Audit & Discovery",
      description: "We review your current campaigns, tracking setup, and conversion data. Then identify quick wins and longer-term opportunities.",
    },
    {
      title: "Campaign Setup",
      description: "New or restructured campaigns built around your commercial goals, with proper targeting, creative and tracking.",
    },
    {
      title: "Optimisation",
      description: "Continuous testing and refinement based on performance data. We focus on what drives results, not activity.",
    },
    {
      title: "Scaling",
      description: "Once we find what works, we scale efficiently while maintaining efficiency and ROI.",
    },
  ],
  workingWithYou: (city, region) =>
    `We manage paid media for businesses in ${city} and across ${region} who want real results from their ad spend. Not vanity metrics, but qualified leads and measurable revenue impact.`,
  pricingSnapshot:
    "Paid media management typically starts from £1,500/month plus ad spend. Pricing scales with spend and complexity. We'll scope based on your situation and goals.",
};

const serviceTemplates: Record<string, ServiceTemplate> = {
  seo: seoTemplate,
  "web-design": webDesignTemplate,
  "digital-marketing": digitalMarketingTemplate,
  "paid-media": paidMediaTemplate,
};

// Generate a landing page for a service-location combination
function generateServiceLocationPage(
  service: Service,
  location: Location
): LandingPage {
  const template = serviceTemplates[service.slug];
  if (!template) {
    throw new Error(`No template for service: ${service.slug}`);
  }

  const isUSA = location.countryCode === "US";
  const region = location.region || location.country;

  // Service-specific headline patterns
  const headlinePatterns: Record<string, string> = {
    seo: `SEO in ${location.city} that actually brings in leads, not just rankings.`,
    "web-design": `Web design in ${location.city} that makes your site behave like a sales asset.`,
    "digital-marketing": `Digital marketing in ${location.city} for teams who want pipeline, not noise.`,
    "paid-media": `Paid media in ${location.city} that delivers ROI, not just impressions.`,
  };

  // Service-specific subheadlines
  const subheadlinePatterns: Record<string, string> = {
    seo: `Avorria is a performance-focused SEO partner for ${location.city} businesses. We sort your site, content and tracking so you can see – in hard numbers – what organic search is doing for enquiries and revenue.`,
    "web-design": `We design and build websites for ${location.city} businesses that look sharp and convert visitors into enquiries, bookings and orders – with tracking to prove it.`,
    "digital-marketing": `Integrated digital marketing for ${location.city} businesses who want growth, not noise. SEO, paid media, web and content under one roof with proper tracking.`,
    "paid-media": `We run paid campaigns for ${location.city} businesses that focus on leads and revenue, not clicks and impressions. Proper tracking, real results.`,
  };

  // Meta title and description patterns
  const metaTitlePatterns: Record<string, string> = {
    seo: `SEO Agency ${location.city} | Performance-Focused SEO | Avorria`,
    "web-design": `Web Design ${location.city} | Conversion-Focused Websites | Avorria`,
    "digital-marketing": `Digital Marketing Agency ${location.city} | Full-Funnel Growth | Avorria`,
    "paid-media": `Paid Media Agency ${location.city} | Google & Meta Ads | Avorria`,
  };

  const metaDescPatterns: Record<string, string> = {
    seo: `${location.city} SEO agency that brings in leads, not just rankings. Technical SEO, content strategy and tracking that shows real business impact.`,
    "web-design": `${location.city} web design that makes your site behave like a sales asset. Sharp design that converts visitors into enquiries and orders.`,
    "digital-marketing": `${location.city} digital marketing agency for teams who want pipeline, not noise. SEO, paid media, web and content strategy with clear tracking.`,
    "paid-media": `${location.city} paid media agency that delivers ROI. Google Ads, Meta Ads and LinkedIn campaigns built around leads and revenue.`,
  };

  const targetKeywordPatterns: Record<string, string> = {
    seo: `seo agency ${location.city.toLowerCase()}`,
    "web-design": `web design ${location.city.toLowerCase()}`,
    "digital-marketing": `digital marketing agency ${location.city.toLowerCase()}`,
    "paid-media": `paid media agency ${location.city.toLowerCase()}`,
  };

  const slug = `${service.slug}-${location.slug}`;

  return {
    id: slug,
    title: `${service.name} in ${location.city}`,
    slug,
    type: "service-location",
    service,
    location,
    heroHeadline: headlinePatterns[service.slug],
    heroSubheadline: subheadlinePatterns[service.slug],
    primaryCTA: service.primaryCTA,
    secondaryCTA: service.secondaryCTA,
    problemBullets: template.problemBullets(location.city, region),
    solutionBullets: template.solutionBullets(location.city, region),
    keyMetrics: template.keyMetrics,
    testimonialSnippet: template.testimonialTemplate(location.city),
    faqList: template.faqList(location.city, region),
    processSteps: template.processSteps,
    workingWithYou: template.workingWithYou(location.city, region),
    pricingSnapshot: template.pricingSnapshot,
    targetKeyword: targetKeywordPatterns[service.slug],
    metaTitle: metaTitlePatterns[service.slug],
    metaDescription: metaDescPatterns[service.slug],
    relatedCaseStudies: [],
    relatedArticles: [],
  };
}

// Target services for location pages
const targetServiceSlugs = ["seo", "web-design", "digital-marketing", "paid-media"];

// Generate all service-location landing pages
export const serviceLocationLandingPages: LandingPage[] = [];

// Generate pages for each location and service combination
for (const location of locations) {
  for (const serviceSlug of targetServiceSlugs) {
    const service = getServiceBySlug(serviceSlug);
    if (service) {
      serviceLocationLandingPages.push(
        generateServiceLocationPage(service, location)
      );
    }
  }
}

// Helper to get a service-location page by slug
export const getServiceLocationPageBySlug = (
  slug: string
): LandingPage | undefined => {
  return serviceLocationLandingPages.find((lp) => lp.slug === slug);
};

// Helper to get all pages for a location
export const getPagesByLocation = (locationSlug: string): LandingPage[] => {
  return serviceLocationLandingPages.filter(
    (lp) => lp.location?.slug === locationSlug
  );
};

// Helper to get all pages for a service
export const getPagesByService = (serviceSlug: string): LandingPage[] => {
  return serviceLocationLandingPages.filter(
    (lp) => lp.service.slug === serviceSlug
  );
};
