"use client";

import { AnimatedSection } from "@/components/AnimatedSection";

const items = [
  { icon: "</>" , label: "Clean Architecture" },
  { icon: "{}",   label: "AI-Native Solutions" },
  { icon: ">>",   label: "Rapid Delivery" },
  { icon: "~~",   label: "Scalable & Secure" },
];

export function TrustStrip() {
  return (
    <section className="py-10 md:py-12 bg-og-bg-alt border-y border-og-border">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((item, i) => (
            <AnimatedSection key={item.label} delay={i * 0.1} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-og-accent/8 border border-og-accent/15 flex items-center justify-center shrink-0">
                <span className="text-og-accent text-[13px] font-mono font-bold">{item.icon}</span>
              </div>
              <p className="text-[13px] md:text-[14px] text-og-text font-mono tracking-[-0.01em] font-medium">
                {item.label}
              </p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
