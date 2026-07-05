# Side Work Section — Design

**Date:** 2026-07-06
**Status:** Approved
**Figma:** https://www.figma.com/design/J3uPwVk6E3k2rI1b1RTP7S/workspace?node-id=708-444773

## Purpose

Add a "Side work" section to the home page showcasing concepts, ideas, and
animations — three stacked cards following the Figma design, visually
consistent with the existing project cards.

## Placement

On the home page (`src/app/page.tsx`) between `ProjectsGrid` and
`FooterNote`, in the same `max-w-[900px] fluid-px` column as the projects.

Per Figma:
- Section heading: "Side work" — 32px, semibold, leading-[40px],
  tracking-[0.32px], color `var(--text-primary)` (#373636), 40px gap to
  the first card.
- Cards stacked vertically with 70px gap (same rhythm as project cards).

## Card anatomy

Each card = cover + title, not clickable (no date, subtitle, description,
or link):

- Cover: 840×553 native size rendered through the existing `ScaledCover`
  component (same as `ProjectCard`), `rounded-[32px]`, gray background.
- Title below the cover: 24px, semibold, leading-[32px], color `#383232`,
  20px gap from cover.

## The three cards

1. **Finance mobile app concept** — `#f1f1f1` cover with four phone
   screenshots in a row, each 185×383, matching the Figma layout
   (x ≈ 34 / 230 / 425 / 620, y ≈ 88). Assets downloaded from the Figma
   file into `public/home/side-work/finance-1.png` … `finance-4.png`.
2. **Vinyl playing animation** — `#ececec` cover with the existing
   `/playground/vinyl_plate_animation.mp4` (square) centered at 423×423
   with `rounded-[16px]`, autoplay / muted / loop / playsInline (same
   video treatment as the Ajax project card).
3. **Movie diary web app** — `#ececec` cover wired to the expected path
   `/home/side-work/movie-diary.mp4`. Until the file exists the card
   renders as a plain gray cover (graceful media-error fallback). If the
   final asset is a gif, the data entry switches `kind` to `image` — a
   one-line change.

## Data model

Rewrite `src/data/sideWork.ts`:

```ts
type SideWorkMedia =
  | { kind: "image"; src: string; width: number; height: number; x: number; y: number; rounded?: number }
  | { kind: "video"; src: string; width: number; height: number; x: number; y: number; rounded?: number };

type SideWorkCard = {
  id: string;
  title: string;
  coverBg: string;          // e.g. "#f1f1f1"
  media: SideWorkMedia[];   // positioned within the 840×553 native cover
};
```

Media items are absolutely positioned in native 840×553 coordinates;
`ScaledCover` handles responsive scaling. Missing media (not yet
uploaded) must fail silently to the gray cover.

## Component

Rewrite `src/components/SideWork.tsx` (replacing the old marquee):
renders the section heading and maps `sideWorkCards` to stacked cards.
Client component only if needed for the media-error fallback state;
otherwise server component with a small client `CardMedia` child.

## Cleanup

- Old marquee implementation in `SideWork.tsx` — replaced.
- Old item model in `src/data/sideWork.ts` — replaced.
- `side-work-track` / `side-work-paused` CSS in `globals.css` — removed
  if present.

## Asset folder

`public/home/side-work/` — created now. Expected uploads from Julia:
- `movie-diary.mp4` (or a gif — see card 3).
- Any replacement/extra side-work media later.

## Verification

- `npm run build` passes.
- Dev server: section renders under the projects, matches Figma (heading,
  card sizes, finance layout), vinyl video plays, movie-diary card shows
  a clean gray cover with no console-breaking errors.
- Responsive check below 840px — cards scale like project cards.
