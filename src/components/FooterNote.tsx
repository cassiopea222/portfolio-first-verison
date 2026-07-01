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

export default function FooterNote() {
  const lastUpdate = getLastUpdateDate();

  return (
    <footer className="mx-auto flex w-full max-w-[900px] fluid-px py-[40px]">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-inconsolata text-[16px] font-medium leading-[24px] text-[var(--text-tertiary)]">
            Built with love by me using
          </span>
          <div className="flex items-center gap-2">
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
        </div>
        <p className="font-inconsolata text-[16px] font-medium leading-[24px] text-[var(--text-tertiary)]">
          Changelog: {lastUpdate}
        </p>
      </div>
    </footer>
  );
}
