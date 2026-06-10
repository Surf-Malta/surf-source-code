"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "../AnimatedSection";

// ── Build log data ────────────────────────────────────────────────────────────
const buildLogEntries = [
  { prefix: ">", msg: "compiling src/api/routes.ts", color: "dim" },
  { prefix: "✓", msg: "type-check passed",           color: "ok"  },
  { prefix: ">", msg: "bundling 42 modules...",       color: "dim" },
  { prefix: "✓", msg: "bundle 284 kB (gzip: 91 kB)", color: "ok"  },
  { prefix: ">", msg: "running 38 unit tests",        color: "dim" },
  { prefix: "✓", msg: "38 passing (1.2s)",            color: "ok"  },
  { prefix: ">", msg: "deploying to CDN edge...",     color: "dim" },
  { prefix: "✓", msg: "live at production ✦",        color: "acc" },
  { prefix: ">", msg: "monitoring active",            color: "dim" },
  { prefix: "✓", msg: "uptime 99.97%",               color: "ok"  },
];

const logColor: Record<string, string> = {
  ok:  "#10E898",
  acc: "var(--og-accent)",
  dim: "rgba(180,195,230,0.45)",
};

// ── Build log ticker (reused in both right-panel and mobile strip) ────────────
function BuildLogTicker({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    setVisibleCount(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setVisibleCount(i);
      if (i >= buildLogEntries.length) {
        clearInterval(t);
        setTimeout(() => setVisibleCount(0), 3000);
      }
    }, 350);
    return () => clearInterval(t);
  }, [isInView, visibleCount === 0]);

  return (
    <div
      ref={ref}
      className="flex flex-col overflow-hidden"
      style={{
        background: "#040610",
        height: compact ? "auto" : "100%",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b shrink-0"
        style={{ background: "#070A1A", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-og-accent animate-pulse" />
          <span className="text-[11px] font-mono text-og-accent">Build Pipeline</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: "rgba(180,195,230,0.35)" }}>
          <span>v2.4.1</span>
          <span
            className="px-1.5 py-0.5 rounded"
            style={{ background: "rgba(16,232,152,0.10)", color: "#10E898" }}
          >
            PASSING
          </span>
        </div>
      </div>

      {/* Log entries */}
      <div
        className="p-3 space-y-1 overflow-hidden"
        style={{ minHeight: compact ? 80 : 120 }}
      >
        {buildLogEntries.slice(0, visibleCount).map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono"
          >
            <span
              style={{
                color: entry.color === "ok" ? "#10E898" : "var(--og-accent)",
                minWidth: 10,
              }}
            >
              {entry.prefix}
            </span>
            <span style={{ color: logColor[entry.color] || "rgba(220,230,255,0.85)" }}>
              {entry.msg}
            </span>
          </motion.div>
        ))}
        {visibleCount < buildLogEntries.length && visibleCount > 0 && (
          <span className="inline-block w-1.5 h-3 rounded-sm bg-og-accent animate-pulse ml-3" />
        )}
      </div>
    </div>
  );
}

// ── Syntax token helpers ──────────────────────────────────────────────────────
const KW  = ({ c }: { c: string }) => <span style={{ color: "var(--og-syntax-keyword)"  }}>{c}</span>;
const STR = ({ c }: { c: string }) => <span style={{ color: "var(--og-syntax-string)"   }}>{c}</span>;
const CMT = ({ c }: { c: string }) => <span style={{ color: "var(--og-syntax-comment)"  }}>{c}</span>;
const FN  = ({ c }: { c: string }) => <span style={{ color: "var(--og-syntax-function)" }}>{c}</span>;
const TY  = ({ c }: { c: string }) => <span style={{ color: "#4EC9B0"                   }}>{c}</span>;
const VAR = ({ c }: { c: string }) => <span style={{ color: "#9CDCFE"                   }}>{c}</span>;
const PL  = ({ c }: { c: string }) => <span style={{ color: "rgba(220,230,255,0.80)"    }}>{c}</span>;

// ── Per-row code line wrapper
function CodeRow({
  n,
  active,
  children,
}: {
  n: number;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-start"
      style={
        active
          ? {
              background: "rgba(0,153,170,0.08)",
              borderLeft: "2px solid var(--og-accent)",
            }
          : { borderLeft: "2px solid transparent" }
      }
    >
      {/* Line number */}
      <span
        className="shrink-0 w-7 text-right pr-3 select-none"
        style={{
          color:      active ? "rgba(180,195,230,0.55)" : "rgba(180,195,230,0.18)",
          lineHeight: "1.75",
          fontSize:   "inherit",
        }}
      >
        {n}
      </span>
      {/* Code content */}
      <div className="flex-1 min-w-0" style={{ lineHeight: "1.75" }}>
        {children}
      </div>
    </div>
  );
}

// ── File tree data ────────────────────────────────────────────────────────────
const fileTree = [
  { label: "▾ src",          indent: 0 },
  { label: "▾ app",          indent: 1 },
  { label: "▾ dashboard",    indent: 2 },
  { label: "● dashboard.tsx",indent: 3, active: true },
  { label: "  metrics.ts",   indent: 3 },
  { label: "▾ api",          indent: 2 },
  { label: "  routes.ts",    indent: 3 },
  { label: "  client.ts",    indent: 3 },
  { label: "▾ components",   indent: 2 },
  { label: "  Chart.tsx",    indent: 3 },
  { label: "  Stats.tsx",    indent: 3 },
  { label: "  deploy.yml",   indent: 1 },
  { label: "  package.json", indent: 1 },
] as { label: string; indent: number; active?: boolean }[];

// ── Motion panel wrapper ──────────────────────────────────────────────────────
function SlidePanel({
  children,
  direction = "up",
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const offset = { left: { x: -20, y: 0 }, right: { x: 20, y: 0 }, up: { x: 0, y: 16 }, down: { x: 0, y: -16 } }[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function DashboardDemo() {
  const [activeTab, setActiveTab] = useState("dashboard.tsx");
  const tabs = ["dashboard.tsx", "api/metrics.ts", "deploy.yml"];

  return (
    <section className="py-14 md:py-20 bg-og-bg">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Heading */}
        <AnimatedSection className="text-center mb-10">
          <h2
            className="text-[clamp(26px,4vw,48px)] tracking-[-0.03em] text-og-text mb-4 font-bold"
          >
            Your project command center.
          </h2>
          <p
            className="text-[15px] sm:text-[17px] text-og-text-secondary max-w-[400px] mx-auto font-normal"
          >
            Everything you need, shipped fast.
          </p>
        </AnimatedSection>

        {/* IDE illustration */}
        <AnimatedSection delay={0.2}>
          <div
            className="relative rounded-2xl border border-og-border overflow-hidden"
            style={{ background: "#040610" }}
          >

            {/* ── Window chrome ─────────────────────────────────────── */}
            <div
              className="flex items-center gap-3 px-3 sm:px-4 py-2.5 border-b select-none"
              style={{ background: "#070A1A", borderColor: "rgba(255,255,255,0.07)" }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "#FF5F57" }} />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "#FFBD2E" }} />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: "#28C840" }} />
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-0 flex-1 overflow-hidden ml-1 sm:ml-2">
                {/* Mobile: active tab name */}
                <div
                  className="flex sm:hidden items-center px-3 py-1.5 text-[11px] font-mono"
                  style={{
                    color:        "var(--og-accent)",
                    borderBottom: "2px solid var(--og-accent)",
                    background:   "#040610",
                  }}
                >
                  {activeTab}
                </div>

                {/* sm+: all tabs */}
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="hidden sm:flex items-center px-3 md:px-4 py-1.5 text-[11px] font-mono border-r whitespace-nowrap transition-colors duration-200 cursor-pointer"
                    style={{
                      borderRightColor: "rgba(255,255,255,0.07)",
                      borderBottom:     tab === activeTab ? "2px solid var(--og-accent)" : "2px solid transparent",
                      color:            tab === activeTab ? "var(--og-accent)" : "rgba(180,195,230,0.30)",
                      background:       tab === activeTab ? "#040610" : "transparent",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Live badge */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#10E898" }} />
                <span className="text-[10px] font-mono" style={{ color: "#10E898" }}>LIVE</span>
              </div>
            </div>

            {/* ── IDE body ──────────────────────────────────────────── */}
            <div className="flex" style={{ minHeight: 260 }}>

              {/* File tree */}
              <SlidePanel
                direction="left"
                delay={0.35}
                className="hidden md:flex flex-col w-32 lg:w-36 border-r shrink-0 py-3 select-none"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div
                  className="px-3 mb-2 text-[9px] tracking-[0.1em]"
                  style={{ color: "rgba(180,195,230,0.28)", fontWeight: 700 }}
                >
                  EXPLORER
                </div>
                {fileTree.map((item, i) => (
                  <div
                    key={i}
                    className="py-[3px] text-[10px] font-mono truncate"
                    style={{
                      paddingLeft: `${6 + item.indent * 8}px`,
                      color:       item.active ? "var(--og-accent)" : "rgba(180,195,230,0.38)",
                      background:  item.active ? "rgba(0,153,170,0.10)" : "transparent",
                    }}
                  >
                    {item.label}
                  </div>
                ))}

                {/* Git status */}
                <div
                  className="mt-auto mx-2 pt-2 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="text-[9px] tracking-[0.1em] mb-1 px-1"
                    style={{ color: "rgba(180,195,230,0.28)", fontWeight: 700 }}
                  >
                    SOURCE CTRL
                  </div>
                  <div className="px-1 flex flex-col gap-0.5 text-[10px] font-mono">
                    <span style={{ color: "rgba(180,195,230,0.45)" }}>⎇ main</span>
                    <span style={{ color: "#10E898" }}>✓ synced</span>
                    <span style={{ color: "rgba(180,195,230,0.45)" }}>↑3 commits</span>
                  </div>
                </div>
              </SlidePanel>

              {/* Code editor */}
              <SlidePanel
                direction="up"
                delay={0.25}
                className="flex-1 min-w-0 py-3 sm:py-4"
                style={{ background: "#040610" }}
              >
                <div className="relative overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                  <div
                    className="text-[10px] sm:text-[11px] font-mono px-2 sm:px-4"
                    style={{ minWidth: "max-content" }}
                  >
                    <CodeRow n={1}><KW c="import" /><PL c=" { useEffect, useState } " /><KW c="from" /><STR c=" 'react'" /></CodeRow>
                    <CodeRow n={2}><KW c="import" /><PL c=" type { Metrics } " /><KW c="from" /><STR c=" './types'" /></CodeRow>
                    <CodeRow n={3}><PL c=" " /></CodeRow>
                    <CodeRow n={4}><CMT c="// Real-time project command centre" /></CodeRow>
                    <CodeRow n={5}><KW c="const" /><VAR c=" endpoint" /><PL c=" = " /><STR c="'/api/v2/metrics'" /></CodeRow>
                    <CodeRow n={6}><PL c=" " /></CodeRow>
                    <CodeRow n={7}><KW c="interface" /><TY c=" Dashboard " /><PL c="{" /></CodeRow>
                    <CodeRow n={8} active>
                      <VAR c="  activeProjects" /><PL c=": " /><TY c="number" /><CMT c="  // 12 ↑3 this month" />
                    </CodeRow>
                    <CodeRow n={9}><VAR c="  automatedTasks" /><PL c=": " /><TY c="number" /><CMT c="  // 847 ↑124 this week" /></CodeRow>
                    <CodeRow n={10}><VAR c="  clientScore"    /><PL c=": " /><TY c="number" /><CMT c="   // 98.2% ↑1.4%"    /></CodeRow>
                    <CodeRow n={11}><PL c="}" /></CodeRow>
                    <CodeRow n={12}><PL c=" " /></CodeRow>
                    <CodeRow n={13}><KW c="const" /><VAR c=" deliverables" /><PL c=" = [" /></CodeRow>
                    <CodeRow n={14}>
                      <PL c="  { " /><VAR c="name" /><PL c=": " /><STR c="'E-Commerce Platform'" />
                      <PL c=", " /><VAR c="stack" /><PL c=": " /><STR c="'React+Node'" />
                      <PL c=", " /><VAR c="status" /><PL c=": " /><STR c="'delivered'" /><PL c=" }," />
                    </CodeRow>
                    <CodeRow n={15}>
                      <PL c="  { " /><VAR c="name" /><PL c=": " /><STR c="'AI Chatbot System'" />
                      <PL c=", " /><VAR c="stack" /><PL c=": " /><STR c="'Python+GPT'" />
                      <PL c=", " /><VAR c="status" /><PL c=": " /><STR c="'building'" /><PL c=" }," />
                    </CodeRow>
                    <CodeRow n={16}><PL c="]" /></CodeRow>
                    <CodeRow n={17}><PL c=" " /></CodeRow>
                    <CodeRow n={18}><KW c="export default" /><KW c=" function " /><FN c="DashboardView" /><PL c="() {" /></CodeRow>
                    <CodeRow n={19}>
                      <PL c="  " /><KW c="const" /><VAR c=" [metrics, set]" /><PL c=" = " />
                      <FN c="useState" /><PL c="<Dashboard>()" />
                    </CodeRow>
                    <CodeRow n={20}>
                      <PL c="  " /><FN c="useEffect" /><PL c="(() => { " />
                      <FN c="fetch" /><PL c="(endpoint).then(set) }, [])" />
                    </CodeRow>
                    <CodeRow n={21}>
                      <PL c="  " /><KW c="return" /><PL c=" <" /><TY c="Metrics" />
                      <VAR c=" data" /><PL c="={metrics} " /><VAR c="live" /><PL c=" />" />
                    </CodeRow>
                    <CodeRow n={22}>
                      <PL c="}" />
                      <span
                        className="inline-block align-middle ml-0.5 animate-pulse"
                        style={{ width: 2, height: 13, background: "var(--og-accent)", borderRadius: 1 }}
                      />
                    </CodeRow>
                  </div>

                  {/* Right-edge fade mask */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-10 pointer-events-none"
                    style={{ background: "linear-gradient(to right, transparent, #040610)" }}
                  />
                </div>
              </SlidePanel>

              {/* Build log */}
              <SlidePanel
                direction="right"
                delay={0.35}
                className="hidden lg:flex flex-col w-[230px] xl:w-[250px] border-l shrink-0"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <BuildLogTicker />
              </SlidePanel>
            </div>

            {/* Build log strip */}
            <SlidePanel
              direction="up"
              delay={0.4}
              className="lg:hidden border-t"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <BuildLogTicker compact />
            </SlidePanel>

            {/* Terminal strip */}
            <SlidePanel
              direction="up"
              delay={0.45}
              className="border-t"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              {/* Tab bar */}
              <div
                className="flex items-center gap-4 sm:gap-5 px-3 sm:px-4 py-1.5 border-b"
                style={{ background: "#070A1A", borderColor: "rgba(255,255,255,0.07)" }}
              >
                {["TERMINAL", "OUTPUT", "PROBLEMS"].map((tab, i) => (
                  <span
                    key={tab}
                    className="text-[10px] font-mono"
                    style={{
                      color:         i === 0 ? "var(--og-accent)" : "rgba(180,195,230,0.28)",
                      borderBottom:  i === 0 ? "1px solid var(--og-accent)" : "none",
                      paddingBottom: "2px",
                    }}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              {/* Command line */}
              <div className="relative overflow-hidden" style={{ background: "#040610" }}>
                <div
                  className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 overflow-x-auto"
                  style={{ scrollbarWidth: "none" }}
                >
                  <span
                    className="text-[10px] sm:text-[11px] font-mono shrink-0"
                    style={{ color: "rgba(180,195,230,0.30)" }}
                  >
                    <span className="sm:hidden">~$</span>
                    <span className="hidden sm:inline">sourcecode@prod:~$</span>
                  </span>
                  <span
                    className="text-[10px] sm:text-[11px] font-mono shrink-0"
                    style={{ color: "rgba(220,230,255,0.80)" }}
                  >
                    npm run deploy:prod
                  </span>
                  {[
                    { text: "✓ compiled 1.2s", color: "#10E898"           },
                    { text: "✓ 38 tests",       color: "#10E898"           },
                    { text: "✓ CDN deployed",   color: "#10E898"           },
                    { text: "↑ 99.97%",         color: "var(--og-accent)" },
                  ].map((item, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-[11px] font-mono whitespace-nowrap shrink-0"
                      style={{ color: item.color }}
                    >
                      {item.text}
                    </span>
                  ))}
                </div>
                {/* Right fade */}
                <div
                  className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none"
                  style={{ background: "linear-gradient(to right, transparent, #040610)" }}
                />
              </div>
            </SlidePanel>

            {/* Status bar */}
            <div
              className="flex items-center justify-between px-3 sm:px-4 py-1 select-none"
              style={{ background: "var(--og-accent)" }}
            >
              <div
                className="flex items-center gap-2 sm:gap-4 text-[9px] sm:text-[10px] font-mono"
                style={{ color: "rgba(0,0,0,0.70)" }}
              >
                <span>⎇ main</span>
                <span>✓ 0 errors</span>
                <span className="hidden sm:inline">TypeScript 5.4</span>
              </div>
              <div
                className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono"
                style={{ color: "rgba(0,0,0,0.70)" }}
              >
                <span>12 projects</span>
                <span className="hidden sm:inline">847 tasks</span>
                <span>98.2% CSAT</span>
                <span className="hidden md:inline">Ln 22, Col 2</span>
              </div>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
