"use client";

import Link from "next/link";
import { AnimatedSection } from "../AnimatedSection";
import { ArrowRight, Clock } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import { blogPosts } from "@/lib/data/blogPosts";

const featured = blogPosts.slice(0, 3);

export function BlogStrip() {
  return (
    <section className="py-14 md:py-20 bg-og-bg-alt">
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h2
              className="text-[clamp(28px,4vw,48px)] tracking-[-0.03em] text-og-text mb-2 font-bold"
            >
              Insights & ideas.
            </h2>
            <p
              className="text-[17px] text-og-text-secondary font-normal"
            >
              Thoughts on technology, business, and building smarter systems.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[15px] text-og-accent no-underline hover:gap-3 transition-all duration-300 font-medium"
          >
            View all articles <ArrowRight size={16} />
          </Link>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.12}>
              <Link
                href={`/blog/${post.slug}`}
                className="no-underline group block"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] text-white border border-white/20 font-medium"
                    >
                      {post.category}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[12px] text-og-text-secondary font-normal"
                    >
                      {post.date}
                    </span>
                    <span className="text-og-text-secondary/30">·</span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-og-text-secondary" />
                      <span
                        className="text-[12px] text-og-text-secondary font-normal"
                      >
                        {post.readTime}
                      </span>
                    </span>
                  </div>
                  <h3
                    className="text-[18px] text-og-text tracking-[-0.02em] mb-2 group-hover:text-og-accent transition-colors font-semibold"
                  >
                    {post.title}
                  </h3>
                  <p
                    className="text-[14px] text-og-text-secondary line-clamp-2 font-normal"
                  >
                    {post.excerpt}
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
