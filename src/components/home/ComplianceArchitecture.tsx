"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedSection } from "../AnimatedSection";
import { Building2, Layers, Globe } from "lucide-react";

// Animated data packets that travel between layers
function DataConnector({
  delay,
  label,
  direction = "down",
}: {
  delay: number;
  label: string;
  direction?: "down" | "up";
}) {
  return (
    <div className="relative w-px h-14 mx-auto">
      {/* Static line */}
      <div
        className="absolute inset-0 w-px mx-auto"
        style={{
          background: direction === "down"
            ? "linear-gradient(to bottom, rgba(180,195,230,0.2), var(--og-accent), rgba(180,195,230,0.2))"
            : "linear-gradient(to top, rgba(180,195,230,0.2), var(--og-accent), rgba(180,195,230,0.2))",
        }}
      />
      {/* Traveling packet */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap"
        style={{ top: direction === "down" ? 0 : "auto", bottom: direction === "up" ? 0 : "auto" }}
        animate={direction === "down" ? { top: ["0%", "100%"] } : { bottom: ["0%", "100%"] }}
        transition={{ duration: 1.4, delay, repeat: Infinity, repeatDelay: 2.2, ease: "linear" }}
      >
        <div
          className="w-4 h-4 rounded border font-mono text-[8px] flex items-center justify-center shadow-[0_0_8px_var(--og-accent-glow)]"
          style={{
            background: "#070A1A",
            borderColor: "var(--og-accent)",
            color: "var(--og-accent)",
          }}
        >
          {"{"}
        </div>
      </motion.div>
      {/* Label */}
      <div
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[10px] font-mono px-2 py-0.5 rounded-md border whitespace-nowrap"
        style={{
          background: "#070A1A",
          borderColor: "rgba(0,207,222,0.15)",
          color: "var(--og-syntax-comment)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function ComplianceArchitecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="py-14 md:py-20 bg-og-bg">
      <div className="max-w-[800px] mx-auto px-6">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-[clamp(28px,4vw,48px)] tracking-[-0.03em] text-og-text mb-4 font-bold">
            Technology architecture.
          </h2>
          <p className="text-[17px] text-og-text-secondary font-normal">
            Built on scalable, secure infrastructure.
          </p>
        </AnimatedSection>

        <div ref={ref} className="flex flex-col items-center gap-0">
          {/* Layer 1 — Your Business */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[440px]"
          >
            <div className="bg-og-surface rounded-2xl border border-og-border p-5 flex items-center gap-4 shadow-[0_4px_20px_var(--og-shadow)]">
              <div className="w-12 h-12 rounded-2xl bg-og-cinematic-bg flex items-center justify-center shrink-0 border border-white/8">
                <Building2 size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-[15px] text-og-text font-semibold">Your Business</p>
                <p className="text-[12px] text-og-text-secondary font-normal">Goals, workflows, users</p>
              </div>
              {/* Mini code badge */}
              <div
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[10px] border"
                style={{ background: "#040610", borderColor: "rgba(255,255,255,0.07)", color: "var(--og-syntax-comment)" }}
              >
                <span style={{ color: "var(--og-syntax-string)" }}>req</span>
                <span>→</span>
                <span style={{ color: "var(--og-accent)" }}>layer</span>
              </div>
            </div>
          </motion.div>

          {/* Connector 1 */}
          {isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-[440px]"
            >
              <DataConnector delay={0.6} label="{ context, goals }" direction="down" />
            </motion.div>
          )}

          {/* Layer 2 — Sourcecode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-full max-w-[440px]"
          >
            <div className="bg-og-accent rounded-2xl p-5 flex items-center gap-4 shadow-[0_4px_30px_var(--og-accent-glow)]">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <Layers size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-[15px] text-[#09090F] font-semibold">Sourcecode Layer</p>
                <p className="text-[12px] text-[#09090F]/70 font-normal">Custom software, AI, automation</p>
              </div>
              {/* Live badge */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/20 font-mono text-[10px] text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10E898] animate-pulse" />
                LIVE
              </div>
            </div>
          </motion.div>

          {/* Connector 2 */}
          {isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="w-full max-w-[440px]"
            >
              <DataConnector delay={1.8} label="{ deploy, scale }" direction="down" />
            </motion.div>
          )}

          {/* Layer 3 — Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="w-full max-w-[440px]"
          >
            <div className="bg-og-surface rounded-2xl border border-og-border p-5 flex items-center gap-4 shadow-[0_4px_20px_var(--og-shadow)]">
              <div className="w-12 h-12 rounded-2xl bg-og-cinematic-bg flex items-center justify-center shrink-0 border border-white/8">
                <Globe size={22} className="text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="text-[15px] text-og-text font-semibold">Cloud Infrastructure</p>
                <p className="text-[12px] text-og-text-secondary font-normal">AWS, APIs, databases, security</p>
              </div>
              <div
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[10px] border"
                style={{ background: "#040610", borderColor: "rgba(255,255,255,0.07)", color: "var(--og-syntax-comment)" }}
              >
                <span style={{ color: "#10E898" }}>99.9%</span>
                <span>uptime</span>
              </div>
            </div>
          </motion.div>

          {/* Terminal output row */}
          {isInView && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-8 w-full max-w-[440px]"
            >
              <div
                className="rounded-xl border p-4 font-mono text-[11px] space-y-1"
                style={{ background: "#040610", borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div>
                  <span style={{ color: "var(--og-accent)" }}>&gt;</span>
                  <span style={{ color: "rgba(180,195,230,0.45)" }}> architecture.validate()</span>
                </div>
                <div>
                  <span style={{ color: "var(--og-accent)" }}>&gt;</span>
                  <span style={{ color: "#10E898" }}> ✓ all layers connected</span>
                </div>
                <div>
                  <span style={{ color: "var(--og-accent)" }}>&gt;</span>
                  <span style={{ color: "#10E898" }}> ✓ security checks passed</span>
                </div>
                <div>
                  <span style={{ color: "var(--og-accent)" }}>&gt;</span>
                  <span style={{ color: "rgba(180,195,230,0.45)" }}> status: </span>
                  <span style={{ color: "var(--og-syntax-string)" }}>"production-ready"</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
