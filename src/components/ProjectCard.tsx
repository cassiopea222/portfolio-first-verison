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

// Role management cover asset
const imgRoleManagement = "/home/role management image.png";

export default function ProjectCard({
  title,
  dateRange,
  tags,
  description,
  cover,
  href,
}: ProjectCardProps) {
  const coverNode = (
    <ScaledCover nativeWidth={800} nativeHeight={540}>
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
        <>
          <div className="absolute left-[189px] top-[60px] h-[420px] w-[199px]">
            <Image
              src={imgFitnessLeft}
              alt=""
              fill
              sizes="199px"
              className="object-cover pointer-events-none"
            />
          </div>
          <div className="absolute left-[412px] top-[60px] h-[420px] w-[199px]">
            <Image
              src={imgFitnessRight}
              alt=""
              fill
              sizes="199px"
              className="object-cover pointer-events-none"
            />
          </div>
        </>
      )}
      {cover === "role" && (
        <div className="absolute left-1/2 top-1/2 h-[391px] w-[483px] -translate-x-1/2 -translate-y-1/2">
          <Image
            src={imgRoleManagement}
            alt=""
            fill
            sizes="483px"
            className="object-cover pointer-events-none"
          />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.24)] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
    </ScaledCover>
  );

  const textNode = (
    <div className="flex w-full flex-col gap-[4px]">
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-wrap items-start gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[6px] bg-[#f2f2f2] px-2 py-1.5 font-inconsolata text-[16px] font-semibold uppercase leading-[14px] text-[var(--text-tertiary)] whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="flex items-start gap-4 font-inconsolata text-[22px] font-semibold leading-[30px] whitespace-nowrap">
          <span className="text-[var(--text-primary)]">{title}</span>
          <span className="text-[var(--text-tertiary)]">{dateRange}</span>
        </h3>
      </div>
      <p className="font-sans text-[16px] font-normal leading-[24px] tracking-[0.2px] text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );

  const className = "group flex flex-col gap-5 overflow-hidden bg-white text-left";

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
