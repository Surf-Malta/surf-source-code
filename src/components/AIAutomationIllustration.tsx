"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Circle } from "lucide-react";

const CODE_LINES = [
  [
    { t: "import ", c: "kw" }, { t: "{ AIAgent }", c: "var" },
    { t: " from ", c: "kw" }, { t: "\"@sourcecode/ai\"", c: "str" },
  ],
  [],
  [
    { t: "const ", c: "kw" }, { t: "agent", c: "var" },
    { t: " = new ", c: "txt" }, { t: "AIAgent", c: "cls" },
    { t: "({", c: "txt" },
  ],
  [
    { t: "  model", c: "prop" }, { t: ": ", c: "txt" },
    { t: "\"sc-vision-3\"", c: "str" }, { t: ",", c: "txt" },
  ],
  [
    { t: "  tools", c: "prop" }, { t: ": [", c: "txt" },
    { t: "\"crm\"", c: "str" }, { t: ", ", c: "txt" },
    { t: "\"email\"", c: "str" }, { t: ", ", c: "txt" },
    { t: "\"analytics\"", c: "str" }, { t: "],", c: "txt" },
  ],
  [{ t: "})", c: "txt" }],
  [],
  [
    { t: "const ", c: "kw" }, { t: "result", c: "var" },
    { t: " = ", c: "txt" }, { t: "await ", c: "kw" },
    { t: "agent", c: "var" }, { t: ".", c: "txt" },
    { t: "analyse", c: "fn" }, { t: "({", c: "txt" },
  ],
  [
    { t: "  source", c: "prop" }, { t: ": ", c: "txt" },
    { t: "\"customer_queries\"", c: "str" }, { t: ",", c: "txt" },
  ],
  [
    { t: "  automate", c: "prop" }, { t: ": ", c: "txt" },
    { t: "true", c: "kw" }, { t: ",", c: "txt" },
  ],
  [{ t: "})", c: "txt" }],
];

const OUTPUT = [
  { text: "$ sourcecode ai run", delay: 0 },
  { text: "  ▸ loading 2,847 queries...", delay: 0.3 },
  { text: "  ✓ intent clusters: 3 found", delay: 0.7 },
  { text: "  ✓ automation flows mapped", delay: 1.1 },
  { text: "  ✓ CRM integration ready", delay: 1.5 },
  { text: "  ✓ email sequences wired", delay: 1.85 },
  { text: "  → response_time    -85%  ✦", delay: 2.2, accent: true },
  { text: "  → lead_conversion  +42%  ✦", delay: 2.55, accent: true },
];

const colors: Record<string, string> = {
  kw:   "var(--og-accent)",
  var:  "#60a5fa",
  fn:   "#34d399",
  cls:  "#f59e0b",
  str:  "#a3e635",
  prop: "#c084fc",
  txt:  "rgba(255,255,255,0.45)",
};

export function AIAutomationIllustration() {
  const [running, setRunning]         = useState(false);
  const [done, setDone]               = useState(false);
  const [outCount, setOutCount]       = useState(0);
  const [showOut, setShowOut]         = useState(false);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const run = () => {
    if (running) return;
    setRunning(true);
    setDone(false);
    setShowOut(true);
    setOutCount(0);
    OUTPUT.forEach((line, i) => {
      const t = setTimeout(() => {
        setOutCount(i + 1);
        if (i === OUTPUT.length - 1) {
          setTimeout(() => { setRunning(false); setDone(true); }, 500);
        }
      }, line.delay * 1000 + 200);
      timers.current.push(t);
    });
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(false);
    setDone(false);
    setShowOut(false);
    setOutCount(0);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden font-mono text-[11px]"
      style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex gap-1.5 items-center">
          <Circle size={11} fill="#ff5f57" strokeWidth={0} />
          <Circle size={11} fill="#febc2e" strokeWidth={0} />
          <Circle size={11} fill="#28c840" strokeWidth={0} />
        </div>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>ai-pipeline.ts</span>
        <motion.button
          onClick={running ? reset : run}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] leading-none cursor-pointer"
          style={{
            background: running ? "rgba(239,68,68,0.12)" : done ? "rgba(40,200,64,0.12)" : "rgba(0,200,170,0.12)",
            color:      running ? "#f87171"               : done ? "#4ade80"              : "var(--og-accent)",
            border: `1px solid ${running ? "rgba(239,68,68,0.25)" : done ? "rgba(40,200,64,0.25)" : "rgba(0,200,170,0.25)"}`,
          }}
        >
          {running ? <RotateCcw size={9} /> : <Play size={9} />}
          <span>{running ? "stop" : done ? "rerun" : "run"}</span>
        </motion.button>
      </div>

      {/* Editor */}
      <div className="px-3 py-3 space-y-[2px]">
        {CODE_LINES.map((tokens, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-2 py-[3px] rounded cursor-default select-none hover:bg-white/[0.04]"
          >
            <span className="w-4 text-right shrink-0" style={{ color: "rgba(255,255,255,0.18)" }}>
              {i + 1}
            </span>
            <span className="leading-[1.65]">
              {tokens.map((tok, j) => (
                <span key={j} style={{ color: colors[tok.c] }}>{tok.t}</span>
              ))}
              {i === CODE_LINES.length - 1 && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="inline-block w-[2px] h-[13px] rounded-sm ml-0.5 align-middle"
                  style={{ background: "var(--og-accent)" }}
                />
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Run hint when idle */}
      <AnimatePresence>
        {!showOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-5 pb-4 flex items-center gap-2"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            <Play size={10} />
            <span>press run to analyse</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal panel */}
      <AnimatePresence>
        {showOut && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#080c10" }}
          >
            <div className="px-4 py-3">
              <div className="flex items-center gap-2 mb-2.5">
                <motion.span
                  animate={running ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
                  transition={{ repeat: running ? Infinity : 0, duration: 1 }}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: done ? "#4ade80" : "var(--og-accent)" }}
                />
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>Terminal</span>
              </div>
              <div className="space-y-1">
                {OUTPUT.slice(0, outCount).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      color: line.accent ? "var(--og-accent)" : "rgba(255,255,255,0.45)",
                      fontWeight: line.accent ? 600 : 400,
                    }}
                  >
                    {line.text}
                  </motion.div>
                ))}
                {running && outCount < OUTPUT.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.55, ease: "linear", repeatType: "reverse" }}
                    className="inline-block w-2 h-[11px] rounded-sm"
                    style={{ background: "var(--og-accent)" }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
