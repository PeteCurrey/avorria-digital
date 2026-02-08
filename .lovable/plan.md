

## Step-Based Ambient Audio for the Studio Wizard

### Overview
Transform the studio experience by dynamically changing the ambient soundscape as users progress through the wizard. Each step will have its own unique audio mood, with smooth crossfade transitions between them.

### Soundscape Design

| Step | Name | Audio Prompt | Mood |
|------|------|--------------|------|
| 0 | Purpose | "Expansive electronic atmosphere, rising synthesizer pads, hopeful and inspiring ambient music, gentle energy building" | **Energetic & Inspiring** - Setting the vision |
| 1 | Aesthetic | "Creative studio ambience, soft brush strokes, artistic electronic textures, contemplative and beautiful" | **Artistic & Contemplative** - Visual decisions |
| 2 | Structure | "Architectural electronic soundscape, precise rhythmic elements, building blocks, organised and clear" | **Structured & Methodical** - Site architecture |
| 3 | Features | "Dynamic digital interface sounds, subtle technological pulses, forward motion, innovative atmosphere" | **Technical & Progressive** - Feature selection |
| 4 | Personality | "Warm human connection, organic textures with electronics, conversational ambient tones, friendly and approachable" | **Warm & Personal** - Brand voice |
| 5 | Summary | "Calm completion sounds, gentle celebration, peaceful resolution, satisfied and accomplished feeling" | **Calm & Accomplished** - Review |

### Technical Implementation

**1. New Hook: `src/hooks/useStepBasedAudio.ts`**

A new hook specifically designed for step-aware audio:
- Accepts `currentStep` as a parameter
- Manages a cache of generated audio (one per step) to avoid re-generation
- Pre-generates the next step's audio while user is on current step
- Implements volume crossfade transitions between steps (fade out old, fade in new)
- Graceful fallback if audio generation fails (continues silently)

```text
Key API:
- useStepBasedAudio(currentStep: number, options)
  Returns: { isPlaying, isLoading, toggle, currentMood }
```

**2. Audio Crossfade Logic**

When step changes:
1. Start generating new audio (if not cached)
2. Fade out current audio over 1 second
3. Fade in new audio over 1 second
4. Dispose of previous audio element to save memory

```text
Step 0 ─────────────────────┐
                     fade   │
                      out   ├── crossfade zone (~1s)
                            │
Step 1 ─────────────────────┘
        fade in
```

**3. Pre-generation Strategy**

While user is on step N, pre-fetch audio for step N+1 in the background:
- Reduces perceived loading time
- Audio is cached so instant playback on step change
- Non-blocking - doesn't affect current audio

**4. Update: `src/pages/WebDesignStudioBuild.tsx`**

- Replace `useAmbientAudio` with the new `useStepBasedAudio` hook
- Pass `currentStep` to the hook
- Update UI to show current mood/soundscape name
- Add loading indicator during initial generation

**5. Edge Function: No Changes Required**

The existing `studio-ambient-music` edge function already accepts a `prompt` parameter, so we can reuse it for all step-based audio generation.

### User Experience

1. User clicks "Music On" toggle
2. Audio for current step loads (~3-5 seconds on first play)
3. Soundscape plays, looped
4. User navigates to next step
5. Current audio fades out smoothly (1 second)
6. New step's audio fades in (already pre-loaded, instant)
7. Continues until user toggles off or exits

### UI Updates

The music toggle button will show the current mood:
```
[🔊 Music On] 
   ↳ "Purpose — Inspiring"
```

When loading:
```
[⏳ Loading...]
   ↳ "Generating soundscape..."
```

### Files Changed

| File | Action |
|------|--------|
| `src/hooks/useStepBasedAudio.ts` | Create (new hook for step-aware audio) |
| `src/pages/WebDesignStudioBuild.tsx` | Edit (integrate new hook, update UI) |

### Technical Details

**Audio Cache Structure:**
```typescript
type AudioCache = Map<number, {
  audioUrl: string;
  audioElement: HTMLAudioElement;
}>;
```

**Step Prompts Configuration:**
```typescript
const STEP_SOUNDSCAPES = [
  { step: 0, name: "Inspiring", prompt: "..." },
  { step: 1, name: "Artistic", prompt: "..." },
  // ...
];
```

**Crossfade Implementation:**
- Use `requestAnimationFrame` for smooth volume transitions
- Linear fade over 1000ms
- Volume range: 0 → target volume (e.g., 0.3)

### Edge Cases Handled

- **Audio generation fails**: Log error, continue silently (no audio)
- **User toggles off during transition**: Immediately stop all audio
- **User skips steps**: Cancel pending pre-generation, load new step's audio
- **Browser autoplay restrictions**: Audio starts on first user interaction (toggle click)
- **Memory management**: Dispose of audio elements when no longer needed

