import CaseStudyLayout from "@/components/projects/CaseStudyLayout";
import CaseStudyToC from "@/components/projects/CaseStudyToC";
import type { ProjectRecord } from "@/lib/projects";

type ProjectCaseSkeletonProps = {
  project: ProjectRecord;
};

export default function ProjectCaseSkeleton({ project }: ProjectCaseSkeletonProps) {
  return (
    <CaseStudyLayout
      backHref="/"
      sidebar={<CaseStudyToC sections={[]} backHref="/" />}
    >
      <div className="flex w-full flex-col gap-10">

        <header className="flex flex-col gap-4">
          <h1
            className="text-[32px] font-medium leading-[1.25] tracking-[-0.01em] text-[var(--text-primary)] max-[809px]:text-[26px] max-[809px]:leading-9"
            style={{ fontFamily: "var(--font-crimson), serif" }}
          >
            {project.name} {project.subtitle}
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
              <h2 className="text-[22px] font-medium leading-8 text-[var(--text-primary)]">{section}</h2>
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
    </CaseStudyLayout>
  );
}
