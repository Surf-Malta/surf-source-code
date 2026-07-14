import { PortfolioContent } from "@/components/portfolio/PortfolioContent";
import { caseStudies as staticCaseStudies } from "@/lib/data/caseStudies";
import { fetchPublishedPortfolio } from "@/lib/data/publicData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Portfolio | Sourcecode",
  description: "Real projects, real results. See how Sourcecode helps businesses grow with custom software, AI, and digital transformation.",
};

export default async function PortfolioPage() {
  let projects = staticCaseStudies;
  try {
    const dbProjects = await fetchPublishedPortfolio();
    if (dbProjects && dbProjects.length > 0) {
      projects = dbProjects;
    }
  } catch (err) {
    console.error("Error loading portfolio:", err);
  }

  return <PortfolioContent initialProjects={projects} />;
}
