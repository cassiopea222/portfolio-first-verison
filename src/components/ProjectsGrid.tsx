import ProjectCard from "./ProjectCard";
import { projects as defaultProjects, type ProjectRecord } from "@/lib/projects";

export type Project = ProjectRecord;

type ProjectsGridProps = {
  projects?: Project[];
};

export default function ProjectsGrid({ projects = defaultProjects }: ProjectsGridProps) {
  return (
    <section id="work" className="mx-auto w-full max-w-[900px] fluid-px pb-[60px]">
      <div className="flex flex-col gap-[70px]">
        {projects
          .filter((project) => !project.hidden)
          .map((project) => (
            <ProjectCard
              key={project.slug}
              name={project.name}
              subtitle={project.subtitle}
              dateRange={project.dateRange}
              description={project.description}
              cover={project.cover}
              href={project.status === "ready" ? `/projects/${project.slug}` : undefined}
            />
          ))}
      </div>
    </section>
  );
}
