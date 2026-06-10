"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Services", path: "/solutions" },
    { label: "How We Work", path: "/how-it-works" },
    { label: "Industries", path: "/industries" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Blog", path: "/blog" },
    { label: "FAQ", path: "/faq" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-og-nav-bg backdrop-blur-xl border-b border-og-nav-border">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-8 h-8 rounded-lg bg-og-accent/10 border border-og-accent/20 flex items-center justify-center transition-all duration-300 group-hover:bg-og-accent/20 group-hover:border-og-accent/40">
            <span className="text-og-accent text-[13px] font-mono" style={{ fontWeight: 700 }}>&lt;/&gt;</span>
          </div>
          <span className="text-og-text text-[17px] tracking-[-0.03em] font-mono" style={{ fontWeight: 700 }}>
            source<span className="text-og-accent">code</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-[14px] no-underline transition-all duration-200 relative group ${
                isActive(link.path)
                  ? "text-og-accent"
                  : "text-og-text-secondary hover:text-og-text"
              }`}
              style={{ fontWeight: 400 }}
            >
              {link.label}
              {isActive(link.path) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-og-accent"
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA + Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/apply"
            className="inline-flex items-center justify-center h-9 px-5 rounded-lg bg-og-accent/10 border border-og-accent/25 text-og-accent text-[13px] no-underline transition-all duration-300 hover:bg-og-accent hover:text-[#09090F] hover:border-og-accent font-mono"
            style={{ fontWeight: 600 }}
          >
            Start a project
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-og-text cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-og-nav-bg backdrop-blur-xl border-b border-og-nav-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-og-border">
                <span className="text-og-accent text-[12px] font-mono" style={{ fontWeight: 600 }}>~/sourcecode</span>
                <span className="w-2 h-4 bg-og-accent animate-pulse rounded-sm" />
              </div>
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 text-[16px] no-underline transition-colors flex items-center gap-2 ${
                    isActive(link.path)
                      ? "text-og-accent"
                      : "text-og-text"
                  }`}
                  style={{ fontWeight: 400 }}
                >
                  <span className="text-og-text-secondary text-[12px] font-mono">→</span>
                  {link.label}
                </Link>
              ))}
              <Link
                href="/apply"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center h-12 rounded-lg bg-og-accent text-[#09090F] text-[16px] no-underline font-mono"
                style={{ fontWeight: 700 }}
              >
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
