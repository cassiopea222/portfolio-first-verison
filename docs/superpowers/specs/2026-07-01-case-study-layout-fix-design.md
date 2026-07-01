# Case Study Page Layout Fix

**Date:** 2026-07-01  
**Status:** Approved

## Problem

All three published case study pages (Fitness, BetaTestingPlatform, RoleManagement) share the same broken layout pattern:

```
<section flex max-w-[1440px] mx-auto cs-px>
  <CaseStudyToC />           ← 180px sticky sidebar
  <div max-w-[800px] flex-1> ← content
  </div>
</section>
```

The TOC and content are flex siblings inside a max-width container. The content's center axis is offset from the viewport center by the TOC width — it shifts depending on whether the sidebar is present, making the content appear left-leaning rather than centered.

## Solution

Replace the flex-row container with a 3-column CSS grid on a new shared `CaseStudyLayout` component. The middle column is always the viewport center; the left column holds the TOC without affecting it.

## Architecture

### New component: `CaseStudyLayout`

**Path:** `src/components/projects/CaseStudyLayout.tsx`

**Props:**
- `sidebar`: ReactNode — the `<CaseStudyToC>` instance
- `children`: ReactNode — all page content

**Grid:**
```
grid-template-columns: 1fr  min(800px, calc(100% - 40px))  1fr
```

- Column 1 (`1fr`): TOC sidebar zone. TOC is right-aligned within it (`justify-end`), with a 40px gap (via `pr-10`) between TOC and content.
- Column 2 (`min(800px, …)`): Content. Always at the viewport midpoint because both flanking columns are `1fr`. 20px horizontal padding when the viewport clips the column below 800px.
- Column 3 (`1fr`): Empty mirror column. Keeps column 2 centered.

**Vertical padding:** `py-[120px]` desktop, `py-[48px]` below 810px (same as current).

The component does not use `max-w-[1440px]` or `cs-px` — those were compensating for the old unconstrained flex container and are no longer needed.

### Updated component: `CaseStudyToC`

**Change:** Update sidebar visibility breakpoint from `min-[810px]` → `min-[1200px]`.

- The sticky sidebar nav: `hidden min-[1200px]:flex`
- The mobile "Go back" link: `min-[1200px]:hidden`

**Why 1200px:** At viewports below ~1200px the left `1fr` column is under ~200px — not enough to comfortably fit the 180px TOC with padding. At ≥ 1200px the column is ≥ 200px and the TOC fits cleanly.

### Updated case study components

All four components replace their outer `<section>` with `<CaseStudyLayout sidebar={<CaseStudyToC ... />}>`:

- `FitnessCaseStudy.tsx`
- `BetaTestingPlatformCaseStudy.tsx`
- `RoleManagementCaseStudy.tsx`
- `ProjectCaseSkeleton.tsx`

The content `<div>` inside each (currently `flex min-w-0 w-full max-w-[800px] flex-1 flex-col gap-12`) drops the `max-w-[800px]` and `flex-1` constraints — those are now handled by the grid column. It keeps `w-full`, `flex-col`, and `gap-12`.

## Breakpoint Behavior

| Viewport | TOC sidebar | Content |
|---|---|---|
| < 810px | Hidden; mobile "Go back" link shows | Full width, 20px padding |
| 810–1199px | Hidden; mobile "Go back" link shows | Centered via grid, 20px padding |
| ≥ 1200px | Sticky nav in left column, 180px wide | Centered at 800px max |

## Files Changed

| File | Change |
|---|---|
| `src/components/projects/CaseStudyLayout.tsx` | **New** — 3-column grid wrapper |
| `src/components/projects/CaseStudyToC.tsx` | Update breakpoints: `min-[810px]` → `min-[1200px]` |
| `src/components/projects/FitnessCaseStudy.tsx` | Use `CaseStudyLayout`; remove outer section |
| `src/components/projects/BetaTestingPlatformCaseStudy.tsx` | Use `CaseStudyLayout`; remove outer section |
| `src/components/projects/RoleManagementCaseStudy.tsx` | Use `CaseStudyLayout`; remove outer section |
| `src/components/projects/ProjectCaseSkeleton.tsx` | Use `CaseStudyLayout`; remove inline Go back button |

## Verification

Confirm on at least:
- `FitnessCaseStudy` (short TOC: 3 sections) — content is visually centered at 1440px and 1280px viewports
- `RoleManagementCaseStudy` (long TOC: 6 sections) — content is visually centered; TOC doesn't stretch the sidebar zone
- Mobile (375px) — only "Go back" link shows; no layout shift
