

## AI-Powered Case Study Content Generation & Admin Visual Enhancement

### 1. AI Content Generation for Case Studies

**What:** Add a "Generate with AI" button to the CaseStudyEditor that auto-fills headlines, subheadlines, problem descriptions, approach steps, KPI badges, outcome metrics, and client quote text — based on minimal input (client name, sector, services, outcome type).

**How:**
- Create a new edge function `supabase/functions/generate-case-study/index.ts` that uses the Lovable AI gateway (`google/gemini-3-flash-preview`) with tool calling to return structured JSON containing all case study content fields
- The prompt will take `client`, `sector`, `services[]`, `outcome` type, and `timeframe` as inputs and generate: headline, subheadline, problem narrative, 3-4 approach phases with titles/descriptions/durations, 3-4 KPI badges with realistic values, 3-4 outcome metrics with baselines, and a testimonial quote
- Add a prominent "AI Generate" button in the CaseStudyEditor header (next to Save) that triggers generation once the Basic Info tab is filled
- Show a loading state during generation, then populate all empty fields with AI results (won't overwrite fields the user has already filled)
- Use tool calling (structured output) to ensure reliable JSON parsing

**Edge function structure:**
```
Input: { client, sector, services, outcome, timeframe, year }
Output: { headline, subheadline, problem, approach[], kpi_badges[], outcomes[], quote }
```

### 2. Admin Panel Visual Enhancement

**What:** Refine the admin panel to feel more premium and engaging for internal staff.

**Changes to `AdminLayout.tsx`:**
- Add a subtle gradient accent line beneath the top bar header
- Improve the page content area spacing (reduce excessive top padding on `main`)

**Changes to `AdminSidebar.tsx`:**
- Add a subtle animated accent dot on the active nav item
- Improve section header typography with letter-spacing refinement

**Changes to `CaseStudyEditor.tsx`:**
- Add visual hierarchy improvements: section icons in tab triggers, subtle card hover states
- Add progress indicator showing which tabs have content filled vs empty
- Style the AI generate button with the accent gradient variant

### Files Modified

| File | Change |
|------|--------|
| `supabase/functions/generate-case-study/index.ts` | **New** — AI edge function for case study content generation |
| `src/components/admin/CaseStudyEditor.tsx` | Add AI generate button, loading state, field population logic, visual polish |
| `src/components/admin/AdminLayout.tsx` | Subtle visual enhancements (accent line, spacing) |
| `src/components/admin/AdminSidebar.tsx` | Active state refinement, typography polish |
| `supabase/config.toml` | Add `generate-case-study` function entry |

