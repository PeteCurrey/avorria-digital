
## Fix: Sticky Header on All Pages (Especially Home)

### Problem
The navigation header disappears when scrolling on the home page. It should remain pinned to the top of the viewport at all times, transitioning from transparent to a compact frosted-glass bar on scroll, and staying visible as long as you keep scrolling.

### Root Cause
The home page renders its own `<Navigation transparent={true} />` component **inside** `Home.tsx` (line 471). This component is wrapped by `PageTransition`, which uses a Framer Motion `motion.div` with transform-based animations (`y: 30 -> 0`).

**CSS rule**: `position: fixed` does not work relative to the viewport when the element is inside an ancestor with a `transform` property. Instead, it becomes positioned relative to the transformed parent -- so the nav scrolls away with the page content.

On all other pages, the `Layout` component in `App.tsx` renders `Navigation` **outside** the `PageTransition` wrapper, which is why it works correctly there.

### Fix (2 files, minimal changes)

**1. `src/pages/Home.tsx`**
- Remove the `<Navigation transparent={true} />` line (line 471) and its import.
- The home page should no longer render its own Navigation.

**2. `src/App.tsx` -- Layout component**
- Change `{!isHomePage && <Navigation transparent={isHeroPage} />}` to always render Navigation.
- For the home page, pass `transparent={true}` since it has a full-bleed hero.
- Updated logic:
```
const showTransparent = isHomePage || isHeroPage;
<Navigation transparent={showTransparent} />
```

This ensures Navigation is always rendered **outside** the PageTransition wrapper, so `position: fixed` works correctly on every page.

### Additional Cleanup (optional, low-risk)
- **`src/App.css`**: This file contains leftover Vite boilerplate (`#root { max-width: 1280px; padding: 2rem }`) that is not imported anywhere. It can be safely deleted to keep the project tidy. (Not causing the bug, but worth removing.)

### What changes for the user
- The header will remain pinned to the top on every page, including the home page.
- On scroll: it shrinks, gains rounded corners, and shows the frosted-glass background.
- On scroll back to top: it reverses the animation and returns to its full transparent state.
- No visual or behavioural change on any other page (they already work correctly).

### Testing
- Scroll the home page top to bottom and back -- header should always be visible.
- Check `/services`, `/about`, `/case-studies` for consistent behaviour.
- Check mobile viewport for the same sticky behaviour.
