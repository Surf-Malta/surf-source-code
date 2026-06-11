import { PortfolioContent } from "@/components/portfolio/PortfolioContent";
import { caseStudies as staticCaseStudies } from "@/lib/data/caseStudies";
import dbConnect from "@/lib/mongodb";
import Portfolio from "@/lib/models/Portfolio";

export const metadata = {
  title: "Portfolio | Sourcecode",
  description: "Real projects, real results. See how Sourcecode helps businesses grow with custom software, AI, and digital transformation.",
};

export default async function PortfolioPage() {
  let projects = staticCaseStudies;
  try {
    await dbConnect();
    const dbProjects = await Portfolio.find({ status: "published" }).sort({ order: 1 }).lean();
    if (dbProjects && dbProjects.length > 0) {
      projects = dbProjects.map((doc: any) => ({
        title: doc.title,
        slug: doc.slug,
        client: doc.client || "",
        category: doc.category || "",
        industry: doc.industry || "",
        tagline: doc.tagline || "",
        image: doc.image || "",
        stat: doc.stat || "",
        statLabel: doc.statLabel || "",
        duration: doc.duration || "",
        techStack: doc.techStack || [],
        challenge: doc.challenge || "",
        solution: doc.solution || "",
        results: doc.results || [],
        testimonial: doc.testimonial || undefined,
        featured: doc.featured || false,
        order: doc.order || 0,
      }));
    }
  } catch (err) {
    console.error("MongoDB fetch failed for portfolio, using static fallback:", err);
  }

  return <PortfolioContent initialProjects={projects} />;
}
