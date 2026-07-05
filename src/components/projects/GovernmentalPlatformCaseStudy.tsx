import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";
import CaseStudyToC, { type ToCSection } from "@/components/projects/CaseStudyToC";
import CaseStudyMeta from "@/components/projects/CaseStudyMeta";
import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

// Cover assets
const imgCoverBg = "/home/governmental-platform/cover-bg.png";
const imgCoverScreenshot = "/home/governmental-platform/cover-screenshot.png";

// Context diagram
const imgContextDiagram = "/home/governmental-platform/context-diagram-connector.svg";

// Team and my role icons
const imgRoleIconDesign = "/home/governmental-platform/role-icon-design.svg";
const imgRoleIconBA = "/home/governmental-platform/role-icon-ba.svg";
const imgRoleIconQA = "/home/governmental-platform/role-icon-qa.svg";

// Process diagram
const imgProcessArrow = "/home/governmental-platform/process-arrow.svg";

// Dashboard screenshots
const imgDashboardOverview = "/home/governmental-platform/dashboard-overview.png";
const imgDashboardTourism = "/home/governmental-platform/dashboard-tourism-indicators.png";

// CMS Back-office screenshots
const imgCmsOperationDashboard = "/home/governmental-platform/cms-operation-dashboard.png";
const imgCmsDemandDetails = "/home/governmental-platform/cms-demand-details.png";
const imgCmsSectorDetails = "/home/governmental-platform/cms-sector-details.png";
const imgCmsRoleTable = "/home/governmental-platform/cms-role-management-table.png";
const imgCmsRoleCreating = "/home/governmental-platform/cms-role-creating.png";
const imgCmsRoleAssigning = "/home/governmental-platform/cms-role-assigning.png";
const imgCmsRolePermissions = "/home/governmental-platform/cms-role-permissions.png";

const TOC_SECTIONS: ToCSection[] = [
  { id: "context", label: "Context" },
  { id: "challenges", label: "Challenges" },
  { id: "team-and-role", label: "Team and my role" },
  { id: "process", label: "Process" },
  { id: "dashboard", label: "Dashboard" },
  { id: "cms-back-office", label: "CMS Back-office" },
  { id: "summary", label: "Summary" },
];

const displayFont = {
  fontFamily: "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif",
};

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="font-semibold text-[24px] leading-8 text-[var(--text-primary)]" style={displayFont}>
      {title}
    </h2>
  );
}

function Showcase({
  src,
  alt,
  caption,
  imgWidth,
  imgHeight,
}: {
  src: string;
  alt: string;
  caption: string;
  imgWidth: number;
  imgHeight: number;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <ScaledCover
        hoverZoom
        nativeWidth={840}
        nativeHeight={560}
        className="rounded-[24px] border border-[#ececec] bg-[#f0f0f0]"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px]"
          style={{ width: imgWidth, height: imgHeight }}
        >
          <Image src={src} alt={alt} fill sizes="840px" className="object-cover" />
        </div>
      </ScaledCover>
      <p className="text-[16px] leading-6 text-[var(--text-tertiary)]">{caption}</p>
    </div>
  );
}

function RoleCard({
  icon,
  title,
  subtitle,
  items,
}: {
  icon: string;
  title: string;
  subtitle: string;
  items: string[];
}) {
  return (
    <div className="flex flex-1 flex-col gap-6 rounded-[16px] border border-[#e0e0e0] bg-[#f9f9f9] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d3eefe]">
          <img src={icon} alt="" width={20} height={20} />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-[18px] leading-6 text-[var(--text-primary)]">{title}</p>
          <p className="text-[16px] leading-6 text-[var(--text-secondary)]">{subtitle}</p>
        </div>
      </div>
      <ul className="flex list-disc flex-col gap-3 pl-6 text-[16px] leading-6 text-[var(--text-secondary)]">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function GovernmentalPlatformCaseStudy() {
  return (
    <CaseStudyLayout
      backHref="/"
      sidebar={<CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Web, Mobile & CMS" />}
    >
      <div className="flex min-w-0 w-full flex-col gap-12">
        {/* Opening block */}
        <div className="flex w-full flex-col gap-8">
          <h1
            className="font-semibold text-[32px] leading-[50px] text-[var(--text-primary)] max-[809px]:text-[26px] max-[809px]:leading-9"
            style={displayFont}
          >
            Government Monitoring Platform:
            <br />
            Web (Dashboards &amp; CMS)
          </h1>

          <div className="flex w-full items-center rounded-[12px] border border-[#ededed] bg-[#fafafa] px-4 py-3">
            <p className="text-[16px] leading-[26px] tracking-[0.02em] text-[var(--text-tertiary)]">
              This project is under NDA - almost all data, content, and visuals shown have been altered{" "}
              <br className="max-[809px]:hidden" />
              and are fictional.
            </p>
          </div>

          <ScaledCover hoverZoom nativeWidth={840} nativeHeight={444} className="rounded-[24px] bg-[#ececec]">
            <div className="absolute left-1/2 top-0 h-[633px] w-[1583px] -translate-x-1/2">
              <Image
                src={imgCoverBg}
                alt=""
                fill
                sizes="1583px"
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute left-1/2 top-[40px] h-[430px] w-[773px] -translate-x-1/2 overflow-hidden rounded-[16px]">
              <Image
                src={imgCoverScreenshot}
                alt="Government Monitoring Platform dashboard overview"
                fill
                sizes="773px"
                priority
                className="object-cover"
              />
            </div>
          </ScaledCover>

          <CaseStudyMeta
            accent
            items={[
              { label: "Role", value: "Product Designer" },
              { label: "Team", value: "4 designers" },
              { label: "Timeline", value: "Feb 2025 - June 2026" },
            ]}
          />
        </div>

        {/* Context */}
        <div id="context" className="flex w-full flex-col gap-4">
          <SectionHeading title="Context" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            A government platform built as three connected products. The Dashboard gives
            leadership a read-only, real-time view across sectors - economy, tourism,
            healthcare, education, logistics, and more - while a separate, higher-level
            dashboard mirrors this for the Prime Minister&apos;s office. Both draw from the
            CMS, where operational users - sector staff, indicator analysts, access admins,
            and a content team - publish and update the information that flows live into
            both dashboards.
          </p>

          <div className="relative flex w-full flex-col items-center py-6">
            <div className="rounded-[12px] border border-[#a1cde6] bg-[#e9f6fd] px-4 py-3 text-center text-[#025382]">
              <p className="font-semibold text-[18px] leading-[26px]">CMS</p>
              <p className="text-[16px] leading-6">Sector staff, analysts, admins</p>
            </div>
            <img
              src={imgContextDiagram}
              alt=""
              className="h-[76px] w-full max-w-[373px] object-contain"
            />
            <div className="flex w-full max-w-[627px] items-start justify-between gap-4 max-[500px]:flex-col max-[500px]:items-center">
              <div className="w-full max-w-[255px] rounded-[12px] border border-[#e0e0e0] bg-[#f9f9f9] px-4 py-3 text-center text-[#252525]">
                <p className="font-semibold text-[18px] leading-[26px]">Dashboard</p>
                <p className="text-[16px] leading-6">Leadership, read-only</p>
              </div>
              <div className="w-full max-w-[255px] rounded-[12px] border border-[#e0e0e0] bg-[#f9f9f9] px-4 py-3 text-center text-[#252525]">
                <p className="font-semibold text-[18px] leading-[26px]">PM Dashboard</p>
                <p className="text-[16px] leading-6">Prime minister view</p>
              </div>
            </div>
          </div>
        </div>

        {/* Challenges */}
        <div id="challenges" className="flex w-full flex-col gap-4">
          <SectionHeading title="Challenges" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Access to stakeholders and end users was limited due to NDA restrictions, so the
            design and business analysis teams worked in daily, close collaboration -
            refining requirements together as the product took shape, rather than relying on
            a fixed spec upfront. This made for a highly iterative process, with several
            passes on nearly every feature as the scope evolved alongside the design.
          </p>
        </div>

        {/* Team and my role */}
        <div id="team-and-role" className="flex w-full flex-col gap-8">
          <SectionHeading title="Team and my role" />

          <div className="flex flex-col gap-4">
            <div className="flex items-stretch gap-4 max-[809px]:flex-col">
              <RoleCard
                icon={imgRoleIconDesign}
                title="Design"
                subtitle="4 designers"
                items={[
                  "UX/UI design",
                  "Product research",
                  "Design system (RTL, bilingual)",
                  "User flows",
                  "Prototyping and iteration",
                ]}
              />
              <RoleCard
                icon={imgRoleIconBA}
                title="Business Analysis"
                subtitle="BA team"
                items={["Business logic", "Stakeholder communication", "Scope definition", "Flow validation"]}
              />
              <RoleCard
                icon={imgRoleIconQA}
                title="QA & development"
                subtitle="QDS team"
                items={["Design review", "Development", "Edge case review", "Release validation"]}
              />
            </div>

            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              I owned complex workflows across both dashboards and CMS, took main role in
              creation of design systems used across the entire platform - see the [Design
              System case study] for the full breakdown. I also worked directly with the
              business analysts to help shape requirements, not just design against them.
            </p>
          </div>
        </div>

        {/* Process */}
        <div id="process" className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeading title="Process" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Design consistently worked a sprint ahead of development. Each cycle moved from
              an initial brief and scoping questions, through iterations shaped by ongoing BA
              feedback, to a finalized spec ready for handoff - while development built and
              tested the previous feature in parallel, and design had already begun the next
              one.
            </p>
          </div>

          <div className="max-[809px]:overflow-x-auto">
            <div className="min-w-[840px]">
              <ScaledCover nativeWidth={840} nativeHeight={369} className="rounded-[24px] border border-[#ececec] bg-[#fafafa]">
                {/* Sprint labels */}
                <p className="absolute left-[193px] top-[24px] whitespace-nowrap text-[16px] leading-6 text-[var(--text-secondary)]">
                  Sprint 1
                </p>
                <p className="absolute left-[321px] top-[24px] whitespace-nowrap text-[16px] leading-6 text-[var(--text-secondary)]">
                  Sprint 2
                </p>
                <p className="absolute left-[452px] top-[24px] whitespace-nowrap text-[16px] leading-6 text-[var(--text-secondary)]">
                  Sprint 3
                </p>
                <p className="absolute left-[583px] top-[24px] whitespace-nowrap text-[16px] leading-6 text-[var(--text-secondary)]">
                  Sprint 4
                </p>
                <p className="absolute left-[714px] top-[24px] whitespace-nowrap text-[16px] leading-6 text-[var(--text-secondary)]">
                  Sprint 5
                </p>

                {/* Swimlane labels */}
                <p className="absolute left-[24px] top-[118px] w-[93px] text-[16px] leading-6 text-[var(--text-secondary)]">
                  Design + BA
                </p>
                <p className="absolute left-[24px] top-[267px] w-[93px] text-[16px] leading-6 text-[var(--text-secondary)]">
                  QDS
                </p>

                {/* Main timeline box */}
                <div className="absolute left-[133px] top-[64px] h-[281px] w-[683px] overflow-hidden rounded-[24px] border border-[#ececec] bg-white">
                  <div className="absolute left-[156px] top-[10.5px] h-[260px] w-px border-l border-dashed border-[#e0e0e0]" />
                  <div className="absolute left-[287px] top-[10.5px] h-[260px] w-px border-l border-dashed border-[#e0e0e0]" />
                  <div className="absolute left-[418px] top-[10.5px] h-[260px] w-px border-l border-dashed border-[#e0e0e0]" />
                  <div className="absolute left-[549px] top-[10.5px] h-[260px] w-px border-l border-dashed border-[#e0e0e0]" />

                  <p className="absolute left-[323px] top-[135px] whitespace-nowrap text-[14px] leading-[18px] text-[var(--text-secondary)]">
                    Spec handoff
                  </p>

                  <div className="absolute left-[20px] top-[33px] flex h-[68px] w-[392px] flex-col items-center justify-center gap-[2px] rounded-[12px] border border-[#b9e4fc] bg-[#e7f6ff] text-center">
                    <p className="font-semibold text-[16px] leading-6 text-[#004c78]">Feature A - design</p>
                    <p className="text-[14px] leading-[18px] text-[#5c7481]">Brief, iterations, final spec</p>
                  </div>

                  <div className="absolute left-[426px] top-[33px] flex h-[68px] w-[237px] flex-col items-center justify-center gap-[2px] rounded-[12px] border border-[#ffd2a4] bg-[#fff4e8] text-center">
                    <p className="font-semibold text-[16px] leading-6 text-[#d16f0d]">Feature B - design</p>
                    <p className="text-[14px] leading-[18px] text-[#78644f]">Brief, first iterations</p>
                  </div>

                  <div className="absolute left-[417px] top-[172px] flex h-[68px] w-[246px] flex-col items-center justify-center gap-[2px] rounded-[12px] border border-[#b9e4fc] bg-[#e7f6ff] text-center">
                    <p className="font-semibold text-[16px] leading-6 text-[#004c78]">Feature A - build</p>
                    <p className="text-[14px] leading-[18px] text-[#5c7481]">Development + QA</p>
                  </div>

                  <img
                    src={imgProcessArrow}
                    alt=""
                    className="absolute left-[413px] top-[107px] h-[59px] w-[11px]"
                  />
                </div>
              </ScaledCover>
            </div>
          </div>
        </div>

        {/* Dashboard */}
        <div id="dashboard" className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeading title="Dashboard" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The dashboard gives decision-makers a real-time, cross-sector view - from
              economic indicators to healthcare and tourism metrics - surfacing trends,
              alerts, and comparisons that support faster, more informed decisions.
            </p>
          </div>

          <Showcase
            src={imgDashboardOverview}
            alt="Dashboard overview with economic growth, statistics of interest, and benchmark comparisons"
            caption="Overview"
            imgWidth={752}
            imgHeight={418}
          />
          <Showcase
            src={imgDashboardTourism}
            alt="Tourism sector indicators dashboard"
            caption="Tourism Indicators"
            imgWidth={752}
            imgHeight={418}
          />
        </div>

        {/* CMS Back-office */}
        <div id="cms-back-office" className="flex w-full flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeading title="CMS Back-office" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The CMS is where operational users - sector staff, analysts, admins, and
              content teams - manage the data and content that power both dashboards, from
              requesting changes to reviewing records to controlling access.
            </p>
          </div>

          {/* Demand Management */}
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[20px] leading-6 text-[var(--text-primary)]" style={displayFont}>
              Demand Management
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Demand Management is the module that lets users without direct edit access
              request changes to platform content - indicators, sectors, projects, and more -
              by submitting a demand for someone with the right permissions to review and
              approve.
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The Operation Dashboard, part of it, gives requesters and approvers a shared
              view of every demand - status, assignee, and progress at a glance - while a
              detailed panel surfaces the full history of each request: who approved,
              returned, or escalated it, and why, down to the specific comment left at each
              step.
            </p>
          </div>

          <Showcase
            src={imgCmsOperationDashboard}
            alt="Operation Dashboard showing demand tasks with status filters"
            caption="Operation Dashboard"
            imgWidth={697}
            imgHeight={436}
          />
          <Showcase
            src={imgCmsDemandDetails}
            alt="Demand details panel showing approval history and workflow"
            caption="Demand details"
            imgWidth={697}
            imgHeight={436}
          />

          {/* Library */}
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[20px] leading-6 text-[var(--text-primary)]" style={displayFont}>
              Library
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The Library is where users browse and review the current state of everything
              tracked on the platform - sectors, indicators, projects, programs, drivers,
              enablers, and entities - organized as a searchable, filterable catalogue rather
              than a raw database view.
            </p>
          </div>

          <Showcase
            src={imgCmsSectorDetails}
            alt="Sector library catalogue with sector detail panel"
            caption="Sector details"
            imgWidth={697}
            imgHeight={436}
          />

          {/* Role Management */}
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-[20px] leading-6 text-[var(--text-primary)]" style={displayFont}>
              Role Management
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              A role management system for a multi-environment government dashboard. I
              designed the full permission architecture and interaction model - from how
              roles are structured to how individual user access is configured.
            </p>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Replaced a fixed set of predefined roles with a granular permission model -
              supporting virtually unlimited role combinations across{" "}
              <span className="font-medium">3 environments</span>.
            </p>
          </div>

          <Showcase
            src={imgCmsRoleTable}
            alt="Role Management table listing all defined roles"
            caption="Database of roles"
            imgWidth={697}
            imgHeight={436}
          />

          <div className="flex w-full flex-col gap-6">
            <p className="w-full text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              When creating a role, admin can select platforms to which the role should have
              access
            </p>
            <Showcase
              src={imgCmsRoleCreating}
              alt="Create New Role form with platform and channel selection"
              caption="Creating new role"
              imgWidth={697}
              imgHeight={436}
            />
          </div>

          <div className="flex w-full flex-col gap-6">
            <p className="w-full text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              When the role is created, admin assigns it to the user during profile creation
              or editing.
            </p>
            <Showcase
              src={imgCmsRoleAssigning}
              alt="Profile creation wizard with role assignment step"
              caption="Assigning role to a user during profile creation"
              imgWidth={697}
              imgHeight={436}
            />
          </div>

          <div className="flex w-full flex-col gap-6">
            <p className="w-full text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              After assigning a role, admin selects action permissions for each user
              separately for every platform.
            </p>
            <Showcase
              src={imgCmsRolePermissions}
              alt="Permissions step showing per-platform action checkboxes"
              caption="Setting up granular action permissions for each user separately"
              imgWidth={697}
              imgHeight={436}
            />
          </div>
        </div>

        {/* Summary */}
        <div id="summary" className="flex w-full flex-col gap-4">
          <SectionHeading title="Summary" />
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            The government organisation now runs on analytics dashboards and back-office CMS
            built specifically around their internal workflows and structure, supported by a
            dedicated design systems built and maintained by three designers (see [Design
            System case study]).
          </p>
        </div>

        {/* Read connected case studies */}
        <div className="flex w-full flex-col gap-6">
          <SectionHeading title="Read connected case studies" />
          <div className="flex flex-wrap gap-6 text-[18px] font-medium leading-[26px] text-[var(--text-secondary)]">
            <p>Design System case study</p>
            <p>Mobile app case study</p>
          </div>
        </div>
      </div>
    </CaseStudyLayout>
  );
}
