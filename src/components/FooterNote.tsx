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
    <footer className="mx-auto flex w-full max-w-[1440px] fluid-px pb-[24px] pt-[40px]">
      <div className="flex w-full flex-col items-start justify-between gap-10 min-[810px]:flex-row min-[810px]:items-end">
        {/* Left — Say hi */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <p
              className="italic tracking-[0.32px] text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-crimson), serif", fontSize: 32, lineHeight: "40px" }}
            >
              Say hi
            </p>
            <span
              className="not-italic"
              style={{ fontFamily: "var(--font-crimson), serif", fontSize: 20, lineHeight: "36px", fontWeight: 500 }}
            >
              𓍢ִ໋❀˚⋆
            </span>
          </div>
          <div className="flex items-center gap-5">
            {footerLinks.map(({ href, label, tooltip, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                data-tooltip={tooltip}
                className="py-2 font-inconsolata text-[18px] font-semibold leading-[20px] text-[var(--text-tertiary)] no-underline transition-colors hover:text-[var(--text-secondary)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Right — Built with */}
        <div className="flex flex-col items-start gap-2 min-[810px]:items-end">
          <div className="flex items-center gap-1.5">
            <span className="font-sans text-[14px] font-normal leading-[18px] text-[var(--text-tertiary)]">
              Built with love by me, using
            </span>
            <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="relative h-6 w-6 overflow-hidden rounded-[4px]">
              <Image
                src="/footer/cursor-icon.png"
                alt="Cursor"
                fill
                sizes="24px"
                className="object-cover"
              />
            </a>
            <a href="https://claude.com/product/claude-code" target="_blank" rel="noopener noreferrer" className="relative h-6 w-6 overflow-hidden rounded-[4px]">
              <Image
                src="/footer/claude-icon.png"
                alt="Claude Code"
                fill
                sizes="24px"
                className="object-cover"
              />
            </a>
          </div>
          <p className="font-sans text-[14px] font-normal leading-[18px] text-[var(--text-tertiary)]">
            Changelog: {lastUpdate}
          </p>
        </div>
      </div>
    </footer>
  );
}
