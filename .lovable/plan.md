

## Enhance the Reporting Page and Align the Demo with the Client Portal

### Problem
1. **Reporting page** (`/reporting`) is visually flat — no animations, no premium feel, and still uses the word "fluff" (line 126)
2. **Dashboard demo** (`/reporting/demo`) uses the old `DashboardLayout` component with tabs like SEO, Paid Media, Funnel, Content, Notes, Audits, Website Health — this does NOT match the actual client portal
3. The real client portal at `/client` uses `AppShell` with a completely different navigation: Overview, Projects, Proposals, Documents, Billing, Analytics, SEO Intelligence, Audits, Website Health, Reporting, Resources
4. No way to navigate back to `/reporting` from the demo

### Changes

#### 1. Reporting Page Visual Upgrade (`src/pages/Reporting.tsx`)

**Hero section:**
- Dark cinematic hero (`bg-[hsl(220,25%,8%)]`) with radial gradient glow — matching About and Why Avorria pages
- Staggered `motion` entrance animations (badge, heading, subtext, CTAs)
- Uppercase tracking badge above the H1
- Glass-effect secondary CTA button
- Replace "fluff" with "noise" on line 126

**"The numbers that matter" section:**
- Add gradient top-border accent bars to the three cards
- Add `SectionReveal` scroll animations
- Backdrop-blur card treatment

**Reporting cadence section:**
- Dark background section with horizontal timeline layout (matching About/Why Avorria pattern)
- Connecting line between the three cadence steps
- Numbered accent circles

**"No 40-slide decks" section:**
- Add subtle animation to the three question cards
- More descriptive content under each question card (not just a title)

**FAQ section:**
- Wrap in `SectionReveal` for scroll entrance
- Keep the accordion pattern — it works well

**CTA section:**
- Dark radial gradient background (matching other premium pages)
- Glass-effect secondary button fix

**SEO:**
- Use `SEOHead` component for consistency
- Add FAQPage schema for the FAQ section
- Keep existing meta tags and structured data

#### 2. Dashboard Demo — Mirror the Real Client Portal (`src/pages/DashboardDemo.tsx`)

The demo currently uses `DashboardLayout` (an old reporting-specific layout). It needs to use `AppShell` to show what the actual client portal looks like.

**Changes:**
- Replace `DashboardLayout` with `AppShell` (same component the real `/client` pages use)
- Set `type="client"` with demo user details (e.g. userName="Sarah", clientName="TechCorp Industries")
- Show the `ClientOverview`-style content as the default landing, or render the same tab components the real client portal uses
- Add a prominent "Back to Reporting" link/banner at the top to make it clear this is a demo and allow navigation back
- Add a demo mode banner across the top: "You're viewing a demo of the Avorria Client Portal"
- The sidebar navigation should show the real client portal nav items (Overview, Projects, Proposals, etc.) but link to `/reporting/demo?tab=X` so the user stays in demo mode
- Keep the existing dashboard tab content (OverviewTab, SEOTab, etc.) for now — they provide good visual substance

#### 3. DashboardLayout Cleanup

After the demo is updated, `DashboardLayout` will only be used by `ClientPortal.tsx`. We should check if `ClientPortal.tsx` is even routed — looking at the routes, it is NOT in `AnimatedRoutes.tsx`, so it is dead code. We can leave it for now but it is not actively used.

### Visual Rhythm for Reporting Page (Top to Bottom)
1. **Hero** — Dark cinematic with radial glow, centred
2. **What We Track** — Light background, elevated cards with gradient bars
3. **Reporting Cadence** — Dark background, horizontal timeline
4. **No Slide Decks** — Light background, enhanced question cards
5. **FAQ** — Secondary background, accordion
6. **CTA** — Dark radial gradient, glass buttons

### Files Modified
- `src/pages/Reporting.tsx` — full visual upgrade, remove "fluff", add animations
- `src/pages/DashboardDemo.tsx` — switch to `AppShell`, add demo banner, back-to-reporting link, align with real client portal navigation

### Technical Notes
- New imports for Reporting.tsx: `motion` from framer-motion, `SectionReveal`, `SEOHead`
- New imports for DashboardDemo.tsx: `AppShell` (replacing `DashboardLayout`), demo banner component
- Remove "fluff" and replace with "noise" in card copy
- No new dependencies needed

