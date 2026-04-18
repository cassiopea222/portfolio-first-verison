import ProjectCard from "./ProjectCard";
import { projects as defaultProjects, type ProjectRecord } from "@/lib/projects";

export type Project = ProjectRecord;

type ProjectsGridProps = {
  projects?: Project[];
};

export default function ProjectsGrid({ projects = defaultProjects }: ProjectsGridProps) {
  const topRow = projects.slice(0, 2);
  const remaining = projects.slice(2);

  return (
    <section id="work" className="mx-auto w-full max-w-[1440px] fluid-px-home">
      <h2 className="sr-only">Work</h2>
      <div className="flex flex-col gap-10">
        {/* First row: 2 cards side by side */}
        {topRow.length > 0 && (
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
            {topRow.map((project, index) => (
              <div key={`${project.title}-${index}`} className="flex-1 min-w-0">
                <ProjectCard
                  title={project.title}
                  client={project.client}
                  date={project.date}
                  description={project.description}
                  cover={project.cover}
                  href={project.status === "ready" ? `/projects/${project.slug}` : undefined}
                />
              </div>
            ))}
          </div>
        )}
        {/* Remaining rows: each card at half width */}
        {remaining.length > 0 && (
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-6">
            {remaining.map((project, index) => (
              <div key={`${project.title}-${index}`} className="sm:w-[calc(50%-16px)]">
                <ProjectCard
                  title={project.title}
                  client={project.client}
                  date={project.date}
                  description={project.description}
                  cover={project.cover}
                  href={project.status === "ready" ? `/projects/${project.slug}` : undefined}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
