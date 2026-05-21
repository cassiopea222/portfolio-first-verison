# Loading Screen — Design Spec

## Overview

A fullscreen orchid flipbook loading animation shown on initial page load and during route transitions. Based on the design from `Loading.html` (Claude Design handoff bundle). No text, no progress bar — just the flower cycling.

## Components

### `LoadingScreen.tsx`

A single reusable React component used in two contexts.

**Visual:**
- Full-screen fixed overlay (`position: fixed; inset: 0`)
- Background: `var(--background)` (#ffffff, matches portfolio)
- Orchid flipbook centered vertically and horizontally
- Image display size: 160×160px
- 8 existing webp frames from `/public/orchid/` (same frames as `OrchidAnimation.tsx`)
- Frames cycle sequentially at 130ms/frame using `setInterval`
- All frames preloaded on mount via `new Image()` so cycle starts instantly

**Hide/show:**
- Controlled by a `visible` prop (boolean)
- When `visible` is false: `opacity: 0`, `pointer-events: none`, 400ms ease transition
- Component stays in the DOM during the fade-out, then parent unmounts it

### `AppShell.tsx` (new client component)

Wraps the layout's existing `<div>` to manage the initial-load splash.

- Renders `LoadingScreen` visible on mount
- Hides it after **both** conditions are true:
  1. `window.onload` has fired (or already fired — check `document.readyState`)
  2. At least **1500ms** has elapsed since component mount
- After hide animation completes (~400ms), removes `LoadingScreen` from DOM entirely

### `/src/app/loading.tsx`

Route transition loading state via Next.js App Router convention.

- Exports `LoadingScreen` directly with `visible={true}`
- Next.js renders it automatically during page navigation Suspense

## Data Flow

```
layout.tsx
  └── AppShell (client)
        ├── LoadingScreen (shown on mount, hidden after load + 1000ms)
        └── children (always rendered, visible under the overlay)

/src/app/loading.tsx
  └── LoadingScreen (always visible, Next.js controls unmounting)
```

## Frame List

Same 8 frames as `OrchidAnimation.tsx`:
```
/orchid/1.webp
/orchid/2.webp
/orchid/frame-01.webp
/orchid/frame-02.webp
/orchid/frame-03.webp
/orchid/frame-04.webp
/orchid/frame-06.webp
/orchid/frame-07.webp
```

## Files Changed

| File | Action |
|------|--------|
| `src/components/LoadingScreen.tsx` | Create |
| `src/components/AppShell.tsx` | Create |
| `src/app/layout.tsx` | Use `AppShell` instead of inline `<div>` |
| `src/app/loading.tsx` | Create |

## Non-goals

- No shuffle mode (sequential only)
- No dark/light theme toggle (inherits portfolio background)
- No text or progress bar
- No changes to `OrchidAnimation.tsx` (separate component for hero section)
