import Link from "next/link";
import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";

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
    <div className="flex flex-col gap-3">
      <p className="text-[18px] font-medium leading-6 text-[var(--text-tertiary)]">{subtitle}</p>
      <h2 className="text-[24px] font-semibold leading-8 text-[var(--text-primary)]">{title}</h2>
    </div>
  );
}

function Showcase({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <div className="flex flex-col gap-2">
      <ScaledCover nativeWidth={800} nativeHeight={520} className="rounded-[16px] bg-[#ededed]">
        {children}
      </ScaledCover>
      <p className="text-center text-[16px] font-normal leading-6 text-[var(--text-tertiary)]">{caption}</p>
    </div>
  );
}

export default function FitnessCaseStudy() {
  return (
    <section className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[60px] py-[120px] fluid-px max-[809px]:gap-[40px] max-[809px]:py-[48px]">
      <div className="w-full max-w-[800px]">
        <NavButton href="/" text="Go back" />
      </div>

      <div className="flex w-full max-w-[800px] flex-col gap-12">
        {/* Title block */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 max-[809px]:flex-col-reverse max-[809px]:items-start max-[809px]:gap-1">
              <h1 className="text-[26px] font-medium leading-9 text-[var(--text-primary)]">
                Fitness app redesign
              </h1>
              <p className="text-[26px] font-medium leading-9 text-[var(--text-tertiary)]">
                SadieActive
              </p>
            </div>
            <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
              Redesigned a mobile fitness app for an Instagram fitness influencer
              (200K+ followers). Led the UX/UI for the progress dashboard and
              workout programs, designed an admin platform for managing in-app
              content, and built a scalable design system to support future growth.
            </p>
          </div>

          {/* Cover: 3 phones */}
          <ScaledCover nativeWidth={800} nativeHeight={520} className="rounded-[16px] bg-[#ededed]">
            <Image
              src={imgIPhone17Pro1}
              alt=""
              width={208}
              height={440}
              priority
              sizes="208px"
              className="absolute left-[49px] top-1/2 h-[440px] w-[208px] -translate-y-1/2 object-cover"
            />
            <Image
              src={imgCenterPhone}
              alt=""
              width={208}
              height={440}
              priority
              sizes="208px"
              className="absolute left-1/2 top-[68px] h-[440px] w-[208px] -translate-x-1/2 object-cover"
            />
            <Image
              src={imgRightPhone}
              alt=""
              width={208}
              height={440}
              priority
              sizes="208px"
              className="absolute left-[545px] top-1/2 h-[440px] w-[208px] -translate-y-1/2 object-cover"
            />
          </ScaledCover>

          {/* Info: Role / Team / Timeline */}
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
              <div className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
                <p>2 designers</p>
                <p>5 developers</p>
                <p>1 project manager</p>
                <p>1 QA</p>
              </div>
            </div>
            <div className="flex w-[200px] flex-col gap-3 max-[402px]:w-full">
              <p className="text-[18px] font-medium uppercase leading-6 text-[var(--text-tertiary)]">
                Timeline
              </p>
              <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
                Nov 2023 - Jan 2024
              </p>
            </div>
          </div>
        </div>

        {/* Problem */}
        <div className="flex flex-col gap-8">
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
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-8">
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
              sizes="200px"
              className="absolute left-[180px] top-[30px] h-[433px] w-[200px] object-cover"
            />
            <Image
              src={img030101Workouts}
              alt=""
              width={200}
              height={433}
              sizes="200px"
              className="absolute left-[420px] top-[30px] h-[433px] w-[200px] object-cover"
            />
            <p className="absolute left-[258px] top-[475px] text-sm leading-[18px] text-[#242e58]">
              before
            </p>
            <p className="absolute left-[504px] top-[475px] text-sm leading-[18px] text-[#242e58]">
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
              sizes="200px"
              className="absolute left-[180px] top-[51px] h-[412px] w-[200px] rounded-[12px] object-cover"
            />
            <Image
              src={img040101Dashboard1}
              alt=""
              width={200}
              height={412}
              sizes="200px"
              className="absolute left-[420px] top-[51px] h-[412px] w-[200px] object-cover"
            />
            <p className="absolute left-[258px] top-[475px] text-sm leading-[18px] text-[#242e58]">
              before
            </p>
            <p className="absolute left-[504px] top-[475px] text-sm leading-[18px] text-[#242e58]">
              after
            </p>
          </Showcase>
        </div>

        {/* Programs */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-[24px] font-semibold leading-8 text-[var(--text-primary)]">
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
              sizes="210px"
              className="absolute left-1/2 top-1/2 h-[449px] w-[210px] -translate-x-1/2 -translate-y-1/2 object-cover"
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
                sizes="210px"
                className="h-[448px] w-[210px] object-cover"
              />
              <Image
                src={img020303WeekDefault}
                alt=""
                width={222}
                height={448}
                sizes="222px"
                className="h-[448px] w-[222px] object-cover"
              />
            </div>
          </Showcase>
        </div>

        {/* Macronutrients calculator */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-[24px] font-semibold leading-8 text-[var(--text-primary)]">
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
              sizes="210px"
              className="absolute left-[45px] top-[139px] h-[381px] w-[210px] object-cover"
            />
            <Image
              src={img040409MacroCalculatorActivityLevel}
              alt=""
              width={210}
              height={455}
              sizes="210px"
              className="absolute left-[295px] top-1/2 h-[455px] w-[210px] -translate-y-1/2 object-cover"
            />
            <Image
              src={img040417NutritionOverviewResults}
              alt=""
              width={210}
              height={403}
              sizes="210px"
              className="absolute left-[545px] top-[117px] h-[403px] w-[210px] object-cover"
            />
          </Showcase>
        </div>

        {/* Web platform for admin */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-[24px] font-semibold leading-8 text-[var(--text-primary)]">
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
              sizes="(max-width: 1024px) 90vw, 600px"
              className="absolute left-1/2 top-1/2 h-[427px] w-[600px] -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </Showcase>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex w-full max-w-[800px] items-center justify-between">
        <NavButton href="/projects/role-management-system" text="Previous" />
        <NavButton href="/projects/beta-testing-platform-ajax" text="Next" rightIcon />
      </div>
    </section>
  );
}
