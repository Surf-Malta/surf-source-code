"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[52px] h-[28px]" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-[52px] h-[28px] rounded-full p-[3px] transition-colors duration-300 cursor-pointer"
      style={{
        backgroundColor: isDark ? "var(--og-surface)" : "var(--og-bg-alt)",
        border: "1px solid var(--og-border)",
      }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun
        size={12}
        className="absolute left-[7px] transition-all duration-300"
        style={{
          color: isDark ? "var(--og-text-secondary)" : "var(--og-accent)",
          opacity: isDark ? 0.35 : 1,
        }}
      />
      <Moon
        size={12}
        className="absolute right-[7px] transition-all duration-300"
        style={{
          color: isDark ? "var(--og-accent)" : "var(--og-text-secondary)",
          opacity: isDark ? 1 : 0.35,
        }}
      />
      <motion.div
        className="w-[20px] h-[20px] rounded-full shadow-sm z-10"
        style={{ backgroundColor: "var(--og-accent)" }}
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
