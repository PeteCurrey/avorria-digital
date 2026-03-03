

## Website Review — Streamline, Polish & Fix

After reviewing the full route map (55+ public routes), navigation, footer, page content, and codebase patterns, here is a summary of findings and a prioritised plan.

---

### Issues Found

**1. Double Navigation/Footer on Two Pages**
`Tools.tsx` and `AuditFunnel.tsx` both import and render their own `<Navigation />` and `<Footer />`, but the global `Layout` wrapper in `App.tsx` already renders these. This results in double headers and double footers on those pages.

**2. "Fluff" and AI-Typical Language**
The word "fluff" appears across 10 files in meta descriptions, body copy, and ad creative data. The brand guidelines explicitly state to avoid this word. Instances to clean:
- `src/pages/Home.tsx` line 714: "No award-chasing fluff"
- `src/pages/Tools.tsx` lines 40, 48, 57, 73: "No fluff, just actionable insights"
- `src/pages/AgencyTeardown.tsx` lines 114, 127: "what's fluff"
- `src/data/comparisonPages.ts` lines 11, 15: "agency fluff"
- `src/data/resources.ts` lines 15, 207, 583, 1099, 1107, 1154: multiple "fluff" instances
- `src/data/adCreative.ts` lines 17, 27: "no fluff"

**3. Pages That Add Questionable Value for a Visitor**
These pages exist as routes but serve internal/niche purposes that bloat the site and may confuse visitors:
- `/resources/marketing-assets` — Internal copy bank (email sequences, ad creative). Should be admin-only, not public.
- `/reporting/demo` — Dashboard demo with mock data. Linked from Tools page. Should either be removed or clearly gated.
- `/websites-we-would-fire` — 1080-line page with 10+ interactive components (quiz, calculator, slider, fire risk meter, horizontal scroll). Very heavy, very "look what we can build" rather than serving the visitor. Could be tightened significantly.
- `/agency-report-teardown` — Niche lead gen funnel. Fine to keep but shouldn't be prominent.
- `/project-estimator` — Useful, keep.
- `/web-design/studio` and `/web-design/studio/build` — Interactive design studio. Impressive feature but ensure it actually works end-to-end.

**4. Duplicate/Overlapping Service Routes**
- `/services/web-design` and `/web-design` both render `WebDesign` component — duplicate routes
- `/services/seo` (SEOServices page) vs `/seo-agency` (SEOAgencyPillar) — two separate SEO pages with overlapping content
- `/services/paid-media` vs `/paid-media-agency` — same overlap pattern
- `/digital-marketing-agency` — pillar page that largely duplicates `/services`

**5. Footer Links to Potentially Broken Routes**
- `/web-design/for/trades`, `/seo/for/professional-services`, `/paid-media/for/saas` — These use the pattern `/:serviceSlug/for/:industrySlug` which routes to `DynamicLanding`, but the service slugs don't match the expected patterns (should be `seo-agency`, not `seo`).

**6. Social Links Are Generic**
Footer social links point to `https://linkedin.com`, `https://twitter.com`, `https://instagram.com` — not Avorria's actual profiles.

**7. Ecosystem External Links May Not Exist**
Navigation links to `hub.avorria.com`, `ai.avorria.com`, `media.avorria.com`, `marketing.avorria.com` — if these don't resolve, they create a poor impression.

---

### Plan

#### Phase 1 — Fix Bugs & Broken Things
1. **Remove duplicate Navigation/Footer** from `Tools.tsx` and `AuditFunnel.tsx` (they already get them from the Layout wrapper)
2. **Fix footer industry links** — update slugs to match the routing pattern (`/seo-agency/for/trades` etc.) or correct the route pattern
3. **Update social links** to real Avorria profiles or remove if not yet created

#### Phase 2 — Remove "Fluff" Language
4. Replace every instance of "fluff" across all files with alternatives: "noise", "filler", "padding", "waffle" — per the brand guidelines which explicitly say to avoid the word

#### Phase 3 — Consolidate Redundant Pages
5. **Make `/resources/marketing-assets` admin-only** — remove from public routing or gate behind auth
6. **Redirect `/services/web-design` to `/web-design`** — eliminate the duplicate route
7. **Review ecosystem links** in navigation — if those domains don't exist yet, remove or hide them to avoid dead links

#### Phase 4 — Visual & UX Polish
8. **Review card border-radius** — the design system uses `--radius: 0.25rem` (4px, quite sharp). Cards already use `rounded-lg` which is fine. Verify no components use overly rounded corners (`rounded-2xl`, `rounded-3xl`) that look "bubbly"
9. **Tighten the "Websites We'd Fire" page** — it's 1080 lines with 10+ interactive toys. Consider whether each component earns its place or if it's feature-creep

### Files Modified
| File | Change |
|------|--------|
| `src/pages/Tools.tsx` | Remove duplicate Nav/Footer imports and rendering |
| `src/pages/AuditFunnel.tsx` | Remove duplicate Nav/Footer imports and rendering |
| `src/components/Footer.tsx` | Fix industry link slugs, update social URLs |
| `src/pages/Home.tsx` | Replace "fluff" with brand-appropriate alternative |
| `src/data/comparisonPages.ts` | Replace "fluff" instances |
| `src/data/resources.ts` | Replace "fluff" instances |
| `src/data/adCreative.ts` | Replace "fluff" instances |
| `src/pages/AgencyTeardown.tsx` | Replace "fluff" instances |
| `src/components/AnimatedRoutes.tsx` | Remove `/services/web-design` duplicate route, gate `/resources/marketing-assets` |

