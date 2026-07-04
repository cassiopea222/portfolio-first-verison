export type ProjectStatus = "ready" | "planned";

export type ProjectRecord = {
  slug: string;
  name: string;
  subtitle: string;
  dateRange: string;
  description: string;
  cover: "ajax" | "fitness" | "role" | "governmental";
  status: ProjectStatus;
  /** Excludes this project from the homepage grid without breaking its route. */
  hidden?: boolean;
};

export const projects: ProjectRecord[] = [
  {
    slug: "governmental-platform",
    name: "Governmental Platform",
    subtitle: "Web, Mobile & CMS",
    dateRange: "Feb 2025 - Jun 2026",
    description:
      "Three connected products built for a government organisation in the Arabic-speaking region - a monitoring dashboard, a back-office CMS, and a companion mobile app.",
    cover: "governmental",
    status: "ready",
  },
  {
    slug: "beta-testing-platform-ajax",
    name: "Ajax Systems",
    subtitle: "Beta testing platform",
    dateRange: "May 2025 - July 2025",
    description:
      "Centralized beta testing hub to collect structured feedback faster and make the process transparent for testers.",
    cover: "ajax",
    status: "ready",
  },
  {
    slug: "fitness-app-redesign",
    name: "Sadie Active",
    subtitle: "Fitness app redesign",
    dateRange: "Oct 2023 - Feb 2024",
    description:
      "Mobile fitness app of a fitness influencer, designed solution for Progress dashboard and Workout programs.",
    cover: "fitness",
    status: "ready",
  },
  {
    slug: "role-management-system",
    name: "Role management system",
    subtitle: "for government platform",
    dateRange: "Aug 2025",
    description:
      "Designed the permission architecture and interaction model for a multi-environment government dashboard.",
    cover: "role",
    status: "ready",
    hidden: true,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
