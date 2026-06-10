"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Search, ArrowRight, Check, ExternalLink } from "lucide-react";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiWordpress,
  SiPython,
  SiGraphql
} from "react-icons/si";
import { FaAws, FaMicrosoft } from "react-icons/fa";
import type { IconType } from "react-icons";

interface Platform {
  name: string;
  Icon: IconType;
  color: string;
  category: string;
  description: string;
  features: string[];
  setupTime: string;
}

const platforms: Platform[] = [
  {
    name: "React / Next.js",
    Icon: SiNextdotjs,
    color: "#ffffff",
    category: "Frontend",
    description: "Modern, performant web applications with server-side rendering.",
    features: ["Component architecture", "SEO optimized", "Real-time updates"],
    setupTime: "Project-based"
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
    color: "#339933",
    category: "Backend",
    description: "Scalable server-side applications and API development.",
    features: ["RESTful APIs", "GraphQL support", "Real-time websockets"],
    setupTime: "Project-based"
  },
  {
    name: "WordPress",
    Icon: SiWordpress,
    color: "#21759B",
    category: "CMS",
    description: "Content management and corporate website solutions.",
    features: ["Custom themes", "Plugin development", "WooCommerce"],
    setupTime: "2-4 weeks"
  },
  {
    name: "Python / AI",
    Icon: SiPython,
    color: "#3776AB",
    category: "AI & Data",
    description: "Machine learning, data analysis, and AI automation.",
    features: ["NLP & chatbots", "Predictive models", "Data pipelines"],
    setupTime: "Project-based"
  },
  {
    name: "AWS / Cloud",
    Icon: FaAws,
    color: "#FF9900",
    category: "Infrastructure",
    description: "Cloud infrastructure, DevOps, and scalable deployments.",
    features: ["Auto-scaling", "CI/CD pipelines", "Security hardening"],
    setupTime: "Ongoing"
  },
  {
    name: "Dynamics 365",
    Icon: FaMicrosoft,
    color: "#00A4EF",
    category: "ERP",
    description: "ERP integration and business process automation.",
    features: ["Data sync", "Custom modules", "Reporting"],
    setupTime: "4-8 weeks"
  },
  {
    name: "Custom APIs",
    Icon: SiGraphql,
    color: "#E10098",
    category: "Integration",
    description: "Third-party API integrations and custom connectors.",
    features: ["REST & GraphQL", "Webhooks", "Data mapping"],
    setupTime: "1-3 weeks"
  }
];

const categories = ["All", "Frontend", "Backend", "CMS", "AI & Data", "Infrastructure", "ERP", "Integration"];

export function IntegrationsContent() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Platform | null>(null);

  const filtered = platforms.filter((p) => {
    const matchesCategory = filter === "All" || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <h1 className="text-[clamp(36px,5vw,64px)] tracking-[-0.03em] text-og-text mb-6 font-bold leading-tight">
              Our tech stack. <span className="text-og-accent">Your advantage.</span>
            </h1>
            <p className="text-[18px] text-og-text-secondary font-normal">
              We use the best tools for every project.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-8 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-8">
              <div className="relative flex-1 max-w-[400px] w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-og-text-secondary" />
                <input
                  type="text"
                  placeholder="Search technologies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-og-input-bg border border-og-border outline-none text-[15px] text-og-text placeholder:text-og-text-secondary focus:border-og-accent transition-colors"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
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
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-og-bg">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((platform) => (
                <motion.div
                  key={platform.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setSelected(platform)}
                    className="w-full bg-og-surface rounded-2xl p-6 border border-og-border hover:border-og-accent/20 hover:shadow-[0_8px_30px_var(--og-shadow)] transition-all duration-300 text-left cursor-pointer"
                  >
                    <span
                      className="inline-block mb-4 transition-transform duration-300 hover:scale-110"
                      style={{ color: platform.color }}
                    >
                      <platform.Icon size={48} />
                    </span>
                    <p className="text-[16px] text-og-text mb-1 font-semibold">{platform.name}</p>
                    <p className="text-[12px] text-og-text-secondary font-normal">{platform.category}</p>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-og-surface rounded-2xl max-w-[500px] w-full p-8 border border-og-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <span style={{ color: selected.color }}>
                  <selected.Icon size={48} />
                </span>
                <div>
                  <p className="text-[20px] text-og-text font-bold">{selected.name}</p>
                  <p className="text-[13px] text-og-text-secondary font-normal">{selected.category}</p>
                </div>
              </div>
              <p className="text-[15px] text-og-text-secondary mb-6 font-normal">{selected.description}</p>
              <div className="bg-og-bg-alt rounded-xl p-5 mb-6 border border-og-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[13px] text-og-text-secondary uppercase tracking-wider font-semibold">
                    Our Approach
                  </span>
                  <span className="text-[12px] text-og-accent font-semibold">{selected.setupTime}</span>
                </div>
                <div className="flex items-center gap-3">
                  {["Analyze", "Build", "Deploy"].map((step, i) => (
                    <div key={step} className="flex items-center gap-2 flex-1">
                      <div className="w-8 h-8 rounded-full bg-og-accent flex items-center justify-center text-[#09090F] text-[12px] shrink-0 font-bold">
                        {i + 1}
                      </div>
                      <span className="text-[13px] text-og-text font-medium">{step}</span>
                      {i < 2 && <ArrowRight size={12} className="text-og-accent ml-auto hidden md:block shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 mb-8">
                {selected.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check size={14} className="text-og-accent shrink-0" />
                    <span className="text-[14px] text-og-text font-normal">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link
                  href="/apply"
                  onClick={() => setSelected(null)}
                  className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-full bg-og-accent text-[#09090F] font-bold text-[15px] no-underline transition-all duration-300 hover:bg-og-accent-hover"
                >
                  Discuss Project
                </Link>
                <button
                  onClick={() => setSelected(null)}
                  className="h-12 px-6 rounded-full border border-og-border text-og-text-secondary text-[15px] hover:bg-og-surface-hover transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-14 md:py-20 bg-og-bg">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-og-cinematic-bg mb-6 mx-auto">
              <ExternalLink size={24} className="text-og-accent" strokeWidth={1.5} />
            </div>
            <h2 className="text-[clamp(28px,4vw,44px)] tracking-[-0.03em] text-og-text mb-4 font-bold">
              Custom API Development
            </h2>
            <p className="text-[17px] text-og-text-secondary mb-8 font-normal">
              Build custom integrations with any third-party service.
            </p>
            <div className="bg-og-code-bg rounded-2xl p-6 text-left mb-8 overflow-x-auto border border-og-border">
              <div className="flex items-center gap-1.5 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <pre className="text-[13px] leading-relaxed font-mono font-normal">
                <code>
                  <span style={{ color: "var(--og-accent)" }}>POST</span>{" "}
                  <span style={{ color: "var(--og-text-secondary)" }}>/api/v1/automate</span>
                  {"\n\n"}
                  <span style={{ color: "var(--og-text-secondary)" }}>{"{"}</span>
                  {"\n"}
                  {"  "}
                  <span style={{ color: "var(--og-accent)" }}>"workflow"</span>
                  <span style={{ color: "var(--og-text-secondary)" }}>:</span>{" "}
                  <span style={{ color: "#A8FF78" }}>"lead_qualification"</span>
                  <span style={{ color: "var(--og-text-secondary)" }}>,</span>
                  {"\n"}
                  {"  "}
                  <span style={{ color: "var(--og-accent)" }}>"trigger"</span>
                  <span style={{ color: "var(--og-text-secondary)" }}>:</span>{" "}
                  <span style={{ color: "#A8FF78" }}>"form_submit"</span>
                  <span style={{ color: "var(--og-text-secondary)" }}>,</span>
                  {"\n"}
                  {"  "}
                  <span style={{ color: "var(--og-accent)" }}>"ai_enabled"</span>
                  <span style={{ color: "var(--og-text-secondary)" }}>:</span>{" "}
                  <span style={{ color: "#FFB86C" }}>true</span>
                  {"\n"}
                  <span style={{ color: "var(--og-text-secondary)" }}>{"}"}</span>
                </code>
              </pre>
            </div>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-og-accent text-[#09090F] font-bold text-[15px] no-underline transition-all duration-300 hover:bg-og-accent-hover hover:shadow-[0_0_30px_var(--og-accent-glow)]"
            >
              Discuss Your Integration <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
