import Link from "next/link";
import { ArrowBackNavIcon } from "@/components/icons/ArrowBackNavIcon";
import type { ReactNode } from "react";

type Props = {
  sidebar: ReactNode;
  backHref?: string;
  children: ReactNode;
};

export default function CaseStudyLayout({ sidebar, backHref = "/", children }: Props) {
  return (
    <div
      className="grid w-full py-[120px] max-[809px]:py-[48px]"
      style={{ gridTemplateColumns: "1fr min(800px, calc(100% - 40px)) 1fr" }}
    >
      {/* TOC zone — col 1, shown only at ≥1240px */}
      <aside className="hidden min-[1240px]:flex justify-end pr-10">
        {sidebar}
      </aside>

      {/* Content zone — always col 2 */}
      <div className="col-start-2 min-w-0">
        {/* Mobile/tablet go-back — hidden when sidebar is visible */}
        <div className="mb-10 min-[1240px]:hidden">
          <Link
            href={backHref}
            className="inline-flex w-fit items-center gap-[6px] font-sans text-[16px] font-medium leading-[20px] text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <ArrowBackNavIcon />
            <span>Go back</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
