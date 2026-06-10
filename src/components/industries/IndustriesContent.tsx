"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  ArrowRight,
  X,
  ShoppingCart,
  Building2,
  Landmark,
  Gamepad2,
  Hotel,
  Rocket,
  GraduationCap
} from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";

const industries = [
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1760564877804-5012c55dec9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjByZXRhaWwlMjBvbmxpbmUlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NzIzNjIxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Digital solutions for modern retail.",
    challenges: ["Complex inventory management", "Multi-channel sales coordination", "Customer experience optimization"],
    solution: "Custom e-commerce platforms, marketplace integrations, and AI-powered recommendation engines that drive conversion."
  },
  {
    id: "corporate",
    name: "Corporate Services",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1758518726741-6451f7f71348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlc3xlbnwxfHx8fDE3NzIzNjIxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Technology for corporate service providers.",
    challenges: ["Manual document processing", "Client communication overhead", "Compliance tracking complexity"],
    solution: "Client portals, automated onboarding workflows, and document management systems built for efficiency."
  },
  {
    id: "financial",
    name: "Financial Services",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1758519292135-2af0ad50f552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBzZXJ2aWNlcyUyMGZpbnRlY2glMjBiYW5raW5nfGVufDF8fHx8MTc3MjM2MjEzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Fintech solutions for Malta's financial sector.",
    challenges: ["Regulatory compliance demands", "Legacy system modernization", "Data security requirements"],
    solution: "Secure dashboards, reporting tools, and API integrations with existing banking and financial infrastructure."
  },
  {
    id: "igaming",
    name: "iGaming",
    icon: Gamepad2,
    image: "https://images.unsplash.com/photo-1551822737-0a4066884606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpR2FtaW5nJTIwY2FzaW5vJTIwZGlnaXRhbCUyMGdhbWluZ3xlbnwxfHx8fDE3NzIzNjIxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Technology for Malta's iGaming industry.",
    challenges: ["High-performance requirements", "Player experience optimization", "Compliance & responsible gaming"],
    solution: "Scalable platforms, player analytics dashboards, and real-time data systems for the gaming industry."
  },
  {
    id: "hospitality",
    name: "Hospitality",
    icon: Hotel,
    image: "https://images.unsplash.com/photo-1772127822607-2343696cf82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGhvc3BpdGFsaXR5JTIwcmVzb3J0fGVufDF8fHx8MTc3MjM2MjEzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Digital transformation for hospitality.",
    challenges: ["Booking system fragmentation", "Guest communication gaps", "Operational inefficiency"],
    solution: "Integrated booking systems, guest portals, and AI-powered chatbots for seamless hospitality experiences."
  },
  {
    id: "startups",
    name: "Startups",
    icon: Rocket,
    image: "https://images.unsplash.com/photo-1759752393882-1b6587a7c887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVjaG5vbG9neSUyMHdvcmtzcGFjZSUyMG1vZGVybnxlbnwxfHx8fDE3NzIzNjIxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "Technical co-pilot for startups.",
    challenges: ["Limited technical resources", "Need for rapid prototyping", "Scaling infrastructure"],
    solution: "MVP development, scalable architecture, and ongoing technical partnership to grow your startup."
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1762330917056-e69b34329ddf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjB0ZWNobm9sb2d5JTIwZWxlYXJuaW5nJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzIzNjIxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    headline: "EdTech solutions for modern learning.",
    challenges: ["Student engagement challenges", "Content management complexity", "Assessment & analytics needs"],
    solution: "E-learning platforms, student portals, and AI-powered assessment tools for educational institutions."
  }
];

export function IndustriesContent() {
  const [selected, setSelected] = useState<typeof industries[0] | null>(null);

  return (
    <div>
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-[clamp(36px,5vw,64px)] tracking-[-0.03em] text-og-text mb-6 font-bold leading-tight">
              Built for <span className="text-og-accent">your</span> industry.
            </h1>
            <p className="text-[18px] text-og-text-secondary font-normal">
              Technology solutions tailored to Malta's key industries.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {industries.map((industry, i) => (
              <AnimatedSection key={industry.id} delay={i * 0.08}>
                <button onClick={() => setSelected(industry)} className="w-full text-left cursor-pointer">
                  <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/70" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                      <div className="flex items-center gap-2">
                        <industry.icon size={18} className="text-og-accent shrink-0" />
                        <span className="text-[18px] md:text-[22px] text-white tracking-[-0.02em] font-semibold">
                          {industry.name}
                        </span>
                      </div>
                      <ArrowRight size={16} className="text-white/70 group-hover:text-white transition-colors shrink-0" />
                    </div>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-og-surface rounded-2xl max-w-[600px] w-full max-h-[80vh] overflow-y-auto border border-og-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[200px] overflow-hidden rounded-t-2xl">
                <ImageWithFallback src={selected.image} alt={selected.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
                <div className="absolute bottom-4 left-6">
                  <div className="flex items-center gap-2 mb-1">
                    <selected.icon size={18} className="text-og-accent" />
                    <span className="text-[24px] text-white tracking-[-0.02em] font-bold">{selected.name}</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-[20px] text-og-text mb-6 font-semibold">{selected.headline}</h3>
                <div className="mb-6">
                  <p className="text-[13px] text-og-text-secondary uppercase tracking-wider mb-3 font-semibold">
                    Challenges
                  </p>
                  <div className="space-y-2">
                    {selected.challenges.map((challenge, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-og-border last:border-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--og-destructive)]" />
                        <span className="text-[14px] text-og-text font-normal">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <p className="text-[13px] text-og-text-secondary uppercase tracking-wider mb-3 font-semibold">
                    Sourcecode Solution
                  </p>
                  <div className="bg-[var(--og-accent-muted)] rounded-xl p-4 border border-og-accent/10">
                    <p className="text-[14px] text-og-text leading-relaxed font-normal">{selected.solution}</p>
                  </div>
                </div>
                <Link
                  href="/apply"
                  onClick={() => setSelected(null)}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-full bg-og-accent text-[#09090F] font-bold text-[15px] no-underline transition-all duration-300 hover:bg-og-accent-hover"
                >
                  Book Consultation <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-6 font-bold">
              Don't see your industry?
            </h2>
            <p className="text-[17px] text-og-text-secondary mb-8 font-normal">
              We work with businesses across all sectors. Let's talk.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-og-accent text-[#09090F] font-bold text-[15px] no-underline transition-all duration-300 hover:bg-og-accent-hover hover:shadow-[0_0_30px_var(--og-accent-glow)]"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
