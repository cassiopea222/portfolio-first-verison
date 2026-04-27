export type ProjectStatus = "ready" | "planned";

export type ProjectRecord = {
  slug: string;
  title: string;
  client: string;
  date: string;
  description: string;
  cover: "ajax" | "fitness" | "role";
  status: ProjectStatus;
};

export const projects: ProjectRecord[] = [
  {
    slug: "beta-testing-platform-ajax",
    title: "Beta testing platform",
    client: "Ajax Systems",
    date: "Summer 2025",
    description:
      "Centralized beta testing hub to collect structured feedback faster and make the process transparent for testers.",
    cover: "ajax",
    status: "ready",
  },
  {
    slug: "role-management-system",
    title: "Role management system",
    client: "Gov Services platform",
    date: "August 2025",
    description:
      "Designed the permission architecture and interaction model for a multi-environment government dashboard.",
    cover: "role",
    status: "ready",
  },
  {
    slug: "fitness-app-redesign",
    title: "Fitness App Redesign",
    client: "Sadie Active",
    date: "December 2023",
    description:
      "Mobile fitness app of a fitness influencer, designed solution for Progress dashboard and Workout programs.",
    cover: "fitness",
    status: "ready",
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
