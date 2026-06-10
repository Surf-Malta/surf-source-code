"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Clock, ArrowRight, Search } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export function BlogContent({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const allCategories = ["All", ...Array.from(new Set(initialPosts.map((p) => p.category)))];

  const filtered = initialPosts.filter((p) => {
    const matchCat = filter === "All" || p.category === filter;
    const matchSearch =
      search.trim() === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredPost = initialPosts[0];

  return (
    <div>
      {/* Hero */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-[clamp(36px,5vw,64px)] tracking-[-0.03em] text-og-text mb-6 font-bold">
              Insights & <span className="text-og-accent">ideas.</span>
            </h1>
            <p className="text-[18px] text-og-text-secondary mb-8 font-normal">
              Thoughts on technology, AI, and engineering better software.
            </p>
            {/* Search bar */}
            <div className="relative max-w-[440px] mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-og-text-secondary" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-og-input-bg border border-og-border text-[15px] text-og-text placeholder:text-og-text-secondary outline-none focus:border-og-accent transition-colors"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="pb-10 bg-og-bg">
          <div className="max-w-[1200px] mx-auto px-6">
            <AnimatedSection delay={0.1}>
              <Link href={`/blog/${featuredPost.slug}`} className="group block no-underline">
                <div className="grid md:grid-cols-2 gap-6 bg-og-surface rounded-2xl border border-og-border overflow-hidden md:max-h-[360px]">
                  <div className="relative aspect-[16/10] md:aspect-auto md:h-[360px] overflow-hidden">
                    <ImageWithFallback
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center md:h-full min-h-0 overflow-hidden">
                    <span className="inline-block px-3 py-1 rounded-full bg-[var(--og-accent-muted)] text-og-accent text-[12px] w-fit mb-3 font-medium">
                      {featuredPost.category}
                    </span>
                    <h2 className="text-[clamp(20px,2.5vw,28px)] text-og-text tracking-[-0.02em] mb-2 group-hover:text-og-accent transition-colors line-clamp-2 font-bold">
                      {featuredPost.title}
                    </h2>
                    <p className="text-[14px] text-og-text-secondary mb-4 line-clamp-2 font-normal">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-og-accent flex items-center justify-center text-[#09090F] font-bold">
                        <span className="text-[11px]">
                          {featuredPost.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-[13px] text-og-text font-semibold">{featuredPost.author}</p>
                        <p className="text-[12px] text-og-text-secondary font-normal">
                          {featuredPost.date} · {featuredPost.readTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      )}

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

      {/* Post Grid */}
      <section className="py-8 md:py-12 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((post, i) => (
                <motion.div
                  key={post.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block no-underline">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] text-white border border-white/20 font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[12px] text-og-text-secondary font-normal">{post.date}</span>
                      <span className="text-og-text-secondary/30">·</span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} className="text-og-text-secondary" />
                        <span className="text-[12px] text-og-text-secondary font-normal">{post.readTime}</span>
                      </span>
                    </div>
                    <h3 className="text-[18px] text-og-text tracking-[-0.02em] mb-2 group-hover:text-og-accent transition-colors font-semibold">
                      {post.title}
                    </h3>
                    <p className="text-[14px] text-og-text-secondary line-clamp-2 font-normal">{post.excerpt}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-6 h-6 rounded-full bg-og-accent flex items-center justify-center text-[#09090F] font-bold">
                        <span className="text-[9px]">
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-[12px] text-og-text-secondary font-normal">{post.author}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[18px] text-og-text-secondary mb-2 font-medium">No articles found</p>
              <p className="text-[14px] text-og-text-secondary font-normal">Try a different search term or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-6 font-bold">
              Want to learn more?
            </h2>
            <p className="text-[17px] text-og-text-secondary mb-8 font-normal">
              Book a free consultation to discuss your project.
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
