export type ProjectStatus = "ready" | "planned";

export type ProjectRecord = {
  slug: string;
  title: string;
  tags: string[];
  description: string;
  cover: "ajax" | "fitness" | "role";
  status: ProjectStatus;
};

export const projects: ProjectRecord[] = [
  {
    slug: "beta-testing-platform-ajax",
    title: "Ajax Systems beta testing platform",
    tags: ["Product Design", "b2b", "Web"],
    description:
      "Centralized beta testing hub to collect structured feedback faster and make the process transparent for testers.",
    cover: "ajax",
    status: "ready",
  },
  {
    slug: "role-management-system",
    title: "Role management system for government platform",
    tags: ["Product Design", "b2g", "Web", "Mobile"],
    description:
      "Designed the permission architecture and interaction model for a multi-environment government dashboard.",
    cover: "role",
    status: "ready",
  },
  {
    slug: "fitness-app-redesign",
    title: "Sadie Active fitness app redesign",
    tags: ["UX/UI Design", "b2c", "Mobile"],
    description:
      "Mobile fitness app of a fitness influencer, designed solution for Progress dashboard and Workout programs.",
    cover: "fitness",
    status: "ready",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
