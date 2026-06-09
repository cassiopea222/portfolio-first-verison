import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";
import CaseStudyToC, { type ToCSection } from "@/components/projects/CaseStudyToC";
import CaseStudyMeta from "@/components/projects/CaseStudyMeta";

// Cover images
const imgIPhone17Pro1 = "/home/sadie_active/iPhone 17 Pro 1.png";
const imgCenterPhone = "/home/sadie_active/sadieactivecover1 1.png";
const imgRightPhone = "/home/sadie_active/asdieactivecover2 1.png";

// Section images
const img030101Workouts = "/home/sadie_active/03.01.01 - Workouts.png";
const imgImg6304 = "/home/sadie_active/IMG_6304.png";
const imgFrame2147238214 = "/home/sadie_active/Frame 2147238214.png";
const img040101Dashboard1 = "/home/sadie_active/04.01.01 - Dashboard-1.png";
const img47 = "/home/sadie_active/4 7.png";
const img020307ProgramFullPageInProgress = "/home/sadie_active/02.03.07 - Program_full_page_in_progress.png";
const img020303WeekDefault = "/home/sadie_active/02.03.03 - week_default.png";
const img040405PersonalDetailsGender = "/home/sadie_active/04.04.05 - Personal_details_gender.png";
const img040409MacroCalculatorActivityLevel = "/home/sadie_active/04.04.09 - Macro_calculator_activity_level.png";
const img040417NutritionOverviewResults = "/home/sadie_active/04.04.17 - nutrition_overview_results.png";
const img070311WebCreate1WorkoutInputed = "/home/sadie_active/07.03.11 - Web_create_1_workout_inputed.png";

const TOC_SECTIONS: ToCSection[] = [
  { id: "problem", label: "Problem" },
  { id: "my-role", label: "My role" },
  { id: "core-flows", label: "Core flows" },
];

function SectionHeader({ subtitle, title }: { subtitle: string; title: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-inconsolata text-[18px] font-semibold leading-6 text-[var(--text-tertiary)]">{subtitle}</p>
      <h2 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">{title}</h2>
    </div>
  );
}

function Showcase({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <div className="flex flex-col gap-2">
      <ScaledCover nativeWidth={800} nativeHeight={520} className="rounded-[16px] bg-[#ededed]">
        {children}
      </ScaledCover>
      <p className="type-caption text-center text-[var(--text-tertiary)]">{caption}</p>
    </div>
  );
}

export default function FitnessCaseStudy() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] items-start gap-[40px] py-[120px] px-[60px] max-[809px]:flex-col max-[809px]:gap-[40px] max-[809px]:py-[48px] max-[809px]:px-[20px]">
      <CaseStudyToC sections={TOC_SECTIONS} backHref="/" title="Fitness app redesign" />

      <div className="flex min-w-0 max-w-[800px] flex-1 flex-col gap-12">
        {/* Opening block */}
        <div className="flex flex-col gap-8">
          {/* Title */}
          <div className="flex flex-col gap-[8px]">
            <p className="font-inconsolata font-medium text-[22px] leading-6 text-[var(--text-tertiary)]">SadieActive</p>
            <h1 className="text-[24px] font-medium leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] max-[809px]:text-[26px] max-[809px]:leading-9">
              Fitness app redesign
            </h1>
          </div>

          {/* Cover: 3 phones */}
          <ScaledCover nativeWidth={800} nativeHeight={520} className="rounded-[16px] bg-[#ededed]">
            <Image
              src={imgIPhone17Pro1}
              alt=""
              width={208}
              height={440}
              priority
              sizes="(max-width: 809px) calc(26vw - 10px), 208px"
              className="absolute left-[49px] top-1/2 h-[440px] w-[208px] -translate-y-1/2 object-contain"
            />
            <Image
              src={imgCenterPhone}
              alt=""
              width={208}
              height={440}
              priority
              sizes="(max-width: 809px) calc(26vw - 10px), 208px"
              className="absolute left-1/2 top-[68px] h-[440px] w-[208px] -translate-x-1/2 object-contain"
            />
            <Image
              src={imgRightPhone}
              alt=""
              width={208}
              height={440}
              priority
              sizes="(max-width: 809px) calc(26vw - 10px), 208px"
              className="absolute left-[545px] top-1/2 h-[440px] w-[208px] -translate-y-1/2 object-contain"
            />
          </ScaledCover>

          {/* Info: Role / Team / Timeline */}
          <CaseStudyMeta items={[
            { label: "Role", value: "Product Designer" },
            { label: "Team", value: <><p>2 designers</p><p>5 developers</p><p>1 project manager</p><p>1 QA</p></> },
            { label: "Timeline", value: "Oct 2023 - Feb 2024" },
          ]} />

          {/* Description */}
          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Redesigned a mobile fitness app for an Instagram fitness influencer
            (200K+ followers). Led the UX/UI for the progress dashboard and
            workout programs, designed an admin platform for managing in-app
            content, and built a scalable design system to support future growth.
          </p>
        </div>

        {/* Problem */}
        <div id="problem" className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeader
              subtitle="Problem"
              title="The app felt dated, cluttered, and hard to follow."
            />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              The original app felt dated and unintuitive: cluttered workout
              screens, inconsistent navigation, and friction completing sessions.
              Users complained about the workout execution experience (hard to
              follow steps, video/rep timing confusion, poor readability), leading
              to lower engagement and negative feedback. The fitness trainer also
              lacked an efficient web interface to upload/manage workouts. We
              undertook a full redesign to modernize the experience, streamline
              completing a workout, and create a scalable content management admin.
            </p>
          </div>
        </div>

        {/* My role */}
        <div id="my-role" className="flex flex-col gap-4">
          <SectionHeader
            subtitle="My role"
            title="From analysis to handoff across mobile + admin."
          />
          <ul className="list-disc pl-6 text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            <li>Conducted competitor analysis</li>
            <li>Developed user flows</li>
            <li>Designed mobile and tablet UI</li>
            <li>Identified edge cases and corner scenarios</li>
            <li>Designed the admin web interface</li>
            <li>Prepared design handoff for development</li>
            <li>Reviewed implementation to ensure design consistency</li>
            <li>Built and maintained the design system</li>
          </ul>
        </div>

        {/* Core flows: Workouts and statistics */}
        <div id="core-flows" className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SectionHeader
              subtitle="Core flows"
              title="Workouts and statistics"
            />
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Turned a cluttered home screen into a simple weekly hub - users can
              instantly see progress, jump into the next workout, and review what
              they&apos;ve done.
            </p>
          </div>

          <Showcase caption="Workouts page: before and after redesign">
            <Image
              src={imgImg6304}
              alt=""
              width={200}
              height={433}
              sizes="(max-width: 809px) calc(25vw - 10px), 200px"
              className="absolute left-[180px] top-[30px] h-[433px] w-[200px] object-contain"
            />
            <Image
              src={img030101Workouts}
              alt=""
              width={200}
              height={433}
              sizes="(max-width: 809px) calc(25vw - 10px), 200px"
              className="absolute left-[420px] top-[30px] h-[433px] w-[200px] object-contain"
            />
            <p className="absolute left-[258px] top-[475px] text-sm leading-[18px] text-[var(--text-tertiary)]">
              before
            </p>
            <p className="absolute left-[504px] top-[475px] text-sm leading-[18px] text-[var(--text-tertiary)]">
              after
            </p>
          </Showcase>

          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Redesigned Profile into a Dashboard that shows weekly stats, a quick
            training report link, macro summary, and recent workout history - so
            users can check progress and jump to core actions faster.
          </p>

          <Showcase caption="Dashboard page: before and after redesign">
            <Image
              src={imgFrame2147238214}
              alt=""
              width={200}
              height={412}
              sizes="(max-width: 809px) calc(25vw - 10px), 200px"
              className="absolute left-[180px] top-[51px] h-[412px] w-[200px] rounded-[12px] object-contain"
            />
            <Image
              src={img040101Dashboard1}
              alt=""
              width={200}
              height={412}
              sizes="(max-width: 809px) calc(25vw - 10px), 200px"
              className="absolute left-[420px] top-[51px] h-[412px] w-[200px] object-contain"
            />
            <p className="absolute left-[258px] top-[475px] text-sm leading-[18px] text-[var(--text-tertiary)]">
              before
            </p>
            <p className="absolute left-[504px] top-[475px] text-sm leading-[18px] text-[var(--text-tertiary)]">
              after
            </p>
          </Showcase>
        </div>

        {/* Programs */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">
              Programs
            </h2>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Long-term programs turn single workouts into clear 4-, 8-, or
              12-week roadmaps. Each plan auto-slots sessions onto the right days.
              Also there is a live progress bar and a &quot;Next workout&quot; jump-in in
              case if user has active program.
            </p>
          </div>

          <Showcase caption="Programs hub with active plan progress and quick access to all available programs.">
            <Image
              src={img47}
              alt=""
              width={210}
              height={449}
              sizes="(max-width: 809px) calc(26vw - 11px), 210px"
              className="absolute left-1/2 top-1/2 h-[449px] w-[210px] -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </Showcase>

          <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
            Created a Program detail view that turns workouts into a weekly plan:
            users see the program level, duration, and equipment, track
            week-by-week progress, and jump straight to the Next workout.
          </p>

          <Showcase caption="Program detail view with level, duration, equipment, and weekly progress.">
            <div className="flex h-full items-center justify-center gap-6 p-6">
              <Image
                src={img020307ProgramFullPageInProgress}
                alt=""
                width={210}
                height={448}
                sizes="(max-width: 809px) calc(26vw - 11px), 210px"
                className="h-[448px] w-[210px] object-contain"
              />
              <Image
                src={img020303WeekDefault}
                alt=""
                width={222}
                height={448}
                sizes="(max-width: 809px) calc(28vw - 11px), 222px"
                className="h-[448px] w-[222px] object-contain"
              />
            </div>
          </Showcase>
        </div>

        {/* Macronutrients calculator */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">
              Macronutrients calculator
            </h2>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              We aimed to make workout execution clearer and more focused, cut
              navigation friction so users reach programs and sessions faster,
              unify UI through a reusable cross-platform design system.
            </p>
          </div>
          <Showcase caption="Step-by-step macro setup with a simple, visual breakdown of daily targets.">
            <Image
              src={img040405PersonalDetailsGender}
              alt=""
              width={210}
              height={381}
              sizes="(max-width: 809px) calc(26vw - 11px), 210px"
              className="absolute left-[45px] top-[139px] h-[381px] w-[210px] object-contain"
            />
            <Image
              src={img040409MacroCalculatorActivityLevel}
              alt=""
              width={210}
              height={455}
              sizes="(max-width: 809px) calc(26vw - 11px), 210px"
              className="absolute left-[295px] top-1/2 h-[455px] w-[210px] -translate-y-1/2 object-contain"
            />
            <Image
              src={img040417NutritionOverviewResults}
              alt=""
              width={210}
              height={403}
              sizes="(max-width: 809px) calc(26vw - 11px), 210px"
              className="absolute left-[545px] top-[117px] h-[403px] w-[210px] object-contain"
            />
          </Showcase>
        </div>

        {/* Web platform for admin */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">
              Web platform for admin
            </h2>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              We aimed to make workout execution clearer and more focused, cut
              navigation friction so users reach programs and sessions faster,
              unify UI through a reusable cross-platform design system.
            </p>
          </div>
          <Showcase caption="Admin platform for creating and managing workouts, programs, and content.">
            <Image
              src={img070311WebCreate1WorkoutInputed}
              alt=""
              width={600}
              height={427}
              sizes="(max-width: 809px) calc(75vw - 30px), 600px"
              className="absolute left-1/2 top-1/2 h-[427px] w-[600px] -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </Showcase>
        </div>
      </div>
    </section>
  );
}
