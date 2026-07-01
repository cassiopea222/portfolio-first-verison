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
      {/* TOC zone — col 1, shown only at ≥1200px */}
      <aside className="hidden min-[1200px]:flex justify-end pr-10">
        {sidebar}
      </aside>

      {/* Content zone — always col 2 */}
      <div className="col-start-2 min-w-0">
        {/* Mobile/tablet go-back — hidden when sidebar is visible */}
        <div className="mb-10 min-[1200px]:hidden">
          <Link
            href={backHref}
            className="type-body inline-flex w-fit items-center gap-2 rounded-xl border border-[#dadada] bg-[linear-gradient(179.23deg,#fff_4.27%,rgba(231,231,231,0.7)_98.14%)] px-3 py-2 text-[var(--text-secondary)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)] transition-[background-color,border-color,color] duration-200 ease-out hover:border-[#d5d5d5] hover:bg-[#efefef] hover:text-[var(--text-primary)]"
          >
            <ArrowBackNavIcon />
            Go back
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}
