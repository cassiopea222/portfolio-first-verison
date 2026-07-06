export type ProjectStatus = "ready" | "planned";

export type ProjectRecord = {
  slug: string;
  name: string;
  subtitle: string;
  dateRange: string;
  description: string;
  cover: "ajax" | "fitness" | "role" | "governmental" | "governmental-mobile";
  status: ProjectStatus;
  /** Excludes this project from the homepage grid without breaking its route. */
  hidden?: boolean;
};

export const projects: ProjectRecord[] = [
  {
    slug: "governmental-platform-mobile",
    name: "Governmental Platform Mobile",
    subtitle: "Government Monitoring Platform: Mobile app",
    dateRange: "Jan 2026 - Jun 2026",
    description:
      "The mobile side of a three-part government platform - designed natively for daily use by leadership, with its own visual language, design system, and user-tested flows.",
    cover: "governmental-mobile",
    status: "planned",
  },
  {
    slug: "governmental-platform",
    name: "Governmental Platform",
    subtitle: "Government Monitoring Platform: Web (Dashboards & CMS)",
    dateRange: "Feb 2025 - Jun 2026",
    description:
      "Part of a larger government platform - this case covers the web side: a monitoring dashboard, a mirrored dashboard for the Prime Minister's office, and a back-office CMS.",
    cover: "governmental",
    status: "ready",
  },
  {
    slug: "beta-testing-platform-ajax",
    name: "Ajax Systems",
    subtitle: "Ajax Systems Beta testing platform",
    dateRange: "May 2025 - July 2025",
    description:
      "Centralized beta testing hub to collect structured feedback faster and make the process transparent for testers.",
    cover: "ajax",
    status: "ready",
  },
  {
    slug: "fitness-app-redesign",
    name: "Sadie Active",
    subtitle: "Sadie Active Fitness app redesign",
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
