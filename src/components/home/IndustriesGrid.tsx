"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "../AnimatedSection";
import { ImageWithFallback } from "@/components/ImageWithFallback";

const industries = [
  { name: "E-Commerce", image: "https://images.unsplash.com/photo-1760564877804-5012c55dec9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjByZXRhaWwlMjBvbmxpbmUlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NzIzNjIxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Corporate Services", image: "https://images.unsplash.com/photo-1758518726741-6451f7f71348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlc3xlbnwxfHx8fDE3NzIzNjIxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Financial Services", image: "https://images.unsplash.com/photo-1758519292135-2af0ad50f552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzZXJ2aWNlcyUyMGZpbnRlY2glMjBiYW5raW5nfGVufDF8fHx8MTc3MjM2MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "iGaming", image: "https://images.unsplash.com/photo-1551822737-0a4066884606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpZ2FtaW5nJTIwY2FzaW5vJTIwZGlnaXRhbCUyMGdhbWluZ3xlbnwxfHx8fDE3NzIzNjIxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Hospitality", image: "https://images.unsplash.com/photo-1772127822607-2343696cf82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGhvc3BpdGFsaXR5JTIwcmVzb3J0fGVufDF8fHx8MTc3MjM2MjEzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  { name: "Startups", image: "https://images.unsplash.com/photo-1759752393882-1b6587a7c887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVjaG5vbG9neSUyMHdvcmtzcGFjZSUyMG1vZGVybnxlbnwxfHx8fDE3NzIzNjIxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
];

export function IndustriesGrid() {
  return (
    <section className="py-14 md:py-20 bg-og-bg">
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-[clamp(28px,4vw,48px)] tracking-[-0.03em] text-og-text mb-4 font-bold">
            Industries we serve.
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {industries.map((industry, i) => (
            <AnimatedSection key={industry.name} delay={i * 0.1}>
              <Link href="/industries" className="no-underline">
                <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
                  <ImageWithFallback src={industry.image} alt={industry.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/70" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                    <span className="text-[18px] md:text-[22px] text-white tracking-[-0.02em] font-semibold">{industry.name}</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
