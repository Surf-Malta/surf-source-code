"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { AnimatedSection } from "../AnimatedSection";

// Generated automation code lines (streamed progressively)
const generatedCodeLines = [
  [{ t: "// ✦ AI-generated automation flow", c: "cm" }],
  [],
  [{ t: "async function", c: "kw" }, { t: " qualifyLead", c: "fn" }, { t: "(lead: Lead) {", c: "tx" }],
  [{ t: "  const", c: "kw" }, { t: " score =", c: "tx" }, { t: " await", c: "kw" }, { t: " ai.score", c: "fn" }, { t: "(lead);", c: "tx" }],
  [{ t: "  if", c: "kw" }, { t: " (score > ", c: "tx" }, { t: "0.8", c: "nm" }, { t: ") {", c: "tx" }],
  [{ t: "    await", c: "kw" }, { t: " crm.tag", c: "fn" }, { t: "(lead, ", c: "tx" }, { t: '"hot"', c: "st" }, { t: ");", c: "tx" }],
  [{ t: "    notify", c: "fn" }, { t: "(", c: "tx" }, { t: '"sales-team"', c: "st" }, { t: ", lead);", c: "tx" }],
  [{ t: "  }", c: "tx" }],
  [{ t: "  return", c: "kw" }, { t: " { score, status:", c: "tx" }, { t: " \"qualified\"", c: "st" }, { t: " };", c: "tx" }],
  [{ t: "}", c: "tx" }],
];

const tokenColor: Record<string, string> = {
  kw: "var(--og-syntax-keyword)",
  fn: "var(--og-syntax-function)",
  st: "var(--og-syntax-string)",
  cm: "var(--og-syntax-comment)",
  nm: "var(--og-syntax-number)",
  tx: "rgba(220,230,255,0.85)",
};

function AiCodeStream({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (!active) return;
    setVisible(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= generatedCodeLines.length) clearInterval(t);
    }, 230);
    return () => clearInterval(t);
  }, [active]);

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 mt-4" style={{ background: "rgba(4,6,16,0.9)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b border-white/8"
        style={{ background: "rgba(7,10,26,0.95)" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-og-accent animate-pulse" />
          <span className="text-[11px] font-mono" style={{ color: "var(--og-accent)" }}>AI generating code</span>
        </div>
        <span className="text-[10px] font-mono" style={{ color: "rgba(180,195,230,0.3)" }}>automation.ts</span>
      </div>
      {/* Code */}
      <div className="p-3 space-y-0.5 min-h-[140px]">
        {generatedCodeLines.slice(0, visible).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="flex gap-2.5 text-[11px] font-mono leading-[1.65]"
          >
            <span className="w-4 text-right shrink-0 select-none" style={{ color: "rgba(180,195,230,0.22)" }}>
              {i + 1}
            </span>
            <span>
              {line.length === 0 ? "\u00A0" : line.map((tok, j) => (
                <span key={j} style={{ color: tokenColor[tok.c] || "rgba(220,230,255,0.85)" }}>{tok.t}</span>
              ))}
            </span>
          </motion.div>
        ))}
        {visible < generatedCodeLines.length && active && (
          <div className="flex gap-2.5 text-[11px] font-mono">
            <span className="w-4 text-right shrink-0" style={{ color: "rgba(180,195,230,0.22)" }}>{visible + 1}</span>
            <span className="inline-block w-1.5 h-[1em] rounded-sm bg-og-accent animate-pulse" style={{ verticalAlign: "middle" }} />
          </div>
        )}
      </div>
    </div>
  );
}

export function POSSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const codeRef = useRef<HTMLDivElement>(null);
  const codeInView = useInView(codeRef, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="py-14 md:py-20 bg-og-cinematic-bg overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-og-accent/6 blur-[150px]" />
      <div className="max-w-[1200px] mx-auto px-6 relative">
        <AnimatedSection className="text-center mb-10">
          <h2 className="text-[clamp(28px,4vw,48px)] tracking-[-0.03em] text-white mb-4 font-bold">
            AI & Automation. <span className="text-og-accent">Reimagined.</span>
          </h2>
          <p className="text-[17px] text-white/50 max-w-[400px] mx-auto font-normal">
            Intelligent systems that work 24/7 for your business.
          </p>
        </AnimatedSection>

        <motion.div style={{ scale, opacity }} className="flex justify-center relative">
          <div className="relative max-w-[640px] w-full">
            {/* AI Chat Terminal */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8">
              <div className="flex items-center gap-1.5 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <div className="flex-1 flex justify-center">
                  <span className="text-[11px] font-mono text-white/30">sourcecode://ai-automation</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-og-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-og-accent text-[10px] font-mono font-bold">AI</span>
                  </div>
                  <div className="bg-white/10 rounded-xl rounded-tl-none p-4 flex-1">
                    <p className="text-[14px] text-white/80 font-normal">
                      I've analyzed your customer data. Here are 3 automation opportunities that could save 40+ hours per month.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-og-accent/15 rounded-xl rounded-tr-none p-4 max-w-[80%]">
                    <p className="text-[14px] text-white/80 font-normal">
                      Show me the lead qualification workflow automation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-og-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-og-accent text-[10px] font-mono font-bold">AI</span>
                  </div>
                  <div className="bg-white/10 rounded-xl rounded-tl-none p-4 flex-1">
                    <p className="text-[14px] text-white/80 font-normal">
                      Deploying WhatsApp + Email automation flow. Expected conversion lift: +28%.
                    </p>
                    {/* ── Code stream injected here ── */}
                    <div ref={codeRef}>
                      <AiCodeStream active={codeInView} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -inset-8 bg-og-accent/8 rounded-full blur-[60px] -z-10" />

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-[20%] left-2 sm:left-0 md:-left-[100px] bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-3 z-20"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-og-accent animate-pulse" />
                <span className="text-[12px] text-white/80 font-mono font-medium">AI Processing</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute top-[40%] right-2 sm:right-0 md:-right-[80px] bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-3 z-20"
            >
              <div className="text-center">
                <p className="text-[18px] text-og-accent font-mono font-bold">40hrs</p>
                <p className="text-[11px] text-white/60 font-normal">Saved/Month</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute bottom-[5%] left-1/2 -translate-x-1/2 bg-og-accent rounded-full px-4 py-2 z-20"
            >
              <span className="text-[12px] text-[#09090F] font-mono font-bold">+28% Conversion Lift</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
