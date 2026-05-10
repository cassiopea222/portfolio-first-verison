import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

function getLastUpdateDate(): string {
  const formatDate = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}.${mm}.${yy}`;
  };

  try {
    const iso = execSync("git log -1 --format=%cI", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (iso) return formatDate(new Date(iso));
  } catch {
    // git not available — fall through
  }

  try {
    const stat = statSync(path.join(process.cwd(), "package.json"));
    return formatDate(stat.mtime);
  } catch {
    return formatDate(new Date());
  }
}

const EMAIL_ADDRESS = "ubulyndina@gmail.com";

const footerLinks = [
  { href: `mailto:${EMAIL_ADDRESS}`, label: "Email", tooltip: "Copy", external: false },
  {
    href: "https://www.linkedin.com/in/julia-bulyndina-872617241/",
    label: "LinkedIn",
    tooltip: "Go",
    external: true,
  },
  { href: "/cv/julia-bulyndina-cv.pdf", label: "Resume", tooltip: "Open", external: true },
];

export default function FooterNote() {
  const lastUpdate = getLastUpdateDate();

  return (
    <footer className="mx-auto flex w-full max-w-[1440px] fluid-px-home pb-10 pt-[60px] min-[810px]:pt-20">
      <div className="flex w-full flex-col items-start justify-between gap-10 min-[810px]:flex-row min-[810px]:items-end">
        {/* Left — Say hi */}
        <div className="flex flex-col gap-4">
          <p
            className="italic tracking-[0.36px] text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-crimson), serif", fontSize: 36, lineHeight: "40px" }}
          >
            Say hi{" "}
            <span
              className="not-italic"
              style={{ fontFamily: "inherit", fontSize: 24, lineHeight: "36px" }}
            >
              𓍢ִ໋❀˚⋆
            </span>
          </p>
          <div className="flex items-center gap-5">
            {footerLinks.map(({ href, label, tooltip, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                data-tooltip={tooltip}
                className="font-inconsolata text-[18px] font-semibold leading-[26px] text-[var(--text-muted,#818790)] no-underline"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Built with */}
        <div className="flex flex-col items-start gap-2 min-[810px]:items-end">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px] font-normal leading-5 text-[var(--text-tertiary)]">
              Built with love by me
            </span>
            <div className="relative h-[26px] w-[26px] overflow-hidden rounded-[4px]" style={{ transform: "rotate(5.86deg)" }}>
              <Image
                src="/footer/photo.jpg"
                alt="Julia"
                fill
                sizes="26px"
                className="object-cover"
              />
            </div>
            <span className="text-[14px] font-normal leading-5 text-[var(--text-tertiary)]">
              with
            </span>
            <div className="relative h-6 w-6 overflow-hidden rounded-[4px]">
              <Image
                src="/footer/cursor-icon.png"
                alt="Cursor"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <div className="relative h-6 w-6 overflow-hidden rounded-[4px]">
              <Image
                src="/footer/claude-icon.png"
                alt="Claude"
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
          </div>
          <p className="text-[14px] font-normal leading-5 text-[var(--text-tertiary)]">
            Changelog: {lastUpdate}
          </p>
        </div>
      </div>
    </footer>
  );
}
