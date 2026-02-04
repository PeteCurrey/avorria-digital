
## What the error actually means (and why it keeps coming back)
`Cannot read properties of null (reading 'useState')` almost always happens when React’s hook “dispatcher” is coming from a *different React instance* than the one doing the rendering.

Even if `package-lock.json` shows only `react@18.3.1`, you can still end up with two “effective” React singletons in the browser bundle if the bundler resolves React through different module identities (aliases, subpath aliases, prebundle vs. source, service worker caching, etc.). When that happens, `useState()` reads a dispatcher that is `null` because it’s not the renderer’s dispatcher.

In your repo, the #1 suspicious thing is the **aggressive Vite aliasing**:
- `react` → `node_modules/react` (folder)
- `react-dom` → `node_modules/react-dom` (folder)
- plus subpath aliases like `react/jsx-runtime`, `react-dom/client`

This can accidentally create multiple module identities (and/or cause Vite to treat different import specifiers as different entries), which *defeats* dedupe rather than helping it.

Also, you have a **service worker** doing stale-while-revalidate caching (and you want it removed permanently), which can keep serving a mismatched mix of old + new chunks in production if anything is cached.

You also confirmed: **incognito still crashes**, which means this is not only a service-worker cache problem—so we need to fix the bundling/root cause, and then remove SW to prevent future “mixed-chunk” incidents.

---

## Audit findings from the codebase (quick)
1. **React versions**: `package-lock.json` shows `react@18.3.1` and `react-dom@18.3.1` (good; not obviously multiple versions).
2. **Vite config**: currently contains extensive React aliases + dedupe + optimizeDeps.force. This is the highest-risk area for module identity duplication.
3. **Login page**: `src/pages/auth/Login.tsx` imports React normally and uses hooks correctly; nothing in this component suggests invalid hook usage.
4. **Service worker**: `public/sw.js` caches all GET requests same-origin using stale-while-revalidate. That’s dangerous for Vite hashed chunks unless explicitly excluded.

---

## Resolution strategy (minimal changes first, measured, then cleanup)
We’ll fix this in two tracks:
- Track A: **Stop duplicate React module identity** (primary fix)
- Track B: **Remove the service worker permanently** (stability + prevents future mismatched chunk caching)

### Track A — Fix bundling so React is a true singleton
1. **Simplify `vite.config.ts` React resolution**
   - Remove the explicit aliases for:
     - `react`
     - `react-dom`
     - `react-dom/client`
     - `react/jsx-runtime`
     - `react/jsx-dev-runtime`
   - Keep only the standard `@` alias.
   - Keep `resolve.dedupe`, but reduce it to the canonical minimum:
     - `["react", "react-dom", "react/jsx-runtime"]`
   Why: aliases to folders/subpaths are a common way to create “two Reacts” even when versions match.

2. **Stop forcing dependency prebundling unless needed**
   - Remove `optimizeDeps.force: true` (or set it to default/false).
   - Keep `optimizeDeps.include` minimal (or remove it entirely unless you have a proven perf need).
   Why: forcing prebundle can create a second graph identity compared with non-prebundled imports if aliases/subpaths are involved.

3. **Pin React + ReactDOM explicitly (guardrail)**
   - Add `overrides` (npm) in `package.json`:
     - `react: 18.3.1`
     - `react-dom: 18.3.1`
     - (and optionally) `scheduler` version that matches React DOM’s expectations if needed
   Why: even if you don’t *currently* have multiple versions, this prevents future installs from introducing a second React via transitive deps.

4. **One lockfile policy**
   - Decide whether this project should be npm-locked or bun-locked.
   - If npm: remove `bun.lockb` from the repo (or vice versa).
   Why: mixed lockfiles can lead to non-reproducible installs across environments, which can reintroduce the problem.

5. **Add a temporary runtime diagnostic (to confirm)**
   - Add a short debug log in `src/main.tsx` (DEV only) that prints:
     - `React.version`
     - and a unique module identity marker (e.g., `Symbol.for("react.instance")` stored on `window`)
   - Optionally log whether `window.__REACT_DEVTOOLS_GLOBAL_HOOK__` sees more than one renderer.
   Why: we need proof the bundle is single-React after changes, otherwise we’ll be guessing.

Acceptance criteria for Track A:
- `/auth/login` renders without blank screen
- no `useState null` in console
- full refresh + hard refresh doesn’t reintroduce the issue
- published site also stable after publish

---

### Track B — Remove service worker permanently (as requested)
1. Remove the service worker registration snippet from `index.html`:
   - the `<script>` block that registers `/sw.js`
2. Remove `public/sw.js`
3. (Optional) If you don’t want any PWA behavior:
   - remove the `manifest.json` link and/or the manifest file
4. Publish and verify that previous SW is not controlling clients:
   - this typically requires one final “cleanup” release and/or instructing users to refresh/unregister,
   - but since you want it gone permanently, we’ll make the app stop registering it going forward.

Acceptance criteria for Track B:
- site never registers a service worker
- no caching of JS chunks beyond the browser’s normal cache
- updates deploy predictably

---

## Sequencing (to avoid wasting credits/time)
1. Implement Track A steps 1–2 (Vite config simplification) + version bump comment (single rebuild trigger) so the build is definitely fresh.
2. Confirm preview route `/auth/login` works.
3. Implement Track A steps 3–4 (overrides + lockfile policy) for long-term stability.
4. Implement Track B (remove SW) once React is stable, then publish.

---

## Testing checklist (must pass before further enhancements)
1. Open `/auth/login`:
   - normal window + incognito
   - hard refresh (Cmd+Shift+R / Ctrl+F5)
2. Navigate through:
   - `/` → `/auth/login` → `/auth/signup` → back
3. Confirm no blank screen and no `useState` errors.
4. After publish:
   - test the published URL in incognito
   - confirm no service worker is registered (Application tab in devtools, if available).

---

## Scope note: “decent audit”
Once the React singleton issue is fixed, we can do a second pass audit focused on:
- duplicate feature systems (overlapping routing/layout logic, multiple analytics trackers, multiple toasters, etc.)
- bundle/perf hotspots (large lazy chunks, over-importing libraries)
- backend function stability (timeouts, missing secrets, error handling)
But fixing React first is non-negotiable; otherwise every other investigation is noisy and unreliable.
