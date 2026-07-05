# Corner Links Design

## Goal
Add a persistent, always-visible corner element with links to email, LinkedIn, and resume, matching the Figma reference (node 707:23711, file J3uPwVk6E3k2rI1b1RTP7S).

## Component
New `src/components/CornerLinks.tsx`, rendered once in `src/app/layout.tsx` inside the existing `flex min-h-screen flex-col` wrapper, as a sibling to `AppShellHeader` / `main`. This makes it global across every route rather than tied to per-page footers (`FooterNote` is only included on some pages).

## Layout
- `fixed bottom-6 right-6 z-40`.
- Hidden below the 810px breakpoint (`hidden min-[810px]:flex`), matching the existing nav's desktop/mobile split in `Header.tsx`.
- Flex column, right-aligned (`items-end`).
- Row 1: "LinkedIn" and "Resume" links, `gap-4` (16px).
- Row 2 (below row 1): email address text link, shown below the LinkedIn/Resume row.

## Styling
- Font: Inter, medium weight, `text-[18px] leading-[26px]`, no underline.
- Row 1 (LinkedIn, Resume): color `#818790` (matches existing `--text-tertiary`), hover shifts to a darker tone for affordance, consistent with existing link hover patterns in `Hero.tsx` / `Header.tsx`.
- Row 2 (email): color `#4b4d53` per Figma (distinct from existing `--text-secondary` `#404246`; kept as literal value for fidelity to the design).
- No background, border, or shadow on the container or the links.

## Links
Reuse the exact destinations already defined in `Hero.tsx`:
- Email: `mailto:ubulyndina@gmail.com` — plain link, no copy-to-clipboard interception (that behavior stays specific to the Hero CTA).
- LinkedIn: `https://www.linkedin.com/in/julia-bulyndina-872617241/`, `target="_blank"`, `rel="noopener noreferrer"`.
- Resume: `/cv/julia-bulyndina-cv.pdf`, `target="_blank"`, `rel="noopener noreferrer"`.

## Out of scope
- No mobile variant of this element (hidden below 810px per user decision).
- No new shared component/token abstraction beyond this one file — this is a single, self-contained UI element.
