import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";
import CaseStudyToC, { type ToCSection } from "@/components/projects/CaseStudyToC";
import CaseStudyMeta from "@/components/projects/CaseStudyMeta";
import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

const imgShutterstock = "/home/role_management/shutterstock-bg.png";
const imgCreateNewRoleNew3 = "/home/role_management/Create new role NEW 3.png";
const imgCreateNewRole13 = "/home/role_management/Create new role 1 3.png";
const imgCreateNewRole23 = "/home/role_management/Create new role 2 3.png";
const imgProfileRole1 = "/home/role_management/profile - role 1.png";
const imgProfilePermissions1 = "/home/role_management/profile - permissions 1.png";

const TOC_SECTIONS: ToCSection[] = [
  { id: "setup", label: "The setup" },
  { id: "first-model", label: "The first model" },
  { id: "collision", label: "The collision" },
  { id: "crossroads", label: "The crossroads" },
  { id: "what-shipped", label: "What shipped" },
  { id: "outcome", label: "Outcome" },
];

function SectionHeader({ subtitle, title }: { subtitle: string; title: string }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <p className="font-inconsolata text-[18px] font-semibold leading-6 text-[var(--text-tertiary)]">
        {subtitle}
      </p>
      <h2 className="text-[24px] font-medium leading-8 text-[var(--text-primary)]">
        {title}
      </h2>
    </div>
  );
}

function Showcase({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <ScaledCover nativeWidth={840} nativeHeight={520} className="rounded-[16px] bg-[#f0f0f0]">
        {children}
      </ScaledCover>
      {caption ? (
        <p className="type-caption text-center text-[var(--text-tertiary)]">{caption}</p>
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
        className="rounded-[12px] border border-[#ececec] bg-[#f0f0f0]"
      >
        {children}
      </ScaledCover>
      <p className="type-caption text-center text-[var(--text-tertiary)]">{caption}</p>
    </div>
  );
}

const NESTING_LEVELS = [
  { label: "Environment", examples: "Dashboard / Management Portal / Admin Portal", color: "#2b99db", flagged: false },
  { label: "Module", examples: "Analytics, Reports, User Management", color: "#6680e5", flagged: false },
  { label: "Domain", examples: "GDP Indicators, Employment, Trade", color: "#8c59e5", flagged: false },
  { label: "Sub-domain", examples: "National / Regional / Sectoral", color: "#a64dbf", flagged: true },
  { label: "Permission", examples: "View, Export, Manage", color: "#bf408c", flagged: true },
  { label: "Action", examples: "Full Access / Edit / Create / Delete", color: "#d94059", flagged: false },
];

function NestingDiagram() {
  return (
    <div className="flex w-full flex-col gap-[6px]">
      {NESTING_LEVELS.flatMap((level, i) => {
        const box = (
          <div
            key={level.label}
            className={`flex items-center gap-3 rounded-[8px] bg-[#fafafa] px-4 py-3 ${level.flagged ? "border-[1.5px] border-[rgba(217,133,46,0.6)]" : "border border-[#ededed]"}`}
          >
            <div className="flex flex-1 flex-col gap-[2px]">
              <p className="text-[13px] font-semibold" style={{ color: level.color }}>
                {level.label}
              </p>
              <p className="text-[12px] text-[#818790]">{level.examples}</p>
            </div>
            {level.flagged && (
              <div className="shrink-0 rounded-[6px] bg-[rgba(217,133,46,0.12)] px-2 py-[3px]">
                <p className="whitespace-nowrap text-[11px] font-medium text-[#d9852e]">⚑ open flag</p>
              </div>
            )}
          </div>
        );
        if (i < NESTING_LEVELS.length - 1) {
          return [box, <p key={`arrow-${i}`} className="text-center text-[14px] text-[#818790]">↓</p>];
        }
        return [box];
      })}
    </div>
  );
}

const FLOW_STEPS = [
  { label: "Module", desc: "Dashboard & Mgmt Portal share content", color: "#2b99db" },
  { label: "Domain category", desc: "Segments, Decisions, Content Mgmt", color: "#6680e5" },
  { label: "Specific items", desc: "Drill into domain", color: "#8c59e5" },
  { label: "Environments", desc: "Where the role applies", color: "#a64dbf" },
  { label: "Action", desc: "What the role can do", color: "#d94059" },
];

function FlowDiagram() {
  return (
    <div className="flex flex-col gap-[20px]">
      <p className="text-[13px] font-medium leading-[18px] text-[#818790]">
        Content-first mental model — initial proposal
      </p>
      <div className="flex w-full flex-col gap-[6px] min-[1024px]:flex-row min-[1024px]:items-stretch">
        {FLOW_STEPS.flatMap((step, i) => {
          const box = (
            <div
              key={step.label}
              className="flex min-w-0 flex-1 flex-col justify-center gap-1 rounded-[8px] border border-[#ededed] bg-[#fafafa] px-4 py-3 min-[1024px]:min-w-[120px] min-[1024px]:items-center min-[1024px]:px-[14px]"
            >
              <p className="text-[12px] font-semibold" style={{ color: step.color }}>
                {step.label}
              </p>
              <p className="text-[12px] leading-4 text-[#818790] min-[1024px]:text-center min-[1024px]:text-[11px]">
                {step.desc}
              </p>
            </div>
          );
          if (i < FLOW_STEPS.length - 1) {
            return [
              box,
              <p
                key={`arrow-${i}`}
                className="shrink-0 text-center text-[14px] text-[#818790] min-[1024px]:self-center min-[1024px]:text-[16px]"
              >
                <span className="min-[1024px]:hidden">↓</span>
                <span className="hidden min-[1024px]:inline">→</span>
              </p>,
            ];
          }
          return [box];
        })}
      </div>
    </div>
  );
}

const TRADEOFF_ROWS = [
  {
    criteria: "Logic lives in",
    original: "The role — fully self-contained",
    chosen: "Role (scope) + User profile (detail)",
  },
  {
    criteria: "Works best when",
    original: "Many users share the same access pattern",
    chosen: "Access patterns vary across individuals",
  },
  {
    criteria: "Scales with",
    original: "Large teams, repeated job functions",
    chosen: "Small orgs, unique per-person setups",
  },
  {
    criteria: "Risk",
    original: "Role library grows complex over time",
    chosen: "Per-user config overhead at scale",
  },
];

function TradeoffsTable() {
  return (
    <div className="overflow-x-auto rounded-[12px] border border-[#ededed]">
      <div className="min-w-[560px] divide-y divide-[#ededed] bg-white">
        <div className="flex bg-[#fafafa] px-5 py-3">
          <p className="w-[180px] shrink-0 text-[13px] font-semibold text-[#818790]">Criteria</p>
          <p className="flex-1 text-[13px] font-semibold text-[#818790]">Role-complete model</p>
          <p className="flex-1 text-[13px] font-semibold text-[#818790]">Split model (chosen)</p>
        </div>
        {TRADEOFF_ROWS.map((row) => (
          <div
            key={row.criteria}
            className="flex items-start bg-white px-5 py-[14px] text-[13px] leading-[20px]"
          >
            <p className="w-[180px] shrink-0 font-semibold text-[var(--text-primary)]">{row.criteria}</p>
            <p className="flex-1 font-normal text-[var(--text-secondary)]">{row.original}</p>
            <p className="flex-1 font-medium text-[#26a661]">{row.chosen}</p>
          </div>
        ))}
        <div className="flex items-center gap-[10px] bg-[rgba(38,166,97,0.05)] px-5 py-[14px] text-[#26a661]">
          <p className="shrink-0 text-[14px] font-semibold">✓</p>
          <p className="min-w-0 flex-1 text-[13px] font-medium leading-[20px]">
            We chose the split model — small org, access patterns varied too much to justify maintaining a library of granular roles.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RoleManagementCaseStudy() {
  return (
    <CaseStudyLayout
      backHref="/"
      sidebar={<CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Role Management System" />}
    >
      <div className="flex min-w-0 w-full flex-col gap-[48px] text-[var(--foreground)]">
        {/* Opening block */}
        <div className="flex w-full flex-col gap-[32px]">
          {/* Title */}
          <div className="flex flex-col gap-[6px]">
            <p className="font-inconsolata text-[26px] font-medium leading-9 text-[var(--text-tertiary)]">
              Governmental platform
            </p>
            <h1 className="text-[26px] font-medium leading-9 text-[var(--text-primary)]">
              Role Management System
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            When the cleanest model isn&apos;t the right one: designing — and rebuilding — the permission architecture for a multi-environment government platform
          </p>

          {/* Hero showcase */}
          <Showcase>
            <div className="absolute h-[633px] w-[1583px] left-[calc(50%+274.5px)] top-0 -translate-x-1/2">
              <Image
                src={imgShutterstock}
                alt=""
                fill
                sizes="1583px"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 h-[467px] w-[622px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px]">
              <Image
                src={imgCreateNewRoleNew3}
                alt=""
                fill
                sizes="(max-width: 809px) calc(74vw - 30px), 622px"
                priority
                className="object-contain"
              />
            </div>
          </Showcase>

          {/* Info */}
          <CaseStudyMeta items={[
            { label: "Role", value: "Product Designer" },
            { label: "Team", value: "2 designers" },
            { label: "Timeline", value: "August 2025" },
          ]} />

          {/* Description */}
          <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <p>
              A government dashboard serving executive leadership, project managers, and internal teams needed reliable access control across three environments: Dashboard, Management Portal, and Admin Portal. Managing access case-by-case had become unsustainable.
            </p>
            <p>
              I designed the access architecture twice: once around a hypothesis I believed in, once around the constraint that broke it. The second version shipped.
            </p>
          </div>
        </div>

        {/* The setup */}
        <div id="setup" className="flex flex-col gap-[20px]">
          <SectionHeader subtitle="The setup" title="Six levels deep, zero structure" />
          <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <p>
              The platform served executive leadership, project managers, and internal teams across three environments — Dashboard, Management Portal, Admin Portal — covering sensitive national data across economic sectors. Access control carried real governance stakes, not just UX ones.
            </p>
            <p>Underneath sat a permission hierarchy six levels deep:</p>
          </div>
          <NestingDiagram />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            There was no access control model on top of this. Everything was all-or-nothing or configured manually, person by person. The core tension:{" "}
            <span className="font-crimson italic font-normal text-[20px] leading-[26px]">
              Most users only needed access to specific parts of the system, but there was no way to express that cleanly.
            </span>
          </p>
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Design decision:{" "}
            <span className="font-crimson italic font-medium text-[20px] leading-[26px]">
              group by content domain, not by environment, so an admin navigates six nested levels without making mistakes.
            </span>
          </p>
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            This wasn&apos;t tested against real usage — there was no error data to test it against — but it held up structurally through both versions of the model, checked in diagram review with the product owner and never revisited.
          </p>
        </div>

        {/* The first model */}
        <div id="first-model" className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <SectionHeader subtitle="The first model" title="A role is what a person does" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              My starting premise:{" "}
              <span className="font-crimson italic font-medium text-[20px] leading-[26px]">
                a role should reflect what a person does, not where they sit
              </span>
              .<br /><br />
              Module permissions came first — Dashboard and Management Portal are two sides of the same content, so starting with content made more sense than starting with environment. Admin Portal stayed in the same navigation deliberately: one decision, one step. Actions came last, scoped to each module individually, so a role could carry different permission levels across the modules it touched.
            </p>
            <FlowDiagram />
          </div>

          <div className="flex flex-col gap-4">
            <DiagramShowcase
              caption="Module permissions came first — before environments, before actions"
              nativeHeight={520}
            >
              <div className="absolute left-1/2 top-1/2 h-[468px] w-[642px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px] border border-[#dedede]">
                <Image
                  src={imgCreateNewRole13}
                  alt=""
                  fill
                  sizes="(max-width: 809px) calc(76vw - 31px), 642px"
                  className="object-contain"
                />
              </div>
            </DiagramShowcase>

            <DiagramShowcase
              caption="Only after the content scope is set does the admin define access levels."
              nativeHeight={520}
            >
              <div className="absolute left-1/2 top-1/2 h-[468px] w-[642px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px] border border-[#dedede]">
                <Image
                  src={imgCreateNewRole23}
                  alt=""
                  fill
                  sizes="(max-width: 809px) calc(76vw - 31px), 642px"
                  className="object-contain"
                />
              </div>
            </DiagramShowcase>
          </div>

          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            The result was a role like National Indicators Administrator — self-contained, defined by what the person manages. The logic held. But it stood on a question I couldn&apos;t answer alone: would people with the same job function actually share the same access pattern? I had no data to test that — so I shipped the proposal anyway, partly to put the question in front of someone who&apos;d know.
          </p>
        </div>

        {/* The collision */}
        <div id="collision" className="flex flex-col gap-[20px]">
          <SectionHeader subtitle="The collision" title="The question I built the model to ask" />
          <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <p>
              The client sessions didn&apos;t attack the logic — they attacked the premise: How many users will actually share this role? How much do access patterns repeat? Who maintains a library of detailed roles?
            </p>
            <p>
              That was the real hypothesis in the room:{" "}
              <span className="font-crimson italic font-medium text-[20px] leading-[26px]">
                most users with the same job function share the same access pattern, so the role can carry all the granularity.{" "}
              </span>
              Across three rounds of feedback, the answer got clear — most roles mapped to one or two real people, patterns barely repeated, nobody wanted to curate a role library. The hypothesis didn&apos;t hold.
            </p>
            <p>
              Each session surfaced a constraint the diagrams couldn&apos;t show. By the third round, the choice had crystallized into a crossroads.
            </p>
          </div>
        </div>

        {/* The crossroads */}
        <div id="crossroads" className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <SectionHeader subtitle="The crossroads" title="Two models, one deciding variable" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Where does permission logic live — entirely in the role, or split between the role and the user?
            </p>
          </div>
          <TradeoffsTable />
          <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <p>
              <strong className="font-semibold text-[var(--text-primary)]">Role-complete</strong>{" "}
              puts all logic in the role — content, environments, actions, configured at creation. It scales beautifully when patterns repeat: assign the same role to everyone in the same job, done. For this org, it would have meant a role for nearly every individual pattern — closer to a role-per-person library than a reusable one.
            </p>
            <p>
              <strong className="font-semibold text-[var(--text-primary)]">Split</strong>{" "}
              keeps the role broad — environment and module only — and pushes granular detail to the user profile. It wins when patterns don&apos;t repeat and a role library costs more than it saves.
            </p>
            <p>
              Neither model is universally better — the deciding variable is scale × repetition. This client sat firmly on the split side: small org, near-unique setups, no appetite for role curation.
            </p>
          </div>
        </div>

        {/* What shipped */}
        <div id="what-shipped" className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <SectionHeader subtitle="What shipped" title="Broad roles, granular people" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Role creation handles environment and module only — broad, reusable, no granular permissions.
            </p>
          </div>

          <Showcase caption="Final approach">
            <div className="absolute left-1/2 top-1/2 h-[467px] w-[622px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[12px] border border-[#dedede]">
              <Image
                src={imgCreateNewRoleNew3}
                alt=""
                fill
                sizes="(max-width: 809px) calc(74vw - 30px), 622px"
                className="object-contain"
              />
            </div>
          </Showcase>

          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            User profiles handle the rest — action-level access (Full Access, Edit, Create, Delete) per module and sub-domain, set per person.
          </p>

          <Showcase caption="Role selection from user profile">
            <div className="absolute left-1/2 top-1/2 h-[468px] w-[646px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[8px] border border-[#dedede]">
              <Image
                src={imgProfileRole1}
                alt=""
                fill
                sizes="(max-width: 809px) calc(77vw - 31px), 646px"
                className="object-cover"
              />
            </div>
          </Showcase>

          <Showcase caption="Permission configuring from user profile">
            <div className="absolute left-1/2 top-1/2 h-[467px] w-[644px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[8px] border border-[#dedede]">
              <Image
                src={imgProfilePermissions1}
                alt=""
                fill
                sizes="(max-width: 809px) calc(77vw - 31px), 644px"
                className="object-cover"
              />
            </div>
          </Showcase>

          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            An admin never faces all six hierarchy levels at once — two decisions to create a role, the remaining four only surface when configuring a person. The UI uses a checkbox table with parent-child dependencies, so orphaned permissions can&apos;t happen.
          </p>
        </div>

        {/* Outcome */}
        <div id="outcome" className="flex flex-col gap-[20px]">
          <SectionHeader subtitle="Outcome" title="What I took from it" />
          <div className="flex flex-col gap-4 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <p>
              The split model shipped as the platform&apos;s access architecture — a repeatable process where roles stay broad and reusable, and granular permissions live with the person who needs them. Provisioning went from an unstructured, manual process to a fixed path: pick a role, configure permissions on one screen. The structure held through engineering without rework, and every open question I&apos;d flagged early was resolved before build, not in production.
            </p>
            <p>
              What I actually carry from this project isn&apos;t the final UI — it&apos;s what happened to my first model. The role-complete approach wasn&apos;t wrong, it was internally right: clean logic, every decision defensible. What it lacked was one number I didn&apos;t have — how many people would ever share a pattern. The answer turned out to be almost none.
            </p>
            <p>
              If I did this again, I&apos;d chase that number on day one, not the data model. I&apos;d treat &quot;we can&apos;t tell you that&quot; as a risk to log, not an inconvenience to design around. And I&apos;d bring the client a crossroads instead of a proposal — here are two models, here&apos;s the variable that decides between them, help me find it.
            </p>
            <p>
              What I now carry into every system design:{" "}
              <span className="font-crimson italic font-medium text-[20px] leading-[26px]">
                the architecture isn&apos;t the hard part — the assumption underneath it is
              </span>
              . My job isn&apos;t to build the most logical model; it&apos;s to find out which logic the organization can actually live in, as early and as cheaply as possible. Sometimes that means killing a model you&apos;re proud of. This project taught me to do it without flinching.
            </p>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
