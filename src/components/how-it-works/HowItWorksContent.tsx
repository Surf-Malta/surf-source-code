"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  ArrowRight,
  Lightbulb,
  PenTool,
  Code,
  TestTube,
  Rocket,
  Headphones,
  CheckCircle2,
  Clock,
  Shield,
  BarChart3
} from "lucide-react";

const timeline = [
  { step: "01", title: "Discovery & Strategy", desc: "We understand your business, goals, and challenges.", time: "1-2 weeks", icon: Lightbulb },
  { step: "02", title: "System Architecture", desc: "Technical planning, database design, and infrastructure.", time: "1 week", icon: Code },
  { step: "03", title: "UX/UI Design", desc: "Wireframes, prototypes, and visual design.", time: "2-3 weeks", icon: PenTool },
  { step: "04", title: "Development", desc: "Agile sprints with regular demos and feedback.", time: "4-8 weeks", icon: TestTube },
  { step: "05", title: "Launch & Support", desc: "Testing, deployment, and ongoing optimization.", time: "Ongoing", icon: Rocket }
];

export function HowItWorksContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div>
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative py-14 md:py-20 bg-og-bg text-center"
      >
        <div className="max-w-[800px] mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(36px,5vw,64px)] tracking-[-0.03em] text-og-text mb-6 font-bold leading-tight"
          >
            From idea to<br />
            <span className="text-og-accent">live product.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[18px] text-og-text-secondary font-normal"
          >
            A structured, transparent process designed for results.
          </motion.p>
        </div>
      </motion.section>

      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-4 font-bold">
              The journey.
            </h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-og-accent/50 via-og-accent/20 to-transparent" />
            {timeline.map((item, i) => (
              <AnimatedSection
                key={item.step}
                delay={i * 0.1}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <div className={`bg-og-surface rounded-2xl p-6 border border-og-border shadow-[0_4px_20px_var(--og-shadow)] inline-block ${i % 2 === 0 ? "md:ml-auto" : ""}`}>
                    <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                      <span className="text-[32px] text-og-accent/20 tracking-[-0.04em] font-extrabold">{item.step}</span>
                      <div className="w-10 h-10 rounded-xl bg-[var(--og-accent-muted)] flex items-center justify-center">
                        <item.icon size={18} className="text-og-accent" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="text-[18px] text-og-text mb-1 font-semibold">{item.title}</h3>
                    <p className="text-[14px] text-og-text-secondary mb-2 font-normal">{item.desc}</p>
                    <div className="flex items-center gap-1.5 justify-start md:justify-normal">
                      <Clock size={12} className="text-og-accent" />
                      <span className="text-[12px] text-og-accent font-medium">{item.time}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-og-accent border-4 border-og-bg shadow-sm z-10" />
                <div className="hidden md:block flex-1" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-4 font-bold">
              What sets us apart.
            </h2>
            <p className="text-[17px] text-og-text-secondary font-normal">
              The principles behind every project.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Documentation & Security", desc: "Every project is documented, version-controlled, and security-audited." },
              { icon: CheckCircle2, title: "Scalable Architecture", desc: "Systems designed to grow with your business, not hold it back." },
              { icon: BarChart3, title: "Long-term Thinking", desc: "We plan for where your business is going, not just where it is." }
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-og-surface rounded-2xl p-8 border border-og-border text-center hover:shadow-[0_8px_30px_var(--og-shadow)] transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--og-accent-muted)] flex items-center justify-center mx-auto mb-6">
                    <item.icon size={24} className="text-og-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[18px] text-og-text mb-3 font-semibold">{item.title}</h3>
                  <p className="text-[14px] text-og-text-secondary leading-relaxed font-normal">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="w-14 h-14 rounded-2xl bg-[var(--og-accent-muted)] flex items-center justify-center mx-auto mb-6">
              <Headphones size={24} className="text-og-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-4 font-bold">
              Ongoing support & scaling.
            </h2>
            <p className="text-[17px] text-og-text-secondary mb-8 max-w-[450px] mx-auto font-normal">
              Dedicated project management, continuous optimization, and technical support as your business grows.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-og-accent text-[#09090F] font-bold text-[15px] no-underline transition-all duration-300 hover:bg-og-accent-hover hover:shadow-[0_0_30px_var(--og-accent-glow)]"
            >
              Start a Conversation <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
