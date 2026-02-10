
## Add Soundscape Selector Dropdown to Web Design Studio

### Overview
Add a dropdown selector next to the existing music toggle that lets visitors choose from different ambient audio themes. When selected, the theme overrides the default step-based soundscapes with a consistent mood throughout the wizard. Selecting "Auto (Step-Based)" returns to the default behaviour.

### Soundscape Themes

| Theme | Description | Prompt Prefix |
|-------|-------------|---------------|
| Auto (Step-Based) | Default - changes with each wizard step | *(uses existing step prompts)* |
| Cyberpunk Nightscape | Neon-lit city, rain, electronic hum | "Cyberpunk city rain, neon buzzing, distant synth bass, dark electronic atmosphere, blade runner ambience" |
| Zen Garden | Water, wind chimes, meditative calm | "Japanese zen garden, gentle water fountain, sparse wind chimes, meditative calm, bamboo rustling" |
| Late Night Creative | Lo-fi rain, vinyl crackle, cosy warmth | "Late night studio, rain on windows, soft vinyl crackle, lo-fi warmth, distant jazz piano, creative flow" |
| Space Station | Deep hums, satellite pings, vastness | "Space station observatory, deep cosmic hum, distant satellite pings, weightless atmosphere, sci-fi ambient" |
| High-Rise Studio | Urban wind, soft typing, modern office | "High-rise creative studio, soft wind on glass, subtle keyboard typing, modern office calm, city below" |

### Implementation

**1. Update `src/hooks/useStepBasedAudio.ts`**

- Export the `STEP_SOUNDSCAPES` array (already defined)
- Add a new `soundscapeTheme` parameter to the hook options
- When a theme other than "auto" is selected, override the step prompt with the theme's prompt
- The `currentMood` return value changes to show the theme name instead of the step mood
- Cache key changes to include the theme, so switching themes generates new audio
- When switching themes while playing, crossfade to the new theme's audio

**2. Update `src/pages/WebDesignStudioBuild.tsx`**

- Add a `soundscapeTheme` state variable (default: `"auto"`)
- Import the `Select` component from `@/components/ui/select`
- Add a themed dropdown below or integrated into the existing music toggle area
- Pass `soundscapeTheme` to `useStepBasedAudio`
- Style the dropdown to match the dark, glassmorphic aesthetic of the existing toggle buttons

### UI Design

The dropdown appears in the fixed top-right control area, below the existing Music toggle button. It's only visible when music is enabled/playing:

```text
  [Volume2] Effects On
  [Volume2] Music On
     Purpose - Inspiring
  [ChevronDown] Auto (Step-Based)   <-- new dropdown
```

When expanded, it shows the theme list with short descriptions. Styled with dark background, white/accent text, matching the existing pill-style buttons.

### Technical Details

**Hook Changes:**
- New option: `soundscapeTheme?: string` (default `"auto"`)
- New constant: `SOUNDSCAPE_THEMES` map with theme id -> prompt
- When theme is not "auto", `generateAudioForStep` uses the theme prompt instead of the step prompt
- Cache key becomes `${theme}-${step}` so each theme+step combo is independently cached
- When theme is not "auto", all steps use the same prompt (no step variation), so the cache key simplifies to just the theme name

**Crossfade on Theme Change:**
- Detect theme changes via a ref
- If playing, crossfade to new theme's audio
- Clear the old theme's cache to free memory (optional, could keep for quick switching)

### Files Changed

| File | Action |
|------|--------|
| `src/hooks/useStepBasedAudio.ts` | Modify - Add theme support, export themes config |
| `src/pages/WebDesignStudioBuild.tsx` | Modify - Add dropdown UI, theme state, pass to hook |
