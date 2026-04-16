import { notFound } from "next/navigation";
import BetaTestingPlatformCaseStudy from "@/components/projects/BetaTestingPlatformCaseStudy";
import FitnessCaseStudy from "@/components/projects/FitnessCaseStudy";
import RoleManagementCaseStudy from "@/components/projects/RoleManagementCaseStudy";
import ProjectCaseSkeleton from "@/components/projects/ProjectCaseSkeleton";
import { getProjectBySlug, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "fitness-app-redesign") {
    return <FitnessCaseStudy />;
  }

  if (project.slug === "beta-testing-platform-ajax") {
    return <BetaTestingPlatformCaseStudy />;
  }

  if (project.slug === "role-management-system") {
    return <RoleManagementCaseStudy />;
  }

  return <ProjectCaseSkeleton project={project} />;
}
