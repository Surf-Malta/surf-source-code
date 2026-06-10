"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const codeLines = [
  { tokens: [{ t: "// sourcecode.dev — where code meets craft", c: "comment" }] },
  { tokens: [] },
  { tokens: [{ t: "const", c: "keyword" }, { t: " project", c: "text" }, { t: " = await", c: "keyword" }, { t: " build({", c: "text" }] },
  { tokens: [{ t: "  client:", c: "text" }, { t: ' "ambitious"', c: "string" }, { t: ",", c: "text" }] },
  { tokens: [{ t: "  stack:", c: "text" }, { t: " [", c: "text" }, { t: '"React"', c: "string" }, { t: ", ", c: "text" }, { t: '"Node.js"', c: "string" }, { t: ", ", c: "text" }, { t: '"AI"', c: "string" }, { t: "],", c: "text" }] },
  { tokens: [{ t: "  delivery:", c: "text" }, { t: ' "on-time"', c: "string" }, { t: ",", c: "text" }] },
  { tokens: [{ t: "  quality:", c: "text" }, { t: " premium", c: "number" }] },
  { tokens: [{ t: "});", c: "text" }] },
  { tokens: [] },
  { tokens: [{ t: ">", c: "accent" }, { t: " compiling...", c: "dim" }] },
  { tokens: [{ t: ">", c: "accent" }, { t: " tests: ", c: "dim" }, { t: "42 passing", c: "success" }, { t: " ✓", c: "success" }] },
  { tokens: [{ t: ">", c: "accent" }, { t: " deploying to ", c: "dim" }, { t: "production", c: "keyword" }, { t: " 🚀", c: "text" }] },
];

const colorMap: Record<string, string> = {
  keyword: "var(--og-accent)",
  string: "#A8FF78",
  comment: "var(--og-text-secondary)",
  text: "var(--og-text)",
  dim: "var(--og-text-secondary)",
  accent: "var(--og-accent)",
  success: "#10E898",
  number: "#FFB86C",
  function: "#BD93F9",
};

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 140);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-og-accent/5 rounded-3xl blur-2xl -z-10" />
      <div className="absolute -top-10 -right-10 w-[300px] h-[300px] bg-[var(--og-secondary)]/8 rounded-full blur-3xl -z-10" />

      <div className="bg-og-code-bg rounded-2xl border border-og-border overflow-hidden shadow-[0_0_80px_rgba(0,207,222,0.08)]">
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-og-border bg-og-bg-alt">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 bg-og-bg rounded-md px-3 py-1 text-[11px] font-mono border border-og-border" style={{ color: "var(--og-text-secondary)" }}>
              <span className="w-2 h-2 rounded-full bg-og-accent inline-block animate-pulse" />
              sourcecode ~ /project
            </div>
          </div>
        </div>

        <div className="p-6 min-h-[280px]">
          <div className="space-y-1">
            {codeLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 text-[13px] font-mono leading-[1.7]"
              >
                <span className="text-[10px] select-none w-4 text-right shrink-0 font-mono"
                  style={{ color: "var(--og-text-secondary)", opacity: 0.4 }}>
                  {i + 1}
                </span>
                <span>
                  {line.tokens.length === 0 ? "\u00A0" : line.tokens.map((tok, j) => (
                    <span key={j} style={{ color: colorMap[tok.c] || "var(--og-text)" }}>
                      {tok.t}
                    </span>
                  ))}
                </span>
              </motion.div>
            ))}
            {visibleLines < codeLines.length && (
              <div className="flex items-center gap-3 text-[13px] font-mono">
                <span className="text-[10px] w-4 text-right shrink-0" style={{ opacity: 0.4, color: "var(--og-text-secondary)" }}>
                  {visibleLines + 1}
                </span>
                <span className="w-2.5 h-[1.15em] bg-og-accent rounded-sm animate-pulse inline-block" />
              </div>
            )}
          </div>
        </div>

        <div className="px-5 py-2 border-t border-og-border flex items-center justify-between">
          <div className="flex items-center gap-4 text-[10px] font-mono" style={{ color: "var(--og-text-secondary)" }}>
            <span className="text-og-accent">TypeScript</span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-og-success animate-pulse" />
            <span className="text-[10px] font-mono text-og-success">LIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-og-bg">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--og-text) 1px, transparent 1px), linear-gradient(90deg, var(--og-text) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-og-accent/5 blur-[100px]" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[400px] h-[400px] rounded-full bg-[var(--og-secondary)]/5 blur-[100px]" />
      <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] rounded-full bg-og-accent/3 blur-[60px]" />

      <div className="relative max-w-[1200px] mx-auto px-6 py-24 md:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-og-accent/8 border border-og-accent/15 mb-8">
                <span className="text-og-accent text-[11px] font-mono" style={{ fontWeight: 700 }}>&gt;_</span>
                <span className="text-og-text-secondary text-[12px] font-mono" style={{ fontWeight: 500 }}>Available for new projects in 2026</span>
                <span className="w-1.5 h-3 bg-og-accent rounded-sm animate-pulse" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[clamp(38px,5.5vw,72px)] leading-[1.04] tracking-[-0.04em] text-og-text mb-6 font-extrabold"
            >
              We engineer
              <br />
              <span className="text-og-accent">digital systems</span>
              <br />
              that scale.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[17px] leading-relaxed mb-10 max-w-[420px] text-og-text-secondary font-normal"
            >
              Premium software engineering, AI automation, and full-stack solutions — built with precision, designed to last.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/apply"
                className="inline-flex items-center gap-2.5 h-12 px-8 rounded-xl bg-og-accent text-[#09090F] text-[14px] no-underline transition-all duration-300 hover:bg-og-accent-hover hover:shadow-[0_0_40px_var(--og-accent-glow)] font-mono font-bold"
              >
                Start a project
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2.5 h-12 px-8 rounded-xl bg-og-surface border border-og-border text-og-text text-[14px] no-underline transition-all duration-300 hover:bg-og-surface-hover hover:border-og-accent/20 font-mono font-medium"
              >
                View our work
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center gap-5 flex-wrap"
            >
              {[
                { value: "30+", label: "projects shipped" },
                { value: "98%", label: "client satisfaction" },
                { value: "7", label: "industries served" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-[18px] text-og-accent font-mono font-bold">{stat.value}</span>
                  <span className="text-[12px] text-og-text-secondary font-normal">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <TerminalWindow />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-og-bg to-transparent" />
    </section>
  );
}
