

## Add Subtle Sound Effects for Studio UI Interactions

### Overview
Enhance the Web Design Studio wizard with immersive, subtle sound effects that respond to user interactions. The current `useClickSound` hook uses basic oscillator tones - we'll create a more sophisticated audio experience with atmospheric sounds that match the premium studio aesthetic.

### Sound Design

| Interaction | Sound Type | Description |
|-------------|------------|-------------|
| Step Navigation | Soft Whoosh | A gentle, airy sweep sound when moving between wizard steps |
| Option Selection | Gentle Chime | A crystalline, bell-like tone when selecting purpose, palette, features, etc. |
| Checkbox Toggle | Soft Click | A subtle, satisfying "tick" when toggling checkboxes on/off |
| Slider Adjustment | Subtle Tick | Very quiet feedback as sliders move |
| Form Submission | Celebration | A triumphant ascending chime sequence on blueprint submit |
| Hover (Optional) | Subtle Hum | Very quiet, almost subliminal feedback on hover |

### Technical Implementation

**1. Enhance `src/hooks/useClickSound.ts`**

Expand the hook with new sound profiles designed for a premium, immersive experience:
- Add new sound types: `whoosh`, `chime`, `tick`, `celebration`
- Create layered oscillator sounds with proper ADSR envelopes (Attack, Decay, Sustain, Release)
- Use multiple oscillators with harmonics for richer tones
- Add optional detuning for natural, organic feel
- Include volume control parameter

```text
New API:
playClick(type: "select" | "hover" | "success" | "navigate" | "whoosh" | "chime" | "tick" | "celebration", volume?: number)
```

**Sound Specifications:**

- **Whoosh (Navigation)**: Low-pass filtered noise sweep, 150ms duration, gentle fade in/out
- **Chime (Selection)**: Layered sine waves at harmonic frequencies (fundamental + octave + fifth), 200ms with decay
- **Tick (Checkbox/Slider)**: Very short click with fast attack, 50ms
- **Celebration (Submit)**: Ascending arpeggio (C-E-G-C) over 500ms with shimmer

**2. Update `src/pages/WebDesignStudioBuild.tsx`**

- Replace `"navigate"` with `"whoosh"` for step transitions
- Keep `"select"` → `"chime"` mapping for config changes
- Pass sound function to child step components

**3. Update Step Components**

Add sound callbacks to interactive elements:

| Component | Element | Sound |
|-----------|---------|-------|
| PurposeStep | Purpose card click | `chime` (via setConfig) |
| AestheticStep | Palette selection | `chime` (via setConfig) |
| AestheticStep | Slider change | `tick` (on release) |
| StructureStep | Size card click | `chime` (via setConfig) |
| StructureStep | Module checkbox | `tick` (via setConfig) |
| FeaturesStep | Feature card click | `tick` (via setConfig) |
| PersonalityStep | Slider change | `tick` (on release) |
| SummaryStep | Submit success | `celebration` |

**4. Add Sound to SummaryStep**

When blueprint submission succeeds:
- Play `celebration` sound
- Syncs with the success animation (CheckCircle2 scale-in)

### Implementation Details

**Whoosh Sound (Step Navigation)**
```text
- Use BiquadFilter (lowpass) on white noise
- Frequency sweep: 2000Hz → 500Hz over 150ms
- Volume envelope: 0 → 0.08 → 0 over 150ms
- Creates airy, movement sensation
```

**Chime Sound (Selections)**
```text
- 3 layered oscillators:
  - Fundamental (e.g., 523Hz - C5)
  - Octave (+1200 cents)
  - Perfect fifth (+700 cents)
- Gentle attack (20ms), medium decay (180ms)
- Volume: 0.06 per oscillator
```

**Celebration Sound (Submit)**
```text
- Sequential notes: C5 → E5 → G5 → C6
- 100ms per note, slight overlap
- Add subtle reverb-like decay
- Total duration: ~500ms
```

### Files Changed

| File | Action |
|------|--------|
| `src/hooks/useClickSound.ts` | Modify - Add new sound types with richer audio design |
| `src/pages/WebDesignStudioBuild.tsx` | Modify - Use new sound types for navigation |
| `src/components/studio/steps/SummaryStep.tsx` | Modify - Add celebration sound on successful submission |
| `src/components/studio/steps/AestheticStep.tsx` | Modify - Add tick sound on slider commit |
| `src/components/studio/steps/PersonalityStep.tsx` | Modify - Add tick sound on slider commit |

### Sound Preferences

All sounds respect the existing `soundEnabled` state in the studio. When sounds are disabled, no audio plays. The volume is kept intentionally low (0.03-0.12 range) to be subtle and non-intrusive.

### Technical Considerations

**Web Audio API Best Practices:**
- Reuse AudioContext (already implemented)
- Create new oscillators per sound (oscillators are one-shot)
- Use exponentialRampToValueAtTime for natural volume curves
- Properly disconnect and stop oscillators after playback

**Performance:**
- All sounds are synthesized (no network requests)
- Minimal CPU overhead - single AudioContext
- No memory leaks - proper cleanup of audio nodes

### User Experience

1. User enters the studio wizard
2. Clicks "Lead Generation" card → gentle chime plays
3. Adjusts "Minimal ↔ Bold" slider → subtle tick on release
4. Clicks "Next" → soft whoosh as step animates
5. Selects features → satisfying tick sounds
6. Submits blueprint → celebratory ascending chime

The sound design is intentionally subtle - enhancing the experience without being distracting. Users can disable all sounds via the "Effects Off" toggle already present in the UI.

