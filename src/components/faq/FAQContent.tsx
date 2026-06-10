"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Search, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export function FAQContent({ initialFaqs }: { initialFaqs: FAQItem[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const allCategories = ["All", ...Array.from(new Set(initialFaqs.map((f) => f.category)))];

  const filtered = initialFaqs.filter((faq) => {
    const matchesCategory = filter === "All" || faq.category === filter;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-[clamp(36px,5vw,64px)] tracking-[-0.03em] text-og-text mb-6 font-bold">
              Questions? <span className="text-og-accent">Answers.</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-8 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6">
          <AnimatedSection delay={0.1}>
            <div className="relative mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-og-text-secondary" />
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-og-input-bg border border-og-border outline-none text-[16px] text-og-text placeholder:text-og-text-secondary focus:border-og-accent transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`h-9 px-4 rounded-full text-[13px] transition-all duration-300 cursor-pointer ${
                    filter === cat
                      ? "bg-og-accent text-[#09090F] font-semibold"
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

      <section className="py-8 md:py-12 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <AnimatedSection key={i} delay={Math.min(i * 0.05, 0.3)}>
                <div className="bg-og-surface rounded-2xl border border-og-border overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-start justify-between p-5 text-left hover:bg-og-surface-hover transition-colors cursor-pointer"
                  >
                    <div className="flex-1 pr-4">
                      <span className="text-[15px] text-og-text leading-snug font-medium">{faq.question}</span>
                      <span className="block text-[12px] text-og-accent mt-1 font-medium">{faq.category}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-og-text-secondary mt-0.5 shrink-0 transition-transform duration-300 ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-og-border pt-4">
                          <p className="text-[14px] text-og-text-secondary leading-relaxed font-normal">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </AnimatedSection>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[17px] text-og-text-secondary font-normal">No matching questions found.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-6 font-bold">
              Still have questions?
            </h2>
            <p className="text-[17px] text-og-text-secondary mb-8 font-normal">Our team is here to help.</p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-og-accent text-[#09090F] font-bold text-[15px] no-underline transition-all duration-300 hover:bg-og-accent-hover hover:shadow-[0_0_30px_var(--og-accent-glow)]"
            >
              Contact Us
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
