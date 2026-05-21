import Link from "next/link";
import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";

export type ProjectCardProps = {
  title: string;
  tags: string[];
  description: string;
  cover: "ajax" | "fitness" | "role";
  href?: string;
};

// Ajax cover assets
const imgAjaxBg = "/home/unsplash_-Vh-kRw_vyQ.png";
const imgAjaxDashboard = "/gifs/ajax-cover.gif";

// Fitness cover assets
const imgFitnessLeft = "/home/sadie_active/sadieactivecover1 1.png";
const imgFitnessRight = "/home/sadie_active/asdieactivecover2 1.png";

// Role management cover asset
const imgRoleManagement = "/home/role management image.png";

export default function ProjectCard({
  title,
  tags,
  description,
  cover,
  href,
}: ProjectCardProps) {
  const coverNode = (
    <div className="w-full shrink-0 min-[810px]:w-[534px]">
      <ScaledCover nativeWidth={534} nativeHeight={500}>
        {cover === "ajax" && (
          <>
            <div className="absolute inset-0 blur-[6px]">
              <Image
                src={imgAjaxBg}
                alt=""
                fill
                sizes="534px"
                className="object-cover pointer-events-none"
              />
            </div>
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] overflow-hidden shadow-[var(--card-shadow)]">
              <Image
                src={imgAjaxDashboard}
                alt=""
                fill
                unoptimized
                sizes="450px"
                className="object-cover rounded-[8px]"
              />
            </div>
          </>
        )}
        {cover === "fitness" && (
          <>
            <div className="absolute left-[71px] top-[40px] h-[420px] w-[199px]">
              <Image
                src={imgFitnessLeft}
                alt=""
                fill
                sizes="199px"
                className="object-cover pointer-events-none"
              />
            </div>
            <div className="absolute left-[294px] top-[40px] h-[420px] w-[199px]">
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
          <div className="absolute left-1/2 top-1/2 h-[340px] w-[420px] -translate-x-1/2 -translate-y-1/2">
            <Image
              src={imgRoleManagement}
              alt=""
              fill
              sizes="420px"
              className="object-cover pointer-events-none"
            />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.24)] opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
      </ScaledCover>
    </div>
  );

  const textNode = (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex flex-col gap-2">
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
        <h3 className="font-sans text-[20px] font-medium leading-[26px] text-[var(--text-primary)]">
          {title}
        </h3>
      </div>
      <p className="font-sans text-[16px] font-normal leading-[22px] tracking-[0.2px] text-[var(--text-secondary)]">
        {description}
      </p>
    </div>
  );

  const className =
    "group flex flex-col gap-6 overflow-hidden bg-white text-left min-[810px]:flex-row min-[810px]:items-start";

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
