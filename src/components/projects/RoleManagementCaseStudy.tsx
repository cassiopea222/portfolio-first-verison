import Link from "next/link";
import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";

const imgCreateNewRoleNew3 = "/home/role_management/Create new role NEW 3.png";
const imgScreenshot20260319At2244461 =
  "/home/role_management/Screenshot 2026-03-19 at 22.44.46 1.png";
const imgCreateNewRole13 = "/home/role_management/Create new role 1 3.png";
const imgCreateNewRole23 = "/home/role_management/Create new role 2 3.png";
const imgProfileRole1 = "/home/role_management/profile - role 1.png";
const imgProfilePermissions1 = "/home/role_management/profile - permissions 1.png";

function NavButton({
  href,
  text,
  rightIcon = false,
}: {
  href: string;
  text: string;
  rightIcon?: boolean;
}) {
  return (
    <Link
      href={href}
      className="type-body inline-flex w-fit items-center gap-2 rounded-xl border border-[#dadada] bg-[linear-gradient(179.23deg,#fff_4.27%,rgba(231,231,231,0.7)_98.14%)] px-3 py-2 text-[var(--text-secondary)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)] transition-[background-color,border-color,color] duration-200 ease-out hover:border-[#d5d5d5] hover:bg-[#efefef] hover:text-[var(--text-primary)]"
    >
      {!rightIcon && <span aria-hidden>←</span>}
      <span>{text}</span>
      {rightIcon && <span aria-hidden>→</span>}
    </Link>
  );
}

function SectionHeader({ subtitle, title }: { subtitle: string; title: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[16px] font-medium leading-6 text-[var(--text-tertiary)]">
        {subtitle}
      </p>
      <h2 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">
        {title}
      </h2>
    </div>
  );
}

function Showcase({
  children,
  caption,
  captionCenter = false,
}: {
  children: React.ReactNode;
  caption?: string;
  captionCenter?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <ScaledCover nativeWidth={840} nativeHeight={520} className="rounded-[16px] bg-[#e6e6e6]">
        {children}
      </ScaledCover>
      {caption ? (
        <p
          className={`text-[16px] font-medium leading-6 text-[var(--text-tertiary)] ${
            captionCenter ? "text-center" : ""
          }`}
        >
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function DiagramShowcase({
  children,
  caption,
  nativeHeight = 452,
}: {
  children: React.ReactNode;
  caption: string;
  nativeHeight?: number;
}) {
  return (
    <div className="flex flex-col gap-2">
      <ScaledCover
        nativeWidth={840}
        nativeHeight={nativeHeight}
        className="rounded-[12px] border border-[#ececec] bg-[#e6e6e6]"
      >
        {children}
      </ScaledCover>
      <p className="text-[16px] font-medium leading-6 text-center text-[var(--text-tertiary)]">
        {caption}
      </p>
    </div>
  );
}

export default function RoleManagementCaseStudy() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[60px] py-[120px] fluid-px max-[809px]:gap-[40px] max-[809px]:py-[48px]">
      <div className="w-full max-w-[840px]">
        <NavButton href="/" text="Go back" />
      </div>

      <div className="flex w-full max-w-[840px] flex-col gap-[48px]">
        {/* Title block */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex items-center gap-3 max-[809px]:flex-col-reverse max-[809px]:items-start max-[809px]:gap-1">
              <h1
                className="text-[32px] font-medium leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] max-[809px]:text-[26px] max-[809px]:leading-9"
                style={{ fontFamily: "var(--font-crimson), serif" }}
              >
                Role Management System
              </h1>
              <p
                className="text-[32px] font-normal leading-[1.25] tracking-[-0.01em] text-[var(--text-tertiary)] max-[809px]:text-[26px] max-[809px]:font-medium max-[809px]:leading-9"
                style={{ fontFamily: "var(--font-crimson), serif" }}
              >
                Governmental platform
              </p>
            </div>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              A role management system for a multi-environment government
              dashboard. Designed the full permission architecture and interaction
              model - from how roles are structured to how individual user access
              is configured. The work involved navigating a deeply nested data
              model, competing mental models between design and client, and a
              scope shift that ultimately led to a cleaner, more practical
              solution.
            </p>
          </div>

          {/* Hero showcase */}
          <Showcase>
            <div className="absolute left-1/2 top-1/2 h-[467px] w-[622px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px]">
              <Image
                src={imgCreateNewRoleNew3}
                alt=""
                fill
                sizes="622px"
                priority
                className="object-cover"
              />
            </div>
          </Showcase>

          {/* Info */}
          <div className="flex items-start justify-between gap-6 max-[402px]:flex-col max-[402px]:gap-[20px]">
            <div className="flex w-[200px] flex-col gap-3 max-[402px]:w-full">
              <p className="text-[18px] font-medium uppercase leading-6 text-[var(--text-tertiary)]">
                Role
              </p>
              <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
                Product Designer
              </p>
            </div>
            <div className="flex w-[200px] flex-col gap-3 max-[402px]:w-full">
              <p className="text-[18px] font-medium uppercase leading-6 text-[var(--text-tertiary)]">
                Team
              </p>
              <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
                2 designers
              </p>
            </div>
            <div className="flex w-[200px] flex-col gap-3 max-[402px]:w-full">
              <p className="text-[18px] font-medium uppercase leading-6 text-[var(--text-tertiary)]">
                Timeline
              </p>
              <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
                August 2025
              </p>
            </div>
          </div>
        </div>

        {/* Context */}
        <div className="flex flex-col gap-[16px]">
          <SectionHeader subtitle="Context" title="What the platform needed" />
          <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <p>
              A government dashboard serving multiple user types - executive
              leadership, project managers, and internal teams - needed a
              reliable way to control who could access what. The platform covered
              sensitive national data across economic sectors, so access control
              wasn&apos;t just a UX problem. It had real administrative and governance
              stakes.
            </p>
            <p>
              The system operated across three environments: a public-facing
              Dashboard, a Management Portal for internal operations, and Admin
              Portal. Each had its own modules, domains, and data. As the platform
              grew, managing access on a case-by-case basis became unsustainable.
            </p>
            <p>
              Working on a government project also meant operating with limited
              access to information. Requirements were often incomplete or subject
              to change, stakeholder availability was constrained, and certain
              organizational details - like the actual scale of the user base or
              how roles were distributed in practice - were difficult to surface.
              A significant part of the design process was making decisions under
              those conditions, and adapting when the ground shifted.
            </p>
          </div>
        </div>

        {/* My role */}
        <div className="flex flex-col gap-[16px]">
          <SectionHeader subtitle="My role" title="What I owned" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            I led the design end-to-end - mapped the permission architecture,
            designed the interaction model across both flows, and worked through
            structural decisions with the product owner and engineering team. I
            also facilitated the alignment conversations that shaped the final
            solution.
          </p>
        </div>

        {/* The problem */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <SectionHeader subtitle="The problem" title="No structure, no process" />
            <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              <p>
                There was no structured access control model. Admins had no clear
                process for creating roles or assigning access, and the
                system&apos;s complexity - three environments, multiple modules, and
                deeply nested content domains - made ad-hoc permission management
                unsustainable.
              </p>
              <p>
                The core tension: most users only needed access to specific parts
                of the system, but there was no way to express that cleanly.
                Everything was either all-or-nothing or handled manually, case by
                case.
              </p>
            </div>
          </div>

          <DiagramShowcase caption="Part of the process of thinking about the logic - role creation model">
            <div className="absolute left-1/2 top-1/2 h-[253px] w-[818px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[8px]">
              <Image
                src={imgScreenshot20260319At2244461}
                alt=""
                fill
                sizes="818px"
                className="object-cover"
              />
            </div>
          </DiagramShowcase>
        </div>

        {/* Challenge */}
        <div className="flex flex-col gap-[16px]">
          <SectionHeader subtitle="Challenge" title="Six levels deep" />
          <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <p>
              The permission model had up to six levels of nesting - Environment
              → Module → Domain → Sub-domain → Permission → Action. Designing
              that in a way an admin could navigate without making mistakes was
              the central problem.
            </p>
            <p>
              There were also unresolved architectural questions: certain domains
              didn&apos;t have a clear path to their permissions, and some connections
              between levels were ambiguous. I documented these directly in the
              diagrams as open flags, which became the basis for alignment
              sessions with the team.
            </p>
          </div>
        </div>

        {/* Initial approach */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <SectionHeader
              subtitle="Initial approach"
              title="How I first framed the problem"
            />
            <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              <p>
                My first instinct was to put the user&apos;s job at the center of role
                creation - a role should reflect what a person does, not just
                where they sit in the system. This was an early working
                hypothesis, not a finished proposal. It established the core logic
                but left a number of open questions that only became visible
                through client conversations.
              </p>
              <p>
                Module permissions came first because the Dashboard and Management
                Portal are two sides of the same content - frontend and backend.
                Most domains live in both, so starting with content rather than
                environment made more sense. Within each domain category -
                Segments, Decisions Management, Content Management - admins would
                drill into specific items, then select which environments the role
                applies to. Admin Portal sat in the same navigation by design:
                even though it&apos;s architecturally separate, the admin is making one
                decision at this step - what does this role need to work with.
                Splitting it out would have added friction without adding clarity.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <DiagramShowcase
              caption="Module permissions came first - before environments, before actions"
              nativeHeight={520}
            >
              <div className="absolute left-1/2 top-1/2 h-[468px] w-[642px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px]">
                <Image
                  src={imgCreateNewRole13}
                  alt=""
                  fill
                  sizes="642px"
                  className="object-cover"
                />
              </div>
            </DiagramShowcase>

            <DiagramShowcase
              caption="Only after defining the content scope would the admin move to Access Permissions."
              nativeHeight={520}
            >
              <div className="absolute left-1/2 top-1/2 h-[468px] w-[642px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px]">
                <Image
                  src={imgCreateNewRole23}
                  alt=""
                  fill
                  sizes="642px"
                  className="object-cover"
                />
              </div>
            </DiagramShowcase>
          </div>

          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            The result was a role like &quot;National Indicators Administrator&quot; -
            defined by what the person manages. The logic held internally, but it
            raised more questions than it answered once we brought it to the
            client: how roles mapped to real people, how many users would share
            the same access pattern, how much variation actually existed across
            the organization. Those questions kicked off a longer process.
          </p>
        </div>

        {/* What we landed on */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <SectionHeader
              subtitle="What we landed on"
              title="Simpler, and more practical"
            />
            <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              <p>
                The final model wasn&apos;t the result of one conversation - it evolved
                through several rounds of feedback, each one surfacing a
                constraint that hadn&apos;t been visible before. I took each round of
                client input as a design input and kept adjusting until the model
                fit how they actually worked.
              </p>
              <p>
                The new approach splits responsibility clearly between two levels:
              </p>
              <p>
                <span className="font-semibold text-[var(--text-primary)]">
                  Role creation handles environment and module selection.
                </span>{" "}
                A role targets modules across three environments - Dashboards,
                Management Portal, and Admin Portal. No granular permissions at
                this stage - the role stays broad and reusable.
              </p>
            </div>
          </div>

          <Showcase caption="Final approach">
            <div className="absolute left-1/2 top-1/2 h-[467px] w-[622px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px]">
              <Image
                src={imgCreateNewRoleNew3}
                alt=""
                fill
                sizes="622px"
                className="object-cover"
              />
            </div>
          </Showcase>

          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">
              User-level permissions handle the rest.
            </span>{" "}
            Admins assign action-level access (Full Access, Edit, Create, Delete)
            per module and sub-domain when setting up a user&apos;s profile. This is
            where the granularity lives.
          </p>

          <Showcase caption="Action-level access through user profile" captionCenter>
            <div className="absolute left-1/2 top-1/2 h-[468px] w-[646px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[8px]">
              <Image
                src={imgProfileRole1}
                alt=""
                fill
                sizes="646px"
                className="object-cover"
              />
            </div>
          </Showcase>

          <Showcase caption="Action-level permissions: selecting access per module and sub-domain">
            <div className="absolute left-1/2 top-1/2 h-[467px] w-[644px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[8px]">
              <Image
                src={imgProfilePermissions1}
                alt=""
                fill
                sizes="644px"
                className="object-cover"
              />
            </div>
          </Showcase>

          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Most users need access to specific domains only. Keeping roles clean
            at the environment level and configuring detail per person gave admins
            a faster process — even if it introduced the scalability tradeoffs
            discussed below.
          </p>
        </div>

        {/* Key design decisions */}
        <div className="flex flex-col gap-[16px]">
          <SectionHeader subtitle="Key design decisions" title="Why it works" />
          <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <p>
              Separating broad access (role) from granular access (user profile)
              reduced cognitive load on admins significantly. Roles don&apos;t need to
              be duplicated just because two people need slightly different
              page-level access - the role defines the context, the user profile
              defines the detail.
            </p>
            <p>
              The final UI reflects this logic: a stepped profile creation flow
              with a dedicated Permissions screen, using a checkbox table per
              module and sub-section. Clear, scannable, and hard to misconfigure.
            </p>
          </div>
        </div>

        {/* Tradeoffs */}
        <div className="flex flex-col gap-[16px]">
          <SectionHeader subtitle="Tradeoffs & reflection" title="Two models, two assumptions" />
          <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <p>
              The gap between the original proposal and the final solution comes
              down to one fundamental question: where does the permission logic
              live - entirely in the role, or split between the role and the
              individual user?
            </p>
            <p>
              <span className="font-semibold text-[var(--text-primary)]">
                The role-complete model assumes all permission logic belongs to
                the role.
              </span>{" "}
              A role is defined by what the person works with - specific content
              domains, granular data points, and the platforms where that content
              lives - all configured at creation time. The role itself is the
              source of truth. This works well when multiple people share the same
              job function and access pattern. Assign the same role to everyone
              who manages the same sector and you&apos;re done - no repetition, no
              per-person configuration.
            </p>
            <p>
              <span className="font-semibold text-[var(--text-primary)]">
                The split model separates role creation from permission
                configuration.
              </span>{" "}
              The role defines broad environment and module access. The granular
              detail - which sub-domains, which actions - gets configured per user
              when their profile is set up. This works well in smaller
              organizations where there are few people per role, access patterns
              don&apos;t repeat much, and the overhead of building detailed roles
              outweighs the benefit. In that context, configuring permissions at
              the user level is actually faster and more flexible than maintaining
              a library of granular roles.
            </p>
            <p>
              The honest answer is that neither model is universally better - the
              right choice depends on scale and how much access patterns repeat
              across the organization. For a large team where ten people manage
              the same sector with the same permissions, the role-complete model
              scales cleanly. For a smaller team where most people have a
              genuinely unique setup, the split model keeps things simple and
              avoids over-engineering the role library.
            </p>
          </div>
        </div>

        {/* Outcome */}
        <div className="flex flex-col gap-[16px]">
          <SectionHeader subtitle="Outcome" title="What this enabled" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            The delivered model gave admins a consistent, repeatable process for
            managing access across a complex multi-environment product. Roles
            became reusable building blocks rather than one-off configurations,
            and granular user permissions became manageable without requiring deep
            technical knowledge from whoever is doing the admin work.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex w-full max-w-[840px] items-center justify-between">
        <NavButton href="/projects/beta-testing-platform-ajax" text="Previous" />
        <NavButton href="/projects/fitness-app-redesign" text="Next" rightIcon />
      </div>
    </section>
  );
}
