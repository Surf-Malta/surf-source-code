import { PortfolioContent } from "@/components/portfolio/PortfolioContent";
import { caseStudies } from "@/lib/data/caseStudies";

export const metadata = {
  title: "Portfolio | Sourcecode",
  description: "Real projects, real results. See how Sourcecode helps businesses grow with custom software, AI, and digital transformation.",
};

export default function PortfolioPage() {
  return <PortfolioContent initialProjects={caseStudies} />;
}
