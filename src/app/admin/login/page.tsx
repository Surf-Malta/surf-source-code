"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";

import { login } from "@/lib/data/adminApi";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-og-bg flex items-center justify-center p-6">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--og-text) 1px, transparent 1px), linear-gradient(90deg, var(--og-text) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-og-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[400px] bg-og-surface rounded-2xl border border-og-border p-8 shadow-xl relative"
      >
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-og-accent/10 border border-og-accent/20 items-center justify-center text-og-accent mb-4 font-mono font-bold">
            &lt;/&gt;
          </div>
          <h1 className="text-[24px] tracking-[-0.02em] font-extrabold text-og-text">
            source<span className="text-og-accent">code</span>
          </h1>
          <p className="text-[13px] text-og-text-secondary mt-1 font-normal">
            Sign in to your administration panel
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-og-destructive/10 border border-og-destructive/20 text-og-destructive text-[13px] rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-[13px] text-og-text-secondary font-medium block mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-og-text-secondary" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-og-input-bg border border-og-border focus:border-og-accent focus:bg-og-surface outline-none text-[14px] text-og-text placeholder:text-og-text-secondary/50 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="text-[13px] text-og-text-secondary font-medium block mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-og-text-secondary" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-og-input-bg border border-og-border focus:border-og-accent focus:bg-og-surface outline-none text-[14px] text-og-text placeholder:text-og-text-secondary/50 transition-all duration-200"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-og-accent text-[#09090F] font-bold text-[14px] transition-all duration-300 hover:bg-og-accent-hover hover:shadow-[0_0_30px_var(--og-accent-glow)] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
