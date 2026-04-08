import Link from "next/link";
import { ComparisonPage } from "@/types/resource";

export const comparisonPages: ComparisonPage[] = [
  {
    id: "avorria-vs-agency",
    title: "Avorria vs Typical Marketing Agency",
    slug: "avorria-vs-typical-agency",
    comparisonType: "avorria-vs-agency",
    primarySubject: "Avorria",
    secondarySubject: "Typical Agency",
    audience: "Business owners and marketing leaders tired of agency noise",
    summary: "If you've worked with agencies before, this comparison will sound familiar. Here's where we're differentÃ¢â‚¬â€and why it matters for your bottom line.",
    ctaText: "If you want grown-up marketing conversations, let's talk",
    metaTitle: "Avorria vs Typical Marketing Agency | Why We're Different",
    metaDescription: "Tired of agency noise and vague reporting? See how Avorria's performance-first approach differs from typical marketing agencies.",
    sections: [
      {
        type: "intro",
        content: "If you've worked with agencies before, this will sound familiar:\n\n- Monthly reports full of graphs but no clear link to revenue\n- Junior staff doing the actual work while you pay for senior strategy\n- Scope creep disguised as 'recommendations'\n- Contracts that lock you in for 12 months regardless of results\n\nWe built Avorria because we were tired of that model. Here's what we do differently.",
      },
      {
        type: "table",
        heading: "How We Compare",
        tableData: [
          {
            criterion: "Strategy Depth",
            primaryValue: "Business outcomes first. Every channel ties back to pipeline and revenue goals.",
            secondaryValue: "Channel-first thinking. 'You need SEO' without asking what success looks like.",
          },
          {
            criterion: "Transparency",
            primaryValue: "Live dashboards you can check anytime. Clear breakdown of tasks completed each week.",
            secondaryValue: "Monthly PDF reports. Hard to verify what was actually done.",
          },
          {
            criterion: "Reporting",
            primaryValue: "Focus on leads, cost per lead, pipeline value, and revenue. Metrics tied to your business.",
            secondaryValue: "Impressions, clicks, rankings. Vanity metrics that don't connect to outcomes.",
          },
          {
            criterion: "Technical Capability",
            primaryValue: "Deep technical SEO, conversion tracking, and analytics as standardÃ¢â‚¬â€not upsells.",
            secondaryValue: "Basic SEO knowledge. Complex tracking is extra or outsourced.",
          },
          {
            criterion: "Design Philosophy",
            primaryValue: "Conversion-first design. Beautiful sites that are optimised for leads and sales.",
            secondaryValue: "Portfolio-first design. Sites built to win awards, not generate pipeline.",
          },
          {
            criterion: "Contract Flexibility",
            primaryValue: "Monthly rolling after initial project phase. No lock-in if we're not delivering.",
            secondaryValue: "12-month contracts regardless of performance. Exit clauses buried in fine print.",
          },
          {
            criterion: "Senior Involvement",
            primaryValue: "Senior strategists on every account. We don't hand off to juniors.",
            secondaryValue: "Senior people win the pitch, then disappear. Junior team does the work.",
          },
          {
            criterion: "Pricing Model",
            primaryValue: "Clear retainer or project fees. No hidden costs or surprise invoices.",
            secondaryValue: "Opaque pricing. Scope creep leads to surprise bills.",
          },
        ],
      },
      {
        type: "pros-cons",
        heading: "Where We're Different (And Why It Matters)",
        content: `### We Treat Revenue as the Only KPI That Matters

Most agencies optimise for metrics they control (traffic, rankings, impressions). We optimise for metrics you care about: leads, cost per lead, and revenue.

If a campaign is driving traffic but not pipeline, we kill it. If a page is ranking but not converting, we fix it.

### We Don't Sell You ChannelsÃ¢â‚¬â€We Build Systems

Typical agencies are structured by channel: the SEO team, the paid team, the social team. This creates silos.

We start with your funnel and reverse-engineer the channel mix. Sometimes that means paid + landing pages. Sometimes it's SEO + email. Sometimes it's all of the above.

### We Report Like Adults

You get a live dashboard updated daily, and a short monthly call to discuss what's working and what's not.

No 40-slide decks. No jargon. No hiding behind complexity.

### We Don't Disappear After the Sale

Some agencies are great at pitching and terrible at delivery. We're the opposite.

Our senior team stays involved. You get the same people on strategy calls that you met in the pitch.`,
      },
      {
        type: "use-cases",
        heading: "Who Should Choose What",
        useCases: {
          them: [
            "You want a big-name agency for credibility (even if delivery is average)",
            "You're optimising for brand and awareness, not direct ROI",
            "You have a large internal team and just need execution support",
          ],
          us: [
            "You're tired of agencies that talk strategy but deliver reports",
            "You want full transparency on what's being done and what it's costing",
            "You need a partner who understands business outcomes, not just marketing tactics",
            "You've been burned before and want a flexible, no-lock-in relationship",
          ],
        },
      },
      {
        type: "cta",
        content: "If you want grown-up marketing conversationsÃ¢â‚¬â€where we talk pipeline, not impressionsÃ¢â‚¬â€let's talk.\n\nWe'll assess your current situation, identify opportunities, and show you what a performance-first approach actually looks like.",
      },
    ],
  },
  {
    id: "avorria-vs-diy",
    title: "Avorria vs DIY / In-House Marketing",
    slug: "avorria-vs-diy",
    comparisonType: "avorria-vs-diy",
    primarySubject: "Avorria",
    secondarySubject: "DIY / In-House",
    audience: "Founders and small teams doing their own marketing",
    summary: "Should you DIY your marketing, hire internally, or work with an agency? Here's an honest breakdown of when each makes sense.",
    ctaText: "Keep your internal control, add external firepower",
    metaTitle: "Avorria vs DIY / In-House Marketing | When to Get Help",
    metaDescription: "Doing your own marketing or building an in-house team? Here's when DIY makes senseÃ¢â‚¬â€and when it starts costing you more than it saves.",
    sections: [
      {
        type: "intro",
        content: "You're running your own Google Ads. You're writing blog posts at 11pm. You're Googling 'how to improve website conversion rate' for the third time this month.\n\nDIY marketing makes sense at the startÃ¢â‚¬â€budgets are tight, you know your business better than anyone, and agencies feel like an unnecessary expense.\n\nBut at some point, DIY stops being scrappy and starts destroying value.\n\nHere's how to know when you've crossed that line.",
      },
      {
        type: "table",
        heading: "The Real Comparison",
        tableData: [
          {
            criterion: "Time Cost",
            primaryValue: "You focus on running your business. We handle marketing execution and optimisation.",
            secondaryValue: "Founder time = expensive. Hours spent learning Google Ads could be spent closing deals.",
          },
          {
            criterion: "Depth of Expertise",
            primaryValue: "Full team: strategists, technical SEO, paid media specialists, designers, analysts.",
            secondaryValue: "You're learning as you go. Your in-house hire is a generalist, not a specialist.",
          },
          {
            criterion: "Consistency",
            primaryValue: "Campaigns run continuously. Reports delivered on schedule. No gaps when someone's on holiday.",
            secondaryValue: "Marketing happens when you have time. Projects stall when priorities shift.",
          },
          {
            criterion: "Risk of Costly Mistakes",
            primaryValue: "We've made (and fixed) the mistakes already. Your budget isn't our testing ground.",
            secondaryValue: "Every mistake is a learning experienceÃ¢â‚¬â€paid for with your marketing budget.",
          },
          {
            criterion: "Scalability",
            primaryValue: "Scale campaigns up or down without hiring. Access to tools, tech, and resources.",
            secondaryValue: "Growth requires hiring more people or overloading existing team.",
          },
          {
            criterion: "Cost Structure",
            primaryValue: "Fixed monthly retainer. Predictable, no employer costs (benefits, equipment, training).",
            secondaryValue: "Salaries + tools + training + recruitment costs. Less flexible.",
          },
        ],
      },
      {
        type: "use-cases",
        heading: "When Each Approach Makes Sense",
        useCases: {
          them: [
            "You're pre-revenue or very early stage with under Ã‚Â£5k/month in marketing budget",
            "You have deep marketing expertise yourself and just need execution time",
            "Your market is so niche that external agencies won't understand it",
            "You're hiring a strong internal marketing lead and can afford to build a full team",
          ],
          us: [
            "You're doing marketing because you have to, not because you're good at it",
            "Your campaigns are working okay, but you know they could be 2Ã¢â‚¬â€œ3x more efficient",
            "You've hired junior marketers who need senior strategic oversight",
            "You're spending Ã‚Â£5k+/month on marketing and results are inconsistent",
            "You need specific expertise (technical SEO, paid media, CRO) without hiring full-time",
          ],
        },
      },
      {
        type: "pros-cons",
        heading: "The Hidden Costs of DIY Marketing",
        content: `### Opportunity Cost
Every hour you spend tweaking Google Ads is an hour not spent on sales, product, or operations. If your time is worth Ã‚Â£100/hour and you spend 10 hours/week on marketing, that's Ã‚Â£4,000/month in opportunity cost.

### Learning Curve Tax
Mistakes are expensive. Launching a campaign with poor targeting, no conversion tracking, or a broken landing page can burn thousands before you realise what went wrong.

We've already made those mistakes (on our own budget). You don't have to.

### Inconsistent Execution
Marketing works when it compounds. SEO takes 6Ã¢â‚¬â€œ12 months to show results. Paid campaigns need constant optimisation. Content needs publishing weekly.

When you're juggling ten other priorities, marketing is the first thing to slipÃ¢â‚¬â€and the compounding effect breaks.

### Limited Specialist Knowledge
A generalist in-house hire can handle day-to-day execution, but they're not a technical SEO expert, a paid media specialist, a conversion rate optimiser, and a designer.

With Avorria, you get all of those without hiring four people.`,
      },
      {
        type: "pros-cons",
        heading: "How Avorria Partners With Internal Teams",
        content: `We don't replace your teamÃ¢â‚¬â€we extend it.

Many of our clients have internal marketers who handle brand, content, and day-to-day campaigns. We come in for:

- **Strategic oversight**: Quarterly roadmaps, channel prioritisation, budget allocation
- **Specialist execution**: Technical SEO, paid media management, CRO testing
- **Training and upskilling**: Teaching your team best practices so they're more effective

This gives you the best of both worlds: internal control + external expertise.`,
      },
      {
        type: "cta",
        content: "Not sure whether to DIY, hire, or partner with an agency?\n\nBook a strategy call and we'll talk through your specific situationÃ¢â‚¬â€no sales pitch, just honest advice on what makes sense for your business right now.",
      },
    ],
  },
];

export const getComparisonBySlug = (slug: string): ComparisonPage | undefined => {
  return comparisonPages.find((c) => c.slug === slug);
};

