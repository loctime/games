# AI Technical Documentation (Pasala)

## 1. Project purpose & constraints

### What this app is
- A single-phone, local-only collection of party games for groups, optimized for quick handoffs and shared play on one device.
- A mobile-first, offline-capable PWA built as a single-page state machine in Next.js with React client components.

### What this app is NOT
- Not a multiplayer networked game.
- Not a multi-device or cross-user experience.
- Not a backend-driven or authenticated app.
- Not a set of routed pages with URL-based state.

### Core design decisions (non-negotiable)
- **Single-phone party games only.** All flows assume one device passed between players. The UI and state transitions are built around this premise and must not change.【F:components/screens/impostor-reveal.tsx†L1-L96】
- **Local-only state.** All game state lives in React context; no server state or persistence is required or expected.【F:lib/game-context.tsx†L32-L440】
- **No backend, no auth, no multiplayer.** There is no API layer; keep gameplay fully offline and local, without network calls or accounts.【F:lib/game-context.tsx†L32-L440】
- **Mobile-first PWA, offline.** The PWA shell and service worker are part of the core experience and must remain installable/offline-capable.【F:public/manifest.json†L1-L19】【F:public/sw.js†L1-L56】【F:components/pwa/sw-register.tsx†L1-L25】

#### Must never be changed
- Do **not** introduce Next.js routing for game flow; the entire app is driven by `currentScreen` in context.【F:app/page.tsx†L1-L50】【F:lib/game-context.tsx†L14-L70】
- Do **not** add server calls, authentication, or external state dependencies.
- Do **not** move game state out of the single context provider or add per-route state.
- Do **not** remove or bypass the PWA manifest and service worker setup.【F:app/layout.tsx†L1-L58】【F:public/manifest.json†L1-L19】【F:public/sw.js†L1-L56】

## 2. High-level architecture

### Single-page state machine (no routing)
- The app is a single React page where **one state variable (`currentScreen`) determines the visible screen**.
- Each screen is a React component in `components/screens/*` and is selected via a `switch` in `app/page.tsx`.
- Game state and transitions are centralized in `lib/game-context.tsx`.

### Why routing is NOT used
- Routing would introduce URL-driven state that conflicts with the single-device, handoff-based gameplay model.
- The app depends on fast, deterministic screen transitions (via `currentScreen`) that are entirely local and do not rely on navigation or browser history.【F:app/page.tsx†L1-L50】【F:lib/game-context.tsx†L32-L440】

### How `currentScreen` drives the app
- `currentScreen` is a union of allowed screen IDs.
- Screen transitions are made by calling `setScreen(...)` or game-specific actions that set `currentScreen` as part of state updates (e.g., `startHeadsupGame`).【F:lib/game-context.tsx†L8-L216】

### Screen flow diagram (textual)
```
Home
 ├─ Heads Up
 │   ├─ headsup-setup → headsup-play → headsup-result → (home | headsup-play)
 ├─ Impostor
 │   ├─ impostor-setup → impostor-reveal → impostor-debate → impostor-vote → impostor-result → (home | impostor-reveal)
 └─ Preguntados
     ├─ preguntados-setup → preguntados-play → preguntados-result → (home | preguntados-play)
```

## 3. Core files overview (critical)

### `lib/game-context.tsx`
**Purpose**
- Owns the global game state, screen enum, and all actions to mutate state or change screens.
- Acts as the single source of truth for game lifecycle and transitions.

**What logic belongs here**
- Screen identifiers (`Screen` type).
- All game-specific state fields.
- All game actions (start, update, transition, reset) and any derived state tied to gameplay.

**What must NOT be added here**
- UI layout or component rendering.
- Network calls, backend APIs, or persistence logic.

【F:lib/game-context.tsx†L1-L440】

### `app/page.tsx`
**Purpose**
- Central screen switchboard. Renders one screen based on `currentScreen`.

**What logic belongs here**
- `switch (currentScreen)` mapping to screen components.

**What must NOT be added here**
- Game logic or state transitions (those belong to context).
- Routing, navigation, or URL state.

【F:app/page.tsx†L1-L50】

### `components/screens/*`
**Purpose**
- Each file is a single full-screen step in a game flow.
- Screens are UI-only and consume context actions/state.

**What logic belongs here**
- UI and local view state (timers, animation toggles, local prompts).
- Calling context actions (e.g., `startHeadsupGame`, `setScreen`, `submitVote`).

**What must NOT be added here**
- Global game state ownership (should remain in context).
- New routes or navigation changes.

【F:components/screens/home-screen.tsx†L1-L79】【F:components/screens/headsup-play.tsx†L1-L133】【F:components/screens/impostor-vote.tsx†L1-L140】

### `components/*` (shared UI)
**Purpose**
- Shared, touch-first UI building blocks.
- Keep screens simple and consistent.

**Key components**
- `GameButton`: primary action button with standardized sizes/variants.【F:components/game-button.tsx†L1-L52】
- `GameTile`: home screen tiles for game selection.【F:components/game-tile.tsx†L1-L31】
- `CategorySelector`, `PlayerSelector`: standardized input for categories/players.【F:components/category-selector.tsx†L1-L41】【F:components/player-selector.tsx†L1-L38】

**What must NOT be added here**
- Game-specific logic or state transitions.
- Screen-specific layout (belongs in `components/screens`).

### PWA files
**Purpose**
- Enable installability and offline behavior.

**Files & responsibilities**
- `public/manifest.json`: App metadata for install prompt and PWA config.【F:public/manifest.json†L1-L19】
- `public/sw.js`: Service worker that caches the shell and static assets for offline use.【F:public/sw.js†L1-L56】
- `components/pwa/sw-register.tsx`: Client-side registration of the service worker.【F:components/pwa/sw-register.tsx†L1-L25】
- `app/layout.tsx`: Links PWA metadata and registers the service worker component.【F:app/layout.tsx†L1-L58】

**What must NOT be added here**
- Feature logic or game state.
- Remote APIs or caching of user data.

## 4. Game lifecycle model

### How a game starts
- Each game has a setup screen that calls a `start...Game` action.
- That action initializes game state and sets `currentScreen` to the first play screen (e.g., `headsup-play`).【F:components/screens/headsup-setup.tsx†L1-L62】【F:lib/game-context.tsx†L128-L176】

### How state is initialized
- Game state is initialized once in the context provider and reset by per-game reset functions.
- `start...Game` functions typically randomize content, set the first question/word, and reset counters.【F:lib/game-context.tsx†L96-L380】

### How transitions happen
- Screens call context actions or `setScreen` directly.
- Some actions (`start...Game`, `nextPreguntadosQuestion`) change `currentScreen` as part of state mutation.【F:lib/game-context.tsx†L128-L408】

### How games are reset
- Each game has a `reset...` function to clean only that game’s state.
- Reset is typically called before returning to home or replaying the same game.【F:lib/game-context.tsx†L182-L420】

### State ownership rules (explicit)
- **Global state:** all game-related state lives in `lib/game-context.tsx`.
- **Local UI state:** allowed in screens only for transient UI (timers, reveal toggles).【F:components/screens/headsup-play.tsx†L1-L133】【F:components/screens/impostor-reveal.tsx†L1-L96】
- **Never** store game progress in component local state if it affects gameplay or navigation.

## 5. Adding a new game (CRITICAL SECTION)

### Step-by-step checklist
1. **Define screen IDs**
   - Add new IDs to the `Screen` union type in `lib/game-context.tsx`.
   - Use a consistent naming pattern: `<game>-setup`, `<game>-play`, `<game>-result` (or additional steps if needed).

2. **Add game state to context**
   - Extend `GameState` with all required fields for the new game.
   - Add actions to `GameContextType` for setup/start/transition/reset.

3. **Implement game actions**
   - Create `start<YourGame>Game`, `reset<YourGame>`, and any transition helpers.
   - Ensure `start...` sets `currentScreen` to the first play screen.

4. **Create screens**
   - Add new files in `components/screens/` for each screen ID.
   - Use `useGame()` to read state and call actions.
   - Keep each screen as a full-screen component (no nested routing).

5. **Register screens in the switchboard**
   - Update `app/page.tsx` to map new screen IDs to their components.

6. **Integrate into the home screen**
   - Add a `GameTile` entry that calls `setScreen('<game>-setup')`.

7. **Reset rules**
   - Ensure “Play again” and “Home” buttons call reset actions before screen changes.

### Naming conventions
- Screen IDs: `yourgame-setup`, `yourgame-play`, `yourgame-result`.
- Actions: `startYourgameGame`, `resetYourgame`, plus transition helpers if needed.
- State fields: prefix with game name (`yourgameScore`, `yourgameRoundIndex`, etc.).

### Screen ID patterns
- Use hyphenated, lowercase screen IDs.
- Keep all IDs in a single union type (`Screen`) so the switch statement remains exhaustive.

### Do / Don’t examples
**Do**
- Add `"mygame-setup" | "mygame-play" | "mygame-result"` to `Screen` and switch in `app/page.tsx`.
- Keep state in context and use actions to transition.

**Don’t**
- Don’t add a new Next.js route or `app/mygame/page.tsx`.
- Don’t keep global game progress in a screen component’s local state.

## 6. UX & UI constraints

### Strict UI rules
- **No scrolling during gameplay.** Gameplay screens are full-screen and designed to fit within the viewport. The experience is intentionally constrained to avoid accidental scroll during handoff play.【F:components/screens/headsup-play.tsx†L1-L133】
- **One main action per screen.** Most screens feature a single primary button to keep choices clear and fast.【F:components/game-button.tsx†L1-L52】【F:components/screens/impostor-debate.tsx†L1-L81】
- **Big text only.** Font sizes are large to support group visibility from a distance.【F:components/screens/home-screen.tsx†L16-L77】
- **Touch-first design.** Buttons are large, with padding and rounded corners for easy tapping.【F:components/game-button.tsx†L1-L52】【F:components/game-tile.tsx†L1-L31】

### Why these constraints exist
- The app is used in fast-paced group settings with a single device, so readability, tap targets, and minimal cognitive load are critical.

## 7. PWA & offline rules

### How PWA is implemented
- `manifest.json` supplies install metadata and icons.
- `public/sw.js` caches the app shell and static assets; navigation requests fall back to cached `/` for offline use.
- `SwRegister` registers the service worker on load.

【F:public/manifest.json†L1-L19】【F:public/sw.js†L1-L56】【F:components/pwa/sw-register.tsx†L1-L25】

### Offline expectations
- The app must load and run offline once cached.
- Navigation should remain within the single-page state machine, so cached `/` is the offline fallback.

### What must not be broken
- Service worker registration must remain in `app/layout.tsx`.
- The manifest must remain linked in metadata.
- The cached shell list should continue to include `/` and key assets.

【F:app/layout.tsx†L1-L58】【F:public/sw.js†L1-L56】

## 8. Common mistakes to avoid
- Introducing Next.js routes or URL-based screen state.
- Adding backend/API calls for gameplay.
- Over-abstracting state into multiple contexts or external stores.
- Adding unnecessary dependencies or heavy state managers.
- Storing global gameplay progress in component-local state.

## 9. Extension roadmap (optional)

### Games that fit this architecture
- Word guessing, trivia, timer-based prompt games.
- Roles or reveal-based games where the phone is passed between players.

### Games that do NOT fit
- Real-time multiplayer or online matchmaking.
- Games requiring persistent accounts, backend storage, or multi-device sync.
- Experiences that depend on complex navigation or deep-linking.
