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
/** Animated Ajax card center — `public/gifs/ajax-cover.gif`. */
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
    <ScaledCover>
      {cover === "ajax" && (
        <>
          {/* Blurred background */}
          <div className="absolute inset-0 blur-[6px]">
            <Image
              src={imgAjaxBg}
              alt=""
              fill
              sizes="564px"
              className="object-cover pointer-events-none"
            />
          </div>
          {/* Centered dashboard screenshot */}
          <div className="absolute left-1/2 top-1/2 h-[364px] w-[512px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] overflow-hidden shadow-[var(--card-shadow)]">
            <Image
              src={imgAjaxDashboard}
              alt=""
              fill
              unoptimized
              sizes="512px"
              className="object-cover rounded-[8px]"
            />
          </div>
        </>
      )}
      {cover === "fitness" && (
        <>
          {/* Left phone */}
          <div className="absolute left-[58px] top-[40px] h-[440px] w-[208px]">
            <Image
              src={imgFitnessLeft}
              alt=""
              fill
              sizes="208px"
              className="object-cover pointer-events-none"
            />
          </div>
          {/* Right phone */}
          <div className="absolute left-[298px] top-[40px] h-[440px] w-[208px]">
            <Image
              src={imgFitnessRight}
              alt=""
              fill
              sizes="208px"
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
  );

  const content = (
    <>
      {coverNode}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-start gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[6px] bg-[#f2f2f2] px-2 py-1.5 text-[14px] font-semibold uppercase leading-[14px] tracking-wide text-[var(--text-tertiary)] whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-[20px] font-semibold leading-7 text-[var(--text-primary)]">{title}</h3>
        </div>
        <p className="text-[18px] font-medium leading-[26px] text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </>
  );

  const className = "group flex flex-col gap-4 overflow-hidden bg-white text-left";

  if (href) {
    return (
      <Link href={href} className={className} data-tooltip="See case study">
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
