"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";

interface CaseStudy {
  title: string;
  slug: string;
  category: string;
  image: string;
  stat: string;
  statLabel: string;
  tagline: string;
  duration: string;
  industry: string;
}

export function PortfolioContent({ initialProjects }: { initialProjects: CaseStudy[] }) {
  const [filter, setFilter] = useState("All");

  const allCategories = ["All", ...Array.from(new Set(initialProjects.map((cs) => cs.category)))];

  const filtered =
    filter === "All"
      ? initialProjects
      : initialProjects.filter((cs) => cs.category === filter);

  return (
    <div>
      {/* Hero */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-[clamp(36px,5vw,64px)] tracking-[-0.03em] text-og-text mb-6 font-bold">
              Our <span className="text-og-accent">portfolio.</span>
            </h1>
            <p className="text-[18px] text-og-text-secondary font-normal">
              Real projects. Real results. See how we help Maltese businesses grow.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="pb-10 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "30+", label: "Projects delivered" },
                { value: "98%", label: "Client satisfaction" },
                { value: "7", label: "Industries served" },
                { value: "4.9", label: "Average rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-og-surface rounded-2xl p-6 border border-og-border text-center"
                >
                  <p className="text-[clamp(28px,3vw,36px)] text-og-accent tracking-[-0.03em] font-bold">
                    {stat.value}
                  </p>
                  <p className="text-[13px] text-og-text-secondary mt-1 font-normal">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-6 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <AnimatedSection delay={0.15}>
            <div className="flex gap-2 flex-wrap">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`h-10 px-5 rounded-full text-[13px] transition-all duration-300 cursor-pointer ${
                    filter === cat
                      ? "bg-og-accent text-[#09090F] font-bold"
                      : "bg-og-bg-alt text-og-text-secondary hover:bg-og-surface-hover border border-og-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-8 md:py-12 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="w-full text-left group block no-underline"
                  >
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-og-bg-alt border border-og-border flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                      
                      {/* Premium card design details */}
                      <div className="text-center p-4">
                        <span className="text-[32px] font-mono font-bold text-og-accent block leading-none mb-1">
                          {project.stat}
                        </span>
                        <span className="text-[10px] font-mono text-og-text-secondary uppercase tracking-wider block">
                          {project.statLabel}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 border border-white/20">
                        <span className="text-[12px] text-white font-bold">
                          {project.stat}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <ArrowUpRight size={14} className="text-white" />
                      </div>
                    </div>
                    <span className="text-[12px] text-og-accent uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <h3 className="text-[20px] text-og-text mt-1 mb-1 tracking-[-0.02em] font-semibold group-hover:text-og-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[14px] text-og-text-secondary font-normal line-clamp-2">
                      {project.tagline}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <Clock size={12} className="text-og-text-secondary" />
                        <span className="text-[12px] text-og-text-secondary font-normal">
                          {project.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Layers size={12} className="text-og-text-secondary" />
                        <span className="text-[12px] text-og-text-secondary font-normal">
                          {project.industry}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-6 font-bold">
              Your project could be next.
            </h2>
            <p className="text-[17px] text-og-text-secondary mb-8 font-normal">
              Let's discuss how Sourcecode can help your business grow.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-og-accent text-[#09090F] font-bold text-[15px] no-underline transition-all duration-300 hover:bg-og-accent-hover hover:shadow-[0_0_30px_var(--og-accent-glow)]"
            >
              Book Free Consultation <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
