

## Reporting Page — Introduction Section + Button Fixes + Beam Hover

### 1. Add Introduction Section Below the Hero

Insert a new section between the hero and the "numbers that matter" section. This will be a light-background section with a two-column layout:
- **Left column**: A short heading like "Your marketing data, finally in one place" with 2-3 paragraphs explaining what the reporting service is — live dashboards, written summaries, a cadence that keeps you in control
- **Right column**: 3-4 short bullet-style feature highlights with icons (e.g. "Live dashboards updated in real time", "Plain-English written summaries", "Connected to your CRM, GA4 and ad platforms", "No 40-slide decks")
- Wrapped in `SectionReveal` with staggered `motion` entrance

### 2. Fix Secondary Buttons — White-on-White Issue

Two locations have invisible "Book a Strategy Call" buttons on dark backgrounds:

**Hero (lines 137-144):**
Current: `border-white/20 text-white hover:bg-white/10` — the text is `text-white` but against the dark background it should be visible. The issue is likely that `variant="outline"` base styles are overriding with a white/light background. Fix: use `variant="outline-dark"` which already exists in the button variants and has visible styling, OR apply explicit classes: `bg-white/[0.06] border-white/20 text-white backdrop-blur-sm` as the default state (the current hover appearance becomes the resting state).

**CTA section (lines 338-345):**
Same fix — make the resting state show the frosted glass appearance with visible text.

### 3. Add Beam Border Animation on Hover for Secondary Buttons

Wrap both secondary buttons in the existing `BeamBorder` component from `src/components/BeamBorder.tsx`. This component already:
- Shows a beam animation on hover (`opacity-0 group-hover:opacity-100`)
- Has a glow effect
- Uses the accent colour

The `BeamBorder` wraps its children in a `bg-card` container, so we'll need to adjust: instead of wrapping the `Button`, we'll add inline beam animation styles directly to the buttons using a small wrapper `div` with the `group` class and the beam pseudo-elements. This keeps the button's `asChild` pattern working cleanly.

Approach: Create a small `BeamButton` wrapper that applies the beam border effect around any button — similar to `BeamBorder` but without forcing `bg-card` on the inner content. The beam animates on hover with a gentle accent glow.

### Technical Details

**File: `src/pages/Reporting.tsx`**

- Add new intro section (approximately 20-25 lines) between lines 147 and 149
- Import additional icons: `Globe`, `FileText`, `Link2`, `Clock`
- Fix hero secondary button (line 140): change classes to `bg-white/[0.06] border-white/20 text-white hover:bg-white/10 backdrop-blur-sm`
- Fix CTA secondary button (line 340): same class fix
- Wrap both secondary buttons in a beam hover wrapper using inline styles matching `BeamBorder` pattern but without the card background

No new files or dependencies needed. Single file edit.
