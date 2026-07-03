# Hero Text Fix + Works Section Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the hero headline's line-height to match Figma, and completely rework the homepage "works" cards (drop tag chips/border frame, new typography, new Governmental Platform case replacing the hidden Role Management card, all per Figma node `708:444773`).

**Architecture:** Pure frontend change in a Next.js 16 / React 19 / Tailwind v4 app, no backend or test runner involved. `src/lib/projects.ts` is the single source of truth consumed by both the homepage grid (`ProjectsGrid` → `ProjectCard`) and the dynamic case-study route (`src/app/projects/[slug]/page.tsx`), so schema changes there ripple to both call sites, which this plan updates together.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript 5. No unit test framework is configured (`package.json` has no test script) — verification here is `npx tsc --noEmit`, `npm run lint`, `npm run build`, and manual visual checks against the Figma screenshot via the dev server.

## Global Constraints

- Design source of truth: Figma file `J3uPwVk6E3k2rI1b1RTP7S`, node `708:444773` (Intro Section `708:444787`, Projects Section `708:444890`).
- Keep the Ajax Systems video/animation exactly as implemented today (`/gifs/ajax-cover.webm` / `.mp4`) — do not swap it for a static image.
- Do not delete or restyle the Role Management case study page/component (`RoleManagementCaseStudy.tsx`, `/projects/role-management-system`) — only stop listing it on the homepage grid.
- The new Governmental Platform card has `status: "planned"` (no case study page yet) — it must render non-clickable, same as the existing `"planned"` path.
- New card copy (verbatim): name `"Governmental Platform"`, subtitle `"Web, Mobile & CMS"`, date `"Feb 2025 - Jun 2026"`, description `"Three connected products built for a government organisation in the Arabic-speaking region - a monitoring dashboard, a back-office CMS, and a companion mobile app."`
- Placeholder images already exist at `public/home/governmental-platform/background.png` and `public/home/governmental-platform/screenshot.png` (downloaded from Figma) — reference these paths, don't re-download.

---

### Task 1: Fix hero headline line-height

**Files:**
- Modify: `src/components/IntroSection.tsx:302`

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing new (internal style value only).

- [ ] **Step 1: Change the line-height value**

In `src/components/IntroSection.tsx`, find this block inside the `<h1>` style prop (around line 296-305):

```tsx
          style={{
            /* 7.2cqw: the widest line (cover + "interfaces people ♥ love,")
               measures ~13.82em in Inter Display, so the headline fills ~99%
               of the container at any width and caps at the Figma size (64px)
               on wide screens. */
            fontFamily: "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: "min(64px, 7.2cqw)",
            lineHeight: 78 / 64,
            letterSpacing: "0.01em",
            gap: em(8),
          }}
```

Change `lineHeight: 78 / 64,` to `lineHeight: 76 / 64,` (Figma node `708:444790` etc. specify `leading-[76px]` at a 64px font size, not 78px).

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (this is a numeric literal change only, cannot introduce a type error, but confirms the file still parses).

- [ ] **Step 3: Commit**

```bash
git add src/components/IntroSection.tsx
git commit -m "fix: match hero headline line-height to Figma spec (76/64, not 78/64)"
```

---

### Task 2: Update the project data model (`src/lib/projects.ts`)

**Files:**
- Modify: `src/lib/projects.ts` (full rewrite of the type + array)

**Interfaces:**
- Consumes: nothing new.
- Produces: `ProjectRecord` type with fields `slug: string`, `name: string`, `subtitle: string`, `dateRange: string`, `description: string`, `cover: "ajax" | "fitness" | "role" | "governmental"`, `status: ProjectStatus`, `hidden?: boolean`. Removes `title` and `tags` (confirmed unused outside this file and `ProjectCard`/`ProjectsGrid`, which Tasks 3-5 update). Exports unchanged: `projects: ProjectRecord[]`, `getProjectBySlug(slug: string)`.
- Tasks 3, 4, and 5 read `name`, `subtitle`, `dateRange`, `description`, `cover`, `status`, `hidden` from this type.

- [ ] **Step 1: Replace the file contents**

Replace the entire contents of `src/lib/projects.ts` with:

```ts
export type ProjectStatus = "ready" | "planned";

export type ProjectRecord = {
  slug: string;
  name: string;
  subtitle: string;
  dateRange: string;
  description: string;
  cover: "ajax" | "fitness" | "role" | "governmental";
  status: ProjectStatus;
  /** Excludes this project from the homepage grid without breaking its route. */
  hidden?: boolean;
};

export const projects: ProjectRecord[] = [
  {
    slug: "governmental-platform",
    name: "Governmental Platform",
    subtitle: "Web, Mobile & CMS",
    dateRange: "Feb 2025 - Jun 2026",
    description:
      "Three connected products built for a government organisation in the Arabic-speaking region - a monitoring dashboard, a back-office CMS, and a companion mobile app.",
    cover: "governmental",
    status: "planned",
  },
  {
    slug: "beta-testing-platform-ajax",
    name: "Ajax Systems",
    subtitle: "Beta testing platform",
    dateRange: "May 2025 - July 2025",
    description:
      "Centralized beta testing hub to collect structured feedback faster and make the process transparent for testers.",
    cover: "ajax",
    status: "ready",
  },
  {
    slug: "fitness-app-redesign",
    name: "Sadie Active",
    subtitle: "Fitness app redesign",
    dateRange: "Oct 2023 - Feb 2024",
    description:
      "Mobile fitness app of a fitness influencer, designed solution for Progress dashboard and Workout programs.",
    cover: "fitness",
    status: "ready",
  },
  {
    slug: "role-management-system",
    name: "Role management system",
    subtitle: "for government platform",
    dateRange: "Aug 2025",
    description:
      "Designed the permission architecture and interaction model for a multi-environment government dashboard.",
    cover: "role",
    status: "ready",
    hidden: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
```

Note the project order matches the Figma mock: Governmental Platform, Ajax Systems, Sadie Active, with Role Management kept last and `hidden: true`.

- [ ] **Step 2: Type-check (expect failures in dependent files — that's expected at this point)**

Run: `npx tsc --noEmit`
Expected: errors in `src/components/ProjectsGrid.tsx`, `src/components/ProjectCard.tsx`, and `src/components/projects/ProjectCaseSkeleton.tsx` referencing the removed `title`/`tags` fields. These are fixed in Tasks 3-5.

- [ ] **Step 3: Commit**

```bash
git add src/lib/projects.ts
git commit -m "feat: rework project data model with name/subtitle split, add Governmental Platform, hide Role Management"
```

---

### Task 3: Update `ProjectsGrid` to filter hidden projects and pass new props

**Files:**
- Modify: `src/components/ProjectsGrid.tsx`

**Interfaces:**
- Consumes: `ProjectRecord` from Task 2 (`name`, `subtitle`, `dateRange`, `description`, `cover`, `status`, `hidden`, `slug`).
- Consumes: `ProjectCardProps` from Task 5 (`name`, `subtitle`, `dateRange`, `description`, `cover`, `href?`).
- Produces: nothing new (page-level component).

- [ ] **Step 1: Replace the file contents**

Replace `src/components/ProjectsGrid.tsx` with:

```tsx
import ProjectCard from "./ProjectCard";
import { projects as defaultProjects, type ProjectRecord } from "@/lib/projects";

export type Project = ProjectRecord;

type ProjectsGridProps = {
  projects?: Project[];
};

export default function ProjectsGrid({ projects = defaultProjects }: ProjectsGridProps) {
  return (
    <section id="work" className="mx-auto w-full max-w-[900px] fluid-px pb-[60px]">
      <h2 className="mb-6 font-sans text-[24px] font-medium leading-[32px] text-[var(--text-secondary)]">
        Selected work
      </h2>
      <div className="flex flex-col gap-[70px]">
        {projects
          .filter((project) => !project.hidden)
          .map((project) => (
            <ProjectCard
              key={project.slug}
              name={project.name}
              subtitle={project.subtitle}
              dateRange={project.dateRange}
              description={project.description}
              cover={project.cover}
              href={project.status === "ready" ? `/projects/${project.slug}` : undefined}
            />
          ))}
      </div>
    </section>
  );
}
```

Two changes from before: `.filter((project) => !project.hidden)` excludes Role Management from the grid, `gap-8` → `gap-[70px]` matches the Figma spacing between cards (node `708:444825`'s `gap-[70px]`), and the mapped props match the new `ProjectCardProps` shape from Task 5.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: still errors in `ProjectCard.tsx` (Task 5 not done yet) and `ProjectCaseSkeleton.tsx` (Task 4 not done yet), but no error mentioning `ProjectsGrid.tsx` anymore.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectsGrid.tsx
git commit -m "feat: filter hidden projects from homepage grid, widen card gap to match Figma"
```

---

### Task 4: Update `ProjectCaseSkeleton` to use `name`/`subtitle`

**Files:**
- Modify: `src/components/projects/ProjectCaseSkeleton.tsx:22`

**Interfaces:**
- Consumes: `ProjectRecord` from Task 2 (`name`, `subtitle`).
- Produces: nothing new.

- [ ] **Step 1: Update the heading**

In `src/components/projects/ProjectCaseSkeleton.tsx`, change line 22 from:

```tsx
            {project.title}
```

to:

```tsx
            {project.name} {project.subtitle}
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no error mentioning `ProjectCaseSkeleton.tsx`. (`ProjectCard.tsx` errors remain until Task 5.)

- [ ] **Step 3: Commit**

```bash
git add src/components/projects/ProjectCaseSkeleton.tsx
git commit -m "fix: render project name + subtitle on the case study skeleton heading"
```

---

### Task 5: Rework `ProjectCard` visuals

**Files:**
- Modify: `src/components/ProjectCard.tsx` (full rewrite)

**Interfaces:**
- Consumes: `ScaledCover` from `src/components/ScaledCover.tsx` (props `children`, `nativeWidth?`, `nativeHeight?`, `className?` — unchanged, already exists).
- Consumes: static assets `/home/unsplash_-Vh-kRw_vyQ.png`, `/home/sadie_active/sadieactivecover1 1.png`, `/home/sadie_active/asdieactivecover2 1.png`, `/home/role management image.png`, `/home/role_management/shutterstock-bg.png` (all already on disk, unchanged), plus new `/home/governmental-platform/background.png` and `/home/governmental-platform/screenshot.png` (already downloaded).
- Produces: `ProjectCardProps` = `{ name: string; subtitle: string; dateRange: string; description: string; cover: "ajax" | "fitness" | "role" | "governmental"; href?: string }`. This is what Task 3's `ProjectsGrid` passes in.

- [ ] **Step 1: Replace the file contents**

Replace `src/components/ProjectCard.tsx` with:

```tsx
import Link from "next/link";
import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";

export type ProjectCardProps = {
  name: string;
  subtitle: string;
  dateRange: string;
  description: string;
  cover: "ajax" | "fitness" | "role" | "governmental";
  href?: string;
};

// Ajax cover assets
const imgAjaxBg = "/home/unsplash_-Vh-kRw_vyQ.png";

// Fitness cover assets
const imgFitnessLeft = "/home/sadie_active/sadieactivecover1 1.png";
const imgFitnessRight = "/home/sadie_active/asdieactivecover2 1.png";

// Governmental platform cover assets
const imgGovernmentalBg = "/home/governmental-platform/background.png";
const imgGovernmentalScreenshot = "/home/governmental-platform/screenshot.png";

// Role management cover assets (case study hidden from the grid, kept for the
// direct-link route — see RoleManagementCaseStudy.tsx)
const imgRoleManagement = "/home/role management image.png";
const imgRoleManagementBg = "/home/role_management/shutterstock-bg.png";

export default function ProjectCard({
  name,
  subtitle,
  dateRange,
  description,
  cover,
  href,
}: ProjectCardProps) {
  const coverClassName = {
    governmental: "rounded-[32px] bg-[#ececec] shrink-0",
    ajax: "rounded-[32px] bg-[#ececec] shrink-0",
    fitness: "rounded-[32px] bg-[#f1f1f1] shrink-0",
    role: "rounded-[16px] bg-[#f1f5f9] border border-[#ededed] shadow-[0px_2px_4px_0px_rgba(219,219,219,0.5)] shrink-0",
  }[cover];

  const coverNode = (
    <ScaledCover nativeWidth={840} nativeHeight={553} className={coverClassName}>
      {cover === "governmental" && (
        <>
          <div className="absolute inset-0">
            <Image
              src={imgGovernmentalBg}
              alt=""
              fill
              sizes="100vw"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute left-1/2 top-1/2 h-[423px] w-[761px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] overflow-hidden">
            <Image
              src={imgGovernmentalScreenshot}
              alt=""
              fill
              sizes="761px"
              className="object-cover pointer-events-none"
            />
          </div>
        </>
      )}
      {cover === "ajax" && (
        <>
          <div className="absolute inset-0 blur-[6px]">
            <Image
              src={imgAjaxBg}
              alt=""
              fill
              sizes="100vw"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute left-1/2 top-1/2 h-[472px] w-[665px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/gifs/ajax-cover.webm" type="video/webm" />
              <source src="/gifs/ajax-cover.mp4" type="video/mp4" />
            </video>
          </div>
        </>
      )}
      {cover === "fitness" && (
        <div className="absolute inset-0 flex items-center justify-center gap-[28px]">
          <div className="relative h-[479px] w-[227px] shrink-0">
            <Image
              src={imgFitnessLeft}
              alt=""
              fill
              sizes="227px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="relative h-[479px] w-[227px] shrink-0">
            <Image
              src={imgFitnessRight}
              alt=""
              fill
              sizes="227px"
              className="object-cover pointer-events-none"
            />
          </div>
        </div>
      )}
      {cover === "role" && (
        <>
          <div className="absolute top-[-1px] left-[calc(50%+226.5px)] -translate-x-1/2 h-[633px] w-[1583px]">
            <Image
              src={imgRoleManagementBg}
              alt=""
              fill
              sizes="1583px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-[12px] rounded-[12px] w-[473px]">
            <div className="relative w-full" style={{ aspectRatio: "630/510" }}>
              <Image
                src={imgRoleManagement}
                alt=""
                fill
                sizes="449px"
                className="object-cover pointer-events-none"
              />
            </div>
          </div>
        </>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.24)] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
    </ScaledCover>
  );

  const textNode = (
    <div className="flex w-full flex-col gap-[12px]">
      <div className="flex flex-col gap-[8px]">
        <p className="font-sans text-[18px] font-medium leading-[26px] text-[#787878]">
          {dateRange}
        </p>
        <h3 className="flex w-full flex-col items-start gap-1 text-[24px] leading-[32px] min-[810px]:flex-row min-[810px]:gap-2 min-[810px]:whitespace-nowrap">
          <span className="w-full font-sans font-semibold text-[#383232] min-[810px]:w-auto">
            {name}
          </span>
          <span className="font-sans font-medium text-[#383232]">{subtitle}</span>
        </h3>
      </div>
      <p className="font-sans text-[20px] font-normal leading-[28px] text-[var(--text-primary)]">
        {description}
      </p>
    </div>
  );

  const className = "group flex flex-col gap-[20px] text-left";

  if (href) {
    return (
      <Link href={href} className={className} data-tooltip="See case study">
        {coverNode}
        {textNode}
      </Link>
    );
  }

  return (
    <article className={className}>
      {coverNode}
      {textNode}
    </article>
  );
}
```

Key changes from the previous version:
- `coverClassName` map: all non-`role` variants now `rounded-[32px]`, no border/shadow; new `governmental` variant added.
- New `governmental` cover branch: crisp (unblurred) full-bleed background image + centered `761×423` rounded-16 screenshot, sized to that image's native aspect ratio.
- `ajax` branch: same blurred-background + centered pattern as before, same video sources, resized centered box from `596×424`/`rounded-8` to `665×472`/`rounded-16`.
- `fitness` branch: images resized from `199×420` to `227×479`, gap widened from `24px` to `28px`, no other change.
- `role` branch: untouched (dead code path today since `ProjectsGrid` filters it out via `hidden: true`, but left intact so the case study route keeps working if ever re-enabled).
- `textNode`: tag chips removed entirely; date moved to its own line (`18px/26px`, `#787878`); title row now renders `name` (semibold) + `subtitle` (medium) at `24px/32px`, `#383232`; description bumped to `20px/28px` and recolored from `--text-secondary` to `--text-primary`; outer `px-[12px]` padding removed since there's no card frame to inset from.
- Outer wrapper: `gap-[24px]` → `gap-[20px]`, all border/background/padding classes removed (`bg-[#fbfbfb] border-[1.5px] border-[#ededed] rounded-[24px] pt-[12px] px-[12px] pb-[24px]` are gone) — the card is now just the image block followed by text, no frame.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors anywhere in the project.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: rework project card visuals to match Figma (drop chips/border, new type scale, add governmental cover)"
```

---

### Task 6: Manual verification against Figma

**Files:** none (verification only).

**Interfaces:** none.

- [ ] **Step 1: Build to catch any production-only issues**

Run: `npm run build`
Expected: build succeeds with no type or lint errors (Next.js runs both during build).

- [ ] **Step 2: Start the dev server**

Run: `npm run dev` (in the background, or in a separate terminal)
Expected: server starts on `http://localhost:3000` (or the next free port — check the terminal output).

- [ ] **Step 3: Visually compare the homepage to the Figma screenshot**

Open `http://localhost:3000` in a browser (or use a Playwright/browser tool if available) and check:
- Hero headline wraps and sizes the same as before, just very slightly tighter line spacing (76px vs 78px per line at the 64px reference size) — should look nearly identical to before this change.
- "Selected work" section shows exactly 3 cards in this order: Governmental Platform, Ajax Systems, Sadie Active — Role Management does **not** appear.
- No tag pills or bordered/background box around any card — image block directly followed by date / name+subtitle / description, all flush with the image's edges.
- Governmental Platform card is not a clickable link (no hover pointer/underline, no `href`); Ajax and Sadie Active cards are still clickable through to their case studies.
- Ajax's card still plays the looping video, now inside a larger (`665×472`) centered rounded box.
- Visit `http://localhost:3000/projects/role-management-system` directly and confirm the page still renders (proves "hidden but not deleted" worked).

- [ ] **Step 4: Report back**

If everything matches, this task is done — no commit needed (verification only). If something looks off, note the specific discrepancy for a follow-up fix before considering the plan complete.
