"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "../AnimatedSection";
import { Lightbulb, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We learn your business, goals, and challenges to define the right solution.",
    icon: Lightbulb,
    codeLines: [
      { tokens: [{ t: "// analyse project requirements", c: "comment" }] },
      { tokens: [{ t: "const", c: "keyword" }, { t: " spec", c: "text" }, { t: " = await", c: "keyword" }, { t: " discover({", c: "text" }] },
      { tokens: [{ t: "  goals:", c: "text" }, { t: " client.objectives", c: "fn" }, { t: ",", c: "text" }] },
      { tokens: [{ t: "  stack:", c: "text" }, { t: " \"optimal\"", c: "str" }, { t: ",", c: "text" }] },
      { tokens: [{ t: "});", c: "text" }] },
      { tokens: [{ t: "> scope defined ✓", c: "ok" }] },
    ],
  },
  {
    number: "02",
    title: "Design & Development",
    description: "UX/UI design, architecture planning, and agile development sprints.",
    icon: PenTool,
    codeLines: [
      { tokens: [{ t: "// sprint iteration 3/6", c: "comment" }] },
      { tokens: [{ t: "function", c: "keyword" }, { t: " Dashboard", c: "fn" }, { t: "() {", c: "text" }] },
      { tokens: [{ t: "  const", c: "keyword" }, { t: " [data] =", c: "text" }, { t: " useData", c: "fn" }, { t: "();", c: "text" }] },
      { tokens: [{ t: "  return", c: "keyword" }, { t: " <UI", c: "fn" }, { t: " data={data} />;", c: "text" }] },
      { tokens: [{ t: "}", c: "text" }] },
      { tokens: [{ t: "> tests: ", c: "dim" }, { t: "28 passing", c: "ok" }, { t: " ✓", c: "ok" }] },
    ],
  },
  {
    number: "03",
    title: "Launch & Scale",
    description: "Testing, optimization, deployment, and ongoing support to grow with you.",
    icon: Rocket,
    codeLines: [
      { tokens: [{ t: "// deploy to production", c: "comment" }] },
      { tokens: [{ t: "$", c: "acc" }, { t: " sourcecode deploy --env", c: "dim" }, { t: " prod", c: "str" }] },
      { tokens: [{ t: "> building...", c: "dim" }] },
      { tokens: [{ t: "> CDN warmed", c: "ok" }, { t: " ✓", c: "ok" }] },
      { tokens: [{ t: "> uptime:", c: "dim" }, { t: " 99.9%", c: "acc" }] },
      { tokens: [{ t: "> live at", c: "dim" }, { t: " production", c: "str" }, { t: " 🚀", c: "text" }] },
    ],
  },
];

const tokenColor: Record<string, string> = {
  keyword: "var(--og-syntax-keyword)",
  fn: "var(--og-syntax-function)",
  str: "var(--og-syntax-string)",
  comment: "var(--og-syntax-comment)",
  number: "var(--og-syntax-number)",
  ok: "#10E898",
  acc: "var(--og-accent)",
  dim: "rgba(180,195,230,0.45)",
  text: "rgba(220,230,255,0.85)",
};

function MiniTerminal({ lines, active }: { lines: typeof steps[0]["codeLines"]; active: boolean }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!active) return;
    setVisible(0);
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= lines.length) clearInterval(t);
    }, 200);
    return () => clearInterval(t);
  }, [active, lines.length]);

  return (
    <div className="mt-6 rounded-xl overflow-hidden border border-white/8" style={{ background: "#040610" }}>
      {/* bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/8" style={{ background: "#070A1A" }}>
        <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <div className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[10px] font-mono" style={{ color: "rgba(180,195,230,0.35)" }}>sourcecode</span>
      </div>
      <div className="p-3 space-y-0.5 min-h-[100px]">
        {lines.slice(0, visible).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="text-[11px] font-mono leading-[1.6]"
          >
            {line.tokens.length === 0 ? "\u00A0" : line.tokens.map((tok, j) => (
              <span key={j} style={{ color: tokenColor[tok.c] || "rgba(220,230,255,0.85)" }}>{tok.t}</span>
            ))}
          </motion.div>
        ))}
        {visible < lines.length && active && (
          <span className="inline-block w-1.5 h-3 rounded-sm bg-og-accent animate-pulse" style={{ verticalAlign: "middle" }} />
        )}
      </div>
    </div>
  );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <AnimatedSection delay={index * 0.15} direction="up">
      <motion.div
        ref={ref}
        className="snap-center shrink-0 w-[300px] md:w-[340px] bg-og-surface rounded-2xl p-8 border border-og-border transition-all duration-300 hover:shadow-[0_10px_40px_var(--og-shadow)] hover:border-[var(--og-accent)]/20"
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-[48px] text-og-accent/20 tracking-[-0.04em] font-extrabold">
            {step.number}
          </span>
          <div className="w-12 h-12 rounded-2xl bg-[var(--og-accent-muted)] flex items-center justify-center">
            <step.icon size={22} className="text-og-accent" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="text-[22px] text-og-text mb-3 tracking-[-0.02em] font-bold">
          {step.title}
        </h3>
        <p className="text-[15px] text-og-text-secondary leading-relaxed font-normal">
          {step.description}
        </p>
        <MiniTerminal lines={step.codeLines} active={isInView} />
      </motion.div>
    </AnimatedSection>
  );
}

export function HowItWorksStrip() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.scrollWidth / steps.length;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-14 md:py-20 bg-og-bg overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-[clamp(28px,4vw,48px)] tracking-[-0.03em] text-og-text mb-4 font-bold">
            How we work. Simple.
          </h2>
        </AnimatedSection>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 px-6 md:px-0 md:justify-center overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} index={i} />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-8 md:hidden">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-og-accent" : "w-2 bg-og-text-secondary/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
