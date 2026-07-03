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
