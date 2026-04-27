import FooterNote from "@/components/FooterNote";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsGrid />
      <FooterNote variant="home" />
    </>
  );
}
