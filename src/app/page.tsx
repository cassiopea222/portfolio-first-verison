import FooterNote from "@/components/FooterNote";
import IntroSection from "@/components/IntroSection";
import ProjectsGrid from "@/components/ProjectsGrid";
// import SideWork from "@/components/SideWork";

export default function Home() {
  return (
    <>
      <IntroSection />
      <ProjectsGrid />
      {/* <SideWork /> */}
      <FooterNote />
    </>
  );
}
