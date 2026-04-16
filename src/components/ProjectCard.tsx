import Link from "next/link";
import Image from "next/image";
import ScaledCover from "@/components/ScaledCover";

export type ProjectCardProps = {
  title: string;
  client: string;
  date: string;
  description: string;
  cover: "ajax" | "fitness" | "role";
  href?: string;
};

// Ajax cover assets
const imgAjaxBg =
  "https://www.figma.com/api/mcp/asset/f61e2e2e-5dbe-472b-91c9-3ba3e9a10520";
const imgAjaxDashboard =
  "https://www.figma.com/api/mcp/asset/6318152a-dc83-4045-824c-7f08053d03a1";

// Fitness cover assets
const imgFitnessLeft =
  "https://www.figma.com/api/mcp/asset/42083c84-11f4-46fb-a397-03ff02359045";
const imgFitnessRight =
  "https://www.figma.com/api/mcp/asset/46ad6007-5159-4f43-8d21-66f371721b20";

// Role management cover asset
const imgRoleManagement =
  "https://www.figma.com/api/mcp/asset/9bead863-3244-4e65-bab0-f5e9d717909f";

export default function ProjectCard({
  title,
  client,
  date,
  description,
  cover,
  href,
}: ProjectCardProps) {
  const coverNode = (
    <ScaledCover>
      {cover === "ajax" && (
        <>
          {/* Blurred background */}
          <div className="absolute h-[1197px] w-[1826px] blur-[6px] left-[-487px] top-[-142px]">
            <Image
              src={imgAjaxBg}
              alt=""
              fill
              sizes="1826px"
              className="object-cover pointer-events-none"
            />
          </div>
          {/* Centered dashboard screenshot */}
          <div className="absolute left-1/2 top-1/2 h-[364px] w-[512px] -translate-x-1/2 -translate-y-1/2 rounded-[8px] overflow-hidden shadow-[var(--card-shadow)]">
            <Image
              src={imgAjaxDashboard}
              alt=""
              fill
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
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-[18px] font-medium leading-[22px] text-[var(--text-tertiary)]">
            <span>{client}</span>
            <span>/</span>
            <span>{date}</span>
          </div>
          <h3 className="text-[20px] font-medium leading-6 text-[var(--text-primary)]">{title}</h3>
        </div>
        <p className="text-[16px] font-normal leading-6 text-[var(--text-secondary)]">
          {description}
        </p>
      </div>
    </>
  );

  const className = "group flex flex-col gap-5 overflow-hidden bg-white text-left";

  if (href) {
    return (
      <Link href={href} className={className} data-tooltip="See case study">
        {content}
      </Link>
    );
  }

  return <article className={className}>{content}</article>;
}
