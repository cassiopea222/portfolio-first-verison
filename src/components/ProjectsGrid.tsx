import ProjectCard from "./ProjectCard";
import { projects as defaultProjects, type ProjectRecord } from "@/lib/projects";

export type Project = ProjectRecord;

type ProjectsGridProps = {
  projects?: Project[];
};

export default function ProjectsGrid({ projects = defaultProjects }: ProjectsGridProps) {
  return (
    <section id="work" className="mx-auto w-full max-w-[900px] fluid-px pb-[60px]">
      <h2 className="mb-6 font-sans text-[24px] font-medium leading-[32px] text-[var(--text-secondary)]">
        Selected work
      </h2>
      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={`${project.title}-${index}`}
            title={project.title}
            dateRange={project.dateRange}
            tags={project.tags}
            description={project.description}
            cover={project.cover}
            href={project.status === "ready" ? `/projects/${project.slug}` : undefined}
          />
        ))}
      </div>
    </section>
  );
}
