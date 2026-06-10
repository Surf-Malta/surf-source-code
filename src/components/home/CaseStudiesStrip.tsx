"use client";

import Link from "next/link";
import { AnimatedSection } from "../AnimatedSection";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

const featured = [
  {
    slug: "malta-grand-hotel",
    title: "Malta Grand Hotel",
    category: "Hospitality",
    tagline: "Booking platform & guest portal",
    image: "https://images.unsplash.com/photo-1663147737123-9cbd239fc3b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGJvb2tpbmclMjB3ZWJzaXRlJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MjM2Mzk1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat: "+68%",
    statLabel: "Online bookings",
  },
  {
    slug: "island-market",
    title: "Island Market",
    category: "E-Commerce",
    tagline: "Multi-vendor marketplace with AI search",
    image: "https://images.unsplash.com/photo-1768987439382-894ea4e2a736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBtYXJrZXRwbGFjZSUyMHBsYXRmb3JtJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MjM2Mzk1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat: "3x",
    statLabel: "Revenue growth",
  },
  {
    slug: "apex-financial",
    title: "Apex Financial",
    category: "Financial Services",
    tagline: "Compliance dashboard & reporting suite",
    image: "https://images.unsplash.com/photo-1748609160056-7b95f30041f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhbmFseXRpY3MlMjBkYXNoYm9hcmQlMjBtb2Rlcm58ZW58MXx8fHwxNzcyMjkyNDk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stat: "-40%",
    statLabel: "Reporting time",
  },
];

export function CaseStudiesStrip() {
  return (
    <section className="py-14 md:py-20 bg-og-bg">
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2
              className="text-[clamp(28px,4vw,48px)] tracking-[-0.03em] text-og-text mb-2 font-bold"
            >
              Our work speaks.
            </h2>
            <p
              className="text-[17px] text-og-text-secondary font-normal"
            >
              Selected projects from our portfolio.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[15px] text-og-accent no-underline hover:gap-3 transition-all duration-300 font-medium"
          >
            View all projects <ArrowRight size={16} />
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.12}>
              <Link href={`/portfolio/${project.slug}`} className="no-underline group block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  {/* Stat badge */}
                  <div className="absolute top-4 right-4 bg-white/15 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20">
                    <span
                      className="text-[14px] text-white font-bold"
                    >
                      {project.stat}
                    </span>
                    <span
                      className="text-[11px] text-white/70 ml-1 font-normal"
                    >
                      {project.statLabel}
                    </span>
                  </div>
                  {/* Hover arrow */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight size={14} className="text-white" />
                  </div>
                </div>
                <div>
                  <span
                    className="text-[12px] text-og-accent uppercase tracking-wider font-medium"
                  >
                    {project.category}
                  </span>
                  <h3
                    className="text-[20px] text-og-text mt-1 mb-1 tracking-[-0.02em] font-semibold"
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-[14px] text-og-text-secondary font-normal"
                  >
                    {project.tagline}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
