"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-14 md:py-24 bg-og-code-bg relative overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-og-accent/6 blur-[100px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] bg-[var(--og-secondary)]/8 blur-[80px] rounded-full" />

      <div className="max-w-[800px] mx-auto px-6 text-center relative">
        <AnimatedSection>
          {/* Terminal prompt */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg bg-og-bg border border-og-border font-mono text-[13px]">
            <span className="text-og-accent">$</span>
            <span style={{ color: "var(--og-text-secondary)" }}>sourcecode </span>
            <span style={{ color: "var(--og-text)" }}>new-project</span>
            <span className="w-2 h-4 bg-og-accent rounded-sm animate-pulse" />
          </div>

          <h2 className="text-[clamp(32px,5vw,60px)] tracking-[-0.04em] mb-6 font-extrabold text-white/95">
            Ready to build
            <br />
            <span className="text-og-accent">something great?</span>
          </h2>
          <p className="text-[16px] mb-10 max-w-[380px] mx-auto leading-relaxed font-normal text-white/50">
            Join ambitious companies who trust Sourcecode to ship premium software.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2.5 h-14 px-10 rounded-xl bg-og-accent text-[#09090F] text-[15px] no-underline transition-all duration-300 hover:bg-og-accent-hover hover:shadow-[0_0_50px_var(--og-accent-glow)] font-mono font-bold"
            >
              Start a project
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 h-14 px-10 rounded-xl border text-[15px] no-underline transition-all duration-300 font-mono font-medium text-white/80 border-white/15 hover:bg-white/5 hover:border-og-accent/40"
            >
              How we work
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
