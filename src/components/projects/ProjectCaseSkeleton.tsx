import Link from "next/link";
import type { ProjectRecord } from "@/lib/projects";

type ProjectCaseSkeletonProps = {
  project: ProjectRecord;
};

export default function ProjectCaseSkeleton({ project }: ProjectCaseSkeletonProps) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-[120px] pt-[120px] md:px-14 lg:px-[320px]">
      <div className="flex max-w-[800px] flex-col gap-10">
        <Link
          href="/"
          className="type-body inline-flex w-fit items-center gap-2 rounded-xl border border-[#dadada] bg-[linear-gradient(179.23deg,#fff_4.27%,rgba(231,231,231,0.7)_98.14%)] px-3 py-2 text-[var(--text-secondary)] shadow-[0px_2px_3px_0px_rgba(0,0,0,0.06)] transition-[background-color,border-color,color] duration-200 ease-out hover:border-[#d5d5d5] hover:bg-[#efefef] hover:text-[var(--text-primary)]"
        >
          <span aria-hidden>←</span>
          Go back
        </Link>

        <header className="flex flex-col gap-4">
          <h1
            className="text-[32px] font-medium leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] max-[809px]:text-[26px] max-[809px]:leading-9"
            style={{ fontFamily: "var(--font-crimson), serif" }}
          >
            {project.title}
          </h1>
          <p className="type-body text-[var(--text-secondary)]">
            This case study is not published yet. The page structure is ready so
            content can be dropped in section by section.
          </p>
        </header>

        <div className="grid gap-4">
          <div className="h-[360px] rounded-[20px] bg-[#ececec]" />
          <div className="h-6 w-2/3 rounded-md bg-[#ececec]" />
          <div className="h-6 w-1/2 rounded-md bg-[#ececec]" />
        </div>

        <div className="grid gap-6">
          {["Context", "Tasks", "Solution", "Results"].map((section) => (
            <article key={section} className="flex flex-col gap-3">
              <h2 className="type-h3 text-[var(--text-primary)]">{section}</h2>
              <div className="grid gap-2">
                <div className="h-4 w-full rounded bg-[#ececec]" />
                <div className="h-4 w-[92%] rounded bg-[#ececec]" />
                <div className="h-4 w-[88%] rounded bg-[#ececec]" />
              </div>
              <div className="mt-2 h-[220px] rounded-[16px] bg-[#ececec]" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
