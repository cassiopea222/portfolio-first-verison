import Link from "next/link";
import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";

// Hero images (updated URLs from Figma)
const imgUnsplashVhKRwVyQ =
  "https://www.figma.com/api/mcp/asset/542585ab-1dc2-4975-8928-ecb421134956";
const imgDashboard5 =
  "https://www.figma.com/api/mcp/asset/86652246-6e7f-4609-9d49-176507e08013";
// Context images
const imgGroup388521 =
  "https://www.figma.com/api/mcp/asset/a5894127-e6d3-4ffb-bc8e-82e765f2ef6f";
const imgScreenshot20260129At2352561 =
  "https://www.figma.com/api/mcp/asset/a0c63917-d2c0-4a3b-b953-bacd9a659db5";
const imgScreenshot20260130At0031041 =
  "https://www.figma.com/api/mcp/asset/2665637c-9cd6-4724-a305-359370d114e8";
// Static screen showcases
const imgGridView1 =
  "https://www.figma.com/api/mcp/asset/190273bb-72d6-4c0a-947a-628b2d57fdbc";
const imgSide1 =
  "https://www.figma.com/api/mcp/asset/772ac134-c162-4795-b7b4-4473a2d545b2";
const imgDialogRead2 =
  "https://www.figma.com/api/mcp/asset/55326552-5451-4367-8276-93628df7cbf8";
const imgDashboard4 =
  "https://www.figma.com/api/mcp/asset/76793b48-2a32-40d1-92cd-30d572bb233b";
const imgSideMessenger1 =
  "https://www.figma.com/api/mcp/asset/684e96b0-09f0-44b9-b714-3e43095389b3";

// GIF sources (local, served from /public/gifs/)
type VideoSlotId =
  | "testing-hub-overview"
  | "test-details-drawer"
  | "notifications-center"
  | "dashboard-overview"
  | "in-platform-messenger"
  | "in-platform-messenger-page";

const gifSources: Partial<
  Record<VideoSlotId, { src: string; width: number; height: number }>
> = {
  "testing-hub-overview": {
    src: "/gifs/testing-hub-overview.gif",
    width: 658,
    height: 468,
  },
  "test-details-drawer": {
    src: "/gifs/test-details-drawer.gif",
    width: 658,
    height: 468,
  },
  "notifications-center": {
    src: "/gifs/notifications-center (1).gif",
    width: 260,
    height: 334,
  },
  "dashboard-overview": {
    src: "/gifs/dashboard-overview.gif",
    width: 658,
    height: 468,
  },
  "in-platform-messenger": {
    src: "/gifs/in-platform-messenger.gif",
    width: 658,
    height: 468,
  },
  "in-platform-messenger-page": {
    src: "/gifs/in-platform-messenger-page.gif",
    width: 658,
    height: 468,
  },
};

// Static fallback images for when GIFs are unavailable
const staticFallbacks: Partial<Record<VideoSlotId, string>> = {
  "testing-hub-overview": imgGridView1,
  "test-details-drawer": imgSide1,
  "notifications-center": imgDialogRead2,
  "dashboard-overview": imgDashboard4,
  "in-platform-messenger": imgSideMessenger1,
  "in-platform-messenger-page": imgSideMessenger1,
};

function NavButton({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="type-body inline-flex w-fit items-center gap-2 rounded-xl border border-[#dadada] bg-[linear-gradient(179.23deg,#fff_4.27%,rgba(231,231,231,0.7)_98.14%)] px-3 py-2 text-[var(--text-secondary)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)] transition-[background-color,border-color,color] duration-200 ease-out hover:border-[#d5d5d5] hover:bg-[#efefef] hover:text-[var(--text-primary)]"
    >
      <span aria-hidden>←</span>
      <span>{text}</span>
    </Link>
  );
}

function VideoShowcase({ slot, caption }: { slot: VideoSlotId; caption: string }) {
  const gif = gifSources[slot];
  const fallback = staticFallbacks[slot];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center justify-center overflow-hidden rounded-[16px] border border-[#ececec] bg-[#e6e6e6] p-6">
        {gif ? (
          <Image
            src={gif.src}
            alt={caption}
            width={gif.width}
            height={gif.height}
            unoptimized
            className="rounded-[12px]"
          />
        ) : fallback ? (
          <Image
            src={fallback}
            alt={caption}
            width={658}
            height={468}
            sizes="658px"
            className="rounded-[12px] object-cover"
          />
        ) : (
          <div
            data-video-slot={slot}
            className="flex h-[468px] w-full items-center justify-center rounded-[12px] border border-dashed border-[#cfd3d7] bg-[#fafafa] px-6 text-center"
          >
            <div className="flex flex-col gap-2">
              <p className="type-nav font-medium text-[var(--text-secondary)]">
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
    <div className="flex flex-col gap-2">
      {subtitle && (
        <p className="text-[18px] font-medium leading-6 text-[var(--text-tertiary)]">
          {subtitle}
        </p>
      )}
      <h2 className="text-[24px] font-semibold leading-8 text-[var(--text-primary)]">
        {title}
      </h2>
    </div>
  );
}

export default function BetaTestingPlatformCaseStudy() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[80px] py-[120px] fluid-px max-sm:gap-[40px] max-sm:py-[48px]">
      <div className="w-full max-w-[840px]">
        <NavButton href="/" text="Go back" />
      </div>

      <div className="flex w-full max-w-[840px] flex-col gap-[48px]">
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex items-center gap-3 max-sm:flex-col-reverse max-sm:items-start max-sm:gap-1">
              <h1 className="type-h2 text-[var(--text-primary)] max-sm:text-[26px] max-sm:font-medium max-sm:leading-9">
                Beta testing platform
              </h1>
              <p className="type-h2 text-[var(--text-tertiary)] max-sm:text-[26px] max-sm:font-medium max-sm:leading-9">
                Ajax
              </p>
            </div>
            <p className="type-body text-[var(--text-secondary)]">
              Ajax Systems runs a beta testing program where external testers
              validate security devices before release. Managers coordinate the
              process, collect feedback, and ensure testers stay on track. To
              address the challenges in this process, we designed a dedicated beta
              testing platform - built around the needs of both testers and
              managers.
              <br />
              <br />
              This was a collaborative project with a team of four designers.
              Alongside active involvement in the overall process, I led the work
              on defining success metrics, designing the main user flows, and
              usability testing.
            </p>
          </div>

          <ScaledCover nativeWidth={840} nativeHeight={520} className="rounded-[16px] bg-[#e6e6e6]">
            <Image
              src={imgUnsplashVhKRwVyQ}
              alt=""
              fill
              sizes="840px"
              className="object-cover blur-[6px]"
            />
            <Image
              src={imgDashboard5}
              alt=""
              width={736}
              height={523}
              sizes="736px"
              className="absolute left-1/2 top-[calc(50%+33.5px)] h-[523px] w-[736px] -translate-x-1/2 -translate-y-1/2 rounded-[12px] object-cover"
            />
          </ScaledCover>

          <div className="flex items-start justify-between gap-6 max-[402px]:flex-col max-[402px]:gap-[20px]">
            <div className="flex w-[200px] flex-col gap-3 max-[402px]:w-full">
              <p className="type-nav font-medium uppercase text-[var(--text-tertiary)]">
                Role
              </p>
              <p className="type-body text-[var(--text-secondary)]">
                Product Designer
              </p>
            </div>
            <div className="flex w-[200px] flex-col gap-3 max-[402px]:w-full">
              <p className="type-nav font-medium uppercase text-[var(--text-tertiary)]">
                Team
              </p>
              <p className="type-body text-[var(--text-secondary)]">
                4 designers
              </p>
            </div>
            <div className="flex w-[200px] flex-col gap-3 max-[402px]:w-full">
              <p className="type-nav font-medium uppercase text-[var(--text-tertiary)]">
                Timeline
              </p>
              <p className="type-body text-[var(--text-secondary)]">
                May 2025 - Jul 2025
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[16px]">
              <SectionHeader
                subtitle="Context & problem"
                title="Beta testing was fragmented across tools and hard to manage"
              />
              <p className="type-body text-[var(--text-secondary)]">
                Ajax Systems runs a beta testing program where external testers
                validate security devices before release. Managers coordinate the
                process, collect feedback, and ensure testers stay on track - but
                everything was happening across scattered channels: Telegram,
                email, Facebook, WhatsApp.
                <br />
                <br />
                The lack of a dedicated platform created compounding problems.
                Communication was fragmented and important information got lost.
                Testers responded slowly to requests, partly because there was no
                structured reminder system - many requests simply went unanswered.
                Managers were spending up to 30% of their time on manual outreach
                and feedback processing instead of analysis. And testers themselves
                had no visibility into the process: no way to track the status of
                their reports, no feedback on whether their input was even
                considered.
                <br />
                <br />
                On top of this, mass messaging in Telegram was getting manager
                accounts blocked, international partners were refusing to use it
                altogether, and bug reports came in without any standard format -
                missing technical details, inconsistent, hard to act on.
                <br />
                <br />
                The core issue was structural: there was no single place where the
                beta testing process could live.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <ScaledCover nativeWidth={840} nativeHeight={452} className="rounded-[12px] border border-[#ececec] bg-[#fafafa]">
                <Image
                  src={imgGroup388521}
                  alt=""
                  width={736}
                  height={320}
                  sizes="736px"
                  className="absolute left-1/2 top-[31px] h-[320px] w-[736px] -translate-x-1/2 object-cover"
                />
                <div className="absolute left-1/2 top-[383px] -translate-x-1/2 rounded-[20px] border border-[#f1d6be] bg-[#fff8ef] px-3 py-1.5">
                  <p className="text-[14px] font-medium leading-5 text-[#d06e18]">
                    No single channel
                  </p>
                </div>
              </ScaledCover>
              <p className="type-caption text-center text-[var(--text-tertiary)]">
                Communication scattered across 4 channels - critical information
                lost in every direction
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <SectionHeader
              subtitle="Challenges"
              title="The workflow had to work for testers, managers, and the product team at once"
            />
            <p className="type-body text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-tertiary)]">
                Tester challenge:
              </span>{" "}
              Quickly understand what to test, submit feedback without extra
              effort, and feel that their contribution matters (clear status,
              deadlines, and impact).
            </p>
            <p className="type-body text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-tertiary)]">
                Manager challenge:
              </span>{" "}
              Run beta programs at scale without chasing testers across
              messengers, reduce manual coordination, and receive structured,
              actionable bug reports faster.
            </p>
            <p className="type-body text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-tertiary)]">
                Product challenge:
              </span>{" "}
              Design a centralized workflow that moves testers through the core
              journey - join → participate in tests → submit reports → follow up
              when needed → return for new tests - while keeping cognitive load
              low.
            </p>
            <p className="type-body text-[var(--text-secondary)]">
              <span className="font-medium text-[var(--text-tertiary)]">
                Business challenge:
              </span>{" "}
              Accelerate feedback loops to improve product quality and speed of
              release, while maintaining secure handling of tester data and
              supporting global partners who don&apos;t use the same communication
              tools.
            </p>
          </div>

          <div className="flex flex-col gap-[16px]">
            <SectionHeader
              subtitle="Objective"
              title="Create one central platform for running tests and collecting structured feedback"
            />
            <p className="type-body text-[var(--text-secondary)]">
              Create a single platform where beta managers can run tests and
              receive structured, timely feedback, while testers can clearly
              understand what to do, how to report issues, and what impact they
              made.
            </p>
          </div>

          <div className="flex flex-col gap-[16px]">
            <SectionHeader
              subtitle="Success metrics"
              title="Define how MVP success would be measured across adoption, engagement, and quality"
            />
            <p className="type-body text-[var(--text-secondary)]">
              To measure whether the MVP improves beta testing speed and report
              quality, I defined success metrics across four areas.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 max-sm:flex-col">
                <article className="flex flex-1 flex-col gap-4 rounded-[12px] border border-[#ececec] bg-[#fafafa] p-5">
                  <div className="flex items-center">
                    <span className="type-nav rounded-[20px] bg-[#d6ecdc] px-3 py-1 font-medium uppercase text-[#5f9d72]">
                      Adoption
                    </span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="type-body text-[var(--text-primary)]">
                      -Number of testers who joined the platform
                    </p>
                    <div className="h-px w-full bg-[#e8e8e8]" />
                    <p className="type-body text-[var(--text-primary)]">
                      -% of testers who submitted their first bug report
                    </p>
                  </div>
                </article>
                <article className="flex flex-1 flex-col gap-4 rounded-[12px] border border-[#ececec] bg-[#fafafa] p-5">
                  <div className="flex items-center">
                    <span className="type-nav rounded-[20px] bg-[#e0e7ff] px-3 py-1 font-medium uppercase text-[#667bc2]">
                      Engagement
                    </span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="type-body text-[var(--text-primary)]">
                      -Median time from test start to first bug report
                    </p>
                    <div className="h-px w-full bg-[#e8e8e8]" />
                    <p className="type-body text-[var(--text-primary)]">
                      -% completing the full journey
                    </p>
                    <div className="h-px w-full bg-[#e8e8e8]" />
                    <p className="type-body text-[var(--text-primary)]">
                      -% submitting 3+ bug reports within a defined time window
                    </p>
                    <div className="h-px w-full bg-[#e8e8e8]" />
                    <p className="type-body text-[var(--text-primary)]">
                      Weekly volume of submitted bug reports
                    </p>
                  </div>
                </article>
              </div>
              <div className="flex gap-4 max-sm:flex-col">
                <article className="flex flex-1 flex-col gap-4 rounded-[12px] border border-[#ececec] bg-[#fafafa] p-5">
                  <div className="flex items-center">
                    <span className="type-nav rounded-[20px] bg-[#ffe6d2] px-3 py-1 font-medium uppercase text-[#a6744a]">
                      Manager Productivity
                    </span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="type-body text-[var(--text-primary)]">
                      -Time spent on outreach and follow-ups
                    </p>
                    <div className="h-px w-full bg-[#e8e8e8]" />
                    <p className="type-body text-[var(--text-primary)]">
                      -Time spent clarifying reports (proxy for operational
                      overhead)
                    </p>
                  </div>
                </article>
                <article className="flex flex-1 flex-col gap-4 rounded-[12px] border border-[#ececec] bg-[#fafafa] p-5">
                  <div className="flex items-center">
                    <span className="type-nav rounded-[20px] bg-[#ffdefc] px-3 py-1 font-medium uppercase text-[#cc60c1]">
                      Quality
                    </span>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="type-body text-[var(--text-primary)]">
                      -% of reports actionable without additional clarification
                      from the team
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[16px]">
              <SectionHeader subtitle="Research" title="Research Goals" />
              <p className="type-body text-[var(--text-secondary)]">
                To ground the MVP in real tester behavior, we ran a research
                workshop and aligned on what we needed to learn. We defined
                research goals, key questions, and respondent profiles before
                moving into interviews:
              </p>
              <ul className="type-body my-0 flex flex-col items-start gap-1 list-disc pl-5 text-[var(--text-secondary)]">
                <li>
                  Improve the quality of communication between testers and the
                  team
                </li>
                <li>
                  Improve the quality of bug reports (more actionable, less
                  back-and-forth)
                </li>
                <li>Understand the current beta testing flow end-to-end</li>
                <li>Understand what motivates testers to participate</li>
                <li>Clarify manager responsibilities and pain points</li>
              </ul>
              <p className="type-body text-[var(--text-secondary)]">
                Based on the PRD and workshop outputs, we prepared an interview
                guide and interviewed beta testers across different profiles. We
                focused on how they currently report issues, where context gets
                lost, what slows them down, and what makes them stay engaged.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <ScaledCover nativeWidth={840} nativeHeight={355} className="rounded-[16px] bg-[#f9f9f9]">
                <Image
                  src={imgScreenshot20260129At2352561}
                  alt=""
                  width={772}
                  height={256}
                  sizes="772px"
                  className="absolute left-1/2 top-1/2 h-[256px] w-[772px] -translate-x-1/2 -translate-y-1/2 object-cover"
                />
              </ScaledCover>
              <p className="type-caption text-center text-[var(--text-tertiary)]">
                Research plan - problems, goals, questions and respondent profiles
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[32px]">
            <div className="flex flex-col gap-[16px]">
              <SectionHeader
                subtitle="Synthesis"
                title="Hypotheses & Prioritization"
              />
              <p className="type-body text-[var(--text-secondary)]">
                We translated interview insights into product hypotheses and
                prioritized them using the RICE framework. This helped us choose
                the most impactful MVP features and connect them directly to
                measurable outcomes (speed, quality, transparency, and reduced
                manager overhead).
              </p>
              <p className="type-body text-[var(--text-secondary)]">
                Top hypotheses (from interviews):
              </p>
              <ol className="type-body list-decimal pl-5 text-[var(--text-secondary)]">
                <li>
                  Bug report automation / structured reporting. If we reduce
                  manual input and guide testers with a structured form, reports
                  will be more complete and require fewer clarifications.
                </li>
                <li>
                  Direct coordinator - tester communication inside the platform.
                  If clarification happens in-context (per test/report), lost
                  context decreases and resolution becomes faster.
                </li>
                <li>
                  Centralized notification system. If reminders and updates are
                  centralized, response speed improves and missed deadlines
                  decrease.
                </li>
                <li>
                  Tester profile (for testers). If testers can track their
                  activity, report statuses, and progress, motivation and return
                  rate will increase.
                </li>
              </ol>
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative flex h-[520px] items-center justify-center overflow-hidden rounded-[16px] bg-[#f5f5f5] p-6">
                <Image
                  src={imgScreenshot20260130At0031041}
                  alt=""
                  width={685}
                  height={472}
                  sizes="685px"
                  className="h-[472px] w-[685px] object-cover"
                />
              </div>
              <p className="type-caption text-center text-[var(--text-tertiary)]">
                Process of defining and prioritizing hypotheses
              </p>
            </div>

            <p className="type-body text-[var(--text-secondary)]">
              These prioritized hypotheses shaped our core user flows (Join →
              Pick a test → Test device → Submit a report → Track status) and
              became the backbone for the MVP UI and feature set.
            </p>
          </div>
        </div>

        {/* Core flows */}
        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <SectionHeader subtitle="Core flows" title="Testing hub" />
            <p className="type-body text-[var(--text-secondary)]">
              The Testing hub helps testers instantly understand what to do next
              by grouping tests into three statuses: Not started, In progress, and
              Submitted. For quick scanning, tests can be viewed in two formats: a
              Kanban board for an at-a-glance overview and a list view for
              detailed browsing.
            </p>
          </div>
          <VideoShowcase
            slot="testing-hub-overview"
            caption="Kanban and table views of Testing Hub"
          />
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <h3 className="type-h3 text-[var(--text-primary)]">
              Detailed view of one test
            </h3>
            <p className="type-body text-[var(--text-secondary)]">
              The test details page provides full context in one place: test name,
              description, deadline, and conditions. Test cases are separated into
              a clear checklist with descriptions, so testers always know what to
              verify and can track progress (what&apos;s done vs what&apos;s left).
            </p>
          </div>
          <VideoShowcase
            slot="test-details-drawer"
            caption="Test details drawer appears when clicking on one test"
          />
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <h3 className="type-h3 text-[var(--text-primary)]">
              Notifications
            </h3>
            <p className="type-body text-[var(--text-secondary)]">
              To reduce missed deadlines and slow feedback, we introduced a
              centralized notifications center. Testers get clear updates about
              status changes, new tasks/deadlines, and rewards.
            </p>
          </div>
          <VideoShowcase
            slot="notifications-center"
            caption="Centralized notifications center with status updates and reminders"
          />
        </div>

        <div className="flex flex-col gap-[16px]">
          <SectionHeader
            subtitle="Usability testing & iterations - what went wrong"
            title="What the testing round revealed: testers needed everything in one place"
          />
          <p className="type-body text-[var(--text-secondary)]">
            After the first UI round, we ran usability tests with beta testers to
            validate clarity and speed of the main tasks.
            <br />
            <br />
            Initially, we organized the experience by function - tests in one
            place, news and device updates in another. It made sense structurally,
            but it didn&apos;t match how testers actually think. During usability
            testing, the gaps became obvious: testers had no way to track upcoming
            tests or device updates at a glance, had no visibility into strict
            deadlines, and no sense of their own score. People kept asking
            &quot;where do I go next?&quot; - and sometimes the answer simply wasn&apos;t
            there. That told us the architecture was wrong. We scrapped the
            sectioned layout and built a dashboard that answered everything on one
            screen.
          </p>
        </div>

        <div className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[16px]">
            <h3 className="type-h3 text-[var(--text-primary)]">Dashboard</h3>
            <p className="type-body text-[var(--text-secondary)]">
              Working within a tight timeframe, I designed the Dashboard as the
              first screen testers see after login - a single overview of
              everything critical, without requiring any navigation. I owned this
              page end-to-end, from structure to final details.
            </p>
            <p className="type-body text-[var(--text-secondary)]">
              The layout is organized into four sections:{" "}
              <strong>My tests</strong> surfaces active tests with progress,
              timelines, manager contact, device status, and a feedback reminder
              banner so nothing slips through; <strong>Calendar</strong> shows
              strict deadlines and the full testing timeline at a glance;{" "}
              <strong>Upcoming tests</strong> lets testers discover and join new
              tests before they start; and <strong>Updates</strong> consolidates
              the latest hub, app, and device updates alongside the tester&apos;s
              current <strong>score</strong> - the visibility that was missing
              entirely in the first version. Every section answers a question
              testers were previously asking out loud. The goal was a screen you
              could land on, read in seconds, and know exactly what to do next.
            </p>
          </div>
          <VideoShowcase slot="dashboard-overview" caption="Dashboard view" />
        </div>

        <div className="flex flex-col gap-[48px]">
          <div className="flex flex-col gap-[16px]">
            <h3 className="type-h3 text-[var(--text-primary)]">
              Future direction: In-platform messenger
            </h3>
            <p className="type-body text-[var(--text-secondary)]">
              After validating the MVP, we outlined several ideas for the next
              stage. The first one is an integrated messenger.
              <br />
              <br />
              In the MVP, we kept communication lightweight by linking out to
              Telegram chats directly from the platform (manager contact and test
              group). This was a pragmatic decision: the team and many local
              testers already use Telegram daily, and introducing a brand-new
              communication tool would slow down adoption during early rollout.
              <br />
              <br />
              However, for international beta programs, direct communication is
              often harder because testers may not use Telegram or prefer
              different tools. To address that, we propose an in-platform
              messenger that allows testers to message the manager or the test
              group without leaving the platform.
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

      {/* Navigation */}
      <div className="flex w-full max-w-[840px] items-center justify-between">
        <NavButton href="/" text="Previous" />
        <Link
          href="/projects/role-management-system"
          className="type-body inline-flex w-fit items-center gap-2 rounded-xl border border-[#dadada] bg-[linear-gradient(179.23deg,#fff_4.27%,rgba(231,231,231,0.7)_98.14%)] px-3 py-2 text-[var(--text-secondary)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)] transition-[background-color,border-color,color] duration-200 ease-out hover:border-[#d5d5d5] hover:bg-[#efefef] hover:text-[var(--text-primary)]"
        >
          <span>Next</span>
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
