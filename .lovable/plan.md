

## Enhance Audit PDF — Visual Polish, Website Screenshot, Agency Brochure & Proposal

### Issues to Fix

1. **Pink accent lines** — currently 0.4mm and 1.2mm thick; reduce to 0.15–0.3mm
2. **Headers** — some still use `bold`; switch all section/page headers to `normal` (light weight)
3. **Watermark** — currently "AVORRIA" text at 110pt/7% opacity; change to ~150pt, 4% opacity, spanning full diagonal, and append the pink full stop: "AVORRIA." with the dot in accent colour (faded)
4. **Recommendations text overlap** — the code draws the background card AFTER the text (lines 672–730), causing a shadow/overlap artifact. Fix: draw card first, then render text only once (remove the double-render pattern)

### New Pages to Add

**Page 2 — Website Screenshot**
- Use `html2canvas`-style approach: fetch a screenshot of `data.websiteUrl` homepage via a lightweight screenshot edge function, or use a placeholder frame with the URL displayed prominently
- Since we can't reliably screenshot external sites client-side, we'll use the Firecrawl connector (already configured) or render a styled browser mockup frame showing the URL with a placeholder visual
- Realistic approach: render a browser chrome mockup (address bar, dots) with the website URL, and note "Homepage at time of audit" — this is visually effective without requiring external screenshots

**Pages: About Avorria (2-3 pages)**
- "Who We Are" — brief agency intro, positioning statement, team size, years in business
- "Our Services" — 4 service cards (SEO, Web Design, Paid Media, Content & Email) with one-line descriptions
- "Why Avorria" — 3-4 differentiators (data-led, transparent reporting, senior-only teams, no lock-in contracts)

**Pages: Proposal Section (2-3 pages)**
- "Recommended Package" — based on audit scores, suggest services that address weak areas
- Pricing table with the three engagement models (Ongoing Retainer £4k–12k, Fixed Project £8k–40k, Strategy & Advisory £1.5k–4k)
- "Suggested Timeline" — 6-month phased roadmap with monthly milestones tied to the audit findings
- "Investment Summary" — clean table with recommended services, estimated costs, and expected outcomes

### Implementation Details

**Watermark update:**
- 150pt font, 4% opacity, full diagonal across page
- Render "AVORRIA" in light grey, then append "." in accent pink (same opacity)

**Accent line thinning:**
- Footer line: 0.4 → 0.15mm
- Section title underline: 1.2 → 0.6mm
- Card top accent: 0.8 → 0.3mm
- Cover top/bottom bars: 2.5 → 1.5mm

**Fix recommendations double-render:**
- Draw the background card and left accent bar FIRST
- Then render text ONCE on top — eliminates the shadow/overlap completely

**Proposal logic:**
- Score-based service recommendations: if technical/performance < 60 → recommend Web Design; if SEO < 60 → recommend SEO; if conversion < 60 → recommend Paid Media; always include content if content score < 60
- Pricing pulled from the memory context (Retainer £4k–12k, Fixed £8k–40k, Advisory £1.5k–4k)

### Page Order (final)
1. Cover (existing, refined)
2. Website Screenshot / Browser Mockup (NEW)
3. Table of Contents (updated with new sections)
4. Executive Summary
5. Score Overview & Radar
6. Technical Health
7. SEO Analysis
8. Performance Audit
9. Content Quality
10. Conversion Optimisation
11. Quick Wins
12. 90-Day Roadmap
13. About Avorria (NEW)
14. Our Services (NEW)
15. Recommended Package & Pricing (NEW)
16. Investment & Timeline (NEW)
17. Next Steps / CTA (existing, refined)

### Files Modified
- `src/lib/audit-pdf-generator.ts` — major enhancement: fix double-render, thin lines, light headers, enhanced watermark, add ~6 new pages (screenshot mockup, about, services, proposal, pricing, timeline)

