import Link from "next/link";
/**
 * Email Sequences for Avorria Marketing Automation
 * 
 * Use these templates to set up automated email sequences in your ESP
 * (e.g., Mailchimp, ConvertKit, ActiveCampaign, HubSpot)
 */

export const emailSequences = {
  // FREE SEO & WEBSITE AUDIT SEQUENCE
  auditSequence: {
    trigger: "Form submission on /free-seo-website-audit or inline audit forms",
    emails: [
      {
        sequence: 1,
        timing: "Immediately on submission",
        subject: [
          "Got your audit request",
          "We're on it — your SEO & website audit",
          "Your Avorria audit is in the queue"
        ],
        body: `Hi [First name],

Nice one — we've got your request for a free SEO & website audit.

Here's what happens next:

 —  We review your site, key pages and tracking.
 —  We sanity-check your SEO and structure.
 —  We put together a short, plain-English teardown with a prioritised fix list.

You won't get a 40-page PDF. You'll get:

 —  What's obviously broken or holding you back.
 —  Where you're leaving money on the table.
 —  What we'd do in the next 90 days if this was our budget.

Turnaround: 2-3 working days.

If you want to skip the queue and walk through it live, you can grab a slot here:
[Book a strategy call —]

Talk soon,
Avorria`
      },
      {
        sequence: 2,
        timing: "When audit is completed (manual trigger)",
        subject: [
          "Your SEO & website audit from Avorria",
          "Here's what we found on your site",
          "Straight answer time: your SEO & website"
        ],
        body: `Hi [First name],

We've gone through your site and SEO setup.

Headline view:

[1-2 lines with the blunt truth — dev/ops will paste this in per lead.]

Here are the key points we found:

What's working

[Short bullet(s) here.]

What's holding you back

[Short bullet(s) here.]

What we'd do in the next 90 days

[Short bullet(s) here.]

We've attached / linked your audit here:
[View my audit —]

If you want us to translate this into a concrete plan (and what it would cost), grab a slot here and we'll walk it through together:

[Book a strategy call —]

If you'd rather implement with your existing team/agency, use this as your checklist and push them on the gaps.

Brutally clear is better than pleasantly vague.

Avorria`
      },
      {
        sequence: 3,
        timing: "3-5 days after audit sent (if no call booked)",
        condition: "No strategy call booked",
        subject: [
          "What you do with that audit is where the money is",
          "Quick one on your audit",
          "If you ignore that audit, this will probably happen —"
        ],
        body: `Hi [First name],

You've now got a clearer view than most of your competitors on:

 —  What's actually working.
 —  What's blocking growth.
 —  What to fix first.

There are basically three options from here:

1. You ignore it.
Nothing changes. The same issues will be there in six months, probably more expensive.

2. You try to fix it internally.
If you've got the team and focus, that can work. Use the audit as your punch list.

3. You let a specialist team own it.
We turn that list into a 90-day plan, then design, build and optimise so it actually gets done.

If you want option 3, hit this and we'll talk like adults about budget, scope and timelines:

[Book a strategy call —]

If not, no drama — just don't let the audit gather dust. You're literally looking at opportunities in plain sight.

Avorria`
      },
      {
        sequence: 4,
        timing: "7-10 days after audit (if still no movement)",
        condition: "No strategy call booked",
        subject: [
          "Two resources to make that audit actually pay off",
          "If you're keeping your current setup, read this",
          "How to turn that audit into pipeline"
        ],
        body: `Hi [First name],

Last nudge from us on your audit.

Whether you work with us or not, these two resources will help you execute it properly:

High-converting websites playbook
How to structure pages so they actually generate enquiries.
— [Link to your website pillar]

No-bullshit SEO guide for real businesses
How to think about SEO without getting lost in jargon.
— [Link to SEO pillar]

If at any point you decide you'd rather have a team own this for you, you know where we are:

[Book a strategy call —]

We'll leave it with you.

Avorria`
      }
    ]
  },

  // PROJECT ESTIMATOR SEQUENCE
  estimatorSequence: {
    trigger: "Completion of /project-estimator",
    emails: [
      {
        sequence: 1,
        timing: "Immediately on completion",
        subject: [
          "Your Avorria project summary & ballpark",
          "Here's what your project probably looks like in real numbers",
          "What your answers tell us about budget & scope"
        ],
        body: `Hi [First name],

Thanks for taking the time to run through the project estimator.

Based on what you told us, you're in roughly this bucket:

 —  Project type(s): [SEO / Paid / Web / Funnel etc.]
 —  Objective: [e.g. more qualified leads, better ROAS, rebuild]
 —  Timeline: [e.g. 1-3 months, 3-6 months]

For projects like this, most of our clients land in a range of:

 —  £X - £Y/month for retainers, or
 —  £A - £B one-off for defined build projects.

It's not a quote. It's a reality check based on similar work and outcomes.

If that feels in the right universe, next step is simple:

[Book a strategy call to firm this up —]

On that call, we'll:

 —  Validate the assumptions behind the range.
 —  Talk through what's in-scope vs out-of-scope.
 —  Give you a concrete path forward (including "you're not ready yet" if that's the truth).

If that range is miles away from where your head's at, that's useful data too — it means you may want to simplify scope or keep things in-house for now.

Either way, you've just saved yourself weeks of vague back-and-forth.

Avorria`
      },
      {
        sequence: 2,
        timing: "2-3 days later",
        subject: [
          "Are you actually going to move on this?",
          "Gut check on your project",
          "This is the bit most teams quietly stall on"
        ],
        body: `Hi [First name],

Most teams stall at exactly the point you've reached:

 —  They know roughly what they want.
 —  They know roughly what it costs.

Then it sits in "we should do something" mode for six months.

If this project genuinely matters, you've got two rational choices:

1. Commit to a direction and timeline.
Whether that's with us, another partner or in-house, pick a path and put a date on it.

2. Decide it's not a priority and park it properly.
Remove it from the mental backlog. Stop half-thinking about it.

If you want help making that decision, jump on a call and we'll give you a straight recommendation based on where you are:

[Book a strategy call —]

No theatre, no pitch deck. Just adults talking about numbers, risk and upside.

Avorria`
      },
      {
        sequence: 3,
        timing: "7-10 days later",
        subject: [
          "If timing isn't right, here's how to prepare",
          "Parking the project? Do it properly",
          "Two ways to be ready when the budget lands"
        ],
        body: `Hi [First name],

If you're not moving forward right now, that's completely fine — provided it's a decision, not just drift.

If you're pausing, here's how to use the time well:

 —  Tighten your positioning and messaging internally.
 —  Get your tracking and CRM cleaned up.
 —  Collect more proof (testimonials, cases, outcomes).

We've put together a couple of resources that will help:

[Link: Why Avorria page] — how we think about growth.
[Link: Reporting explainer] — what good reporting looks like.

Whenever you're ready to turn this project back on, we'll be here:

[Book a strategy call —]

Avorria`
      }
    ]
  },

  // AGENCY REPORT TEARDOWN SEQUENCE
  teardownSequence: {
    trigger: "Submission on /agency-report-teardown",
    emails: [
      {
        sequence: 1,
        timing: "Immediately on submission",
        subject: [
          "Got your agency report",
          "We'll tear this down and tell you the truth",
          "Your agency teardown is in the queue"
        ],
        body: `Hi [First name],

We've received your agency report/proposal and the context you shared. Appreciate you trusting us with it.

Here's what we'll do:

 —  Read the report like operators, not vendors.
 —  Assess whether the work and results justify the fees.
 —  Translate the charts and jargon into normal language.
 —  Give you 3-5 clear recommendations.

You'll get a straight answer within 3-5 working days. If your agency is solid, we'll say so. If not, you'll know exactly why.

If you'd prefer to walk through it live, you can book a teardown call here:

[Book a live teardown call —]

Avorria`
      },
      {
        sequence: 2,
        timing: "When teardown review is ready (manual trigger)",
        subject: [
          "Here's what we really think about that report",
          "Your agency teardown from Avorria",
          "Is your agency earning its keep? Here's our view"
        ],
        body: `Hi [First name],

We've gone through your report/proposal.

Short version:

[1-2 blunt lines — to be filled in per client.]

In the teardown, you'll see:

 —  Where the reporting is strong vs weak.
 —  Whether the work matches the spend.
 —  What's missing, misaligned or just wasted.
 —  What we'd change in the next 90 days.

You can read it here:
[View my teardown —]

If you want an honest conversation about options (tightening up the current setup vs switching), grab a slot and we'll talk like grown-ups:

[Book a call to walk through it —]

No drama, no agency politics — just commercial reality.

Avorria`
      },
      {
        sequence: 3,
        timing: "3-5 days after teardown sent",
        subject: [
          "You basically have three options with that agency",
          "What you do next matters more than what we said",
          "The uncomfortable bit"
        ],
        body: `Hi [First name],

You've now seen behind the curtain on your current setup.

From here, there are three rational moves:

1. Stay and push them harder.
Use the teardown as a conversation starter. Insist on better reporting, clearer plans and bolder decisions. See if they respond like grown-ups.

2. Transition them out cleanly.
Use a structured handover, protect your data and assets, and avoid a messy exit.

3. Bring in a partner who behaves like an in-house growth team.
We own the numbers, the execution and the uncomfortable conversations.

If you want help planning any of those options — even if you don't work with us — book a call and we'll map it out:

[Book a call —]

Sitting on a bad setup for another 6-12 months is usually the most expensive option on the table.

Avorria`
      }
    ]
  }
};
