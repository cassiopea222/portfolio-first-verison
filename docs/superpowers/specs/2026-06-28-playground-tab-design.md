# Playground Tab — Design Spec

**Date:** 2026-06-28  
**Status:** Approved

---

## Overview

Add a third "Playground" tab to the portfolio header. The Playground page is a freeform 2D scrollable canvas where design concepts, ideas, images, videos, and embedded prototypes are laid out like a collage — no grid, no constraints. Clicking any item opens a lightbox overlay with zoom/expand.

---

## 1. Header Changes

**File:** `src/components/Header.tsx`

- Add `{ href: "/playground", label: "Playground" }` to `navLinks`
- Measure "Playground" text width in browser to get the exact pixel value; estimated ~144px (same horizontal padding as Work and About tabs)
- Update `TAB_WIDTHS`: `{ "/": 100, "/about": 104, "/playground": <measured> }`
- Update `TAB_OFFSETS`: `{ "/": 0, "/about": 100, "/playground": 204 }`
- Update `activeHref` logic to include `/playground`:
  ```ts
  const activeHref = pathname === "/about" ? "/about" : pathname === "/playground" ? "/playground" : "/";
  ```
- Mobile menu picks up Playground automatically (it maps over `navLinks`)
- `AppShellHeader` already shows on all non-`/projects/` routes — no change needed

---

## 2. Playground Page

**File:** `src/app/playground/page.tsx`

### Container

- Full-viewport wrapper: `width: 100vw`, `height: 100vh`, `overflow: scroll`, `cursor: grab`
- No padding or page margin — the canvas fills the entire screen edge-to-edge
- Background: white (or very light neutral, matching site background)

### Canvas

- Inner `div` sized `4000px × 3000px`, `position: relative`
- Items are absolutely positioned inside with `top` / `left` coordinates
- No scroll snap, no grid alignment — freeform placement

### Item Data

A hardcoded array in the page (or a separate `src/data/playground.ts` file) with entries shaped like:

```ts
type PlaygroundItem = {
  id: string;
  type: "image" | "video" | "iframe";
  src: string;
  width: number;
  height: number;
  top: number;
  left: number;
  alt?: string;
};
```

Initially empty or seeded with placeholder items — Julia fills it over time by editing the array.

### Item Rendering

- Each item renders as an absolutely-positioned card with no border/shadow by default
- Images: `<img>` or Next.js `<Image>` with `unoptimized` if external
- Videos: `<video autoPlay loop muted playsInline>` for ambient play
- Iframes: `<iframe>` for embedded Figma/prototype links
- Items are clickable — cursor pointer on hover

---

## 3. Lightbox Overlay

**File:** inline in `src/app/playground/page.tsx` (or extracted to `src/components/PlaygroundLightbox.tsx` if it grows complex)

- State: `selectedItem: PlaygroundItem | null`
- Clicking an item sets `selectedItem`; closing clears it
- Overlay: `position: fixed`, `inset: 0`, dark semi-transparent backdrop (`rgba(0,0,0,0.8)`)
- Content centered with `max-width: 90vw`, `max-height: 90vh`, `object-fit: contain`
- Close triggers:
  - Click backdrop
  - Press `Escape` (keydown listener added/removed with `useEffect`)
- Animation: fade-in backdrop + scale-up content (`transition: opacity 200ms, transform 200ms`)

---

## 4. What's Not In Scope

- Drag-to-pan (may be added later if scroll feel isn't enough)
- Filtering or categorisation
- CMS or admin UI for managing items — Julia edits the data array directly
- Mobile-optimised layout (canvas scrolls on mobile as-is; acceptable for now)

---

## Open Questions Resolved

| Question | Decision |
|---|---|
| Layout approach | CSS absolute positioning on a large fixed canvas |
| Content types | Images, videos, iframes |
| Click interaction | Lightbox with expand/zoom + overlay |
| Tab width | Measure in browser after render; estimated ~144px |
