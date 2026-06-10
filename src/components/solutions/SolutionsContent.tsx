"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  ChevronDown,
  Globe,
  Lock,
  Zap,
  Bot,
  Monitor,
  Cpu,
  MessageSquare,
  Workflow,
  BarChart3,
  ArrowRight,
  Smartphone,
  Layers,
  ShoppingCart,
  Search,
  Gauge,
  RefreshCw,
  Apple,
  Play
} from "lucide-react";
import { CodeEditorIllustration } from "@/components/CodeEditorIllustration";
import { AIAutomationIllustration } from "@/components/AIAutomationIllustration";
import { WorkflowIllustration } from "@/components/WorkflowIllustration";

interface AccordionItem {
  title: string;
  content: string;
}

function ExpandableAccordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="border border-og-border rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left bg-og-surface hover:bg-og-surface-hover transition-colors cursor-pointer"
          >
            <span className="text-[14px] text-og-text font-medium">{item.title}</span>
            <ChevronDown
              size={16}
              className={`text-og-text-secondary transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-[14px] text-og-text-secondary leading-relaxed font-normal">
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function SolutionsContent() {
  return (
    <div>
      {/* Hero */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <AnimatedSection className="text-center max-w-[700px] mx-auto">
            <h1 className="text-[clamp(36px,5vw,64px)] tracking-[-0.03em] text-og-text mb-6 font-bold leading-tight">
              Everything you need.
              <br />
              <span className="text-og-accent">Built to scale.</span>
            </h1>
            <p className="text-[18px] text-og-text-secondary font-normal">
              Custom software, AI automation, and digital solutions for ambitious businesses.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Website Design & Development */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <WebMobileContent />
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-og-surface rounded-2xl shadow-[0_20px_60px_var(--og-shadow)] border border-og-border overflow-hidden">
                <CodeEditorIllustration />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* AI & Automation */}
      <section className="py-14 md:py-20 bg-og-cinematic-bg relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-og-accent/5 blur-[120px]" />
        <div className="max-w-[1200px] mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                <AIAutomationIllustration />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-og-accent/20 mb-6">
                <Bot size={22} className="text-og-accent" strokeWidth={1.5} />
              </div>
              <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-white mb-6 font-bold leading-tight">
                AI & Automation Solutions
              </h2>
              <div className="space-y-4">
                {[
                  "AI chatbots for customer support & lead generation",
                  "WhatsApp & email automation systems",
                  "AI-powered recommendation engines",
                  "Process automation & smart internal assistants"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-og-accent" />
                    <span className="text-[15px] text-white/70 font-normal">{text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Custom Software */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <AnimatedSection className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--og-accent-muted)] mb-6 mx-auto">
              <Monitor size={22} className="text-og-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-4 font-bold">
              Custom Software Development
            </h2>
            <p className="text-[17px] text-og-text-secondary font-normal">
              Tailored solutions for every business need.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Cpu, label: "Internal Dashboards", desc: "Custom admin & operations panels" },
                { icon: MessageSquare, label: "Client Portals", desc: "Self-service customer platforms" },
                { icon: Workflow, label: "CRM Systems", desc: "Sales & relationship management" },
                { icon: BarChart3, label: "Business Intelligence", desc: "Analytics & reporting tools" }
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-og-surface rounded-2xl p-6 border border-og-border hover:border-og-accent/20 hover:shadow-[0_8px_30px_var(--og-shadow)] transition-all duration-300"
                >
                  <item.icon size={24} className="text-og-accent mb-4" strokeWidth={1.5} />
                  <p className="text-[15px] text-og-text mb-1 font-semibold">{item.label}</p>
                  <p className="text-[13px] text-og-text-secondary font-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Workflow & Data */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--og-accent-muted)] mb-6">
                <Workflow size={22} className="text-og-accent" strokeWidth={1.5} />
              </div>
              <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-6 font-bold leading-tight">
                Automation & Workflow Engineering
              </h2>
              <p className="text-[17px] text-og-text-secondary mb-8 font-normal">
                Eliminate repetitive tasks and streamline your operations.
              </p>
              <div className="flex flex-col gap-3">
                {["Email automation & lead funnels", "Vendor onboarding systems", "Multi-platform integrations", "ERP & CRM connectors"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--og-accent-muted)] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="var(--og-accent)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[15px] text-og-text font-normal">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="bg-og-surface rounded-2xl shadow-[0_20px_60px_var(--og-shadow)] border border-og-border overflow-hidden">
                <WorkflowIllustration />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--og-accent-muted)] mb-6 mx-auto">
              <BarChart3 size={22} className="text-og-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-6 font-bold">
              Let's Build Something Great
            </h2>
            <p className="text-[17px] text-og-text-secondary mb-10 font-normal">
              Tell us about your project and get a free strategy consultation.
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

function WebMobileContent() {
  const [tab, setTab] = useState<"web" | "mobile">("web");
  const webFeatures = [
    { icon: ShoppingCart, text: "Corporate websites & e-commerce platforms" },
    { icon: Search, text: "High-performance, SEO-optimized builds" },
    { icon: Layers, text: "Custom UX/UI with marketplace capabilities" },
    { icon: Gauge, text: "Core Web Vitals & lighthouse-optimised" }
  ];
  const mobileFeatures = [
    { icon: Smartphone, text: "Native iOS & Android app development" },
    { icon: RefreshCw, text: "Cross-platform React Native solutions" },
    { icon: Layers, text: "Pixel-perfect UI/UX for every screen size" },
    { icon: Zap, text: "Push notifications, offline mode & deep links" }
  ];
  const webFAQ = [
    {
      title: "What platforms do you build on?",
      content:
        "We build with React, Next.js, WordPress, and custom frameworks depending on your needs. Every solution is mobile-first and performance-optimized."
    },
    {
      title: "Timeline for a typical website?",
      content:
        "A standard corporate website takes 4–6 weeks. E-commerce platforms and marketplaces take 8–12 weeks depending on complexity."
    },
    {
      title: "Do you provide ongoing support?",
      content:
        "Yes. We offer ongoing maintenance, hosting management, and feature updates to keep your digital presence sharp."
    }
  ];
  const mobileFAQ = [
    {
      title: "Do you build for both iOS and Android?",
      content:
        "Yes. We deliver native iOS (Swift) and Android (Kotlin) apps, or cross-platform solutions using React Native — depending on your audience and budget."
    },
    {
      title: "How long does an app take to build?",
      content:
        "An MVP mobile app typically takes 8–12 weeks. Feature-rich consumer apps or enterprise solutions can take 14–20 weeks."
    },
    {
      title: "Will you publish the app to the stores?",
      content:
        "Absolutely. We handle App Store and Google Play submission, metadata, screenshots, and post-launch update cycles."
    }
  ];
  const isWeb = tab === "web";

  return (
    <>
      {/* Icon + tab switcher */}
      <div className="flex items-center gap-4 mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--og-accent-muted)] shrink-0">
          {isWeb ? (
            <Globe size={22} className="text-og-accent" strokeWidth={1.5} />
          ) : (
            <Smartphone size={22} className="text-og-accent" strokeWidth={1.5} />
          )}
        </div>
        <div className="flex items-center gap-1 p-1 rounded-xl bg-og-bg-alt border border-og-border">
          {(["web", "mobile"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative px-4 py-1.5 rounded-lg text-[13px] transition-colors duration-200 cursor-pointer"
              style={{
                fontWeight: tab === t ? 600 : 400,
                color: tab === t ? "var(--og-accent)" : "var(--og-text-secondary)"
              }}
            >
              {tab === t && (
                <motion.span
                  layoutId="web-mobile-tab-pill"
                  className="absolute inset-0 rounded-lg bg-[var(--og-accent-muted)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                {t === "web" ? <Globe size={13} /> : <Smartphone size={13} />}
                {t === "web" ? "Website" : "Mobile App"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Heading */}
      <AnimatePresence mode="wait">
        <motion.h2
          key={tab + "-heading"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="text-[clamp(26px,3.5vw,40px)] tracking-[-0.03em] text-og-text mb-6 font-bold"
        >
          {isWeb ? "Website Design & Development" : "Mobile App Design & Development"}
        </motion.h2>
      </AnimatePresence>

      {/* Feature list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab + "-features"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22 }}
          className="space-y-3 mb-8"
        >
          {(isWeb ? webFeatures : mobileFeatures).map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--og-accent-muted)] flex items-center justify-center shrink-0">
                <item.icon size={15} className="text-og-accent" />
              </div>
              <span className="text-[15px] text-og-text font-normal">{item.text}</span>
            </div>
          ))}
          {!isWeb && (
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-og-border bg-og-bg-alt">
                <Apple size={13} className="text-og-text-secondary" />
                <span className="text-[12px] text-og-text-secondary font-medium">App Store</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-og-border bg-og-bg-alt">
                <Play size={12} className="text-og-text-secondary" />
                <span className="text-[12px] text-og-text-secondary font-medium">Google Play</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* FAQ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab + "-faq"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ExpandableAccordion items={isWeb ? webFAQ : mobileFAQ} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
