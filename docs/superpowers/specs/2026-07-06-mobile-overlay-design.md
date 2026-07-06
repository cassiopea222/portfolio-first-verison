# Mobile "in progress" overlay — design

**Date:** 2026-07-06
**Status:** Approved

## Problem

The site's layout is currently broken at phone resolutions. Until a proper
mobile layout ships, phone visitors should see a clear notice instead of the
broken page.

## Decisions

- **Fully blocking:** no "continue anyway" escape hatch. Nobody sees the
  broken layout.
- **Breakpoint:** overlay shows at 620px and below (revised from the
  original 768px), hidden at `min-[621px]:` and up.
- **Pure CSS:** a server component hidden via `md:hidden`; no JavaScript,
  no hydration flash, no user-agent sniffing. Page content stays in the DOM
  so crawlers/SEO are unaffected.

## Implementation

- New component `src/components/MobileOverlay.tsx`: `fixed inset-0` overlay
  with a very high z-index, opaque `var(--background)` fill, centered copy
  using existing type/color tokens:
  - Heading: "Mobile version is in progress" (`--text-primary`)
  - Body: "Please visit from a computer in the meantime." (`--text-tertiary`)
- Rendered as the last child inside the shell div in `src/app/layout.tsx`
  so it covers header and content on every route.

## Removal

When the mobile layout is ready, delete the component and its one usage in
`layout.tsx`.

## Verification

Visual: resize below 768px — overlay covers everything on all routes;
at ≥768px the site renders normally with no trace of the overlay.
