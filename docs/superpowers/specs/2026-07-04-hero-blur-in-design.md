# Hero blur-to-clear entrance animation

## Goal

On page load/reload, the hero content (nav bar, then the headline composition)
should reveal with a quick blur-to-clear fade instead of popping in instantly.

## Approach

Pure CSS `@keyframes`, following the existing `page-enter` pattern in
`globals.css` — no JS/Framer Motion needed.

```css
@keyframes hero-enter {
  from {
    opacity: 0;
    filter: blur(12px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}

.hero-enter-nav {
  animation: hero-enter 300ms ease-out both;
  will-change: opacity, filter;
}

.hero-enter-heading {
  animation: hero-enter 300ms ease-out 70ms both;
  will-change: opacity, filter;
}
```

- Duration: 300ms (within the requested 250–350ms range)
- Blur amount: 12px (within the requested 10–12px range)
- Stagger: nav plays at 0ms delay, heading at 70ms delay (within the requested
  50–80ms range)
- Only `opacity` and `filter` animate — no `transform`/`width`/`height`, so no
  layout shift; both properties are GPU-accelerated
- `animation-fill-mode: both` so the element holds the `from` state before the
  animation starts and the `to` state after it ends, with no extra JS needed
  to trigger on mount

## Elements targeted

- `.hero-enter-nav` → the `<header>` root in `src/components/Header.tsx` (the
  whole nav bar, including the pill/tabs — confirmed blur should cover all of
  it, not just the label text)
- `.hero-enter-heading` → the `<h1>` in `src/components/IntroSection.tsx`.
  `filter` on a parent applies to its entire rendered subtree, so the inline
  visuals nested inside the headline (folder/tags, cover image, heart, phone
  mockups) blur in together with the text as one composition — this is the
  desired effect, not an accidental side effect.

## Interaction with the existing route-transition system

`template.tsx` wraps page content in `.route-enter.route-enter-stagger`,
which already fades+slides each top-level section (via `translateY` +
`opacity`) using the `page-enter` keyframes. That animation targets the
`<section>` root of `IntroSection`, not the `<h1>` inside it, so the new
`hero-enter` animation on the `<h1>` runs independently and doesn't collide
with (overwrite) the existing `animation` shorthand on the section.

The `<header>` rendered by `AppShellHeader` is a sibling of `<main>` in
`layout.tsx` and isn't touched by the route-transition system at all, so
`.hero-enter-nav` is the only animation on it.

## Reduced motion

Extend the existing `@media (prefers-reduced-motion: reduce)` block in
`globals.css` (which already neutralizes `.route-enter` and
`.route-enter-stagger > *`) to also cover:

```css
.hero-enter-nav,
.hero-enter-heading {
  animation: none;
  opacity: 1;
  filter: none;
}
```

## Out of scope

- No scroll-trigger logic — animation always plays once, on mount.
- No changes to the route-transition (`route-enter`) system itself.
- Not applying blur-in to any other sections (`ProjectsGrid`, `FooterNote`,
  etc.) — only the hero's nav + headline, per the request.
