import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";

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
    // git not available (e.g. some production environments) — fall through
  }

  try {
    const stat = statSync(path.join(process.cwd(), "package.json"));
    return formatDate(stat.mtime);
  } catch {
    return formatDate(new Date());
  }
}

type FooterNoteProps = {
  variant?: "home" | "about";
};

const wrapperClassByVariant: Record<NonNullable<FooterNoteProps["variant"]>, string> = {
  home: "mx-auto flex w-full max-w-[1440px] items-center justify-center pb-10 pt-[60px] min-[810px]:pt-20 fluid-px-home",
  about:
    "mx-auto flex w-full max-w-[1440px] items-center justify-center px-6 pb-10 pt-20 md:px-14 lg:px-[140px]",
};

export default function FooterNote({ variant = "home" }: FooterNoteProps) {
  const lastUpdate = getLastUpdateDate();
  const Wrapper = variant === "about" ? "footer" : "section";

  return (
    <Wrapper className={wrapperClassByVariant[variant]}>
      <div className="flex flex-col items-center justify-center gap-[6px] whitespace-nowrap text-center text-[14px] font-normal leading-5 text-[var(--text-tertiary)]">
        <p>⋆˙⟡ Built with love, Claude Code &amp; Cursor ₊˚❀༉‧₊</p>
        <p>Last updated: {lastUpdate}</p>
      </div>
    </Wrapper>
  );
}
