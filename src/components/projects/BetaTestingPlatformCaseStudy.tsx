import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";
import CaseStudyToC, { type ToCSection } from "@/components/projects/CaseStudyToC";
import CaseStudyMeta from "@/components/projects/CaseStudyMeta";
import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

// Hero images
const imgUnsplashVhKRwVyQ = "/home/ajax/unsplash_-Vh-kRw_vyQ.png";
const imgDashboard5 = "/home/ajax/dashboard 5.png";
// Context & research images
const imgGroup388521 = "/home/ajax/Frame 2147238398.png";
const imgScreenshot20260129At2352561 =
  "/home/ajax/Screenshot 2026-01-29 at 23.52.56 1.png";

// Video sources (local, served from /public/gifs/)
type VideoSlotId =
  | "testing-hub-overview"
  | "test-details-drawer"
  | "notifications-center"
  | "dashboard-overview"
  | "in-platform-messenger"
  | "in-platform-messenger-page";

const videoSources: Partial<
  Record<VideoSlotId, { webm: string; mp4: string; width: number; height: number }>
> = {
  "testing-hub-overview": {
    webm: "/gifs/testing-hub-overview.webm",
    mp4: "/gifs/testing-hub-overview.mp4",
    width: 658,
    height: 468,
  },
  "test-details-drawer": {
    webm: "/gifs/test-details-drawer.webm",
    mp4: "/gifs/test-details-drawer.mp4",
    width: 658,
    height: 468,
  },
  "notifications-center": {
    webm: "/gifs/notifications-center.webm",
    mp4: "/gifs/notifications-center.mp4",
    width: 260,
    height: 334,
  },
  "dashboard-overview": {
    webm: "/gifs/dashboard-overview.webm",
    mp4: "/gifs/dashboard-overview.mp4",
    width: 658,
    height: 468,
  },
  "in-platform-messenger": {
    webm: "/gifs/in-platform-messenger.webm",
    mp4: "/gifs/in-platform-messenger.mp4",
    width: 658,
    height: 468,
  },
  "in-platform-messenger-page": {
    webm: "/gifs/in-platform-messenger-page.webm",
    mp4: "/gifs/in-platform-messenger-page.mp4",
    width: 658,
    height: 468,
  },
};

function VideoShowcase({ slot, caption }: { slot: VideoSlotId; caption: string }) {
  const video = videoSources[slot];

  return (
    <div className="flex flex-col gap-2">
      <div className="group flex w-full items-center justify-center overflow-hidden rounded-[16px] border border-[#ececec] bg-[#e6e6e6] p-6">
        {video ? (
          <video
            width={video.width}
            height={video.height}
            autoPlay
            muted
            loop
            playsInline
            className="h-auto max-w-full rounded-[12px] transition-transform duration-300 ease-out group-hover:scale-[1.05]"
          >
            <source src={video.webm} type="video/webm" />
            <source src={video.mp4} type="video/mp4" />
          </video>
        ) : (
          <div
            data-video-slot={slot}
            className="flex h-[468px] w-full items-center justify-center rounded-[12px] border border-dashed border-[#cfd3d7] bg-[#fafafa] px-6 text-center"
          >
            <div className="flex flex-col gap-2">
              <p className="type-nav text-[var(--text-secondary)]">
                Video placeholder
              </p>
              <p className="type-caption text-[var(--text-tertiary)]">{slot}</p>
            </div>
          </div>
        )}
      </div>
      <p className="type-caption text-center text-[var(--text-tertiary)]">{caption}</p>
    </div>
  );
}

function SectionHeader({ subtitle, title }: { subtitle?: string; title: string }) {
  return (
    <div className="flex flex-col gap-1">
      {subtitle && (
        <p className="font-inconsolata text-[18px] font-semibold leading-6 text-[var(--text-tertiary)]">
          {subtitle}
        </p>
      )}
      <h2 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">
        {title}
      </h2>
    </div>
  );
}

const TOC_SECTIONS: ToCSection[] = [
  { id: "context", label: "Context & problem" },
  { id: "challenges", label: "Challenges" },
  { id: "objective", label: "Objective" },
  { id: "success-metrics", label: "Success metrics" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "solution", label: "Solution" },
  { id: "usability", label: "Usability testing" },
  { id: "dashboard", label: "Dashboard" },
  { id: "whats-next", label: "What's Next" },
];

export default function BetaTestingPlatformCaseStudy() {
  return (
    <CaseStudyLayout
      backHref="/"
      sidebar={<CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Beta testing platform" />}
    >
      <div className="flex min-w-0 w-full flex-col gap-[48px]">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="flex w-full flex-col gap-[32px]">
          <div className="flex flex-col gap-[6px]">
            <p className="font-inconsolata font-semibold text-[24px] leading-8 text-[var(--text-tertiary)]">
              Ajax Systems
            </p>
            <h1
              className="font-semibold text-[28px] leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] max-[809px]:leading-7"
              style={{ fontFamily: "var(--font-inter-display), -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Beta testing platform
            </h1>
          </div>

          <ScaledCover hoverZoom nativeWidth={840} nativeHeight={520} className="rounded-[16px] bg-[#e6e6e6]">
            <Image
              src={imgUnsplashVhKRwVyQ}
              alt=""
              fill
              sizes="(max-width: 809px) calc(100vw - 40px), 840px"
              className="object-cover blur-[6px]"
            />
            <Image
              src={imgDashboard5}
              alt=""
              width={736}
              height={488}
              sizes="(max-width: 809px) calc(88vw - 35px), 736px"
              className="absolute left-1/2 top-[calc(50%+33.5px)] h-[488px] w-[736px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] object-contain"
            />
          </ScaledCover>

          <CaseStudyMeta
            items={[
              { label: "Role", value: "Product Designer" },
              { label: "Team", value: "4 designers" },
              { label: "Timeline", value: "May 2025 - July 2025" },
            ]}
          />

          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Ajax Systems runs an external beta testing program to validate security
            devices before release. The process was broken: feedback came through
            Telegram, email, Facebook, and WhatsApp - no structure, no single home.
            <br />
            <br />
            I led success metrics, core user flows, and usability testing.
          </p>
        </div>

        <div className="flex flex-col gap-[48px]">
          {/* ── Context & problem ──────────────────────────────────────── */}
          <div className="flex flex-col gap-[24px]">
            <div id="context" className="flex flex-col gap-[20px]">
              <SectionHeader
                subtitle="Context & problem"
                title="Beta testing was fragmented across tools and hard to manage"
              />
              <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
                Managers spent up to 30% of their time chasing testers across 4
                messengers. Bug reports arrived in inconsistent formats, missing
                technical details. Testers had no visibility into deadlines, report
                status, or whether their input mattered. Mass Telegram messages were
                getting accounts blocked. International partners refused to use it
                altogether.
                <br />
                <br />
                The result: slow feedback, high coordination overhead, low tester
                motivation.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <ScaledCover nativeWidth={840} nativeHeight={446} className="rounded-[12px] border border-[#ececec] bg-[#fafafa]">
                <Image
                  src={imgGroup388521}
                  alt="Communication scattered across 4 channels - critical information lost in every direction"
                  width={736}
                  height={384}
                  sizes="(max-width: 809px) calc(88vw - 35px), 736px"
                  className="absolute left-1/2 top-[31px] h-[384px] w-[736px] -translate-x-1/2 object-contain"
                />
              </ScaledCover>
              <p className="type-caption text-center text-[var(--text-tertiary)]">
                Communication scattered across 4 channels - critical information lost
                in every direction
              </p>
            </div>
          </div>

          {/* ── Challenges ─────────────────────────────────────────────── */}
          <div id="challenges" className="flex flex-col gap-[20px]">
            <SectionHeader
              subtitle="Challenges"
              title="The workflow had to work for everyone at once"
            />
            <div className="overflow-hidden rounded-[12px] border border-[#ececec]">
              <div className="flex bg-[#fafafa] px-5 py-3 text-[13px] font-semibold text-[var(--text-tertiary)]">
                <span className="w-[200px] shrink-0">Stakeholder</span>
                <span className="flex-1">Core Challenge</span>
              </div>
              <div className="h-px bg-[#ededed]" />
              <div className="flex items-center bg-white px-5 py-[14px]">
                <div className="w-[200px] shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[rgba(43,153,219,0.1)] px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#2b99db]" />
                    <span className="text-[12px] font-semibold text-[#2b99db]">Testers</span>
                  </span>
                </div>
                <p className="flex-1 text-[14px] leading-[22px] text-[var(--text-secondary)]">
                  Know what to test, submit with low effort, see their impact.
                </p>
              </div>
              <div className="h-px bg-[#ededed]" />
              <div className="flex items-center bg-[#fafafa] px-5 py-[14px]">
                <div className="w-[200px] shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[rgba(140,89,229,0.1)] px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8c59e5]" />
                    <span className="text-[12px] font-semibold text-[#8c59e5]">Managers</span>
                  </span>
                </div>
                <p className="flex-1 text-[14px] leading-[22px] text-[var(--text-secondary)]">
                  Run programs at scale without manual chasing; get structured reports.
                </p>
              </div>
              <div className="h-px bg-[#ededed]" />
              <div className="flex items-center bg-white px-5 py-[14px]">
                <div className="w-[200px] shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[rgba(38,173,97,0.1)] px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#26ad61]" />
                    <span className="text-[12px] font-semibold text-[#26ad61]">Product Team</span>
                  </span>
                </div>
                <p className="flex-1 text-[14px] leading-[22px] text-[var(--text-secondary)]">
                  Move testers through a clear journey at low cognitive load.
                </p>
              </div>
              <div className="h-px bg-[#ededed]" />
              <div className="flex items-center bg-[#fafafa] px-5 py-[14px]">
                <div className="w-[200px] shrink-0">
                  <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-[rgba(217,133,46,0.1)] px-2 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d9852e]" />
                    <span className="text-[12px] font-semibold text-[#d9852e]">Business</span>
                  </span>
                </div>
                <p className="flex-1 text-[14px] leading-[22px] text-[var(--text-secondary)]">
                  Faster feedback loops; secure data; support global partners who
                  don&apos;t use the same tools.
                </p>
              </div>
            </div>
          </div>

          {/* ── Objective ──────────────────────────────────────────────── */}
          <div id="objective" className="flex flex-col gap-[20px]">
            <SectionHeader
              subtitle="Objective"
              title="Create one central platform for running tests and collecting structured feedback"
            />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              One platform where managers run tests and receive structured, timely
              feedback - and testers always know what to do, how to report, and what
              impact they made.
            </p>
          </div>

          {/* ── Success metrics ────────────────────────────────────────── */}
          <div id="success-metrics" className="flex flex-col gap-[20px]">
            <SectionHeader
              subtitle="Success metrics"
              title="Define how MVP success would be measured across adoption, engagement, and quality"
            />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              To measure whether the MVP improves beta testing speed and report
              quality, I defined success metrics across four areas.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 max-[809px]:flex-col">
                <article className="flex min-h-[160px] flex-1 flex-col justify-between rounded-[12px] bg-[#edf5ff] p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-[3px] rounded-[2px] bg-[#2b99db]" />
                    <p className="text-[14px] font-semibold uppercase leading-5 text-[#2b99db]">Adoption</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 text-[13px] leading-5 text-[rgba(43,153,219,0.6)]">–</span>
                      <p className="text-[14px] font-normal leading-5 text-[var(--text-secondary)]">Testers who joined the platform</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 text-[13px] leading-5 text-[rgba(43,153,219,0.6)]">–</span>
                      <p className="text-[14px] font-normal leading-5 text-[var(--text-secondary)]">% submitted their first bug report</p>
                    </div>
                  </div>
                </article>
                <article className="flex min-h-[160px] flex-1 flex-col justify-between rounded-[12px] bg-[#f5f2ff] p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-[3px] rounded-[2px] bg-[#8c59e5]" />
                    <p className="text-[14px] font-semibold uppercase leading-5 text-[#8c59e5]">Engagement</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 text-[13px] leading-5 text-[rgba(140,89,229,0.6)]">–</span>
                      <p className="text-[14px] font-normal leading-5 text-[var(--text-secondary)]">Median time: test start → first report</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 text-[13px] leading-5 text-[rgba(140,89,229,0.6)]">–</span>
                      <p className="text-[14px] font-normal leading-5 text-[var(--text-secondary)]">% completing the full journey</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 text-[13px] leading-5 text-[rgba(140,89,229,0.6)]">–</span>
                      <p className="text-[14px] font-normal leading-5 text-[var(--text-secondary)]">Weekly bug report volume</p>
                    </div>
                  </div>
                </article>
              </div>
              <div className="flex gap-4 max-[809px]:flex-col">
                <article className="flex min-h-[160px] flex-1 flex-col justify-between rounded-[12px] bg-[#edfaf2] p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-[3px] rounded-[2px] bg-[#26a661]" />
                    <p className="text-[14px] font-semibold uppercase leading-5 text-[#26a661]">Manager Productivity</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 text-[13px] leading-5 text-[rgba(38,166,97,0.6)]">–</span>
                      <p className="text-[14px] font-normal leading-5 text-[var(--text-secondary)]">Time on outreach &amp; follow-ups</p>
                    </div>
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 text-[13px] leading-5 text-[rgba(38,166,97,0.6)]">–</span>
                      <p className="text-[14px] font-normal leading-5 text-[var(--text-secondary)]">Time clarifying incomplete reports</p>
                    </div>
                  </div>
                </article>
                <article className="flex min-h-[160px] flex-1 flex-col justify-between rounded-[12px] bg-[#fff7f0] p-5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-[3px] rounded-[2px] bg-[#d9852e]" />
                    <p className="text-[14px] font-semibold uppercase leading-5 text-[#d9852e]">Quality</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-2 items-start">
                      <span className="shrink-0 text-[13px] leading-5 text-[rgba(217,133,46,0.6)]">–</span>
                      <p className="text-[14px] font-normal leading-5 text-[var(--text-secondary)]">% of reports actionable without follow-up clarification</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          {/* ── Research ───────────────────────────────────────────────── */}
          <div id="research" className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[20px]">
              <SectionHeader
                subtitle="Research"
                title="Ground the MVP in real tester behavior"
              />
              <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
                We ran a research workshop to align on goals before moving into
                interviews. Key questions: How do testers currently report issues?
                Where does context get lost? What drives engagement?
              </p>
              <div className="overflow-x-auto rounded-[12px] border border-[#ececec]">
                <div className="min-w-[560px] divide-y divide-[#ededed]">
                  <div className="flex bg-[#fafafa] px-5 py-3 text-[13px] font-semibold text-[var(--text-tertiary)]">
                    <span className="w-[200px] shrink-0">Goal</span>
                    <span className="flex-1">Key Question</span>
                    <span className="w-[180px] shrink-0">Respondent Profile</span>
                  </div>
                  <div className="flex items-center bg-white px-5 py-[14px] text-[13px] leading-5">
                    <span className="w-[200px] shrink-0 font-semibold text-[var(--text-primary)]">Communication quality</span>
                    <span className="flex-1 text-[var(--text-secondary)]">How do testers communicate issues today?</span>
                    <span className="w-[180px] shrink-0 text-[var(--text-tertiary)]">Active beta testers</span>
                  </div>
                  <div className="flex items-center bg-white px-5 py-[14px] text-[13px] leading-5">
                    <span className="w-[200px] shrink-0 font-semibold text-[var(--text-primary)]">Report quality</span>
                    <span className="flex-1 text-[var(--text-secondary)]">Where does context get lost in reports?</span>
                    <span className="w-[180px] shrink-0 text-[var(--text-tertiary)]">Multi-device testers</span>
                  </div>
                  <div className="flex items-center bg-white px-5 py-[14px] text-[13px] leading-5">
                    <span className="w-[200px] shrink-0 font-semibold text-[var(--text-primary)]">End-to-end flow</span>
                    <span className="flex-1 text-[var(--text-secondary)]">What&apos;s the full testing journey step-by-step?</span>
                    <span className="w-[180px] shrink-0 text-[var(--text-tertiary)]">New testers (&lt;3 tests)</span>
                  </div>
                  <div className="flex items-center bg-white px-5 py-[14px] text-[13px] leading-5">
                    <span className="w-[200px] shrink-0 font-semibold text-[var(--text-primary)]">Motivation &amp; retention</span>
                    <span className="flex-1 text-[var(--text-secondary)]">What makes testers stay engaged and return?</span>
                    <span className="w-[180px] shrink-0 text-[var(--text-tertiary)]">Long-term testers</span>
                  </div>
                  <div className="flex items-center bg-white px-5 py-[14px] text-[13px] leading-5">
                    <span className="w-[200px] shrink-0 font-semibold text-[var(--text-primary)]">Manager pain points</span>
                    <span className="flex-1 text-[var(--text-secondary)]">What coordination tasks consume most time?</span>
                    <span className="w-[180px] shrink-0 text-[var(--text-tertiary)]">Beta program managers</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <ScaledCover hoverZoom nativeWidth={840} nativeHeight={355} className="rounded-[16px] bg-[#f9f9f9]">
                <Image
                  src={imgScreenshot20260129At2352561}
                  alt="Research Plan - problems, goals, questions and respondent profiles"
                  width={772}
                  height={256}
                  sizes="(max-width: 809px) calc(92vw - 37px), 772px"
                  className="absolute left-1/2 top-1/2 h-[256px] w-[772px] -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </ScaledCover>
              <p className="type-caption text-center text-[var(--text-tertiary)]">
                Research Plan - problems, goals, questions and respondent profiles
              </p>
            </div>
          </div>

          {/* ── Synthesis ──────────────────────────────────────────────── */}
          <div id="synthesis" className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[20px]">
              <SectionHeader
                subtitle="Synthesis"
                title="Hypotheses & Prioritization"
              />
              <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
                Interview insights became product hypotheses, prioritized with the
                RICE framework. This helped us choose the most impactful MVP features
                and connect them to measurable outcomes.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 max-[809px]:flex-col">
                  <article className="flex flex-1 flex-col gap-[10px] rounded-[12px] border border-[rgba(43,153,219,0.15)] bg-[rgba(43,153,219,0.05)] p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-[6px] bg-[rgba(43,153,219,0.15)] px-2 py-0.5 text-[12px] font-semibold text-[#2b99db]">H1</span>
                      <span className="text-[11px] font-medium text-[var(--text-tertiary)]">1st</span>
                    </div>
                    <p className="text-[14px] font-semibold leading-5 text-[var(--text-primary)]">
                      Structured bug report form
                    </p>
                    <p className="text-[13px] font-normal leading-5 text-[var(--text-secondary)]">
                      If we guide testers with a structured form, reports will be more
                      complete and require fewer clarifications.
                    </p>
                    <div className="flex gap-1.5 pt-1">
                      <span className="rounded-[6px] border border-[#ececec] bg-white px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">Impact: High</span>
                      <span className="rounded-[6px] border border-[#ececec] bg-white px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">Effort: Med</span>
                    </div>
                  </article>
                  <article className="flex flex-1 flex-col gap-[10px] rounded-[12px] border border-[rgba(140,89,229,0.15)] bg-[rgba(140,89,229,0.05)] p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-[6px] bg-[rgba(140,89,229,0.15)] px-2 py-0.5 text-[12px] font-semibold text-[#8c59e5]">H2</span>
                      <span className="text-[11px] font-medium text-[var(--text-tertiary)]">2nd</span>
                    </div>
                    <p className="text-[14px] font-semibold leading-5 text-[var(--text-primary)]">
                      In-context communication
                    </p>
                    <p className="text-[13px] font-normal leading-5 text-[var(--text-secondary)]">
                      If clarification happens per test/report, lost context decreases
                      and resolution becomes faster.
                    </p>
                    <div className="flex gap-1.5 pt-1">
                      <span className="rounded-[6px] border border-[#ececec] bg-white px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">Impact: High</span>
                      <span className="rounded-[6px] border border-[#ececec] bg-white px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">Effort: High</span>
                    </div>
                  </article>
                </div>
                <div className="flex gap-4 max-[809px]:flex-col">
                  <article className="flex flex-1 flex-col gap-[10px] rounded-[12px] border border-[rgba(38,166,97,0.15)] bg-[rgba(38,166,97,0.05)] p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-[6px] bg-[rgba(38,166,97,0.15)] px-2 py-0.5 text-[12px] font-semibold text-[#26a661]">H3</span>
                      <span className="text-[11px] font-medium text-[var(--text-tertiary)]">3rd</span>
                    </div>
                    <p className="text-[14px] font-semibold leading-5 text-[var(--text-primary)]">
                      Centralized notifications
                    </p>
                    <p className="text-[13px] font-normal leading-5 text-[var(--text-secondary)]">
                      If reminders and updates are centralized, response speed improves
                      and missed deadlines decrease.
                    </p>
                    <div className="flex gap-1.5 pt-1">
                      <span className="rounded-[6px] border border-[#ececec] bg-white px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">Impact: Med</span>
                      <span className="rounded-[6px] border border-[#ececec] bg-white px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">Effort: Low</span>
                    </div>
                  </article>
                  <article className="flex flex-1 flex-col gap-[10px] rounded-[12px] border border-[rgba(217,133,46,0.15)] bg-[rgba(217,133,46,0.05)] p-5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-[6px] bg-[rgba(217,133,46,0.15)] px-2 py-0.5 text-[12px] font-semibold text-[#d9852e]">H4</span>
                      <span className="text-[11px] font-medium text-[var(--text-tertiary)]">4th</span>
                    </div>
                    <p className="text-[14px] font-semibold leading-5 text-[var(--text-primary)]">
                      Tester profile + activity tracking
                    </p>
                    <p className="text-[13px] font-normal leading-5 text-[var(--text-secondary)]">
                      If testers can track their activity and report statuses,
                      motivation and return rate will increase.
                    </p>
                    <div className="flex gap-1.5 pt-1">
                      <span className="rounded-[6px] border border-[#ececec] bg-white px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">Impact: Med</span>
                      <span className="rounded-[6px] border border-[#ececec] bg-white px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">Effort: Low</span>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[20px]">
              <h3 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">
                Core MVP User Flow
              </h3>
              <div className="overflow-x-auto">
                <div className="flex min-w-max items-start justify-center gap-2 py-1">
                  <div className="flex w-20 flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(43,153,219,0.12)]">
                      <span className="text-[14px] font-semibold text-[#2b99db]">1</span>
                    </div>
                    <p className="text-center text-[12px] font-medium leading-4 text-[var(--text-secondary)]">Join</p>
                  </div>
                  <span className="mt-[14px] shrink-0 text-[18px] text-[var(--text-tertiary)]">→</span>
                  <div className="flex w-20 flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(140,89,229,0.12)]">
                      <span className="text-[14px] font-semibold text-[#8c59e5]">2</span>
                    </div>
                    <p className="text-center text-[12px] font-medium leading-4 text-[var(--text-secondary)]">Pick a test</p>
                  </div>
                  <span className="mt-[14px] shrink-0 text-[18px] text-[var(--text-tertiary)]">→</span>
                  <div className="flex w-20 flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(38,166,97,0.12)]">
                      <span className="text-[14px] font-semibold text-[#26a661]">3</span>
                    </div>
                    <p className="text-center text-[12px] font-medium leading-4 text-[var(--text-secondary)]">Test device</p>
                  </div>
                  <span className="mt-[14px] shrink-0 text-[18px] text-[var(--text-tertiary)]">→</span>
                  <div className="flex w-20 flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(217,133,46,0.12)]">
                      <span className="text-[14px] font-semibold text-[#d9852e]">4</span>
                    </div>
                    <p className="text-center text-[12px] font-medium leading-4 text-[var(--text-secondary)]">Submit report</p>
                  </div>
                  <span className="mt-[14px] shrink-0 text-[18px] text-[var(--text-tertiary)]">→</span>
                  <div className="flex w-20 flex-col items-center gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(204,96,193,0.12)]">
                      <span className="text-[14px] font-semibold text-[#cc60c1]">5</span>
                    </div>
                    <p className="text-center text-[12px] font-medium leading-4 text-[var(--text-secondary)]">Track status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Solution ───────────────────────────────────────────────── */}
        <div id="solution" className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <SectionHeader subtitle="Solution" title="Testing hub" />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Tests grouped by status: Not started / In progress / Submitted. Two
              views: Kanban for at-a-glance overview, List for detail. Nothing
              hidden, nothing to guess.
            </p>
          </div>
          <VideoShowcase
            slot="testing-hub-overview"
            caption="Kanban and table views of Testing Hub"
          />
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <h3 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">
              Test Detail
            </h3>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Test name, description, deadline, and conditions - all on one page.
              Test cases as a checklist so testers always know what&apos;s done vs.
              what&apos;s left.
            </p>
          </div>
          <VideoShowcase
            slot="test-details-drawer"
            caption="Test details drawer appears when clicking on one test"
          />
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <h3 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">
              Notifications
            </h3>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Centralized notification center: status changes, new tasks, deadlines,
              rewards. Reduces missed actions without relying on external messengers.
            </p>
          </div>
          <VideoShowcase
            slot="notifications-center"
            caption="Centralized notification center with status updates and reminders"
          />
        </div>

        {/* ── Usability testing ──────────────────────────────────────── */}
        <div id="usability" className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <SectionHeader
              subtitle="Usability testing"
              title="What the testing round revealed: testers needed everything in one place"
            />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The first version organized content by function - tests here, updates
              there. It made sense structurally, but it didn&apos;t match how testers
              actually think. During usability testing, the gaps became obvious: no
              view of upcoming tests, no deadline visibility, no personal score.
              Testers kept asking &quot;where do I go next?&quot; The architecture had no
              answer.
              <br />
              <br />
              We scrapped the sectioned layout and built a dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-4 rounded-[12px] bg-[#fafafa] px-6 py-7 max-[809px]:flex-col">
              {/* Before — V1 */}
              <div className="flex flex-1 flex-col gap-[10px] rounded-[10px] bg-white px-[18px] py-5">
                <span className="inline-flex self-start rounded-[6px] bg-[rgba(204,64,38,0.1)] px-[10px] py-1 text-[11px] font-semibold text-[#cc4026]">
                  Before - V1
                </span>
                <p className="text-[12px] font-normal leading-[18px] text-[var(--text-tertiary)]">
                  Sectioned layout only. No overview screen.
                </p>
                <div className="flex items-center gap-2 rounded-[8px] border border-[rgba(128,128,148,0.2)] bg-[rgba(128,128,148,0.07)] px-3 py-[10px]">
                  <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#808094]" />
                  <p className="text-[12px] font-semibold text-[#808094]">Tests</p>
                </div>
                <div className="flex items-center gap-2 rounded-[8px] border border-[rgba(128,128,148,0.2)] bg-[rgba(128,128,148,0.07)] px-3 py-[10px]">
                  <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#808094]" />
                  <p className="text-[12px] font-semibold text-[#808094]">News &amp; Updates</p>
                </div>
                <div className="flex items-center gap-2 rounded-[8px] border border-[rgba(128,128,148,0.2)] bg-[rgba(128,128,148,0.07)] px-3 py-[10px]">
                  <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#808094]" />
                  <p className="text-[12px] font-semibold text-[#808094]">Profile</p>
                </div>
                <div className="flex items-center gap-2 rounded-[8px] bg-[rgba(204,64,38,0.06)] px-3 py-[10px] text-[#cc4026]">
                  <span className="shrink-0 text-[13px] font-semibold">✗</span>
                  <p className="flex-1 text-[12px] font-normal">&quot;Where do I go next?&quot; - no answer</p>
                </div>
              </div>
              {/* After - V2 */}
              <div className="flex flex-1 flex-col gap-[10px] rounded-[10px] bg-white px-[18px] py-5">
                <span className="inline-flex self-start rounded-[6px] bg-[rgba(38,166,97,0.1)] px-[10px] py-1 text-[11px] font-semibold text-[#26a661]">
                  After - V2
                </span>
                <p className="text-[12px] font-normal leading-[18px] text-[var(--text-tertiary)]">
                  Dashboard added as overview. Sections kept for deep work.
                </p>
                <div className="flex flex-col gap-1.5 rounded-[8px] border-[1.5px] border-[rgba(43,153,219,0.35)] bg-[rgba(43,153,219,0.08)] p-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-[4px] bg-[rgba(43,153,219,0.15)] px-1.5 py-0.5 text-[9px] font-semibold text-[#2b99db]">NEW</span>
                    <p className="text-[12px] font-semibold text-[#2b99db]">Dashboard - overview screen</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-[5px] bg-[rgba(43,153,219,0.1)] px-[7px] py-[3px] text-[10px] text-[#2b99db]">My Tests</span>
                    <span className="rounded-[5px] bg-[rgba(140,89,229,0.1)] px-[7px] py-[3px] text-[10px] text-[#8c59e5]">Calendar</span>
                    <span className="rounded-[5px] bg-[rgba(38,166,97,0.1)] px-[7px] py-[3px] text-[10px] text-[#26a661]">Upcoming</span>
                    <span className="rounded-[5px] bg-[rgba(217,133,46,0.1)] px-[7px] py-[3px] text-[10px] text-[#d9852e]">Score</span>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-[var(--text-tertiary)]">
                  Individual pages - still exist for deep work
                </p>
                <div className="flex items-center gap-2 rounded-[8px] border border-[rgba(128,128,148,0.12)] bg-[rgba(128,128,148,0.04)] px-3 py-2">
                  <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[rgba(128,128,148,0.6)]" />
                  <p className="text-[12px] font-normal text-[rgba(128,128,148,0.6)]">Tests</p>
                </div>
                <div className="flex items-center gap-2 rounded-[8px] border border-[rgba(128,128,148,0.12)] bg-[rgba(128,128,148,0.04)] px-3 py-2">
                  <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[rgba(128,128,148,0.6)]" />
                  <p className="text-[12px] font-normal text-[rgba(128,128,148,0.6)]">News &amp; Updates</p>
                </div>
                <div className="flex items-center gap-2 rounded-[8px] border border-[rgba(128,128,148,0.12)] bg-[rgba(128,128,148,0.04)] px-3 py-2">
                  <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[rgba(128,128,148,0.6)]" />
                  <p className="text-[12px] font-normal text-[rgba(128,128,148,0.6)]">Profile</p>
                </div>
                <div className="flex items-center gap-2 rounded-[8px] bg-[rgba(38,166,97,0.06)] px-3 py-[10px] text-[#26a661]">
                  <span className="shrink-0 text-[13px] font-semibold">✓</span>
                  <p className="flex-1 text-[12px] font-normal">Overview at a glance + depth when needed</p>
                </div>
              </div>
            </div>
            <p className="text-center text-[16px] font-normal leading-6 text-[var(--text-tertiary)]">
              Architecture comparison - V1 sectioned layout vs. V2 unified dashboard
            </p>
          </div>
        </div>

        <div id="dashboard" className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[20px]">
            <h3 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">Dashboard</h3>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              I owned the Dashboard end-to-end - from structure to final details. It
              replaced the sectioned V1 layout with a single screen that answers
              every question before the tester has to ask it.
            </p>
          </div>
          <VideoShowcase
            slot="dashboard-overview"
            caption="Dashboard - 4 annotated zones, each answering a question testers were previously asking out loud"
          />
        </div>

        {/* ── What's Next ────────────────────────────────────────────── */}
        <div id="whats-next" className="flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[20px]">
            <SectionHeader
              subtitle="What's Next"
              title="Future direction: in-platform messenger."
            />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              MVP kept communication lightweight by linking out to Telegram directly
              from the platform. Pragmatic for early rollout where local testers
              already use it.
              <br />
              <br />
              For international programs, Telegram isn&apos;t viable. Next step: an
              integrated messenger so testers can reach the manager or test group
              without leaving the platform.
            </p>
          </div>
          <VideoShowcase
            slot="in-platform-messenger"
            caption="In-built messenger: modal view"
          />
          <VideoShowcase
            slot="in-platform-messenger-page"
            caption="In-built messenger: page view"
          />
        </div>
      </div>
    </CaseStudyLayout>
  );
}
