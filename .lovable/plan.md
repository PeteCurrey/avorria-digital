

## Fix: Studio Ambient Music Feature

### Problem
The music toggle button on `/web-design/studio` shows errors because it's trying to load a static audio file (`/audio/studio-ambient.mp3`) that doesn't exist. The console shows:

```
"The element has no supported sources."
```

The `public/audio/` folder only contains a `.gitkeep` placeholder — no actual MP3 file.

### Solution
Since ElevenLabs is now configured (I can see both `ELEVENLABS_API_KEY` and `ELEVENLABS_API_KEY_1` in secrets), we should use the existing `studio-ambient-music` edge function to generate ambient audio dynamically using the ElevenLabs Sound Effects API.

### Implementation

**1. Create a new hook: `src/hooks/useGeneratedAmbientAudio.ts`**

A new hook specifically for fetching AI-generated audio from the edge function:
- Calls the `studio-ambient-music` edge function on demand
- Converts the base64 response to a playable audio URL using a data URI
- Manages loading, playing, and error states
- Caches the generated audio in memory so it doesn't re-generate on every toggle

**2. Update `src/components/studio/VideoHero.tsx`**

- Replace `useAmbientAudio` import with `useGeneratedAmbientAudio`
- Remove the static file path constant
- The new hook handles everything — no other changes needed to the UI

**3. Keep existing `useAmbientAudio.ts` hook**

This hook is still useful for static audio files elsewhere in the app, so we'll keep it as-is.

### Technical Details

The edge function returns:
```json
{ "audioContent": "base64-encoded-mp3-data..." }
```

The new hook will:
1. Call the edge function when user clicks "Sound On"
2. Convert base64 to a data URI: `data:audio/mpeg;base64,{audioContent}`
3. Create an `Audio` element with that source
4. Play/pause on toggle

### Why this approach?
- Uses the existing, working edge function (no backend changes needed)
- ElevenLabs Sound Effects API generates 22 seconds of ambient audio per request
- Audio is cached after first generation — subsequent toggles are instant
- Graceful error handling if the API fails

### Files Changed
| File | Action |
|------|--------|
| `src/hooks/useGeneratedAmbientAudio.ts` | Create (new hook for API-generated audio) |
| `src/components/studio/VideoHero.tsx` | Edit (use new hook) |

### Testing
After implementation:
1. Navigate to `/web-design/studio`
2. Click the "Sound Off" button in the top-right
3. Should show "Loading..." briefly while generating
4. Should then show "Sound On" with ambient audio playing
5. Toggle should pause/resume without re-generating

