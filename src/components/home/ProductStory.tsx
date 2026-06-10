"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Code, Bot, BarChart3 } from "lucide-react";

const stories = [
  { icon: Code, title: "Custom software that fits your business.", description: "Dashboards, portals, CRMs, and workflow systems." },
  { icon: Bot, title: "AI automation that works for you.", description: "Chatbots, recommendation engines, smart assistants." },
  { icon: BarChart3, title: "Data-driven business intelligence.", description: "Real-time analytics, reporting, and predictive insights." },
];

// Cycling code snippets for the editor — matched to each story
const editorSnippets = [
  {
    filename: "Dashboard.tsx",
    lang: "tsx",
    lines: [
      [{ t: "import", c: "kw" }, { t: " { useData } ", c: "tx" }, { t: "from", c: "kw" }, { t: " '@/hooks'", c: "st" }],
      [],
      [{ t: "export function", c: "kw" }, { t: " Dashboard", c: "fn" }, { t: "() {", c: "tx" }],
      [{ t: "  const", c: "kw" }, { t: " { metrics } =", c: "tx" }, { t: " useData", c: "fn" }, { t: "();", c: "tx" }],
      [{ t: "  return", c: "kw" }, { t: " (", c: "tx" }],
      [{ t: "    <KPIGrid", c: "fn" }, { t: " data={metrics}", c: "tx" }, { t: " />", c: "fn" }],
      [{ t: "  );", c: "tx" }],
      [{ t: "}", c: "tx" }],
    ],
  },
  {
    filename: "automation.py",
    lang: "py",
    lines: [
      [{ t: "# AI lead qualification flow", c: "cm" }],
      [],
      [{ t: "async def", c: "kw" }, { t: " qualify_lead", c: "fn" }, { t: "(lead):", c: "tx" }],
      [{ t: "    score =", c: "tx" }, { t: " await", c: "kw" }, { t: " ai.score", c: "fn" }, { t: "(lead)", c: "tx" }],
      [{ t: "    if", c: "kw" }, { t: " score >", c: "tx" }, { t: " 0.85", c: "nm" }, { t: ":", c: "tx" }],
      [{ t: "        notify", c: "fn" }, { t: "(", c: "tx" }, { t: '"sales"', c: "st" }, { t: ", lead)", c: "tx" }],
      [{ t: "    return", c: "kw" }, { t: " score", c: "tx" }],
    ],
  },
  {
    filename: "analytics.ts",
    lang: "ts",
    lines: [
      [{ t: "// real-time insights engine", c: "cm" }],
      [],
      [{ t: "const", c: "kw" }, { t: " pipeline =", c: "tx" }, { t: " createPipeline", c: "fn" }, { t: "({", c: "tx" }],
      [{ t: "  source:", c: "tx" }, { t: " 'clickstream'", c: "st" }, { t: ",", c: "tx" }],
      [{ t: "  window:", c: "tx" }, { t: " 60_000", c: "nm" }, { t: ",", c: "tx" }],
      [{ t: "  output:", c: "tx" }, { t: " 'dashboard'", c: "st" }],
      [{ t: "});", c: "tx" }],
    ],
  },
];

const tokenColor: Record<string, string> = {
  kw: "var(--og-syntax-keyword)",
  fn: "var(--og-syntax-function)",
  st: "var(--og-syntax-string)",
  cm: "var(--og-syntax-comment)",
  nm: "var(--og-syntax-number)",
  tx: "rgba(220,230,255,0.85)",
};

function CodeEditorPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);

  // Cycle snippets
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setSnippetIdx((prev) => (prev + 1) % editorSnippets.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isInView]);

  // Typewriter per snippet
  useEffect(() => {
    setVisibleLines(0);
    if (!isInView) return;
    let i = 0;
    const snippet = editorSnippets[snippetIdx];
    const t = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= snippet.lines.length) clearInterval(t);
    }, 160);
    return () => clearInterval(t);
  }, [snippetIdx, isInView]);

  const snippet = editorSnippets[snippetIdx];

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden border border-white/8 shadow-[0_24px_60px_rgba(0,0,0,0.55)]" style={{ background: "#040610" }}>
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8" style={{ background: "#07091A" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 flex gap-1 overflow-hidden">
          {/* Mobile: only active tab */}
          <div
            className="flex sm:hidden px-3 py-1 text-[11px] font-mono rounded-t-md"
            style={{
              background:   "#040610",
              color:        "rgba(220,230,255,0.85)",
              borderBottom: "1px solid var(--og-accent)",
            }}
          >
            {snippet.filename}
          </div>
          {/* sm+: all tabs */}
          {editorSnippets.map((s, i) => (
            <div
              key={i}
              className="hidden sm:block px-3 py-1 text-[11px] font-mono rounded-t-md transition-all duration-300 truncate"
              style={{
                background:   i === snippetIdx ? "#040610" : "transparent",
                color:        i === snippetIdx ? "rgba(220,230,255,0.85)" : "rgba(180,195,230,0.3)",
                borderBottom: i === snippetIdx ? "1px solid var(--og-accent)" : "none",
              }}
            >
              {s.filename}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-og-accent animate-pulse" />
          <span className="text-[10px] font-mono text-og-accent">LIVE</span>
        </div>
      </div>

      {/* Line numbers + code */}
      <div className="p-4 min-h-[200px]">
        <div className="space-y-0.5">
          {snippet.lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={`${snippetIdx}-${i}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="flex gap-3 text-[12px] font-mono leading-[1.7]"
            >
              <span className="w-5 text-right shrink-0 select-none" style={{ color: "rgba(180,195,230,0.25)" }}>
                {i + 1}
              </span>
              <span>
                {line.length === 0 ? "\u00A0" : line.map((tok, j) => (
                  <span key={j} style={{ color: tokenColor[tok.c] || "rgba(220,230,255,0.85)" }}>{tok.t}</span>
                ))}
              </span>
            </motion.div>
          ))}
          {visibleLines < snippet.lines.length && (
            <div className="flex gap-3 text-[12px] font-mono">
              <span className="w-5 text-right shrink-0" style={{ color: "rgba(180,195,230,0.25)" }}>
                {visibleLines + 1}
              </span>
              <span className="inline-block w-2 h-[1.1em] rounded-sm bg-og-accent animate-pulse" style={{ verticalAlign: "middle" }} />
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 flex items-center justify-between border-t border-white/8" style={{ background: "#070A1A" }}>
        <div className="flex items-center gap-4 text-[10px] font-mono" style={{ color: "rgba(180,195,230,0.35)" }}>
          <span style={{ color: "var(--og-accent)" }}>{snippet.lang.toUpperCase()}</span>
          <span>UTF-8</span>
          <span>Ln {visibleLines}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: "#10E898" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10E898] animate-pulse inline-block" />
          compiling...
        </div>
      </div>
    </div>
  );
}

export function ProductStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} className="relative py-14 md:py-20 bg-og-bg overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left: animated code editor */}
          <motion.div style={{ y: cardY }} className="relative order-2 lg:order-1">
            <div className="max-w-[420px] mx-auto lg:mx-0">
              {/* Glow */}
              <div className="absolute -inset-8 bg-og-accent/5 rounded-3xl blur-3xl -z-10 pointer-events-none" />
              <CodeEditorPanel />
            </div>
          </motion.div>

          <div className="space-y-10 md:space-y-16 order-1 lg:order-2">
            {stories.map((story, i) => (
              <StoryItem key={i} story={story} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StoryItem({ story, index }: { story: typeof stories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "start 0.3"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [20, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--og-accent-muted)] mb-5">
        <story.icon size={22} className="text-og-accent" strokeWidth={1.5} />
      </div>
      <h3 className="text-[clamp(24px,3.5vw,40px)] tracking-[-0.03em] text-og-text mb-3 font-bold">
        {story.title}
      </h3>
      <p className="text-[17px] text-og-text-secondary font-normal">
        {story.description}
      </p>
    </motion.div>
  );
}
