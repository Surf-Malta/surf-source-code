import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-og-footer-bg border-t border-og-border">
      <div className="max-w-[1200px] mx-auto px-6 py-16">

        {/* Top row: logo + tagline */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 pb-12 border-b border-og-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-og-accent/10 border border-og-accent/20 flex items-center justify-center">
              <span className="text-og-accent text-[14px] font-mono" style={{ fontWeight: 700 }}>&lt;/&gt;</span>
            </div>
            <span className="text-[19px] tracking-[-0.03em] font-mono text-white" style={{ fontWeight: 700 }}>source<span className="text-og-accent">code</span></span>
          </div>
          <p className="text-[14px] font-mono" style={{ fontWeight: 400, color: "var(--og-footer-text)" }}>
            <span className="text-og-accent">// </span>Premium software engineering. Built to scale.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <p className="text-[14px] leading-relaxed mb-6" style={{ fontWeight: 400, color: "var(--og-footer-text)" }}>
              Your premium technology partner. Custom software, AI automation, and full-stack engineering — built with precision.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-og-border w-fit">
              <div className="w-2 h-2 rounded-full bg-og-success animate-pulse" />
              <span className="text-[12px] font-mono" style={{ fontWeight: 500, color: "var(--og-footer-text)" }}>Available for new projects</span>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] mb-5 font-mono" style={{ fontWeight: 600, color: "var(--og-footer-muted)" }}>Services</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Web Development", href: "/solutions" },
                { label: "Custom Software", href: "/solutions" },
                { label: "AI & Automation", href: "/solutions" },
                { label: "Tech Stack", href: "/integrations" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-[13px] hover:text-og-accent transition-colors no-underline" style={{ fontWeight: 400, color: "var(--og-footer-text)" }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] mb-5 font-mono" style={{ fontWeight: 600, color: "var(--og-footer-muted)" }}>Company</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Industries", href: "/industries" },
                { label: "How We Work", href: "/how-it-works" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact", href: "/apply" },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-[13px] hover:text-og-accent transition-colors no-underline" style={{ fontWeight: 400, color: "var(--og-footer-text)" }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.12em] mb-5 font-mono" style={{ fontWeight: 600, color: "var(--og-footer-muted)" }}>Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@sourcecode.dev" className="text-[13px] hover:text-og-accent transition-colors no-underline" style={{ fontWeight: 400, color: "var(--og-footer-text)" }}>
                hello@sourcecode.dev
              </a>
              <span className="text-[13px]" style={{ fontWeight: 400, color: "var(--og-footer-text)" }}>Malta, EU</span>
              <Link href="/apply" className="text-[13px] hover:text-og-accent transition-colors no-underline" style={{ fontWeight: 400, color: "var(--og-footer-text)" }}>
                Start a project →
              </Link>
            </div>
          </div>
        </div>

        {/* Code snippet block */}
        <div className="bg-og-code-bg rounded-xl border border-og-border p-4 mb-10 overflow-x-auto">
          <pre className="text-[12px] leading-relaxed font-mono">
            <code>
              <span style={{ color: "var(--og-syntax-comment)" }}>{'// ready to build something great?'}</span>{"\n"}
              <span style={{ color: "var(--og-syntax-keyword)" }}>const</span>
              <span style={{ color: "var(--og-text)" }}> project = </span>
              <span style={{ color: "var(--og-syntax-keyword)" }}>await</span>
              <span style={{ color: "var(--og-syntax-function)" }}> sourcecode</span>
              <span style={{ color: "var(--og-text)" }}>.</span>
              <span style={{ color: "var(--og-syntax-function)" }}>start</span>
              <span style={{ color: "var(--og-text)" }}>({"{ "}</span>
              <span style={{ color: "var(--og-syntax-string)" }}>"your-idea"</span>
              <span style={{ color: "var(--og-text)" }}>{" })"}</span>
              <span style={{ color: "var(--og-syntax-comment)" }}>;  // → launch 🚀</span>
            </code>
          </pre>
        </div>

        <div className="border-t border-og-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[12px] font-mono" style={{ fontWeight: 400, color: "var(--og-footer-muted)" }}>
            &copy; 2026 Sourcecode. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[12px] font-mono cursor-pointer hover:text-og-accent transition-colors" style={{ fontWeight: 400, color: "var(--og-footer-muted)" }}>Privacy Policy</span>
            <span className="text-[12px] font-mono cursor-pointer hover:text-og-accent transition-colors" style={{ fontWeight: 400, color: "var(--og-footer-muted)" }}>Terms of Service</span>
            <span className="text-[12px] font-mono" style={{ fontWeight: 400, color: "var(--og-footer-muted)" }}>Malta-based · EU</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
