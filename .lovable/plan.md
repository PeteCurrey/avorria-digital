

## Fix: Keep Native Cursor Visible, Animated Cursor as Decorative Shadow

### Problem
The custom cursor component injects a global CSS rule (`cursor: none !important`) that hides the native system cursor on all elements. This causes:
- Users lose their familiar click target, making navigation frustrating
- The animated cursor has inherent lag (even with direct DOM updates), so it feels unresponsive
- On some browsers/machines the timing makes it look like there's no cursor at all

### Solution
Remove the `cursor: none` CSS entirely. The native system cursor will always be visible, and the animated dot + trailing ring become a purely decorative shadow/glow effect that follows the cursor.

### Changes

**File: `src/components/CustomCursor.tsx`**

1. **Delete the `<style>` block** (lines 259-272) that sets `cursor: none !important` on all elements
2. That's it -- the animated dot and trail ring remain unchanged and will appear as a decorative shadow behind the native cursor

No other files need to change. The component continues to provide hover/click/view/CTA visual effects, just without hijacking the system cursor.
