import { redirect } from "next/navigation";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowLeft, ArrowRight, Clock, Layers, TrendingUp, Check, Quote } from "lucide-react";
import { caseStudies } from "@/lib/data/caseStudies";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import dbConnect from "@/lib/mongodb";
import Portfolio from "@/lib/models/Portfolio";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const dbProjects = await Portfolio.find({ status: "published" }).select("slug").lean();
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map((project: any) => ({
        slug: project.slug,
      }));
    }
  } catch (err) {
    console.error("generateStaticParams MongoDB fetch failed:", err);
  }
  return caseStudies.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  let project = null;
  try {
    await dbConnect();
    project = await Portfolio.findOne({ slug }).lean();
  } catch {}
  if (!project) {
    project = caseStudies.find((p) => p.slug === slug);
  }

  return {
    title: project ? `${project.title} | Sourcecode Case Study` : "Case Study | Sourcecode",
    description: project ? project.tagline : "Read our premium engineering case studies.",
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let project = null;
  let allProjects = caseStudies;

  try {
    await dbConnect();
    const dbProjects = await Portfolio.find({ status: "published" }).sort({ order: 1 }).lean();
    if (dbProjects && dbProjects.length > 0) {
      allProjects = dbProjects.map((doc: any) => ({
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
      project = allProjects.find((p) => p.slug === slug);
    }
  } catch (err) {
    console.error("MongoDB fetch failed for portfolio item, using static fallback:", err);
  }

  if (!project) {
    project = caseStudies.find((p) => p.slug === slug);
  }

  if (!project) {
    redirect("/portfolio");
  }

  const currentIndex = allProjects.findIndex((cs) => cs.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[340px] md:h-[420px] overflow-hidden flex items-end pb-10">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="w-full h-full absolute inset-0 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute top-6 left-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[14px] text-white/80 no-underline hover:text-white transition-colors bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10"
          >
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 w-full">
          <AnimatedSection>
            <span className="text-[12px] text-og-accent uppercase tracking-wider font-mono font-semibold">
              {project.category}
            </span>
            <h1 className="text-[clamp(32px,5vw,56px)] text-white tracking-[-0.03em] mt-2 mb-2 font-bold">
              {project.title}
            </h1>
            <p className="text-[16px] text-white/70 font-normal">
              {project.client}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Meta Bar */}
      <section className="bg-og-surface border-b border-og-border">
        <div className="max-w-[1200px] mx-auto px-6 py-5">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-og-bg-alt border border-og-border rounded-full px-4 py-2">
              <Clock size={14} className="text-og-accent" />
              <span className="text-[13px] text-og-text font-medium">
                {project.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-og-bg-alt border border-og-border rounded-full px-4 py-2">
              <Layers size={14} className="text-og-accent" />
              <span className="text-[13px] text-og-text font-medium">
                {project.industry}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--og-accent-muted)] border border-og-accent/10 rounded-full px-4 py-2">
              <TrendingUp size={14} className="text-og-accent" />
              <span className="text-[13px] text-og-accent font-bold">
                {project.stat} {project.statLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6">
          {/* Tech Stack */}
          {project.techStack && (
            <AnimatedSection className="mb-12">
              <p className="text-[13px] text-og-text-secondary uppercase tracking-wider mb-4 font-mono font-semibold">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl bg-og-surface text-[14px] text-og-text border border-og-border font-normal"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Challenge */}
          <AnimatedSection className="mb-12" delay={0.1}>
            <p className="text-[13px] text-og-text-secondary uppercase tracking-wider mb-4 font-mono font-semibold">
              The Challenge
            </p>
            <p className="text-[17px] text-og-text leading-relaxed font-normal">
              {project.challenge}
            </p>
          </AnimatedSection>

          {/* Solution */}
          <AnimatedSection className="mb-12" delay={0.15}>
            <p className="text-[13px] text-og-text-secondary uppercase tracking-wider mb-4 font-mono font-semibold">
              Our Solution
            </p>
            <div className="bg-[var(--og-accent-muted)] rounded-2xl p-6 md:p-8 border border-og-accent/10">
              <p className="text-[17px] text-og-text leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </AnimatedSection>

          {/* Results */}
          {project.results && (
            <AnimatedSection className="mb-12" delay={0.2}>
              <p className="text-[13px] text-og-text-secondary uppercase tracking-wider mb-4 font-mono font-semibold">
                Results
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {project.results.map((result: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-og-surface rounded-xl p-4 border border-og-border"
                  >
                    <div className="w-6 h-6 rounded-full bg-og-accent flex items-center justify-center shrink-0 mt-0.5 text-[#09090F]">
                      <Check size={12} className="stroke-[3]" />
                    </div>
                    <span className="text-[15px] text-og-text font-normal">
                      {result}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          )}

          {/* Testimonial */}
          {project.testimonial && (
            <AnimatedSection className="mb-12" delay={0.25}>
              <div className="bg-og-bg-alt rounded-2xl p-8 border border-og-border">
                <Quote size={24} className="text-og-accent mb-4" strokeWidth={1.5} />
                <p className="text-[20px] text-og-text leading-relaxed mb-6 italic tracking-[-0.01em] font-normal">
                  "{project.testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-og-accent flex items-center justify-center text-[#09090F]">
                    <span className="text-[13px] font-bold">
                      {project.testimonial.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-[15px] text-og-text font-semibold">
                      {project.testimonial.name}
                    </p>
                    <p className="text-[13px] text-og-text-secondary font-normal">
                      {project.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Prev/Next Navigation */}
      <section className="bg-og-bg border-t border-og-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-og-border">
            <Link
              href={`/portfolio/${prevProject.slug}`}
              className="group py-8 pr-6 no-underline flex items-center gap-4 cursor-pointer"
            >
              <ArrowLeft size={20} className="text-og-text-secondary group-hover:text-og-accent transition-colors shrink-0 animate-none" />
              <div>
                <p className="text-[12px] text-og-text-secondary uppercase tracking-wider mb-1 font-mono font-semibold">
                  Previous
                </p>
                <p className="text-[17px] text-og-text group-hover:text-og-accent transition-colors tracking-[-0.01em] font-semibold">
                  {prevProject.title}
                </p>
              </div>
            </Link>
            <Link
              href={`/portfolio/${nextProject.slug}`}
              className="group py-8 md:pl-6 no-underline flex items-center gap-4 justify-end text-right cursor-pointer"
            >
              <div>
                <p className="text-[12px] text-og-text-secondary uppercase tracking-wider mb-1 font-mono font-semibold">
                  Next
                </p>
                <p className="text-[17px] text-og-text group-hover:text-og-accent transition-colors tracking-[-0.01em] font-semibold">
                  {nextProject.title}
                </p>
              </div>
              <ArrowRight size={20} className="text-og-text-secondary group-hover:text-og-accent transition-colors shrink-0 animate-none" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
