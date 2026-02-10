

## Web Design Studio Build Page Enhancement

This is a comprehensive upgrade to the studio build experience covering spacing fixes, clearer AI assistant purpose, example website lightboxes, visual engagement improvements, and branded PDF delivery gated behind contact info.

### 1. Fix "What's the mission?" Card Spacing

**Problem:** The purpose cards in PurposeStep are too close to the header.

**Fix in `src/components/studio/steps/PurposeStep.tsx`:**
- Increase bottom margin on the header from `mb-12` to `mb-16`
- Add top padding (`pt-4`) to give the cards breathing room from the container

### 2. AI Design Brief Chat - Clearer Purpose and Auto-Open

**Problem:** Users might confuse the AI chat with a generic "Contact Us" widget.

**Changes to `src/pages/WebDesignStudioBuild.tsx`:**
- Auto-open the chat panel on first visit with a 2-second delay, using a `useEffect` + `setTimeout`
- Change the floating trigger button text from "AI Design Brief" to "Build Your Brief" with a subtitle label

**Changes to `src/components/studio/DesignBriefChat.tsx`:**
- Update the panel header to clearly say "AI Brief Builder" with subtitle "I'll help you build a design brief - not a contact form"
- Add a purpose banner at the top of the chat area (before messages) explaining: "I'm here to understand your project so I can produce a professional design brief document. Answer a few questions and I'll generate a branded PDF you can share with your team."
- Update the initial greeting message to be clearer about the brief-building purpose

### 3. Example Website Lightbox on PurposeStep

**Problem:** Users don't understand what "Lead Generation" vs "Authority Hub" etc. actually look like.

**New component: `src/components/studio/PurposeExampleLightbox.tsx`**
- A dialog/lightbox triggered by an "See Example" link on each purpose card
- Shows a full-screen preview of an example website for that type
- Uses the existing studio preview images (e.g., `lead-gen-dark.jpg`, `content-hub-dark.jpg`, etc.)
- Includes a short description of what makes this type of site effective
- Uses the Dialog component from the UI library for the lightbox

**Changes to `src/components/studio/steps/PurposeStep.tsx`:**
- Add a small "View Example" button/link on each purpose card
- Wire it to open the lightbox with the relevant example content
- Each purpose type gets a curated description and the best preview image

Example content per purpose type:
- **Lead Generation**: "Designed to convert visitors into qualified leads. Features prominent CTAs, trust signals, and conversion-optimised layouts."
- **Authority Hub**: "Built around content and expertise. Features resource libraries, thought leadership articles, and knowledge centres."
- **Product / SaaS**: "Showcases features and drives signups. Features product tours, pricing tables, and onboarding flows."
- **Service Platform**: "Multi-service navigation with clear service areas. Features service breakdowns, case studies, and booking systems."

### 4. Enhanced Visual Onboarding Banner

**Changes to `src/pages/WebDesignStudioBuild.tsx`:**
- Add a dismissible welcome banner at the top of the page (first visit only) that explains:
  - "You're building a design brief, not a website"
  - "Configure your preferences, then submit to receive a branded PDF specification"
  - Uses `localStorage` to only show once

### 5. PDF Gated Behind Contact Info (Already Implemented, Verify Flow)

The current SummaryStep already requires name and email before submission, and the PDF download only appears after submission. This flow is correct. Minor enhancement:

**Changes to `src/components/studio/steps/SummaryStep.tsx`:**
- Add a note on the success screen: "A copy of this blueprint has also been sent to [email]" (as a future promise / UX text)
- Ensure the PDF download button is prominent and clearly labelled

### 6. Visual Polish and Engagement

**Changes to `src/pages/WebDesignStudioBuild.tsx`:**
- Add a subtle progress percentage indicator near the step dots (e.g., "Step 2 of 6")
- Add animated gradient border effect on the active step's content panel

**Changes to `src/components/studio/steps/PurposeStep.tsx`:**
- Add a subtle animated shimmer effect on hover for unselected cards
- Increase card minimum height slightly for better visual balance

### Files Changed

| File | Action |
|------|--------|
| `src/components/studio/steps/PurposeStep.tsx` | Edit - Fix spacing, add "View Example" buttons |
| `src/components/studio/PurposeExampleLightbox.tsx` | Create - Lightbox component for example websites |
| `src/pages/WebDesignStudioBuild.tsx` | Edit - Auto-open chat, welcome banner, progress indicator |
| `src/components/studio/DesignBriefChat.tsx` | Edit - Clearer purpose messaging, updated header and greeting |
| `src/components/studio/steps/SummaryStep.tsx` | Edit - Email confirmation text on success screen |

### Technical Notes

- The lightbox uses the existing `Dialog` component from `@/components/ui/dialog`
- Auto-open chat uses `localStorage` key `studio-chat-shown` to avoid re-triggering on revisits
- Welcome banner uses `localStorage` key `studio-welcome-dismissed`
- All new animations respect `prefers-reduced-motion`
- Example images reuse existing assets from `src/assets/studio-previews/` -- no new image uploads needed

