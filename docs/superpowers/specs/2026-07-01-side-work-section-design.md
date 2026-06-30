# Side Work section — design spec

Date: 2026-07-01
Status: Approved

## Summary

Add a new "Side Work" section to the home page, below "Selected work" and
above the footer. It's a full-bleed, auto-scrolling row of side-project
artifacts (the same assets used by the (currently placeholder) Playground
page, plus four new device mockups to be supplied later). Items drift across
the screen on their own; hovering one pauses the whole row and zooms that
item slightly; clicking opens it in a lightbox.

Reference: Figma node `658:4141` ("Side Work" Section Container) in file
`J3uPwVk6E3k2rI1b1RTP7S`.

## Placement

`src/app/page.tsx` renders, in order:

```
<Hero />
<ProjectsGrid />   {/* "Selected work" */}
<SideWork />        {/* "Side work" — new */}
<FooterNote />
```

## Data

New file `src/data/sideWork.ts`, shape mirrors `src/data/playground.ts`:

```ts
export type SideWorkItem = {
  id: string;
  kind: "video" | "image" | "ipodComposition";
  src: string;          // for video/image
  width: number;        // native card width in px
  height: number;       // native card height in px (uniform: 360)
  alt?: string;
};
```

Seven items, in track order:

1. `vinyl-animation` — video, `/playground/vinyl_plate_animation.mp4`, ~360×360
2. `concept-animation` — video, `/playground/concept_animation.mp4`, ~480×360
3. `device-1` — image, `/side-work/device-1.png`, ~150×360 (placeholder until supplied)
4. `device-2` — image, `/side-work/device-2.png`, ~150×360 (placeholder until supplied)
5. `device-3` — image, `/side-work/device-3.png`, ~150×360 (placeholder until supplied)
6. `device-4` — image, `/side-work/device-4.png`, ~150×360 (placeholder until supplied)
7. `lorde-ipod` — `ipodComposition`, composes existing
   `/playground/lorde ipod.png` + `/playground/player lorde.png` (player
   overlapping near the bottom of the iPod image, same relative position as
   in the Figma mock and the old playground canvas), ~420×360

Sizes scaled down proportionally from the Figma frame (which used a 406px
row height); 24px gap between cards, matching Figma spacing.

Until real device mockup files exist at `public/side-work/device-*.png`, the
four device cards render a neutral placeholder box (existing background
token, no broken `<img>`) rather than a 404'd image. Swapping in real files
requires no code change.

## Layout

- Section heading "Side work" uses the same style as `ProjectsGrid`'s
  "Selected work" heading (`text-[24px] font-medium leading-[32px]
  text-[var(--text-secondary)]`), inside the standard `max-w-[900px]`
  column.
- The track itself is full-bleed: it breaks out of the `max-w-[900px]`
  column to span the full viewport width (`w-screen` trick or negative
  margins, whichever proves simpler in implementation), overflow hidden on
  the section, matching the Figma mock's edge-to-edge overflow.
- Each card: rounded corners (`rounded-[20px]`, matching `ProjectCard`'s
  cover radius), `overflow-hidden`, fixed height (~360px), object-cover
  media.
- A subtle horizontal edge mask (CSS `mask-image: linear-gradient(...)`)
  fades the track to transparent at the very left/right viewport edges, so
  cards don't hard-clip at the boundary.

## Motion

- The 7-item array is duplicated once (14 rendered cards) so the looping
  track is seamless.
- A CSS `@keyframes` animation translates the track horizontally,
  continuously, left→right (drifting rightward), looping indefinitely.
  Speed: slow, ambient (roughly 40–60s per full loop — tuned visually during
  implementation).
- Videos (`vinyl-animation`, `concept-animation`) always autoplay, muted,
  loop, `playsInline` — independent of hover/scroll state.
- Hovering **any** card (desktop, mouse) sets a single piece of state on the
  section that pauses the track animation (`animation-play-state: paused`)
  and applies a scale transform (`scale(1.06)`, ~150–200ms ease-out
  transition) to *only* the hovered card. Un-hovering resumes the drift.
- Clicking any card opens a lightbox: a fixed full-screen overlay
  (`bg-black/80`), centered content sized to fit the viewport
  (`max-width/height: 90vw/90vh`), reusing the existing `pg-fade-in` /
  `pg-scale-in` keyframes already defined in `globals.css` (left over from
  the earlier Playground implementation). Closes on `Escape` or clicking the
  backdrop. Videos play with `controls` inside the lightbox; images render
  at natural aspect ratio. The `ipodComposition` item opens both component
  images composed the same way, scaled up.
- On touch devices (no hover), tapping a card opens the lightbox directly —
  there's no separate "pause and zoom" affordance since there's no hover
  state to drive it.

## Components

- `src/components/SideWork.tsx` — section wrapper: heading + track +
  lightbox state/rendering. Client component (`"use client"`) since it needs
  hover/animation state.
- `src/data/sideWork.ts` — item data, as above.
- No new shared primitives needed; lightbox markup lives inline in
  `SideWork.tsx` (it's specific to this section, not reused elsewhere yet).

## Out of scope

- The `/playground` page itself is untouched — it stays as the "Currently
  building" placeholder. This is purely a home-page addition.
- No changes to header nav.
- Real device mockup assets are not sourced as part of this work; the user
  will drop them into `public/side-work/` afterward.
