import Link from "next/link";
import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";

export type ProjectCardProps = {
  title: string;
  dateRange: string;
  tags: string[];
  description: string;
  cover: "ajax" | "fitness" | "role";
  href?: string;
};

// Ajax cover assets
const imgAjaxBg = "/home/unsplash_-Vh-kRw_vyQ.png";

// Fitness cover assets
const imgFitnessLeft = "/home/sadie_active/sadieactivecover1 1.png";
const imgFitnessRight = "/home/sadie_active/asdieactivecover2 1.png";

// Role management cover assets
const imgRoleManagement = "/home/role management image.png";
const imgRoleManagementBg = "/home/role_management/shutterstock-bg.png";

export default function ProjectCard({
  title,
  dateRange,
  tags,
  description,
  cover,
  href,
}: ProjectCardProps) {
  const coverClassName = {
    ajax: "rounded-[20px] bg-[#ededed] shrink-0",
    fitness: "rounded-[20px] bg-white border border-[#ededed] shrink-0",
    role: "rounded-[16px] bg-[#f1f5f9] border border-[#ededed] shadow-[0px_2px_4px_0px_rgba(219,219,219,0.5)] shrink-0",
  }[cover];

  const coverNode = (
    <ScaledCover nativeWidth={800} nativeHeight={490} className={coverClassName}>
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
          <div className="absolute left-1/2 top-1/2 h-[424px] w-[596px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] overflow-hidden shadow-[var(--card-shadow)]">
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
        <div className="absolute inset-0 flex items-center justify-center gap-[24px]">
          <div className="relative h-[420px] w-[199px] shrink-0">
            <Image
              src={imgFitnessLeft}
              alt=""
              fill
              sizes="199px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="relative h-[420px] w-[199px] shrink-0">
            <Image
              src={imgFitnessRight}
              alt=""
              fill
              sizes="199px"
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
    <div className="flex w-full flex-col gap-[12px] px-[12px]">
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-wrap items-start gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[6px] bg-[#efedeb] px-2 py-1.5 font-inconsolata text-[16px] font-semibold uppercase leading-[14px] text-[var(--text-tertiary)] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="flex w-full flex-col items-start gap-1 text-[22px] leading-[30px] min-[810px]:flex-row min-[810px]:gap-3 min-[810px]:whitespace-nowrap">
          <span className="w-full font-sans font-medium text-[var(--text-primary)] min-[810px]:w-auto">
            {title}
          </span>
          <span className="font-sans text-[18px] font-normal leading-[26px] text-[var(--text-tertiary)] min-[810px]:text-[22px] min-[810px]:leading-[30px]">
            {dateRange}
          </span>
        </h3>
      </div>
      <p className="font-sans text-[16px] font-normal leading-[24px] tracking-[0.2px] text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );

  const className = "group flex flex-col gap-[24px] overflow-hidden bg-[#fbfbfb] border-[1.5px] border-[#ededed] rounded-[24px] pt-[12px] px-[12px] pb-[24px] text-left";

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
